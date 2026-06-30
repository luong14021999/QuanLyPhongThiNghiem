# Kiến trúc – LIMS Viện Nông Nghiệp Thanh Hóa

## Stack hiện tại (test mode)
| Tầng | Công nghệ |
|---|---|
| Frontend | Next.js 16 (App Router) · React 19 · Tailwind v4 · Radix UI |
| Backend / API | Next.js Route Handlers + Server Components |
| **Storage** | **File JSON trong `data/` folder** – persist khi server restart, không cần DB |
| Database (sau) | Supabase Postgres (đã có schema sẵn `supabase/migrations/0001_init.sql`) |
| Auth (sau) | Supabase Auth |
| Realtime (sau) | Supabase Realtime |

## Cấu trúc thư mục

```
.
├── public/                       # Static assets (logo, PWA manifest)
├── data/                         # ★ File storage – JSON theo collection (gitignore)
│   ├── customers.json
│   └── ...
├── supabase/                     # (Optional, dùng khi chuyển sang Postgres)
│   ├── migrations/0001_init.sql
│   └── seed.ts
├── src/
│   ├── app/
│   │   ├── api/                  # Route handlers (GET/POST/PATCH/DELETE)
│   │   └── ...                   # UI pages
│   ├── components/
│   ├── lib/
│   │   ├── mock-data.ts          # Fallback ban đầu khi data/ trống
│   │   ├── storage/file-storage.ts   # ★ Read/write JSON files
│   │   ├── supabase/server.ts    # (Optional) Supabase clients
│   │   └── data/customers.ts     # Data access layer
│   └── types/database.ts
└── docs/
```

## File Storage (mode hiện tại)

Đơn giản nhất, không cần cloud / database. Mỗi entity = 1 file JSON.

### Cách hoạt động
1. Lần đầu page load: `readCollection('customers', mockCustomers)` thấy file chưa có → ghi mock data vào `data/customers.json`
2. Lần sau: đọc trực tiếp từ file → nhanh, persist khi server restart
3. Write (POST/PATCH/DELETE) qua API → ghi lại vào file

### API endpoints
```
GET    /api/customers          # danh sách
POST   /api/customers          # thêm 1 KH (body JSON)
PATCH  /api/customers/{id}     # sửa
DELETE /api/customers/{id}     # xóa
```

### Test thủ công với curl
```bash
# Lấy danh sách
curl http://localhost:3000/api/customers | jq

# Thêm KH
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{"code":"KH-VNNTH-0999","name":"HTX Thí điểm","kind":"HTX / Trang trại"}'

# Sửa KH
curl -X PATCH http://localhost:3000/api/customers/{id} \
  -H "Content-Type: application/json" \
  -d '{"phone":"0900 000 000"}'

# Xóa
curl -X DELETE http://localhost:3000/api/customers/{id}
```

### Reset data về mock ban đầu
```bash
rm -rf data/
```
Lần page load tiếp theo sẽ tự sinh lại từ `src/lib/mock-data.ts`.

### Convert entity khác sang file storage
Pattern (copy từ `src/lib/data/customers.ts`):

```ts
import { readCollection, appendItem, updateItem, deleteItem }
  from "@/lib/storage/file-storage";
import { samples as mockSamples, type Sample } from "@/lib/mock-data";

const COLLECTION = "samples";

export async function getSamples() {
  return readCollection<Sample>(COLLECTION, mockSamples);
}

export async function createSample(s: Sample) {
  return appendItem(COLLECTION, s, mockSamples);
}
// ...
```

Sau đó update page tương ứng thành `async function` và `await getSamples()`.

## Setup Supabase (lần đầu)

### 1. Tạo project
- Vào https://app.supabase.com → New Project
- Đặt tên (ví dụ `lims-vnnth`), chọn region gần nhất (Singapore cho Việt Nam)
- Chờ ~2 phút để project khởi tạo

