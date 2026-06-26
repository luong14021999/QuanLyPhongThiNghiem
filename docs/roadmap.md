# Lộ trình triển khai – LIMS Viện Nông Nghiệp Thanh Hóa

> Dựa trên spec "QUẢN LÝ PHÒNG THÍ NGHIỆM" (I. QUẢN LÝ · II. NGHIỆP VỤ · III. THỊ TRƯỜNG) và mục tiêu **ISO/IEC 17025:2017 + tự chủ tài chính**.
>
> **Lưu ý**: ISO/IEC 17025:2005 đã bị thu hồi từ 11/2020 và thay thế bởi ISO/IEC 17025:2017. VILAS (BoA) hiện chỉ công nhận theo 17025:2017. Toàn bộ thiết kế bám theo phiên bản 2017.

## 1. Đối chiếu spec ↔ module hiện có

### I. QUẢN LÝ

| # | Mục spec | Module / Trang | Trạng thái |
|---|---|---|---|
| 1 | Nhân sự | `/personnel` | ✅ Đã có (danh sách + sơ đồ tổ chức + năng lực + đào tạo) |
| 2 | Thiết bị | `/equipment` | ✅ Đã có (danh mục + lịch HC/BT + nhật ký SD + môi trường phòng + biên bản KĐ) |
| 3 | Dụng cụ | `/tools` | ✅ Đã có (danh mục + đặc tính + lịch kiểm định) |
| 4 | Hóa chất – chất chuẩn – VTTH | `/chemicals` | ✅ Đã có (danh mục + hồ sơ + nhật ký sử dụng) |
| 5 | Đảm bảo chất lượng KQ | `/qc` · `/risks` · `/decision-rules` | ✅ Levey-Jennings, Westgard, Đăng ký rủi ro (§8.5), Quy tắc quyết định (§7.8.6) |
| 6 | Kiểm soát tài liệu nội bộ | – | 🟡 P2 – gộp vào "Tài liệu SOP" |
| 7 | Danh mục báo cáo phê duyệt PP | – | 🟡 P2 – gộp vào "Tài liệu SOP" |
| 8 | Hướng dẫn quy trình PT | – | 🟡 P2 – gộp vào "Tài liệu SOP" |
| 9 | Hướng dẫn vận hành thiết bị | – | 🟡 P2 – gộp vào "Tài liệu SOP" |
| 10 | Hướng dẫn kiểm định thiết bị | – | 🟡 P2 – gộp vào "Tài liệu SOP" |
| 11 | Đăng ký thăm quan PTN | – | 🟡 P3 |
| 12 | Phiếu ý kiến KH & khiếu nại | – | 🟡 P3 |

### II. NGHIỆP VỤ

| # | Mục spec | Module / Trang | Trạng thái |
|---|---|---|---|
| 1 | Tiếp nhận mẫu | `/samples` | ✅ |
| 2 | Mã hóa mẫu | `/samples` + `/settings` | ✅ (M-VNNTH-YYYY-NNNNN) |
| 3 | Phân công nhiệm vụ PT | `/analysis` | ✅ |
| 4 | Quy trình PT theo chỉ tiêu | `/analysis` | ✅ |
| 5 | Kiểm soát QA/QC + biểu đồ | `/qc` | 🟢 P2 – đã có biểu đồ Levey-Jennings |
| 6 | Phiếu kết quả | `/reports` | ✅ |
| 7 | Trả kết quả | `/reports` | ✅ (PDF + ký số) |
| – | **Kho mẫu lưu** *(suy từ I.5)* | `/archive` | 🟢 P2 – đã làm |

### III. THỊ TRƯỜNG

| # | Mục spec | Module / Trang | Trạng thái |
|---|---|---|---|
| III.1 | Tư vấn (đất / phân bón / canh tác / dinh dưỡng cây trồng) | – | 🔵 P3 – mini-CRM |
| III.2 | Dịch vụ phân tích (đất, nước, phân bón, BVTV) | – | 🔵 P3 – Catalog + Đặt mẫu online |

### Module phát sinh (đã làm thêm)

- `/customers` — Khách hàng (HTX, doanh nghiệp, nông hộ, cơ quan, viện/trường)
- `/personnel` — Nhân sự PTN

---

## 2. Đề xuất tái cấu trúc sidebar theo ISO/IEC 17025