### 2. Lấy keys
- Vào project → **Settings → API**
- Copy 3 giá trị:
  - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
  - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` *(giữ bí mật, không commit)*

### 3. Cấu hình env
```bash
cp .env.local.example .env.local
# Sửa 3 giá trị trong .env.local
```

### 4. Chạy migration
- Vào project Supabase → **SQL Editor**
- New query → dán toàn bộ nội dung `supabase/migrations/0001_init.sql`
- Run

Hoặc qua Supabase CLI:
```bash
npx supabase link --project-ref <ref>
npx supabase db push
```

### 5. Seed dữ liệu
```bash
npm run db:seed
```

Script sẽ đọc từ `src/lib/mock-data.ts` và đổ vào Postgres qua service role key.

### 6. Verify
```bash
npm run dev
```
Mở [http://localhost:3000/customers](http://localhost:3000/customers) — badge "Dữ liệu live từ Supabase" hiển thị nếu kết nối OK. Nếu chưa cấu hình env, badge "Đang dùng mock data" hiển thị (fallback).

## Schema (24 bảng)

Nhóm theo module:

| Nhóm | Bảng |
|---|---|
| **Khách hàng & TT** | `customers` · `customer_feedback` · `services` |
| **Nguồn lực** | `staff` · `equipment` + `equipment_usage_logs` + `maintenance_schedule` + `environment_readings` · `tools` · `chemicals` + `chemical_usage_logs` |
| **Nghiệp vụ mẫu** | `test_requests` · `samples` · `archived_samples` · `sampling_sessions` + `field_samples` · `campaigns` |
| **Phân tích & KQ** | `analysis_results` + `analysis_audit_events` |
| **Đảm bảo chất lượng** | `qc_charts` + `qc_points` · `external_qc_rounds` · `risks` + `opportunities` · `decision_rules` |

## Data Access Layer

Mỗi entity có 1 file trong `src/lib/data/`:

```ts
// src/lib/data/customers.ts
export async function getCustomers() {
  if (!isSupabaseConfigured()) {
    return mockCustomers.map(c => ({ ...c, source: 'mock' }));
  }
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('samples_ytd', { ascending: false });
  // ...
}
```

**Pattern**: pages là server components, gọi data loader bằng `await`. Loader tự fallback về mock nếu Supabase chưa cấu hình → dev experience không bị vỡ.

Để convert pages khác, copy pattern này cho:
- `samples` → `src/lib/data/samples.ts`
- `test-requests` → `src/lib/data/test-requests.ts`
- `equipment` → `src/lib/data/equipment.ts`
- ... v.v.

## Row Level Security (RLS)

Migration mặc định **bật RLS** trên tất cả bảng và tạo policy `demo_select_anon` cho phép **SELECT public**. Phù hợp giai đoạn dev / public catalog dịch vụ.

Cho production cần thay bằng policy chi tiết theo role:
```sql
-- Ví dụ: chỉ KTV phụ trách mới sửa được kết quả
create policy "ktv_update_own_results" on analysis_results
  for update to authenticated
  using (technician = (select full_name from staff where email = auth.email()));
```

## Roadmap backend

| Giai đoạn | Mục |
|---|---|
| ✅ P1 | Schema 24 bảng + seed + 1 page (customers) wire DB |
| 🟡 P2 | Convert hết các pages list (samples, equipment, chemicals, …) sang fetch DB |
| 🟡 P2 | API routes `POST/PATCH/DELETE` cho CRUD |
| 🔵 P3 | Supabase Auth + RLS theo role (KTV/QA/Trưởng phòng/Khách) |
| 🔵 P3 | Supabase Storage cho raw file + ảnh |
| 🔵 P4 | Realtime: dashboard cảnh báo live, sync mẫu hiện trường |

## Liên kết tham khảo
- [Supabase JS client](https://supabase.com/docs/reference/javascript)
- [Next.js App Router + Supabase](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