| Nhóm | Module |
|---|---|
| **Tổng quan** | Bảng điều khiển |
| **Nghiệp vụ** (II) | Tiếp nhận mẫu · Phân tích · Mẫu lưu · Báo cáo KQ |
| **Đảm bảo chất lượng** (I.5 + §7.8.6 + §8.5) | Levey-Jennings · Đăng ký rủi ro · Quy tắc quyết định · TNTC · ILC |
| **Nguồn lực** (I.1–4) | Nhân sự · Thiết bị · Dụng cụ · Hóa chất |
| **Tài liệu QL** (I.6–10) | SOP & Phương pháp · Hướng dẫn kiểm định · Biểu mẫu |
| **Khách hàng & Thị trường** (III + I.11–12) | Khách hàng · Tư vấn · Dịch vụ · Hợp đồng & Báo giá · Khiếu nại · Thăm quan |
| **Tài chính** | Doanh thu · Hóa đơn · Công nợ |
| **Hệ thống** | Phân quyền · Audit log · Cấu hình · Backup |

---

## 3. Lộ trình triển khai

| Giai đoạn | Trọng tâm | Module |
|---|---|---|
| **P1 – MVP** (đã làm) | Vận hành PTN cơ bản | Dashboard · Samples · Analysis · Equipment · Tools · Chemicals · Personnel · Customers · Reports · Settings |
| **P2 – Chất lượng & Pháp lý** (đang làm) | Đáp ứng đánh giá VILAS / ISO/IEC 17025:2017 | ✅ Kho mẫu lưu · ✅ QC Levey-Jennings · ✅ Đăng ký rủi ro (§8.5) · ✅ Quy tắc quyết định (§7.8.6) · 🟡 Tài liệu SOP có versioning · 🟡 Phân quyền + Audit log · 🟡 Khiếu nại KH |
| **P3 – Tự chủ tài chính** | Tạo doanh thu, theo dõi dòng tiền | Bảng giá · Báo giá · Hợp đồng · Hóa đơn · Công nợ · Cổng tra cứu KH no-login · Thăm quan |
| **P4 – Thị trường & Tích hợp** | Mở rộng dịch vụ + tự động hóa | Catalog dịch vụ online · Tư vấn pipeline · Tích hợp instrument (CSV/XML import) · Cảnh báo email/Zalo · Đa ngôn ngữ |

---

## 4. 9 đề xuất cải thiện ngoài spec

1. **RBAC + Audit trail** — bắt buộc cho 17025 §7.5 (ai sửa gì, khi nào, lý do)
2. **Báo giá – Hợp đồng – Hóa đơn – Công nợ** — phục vụ tự chủ tài chính (spec ghi mục tiêu nhưng không có module)
3. **Biểu đồ Levey-Jennings + quy tắc Westgard** — trái tim QA/QC, spec nhắc nhưng không định nghĩa rõ
4. **Kho mẫu lưu** — spec yêu cầu phân tích mẫu lưu 3 tháng/lần nhưng không có module quản lý
5. **Tích hợp instrument (CSV/XML import)** — giảm sai sót nhập tay từ ICP-MS / GC-MS / HPLC
6. **Cảnh báo đa kênh** — email + Zalo OA cho người phụ trách
7. **Cổng tra cứu cho KH (no-login + QR)** — KH tự tra trạng thái mẫu & tải KQ PDF có chữ ký số
8. **Thư viện tài liệu có versioning** — gộp I.6–10 thành 1 module với workflow soạn → kiểm tra → phê duyệt → ban hành + ký nhận đã đọc
9. **Backup + tách env DEV/UAT/PROD** — 17025 §7.11 yêu cầu RPO/RTO

---

## 5. Tiến độ chi tiết

- ✅ P1 hoàn thành (10 trang đang chạy)
- ✅ P2 đã làm: **Mẫu lưu**, **QC Levey-Jennings**, **Đăng ký rủi ro (§8.5)**, **Quy tắc quyết định (§7.8.6)**
- 🟡 P2 còn lại: Tài liệu SOP có versioning, Phân quyền + Audit log, Khiếu nại KH, Xử lý công việc không phù hợp (§7.10), Đánh giá nội bộ (§8.8) + Xem xét lãnh đạo (§8.9)
- 🔵 P3, P4 chờ phê duyệt
