-- 0004: Hồ sơ hóa chất + nhật ký sử dụng hóa chất mở rộng + Vật tư + nhật ký dụng cụ/vật tư
-- Ghi qua service role (bỏ qua RLS); đọc qua anon (cần policy select).

-- 1) chemical_usage_logs: thêm cột theo mẫu nhật ký sử dụng hóa chất
alter table public.chemical_usage_logs
  add column if not exists chemical_name text,
  add column if not exists category text,
  add column if not exists remaining numeric,
  add column if not exists purpose text;

-- 2) Hồ sơ hóa chất, chất chuẩn (CoA / MSDS / chứng nhận)
create table if not exists public.chemical_profiles (
  id             uuid primary key default gen_random_uuid(),
  chemical_code  text,
  chemical_name  text,
  doc_type       text default 'CoA',
  doc_code       text,
  issued_by      text,
  issue_date     date,
  file_url       text,
  note           text,
  created_at     timestamptz default now()
);

-- 3) Vật tư tiêu hao (danh mục riêng)
create table if not exists public.supplies (
  id         uuid primary key default gen_random_uuid(),
  code       text,
  name       text,
  unit       text,
  qty        numeric default 0,
  min_qty    numeric default 0,
  location   text,
  note       text,
  created_at timestamptz default now()
);

-- 4) Nhật ký theo dõi sử dụng dụng cụ, vật tư tiêu hao
create table if not exists public.tool_usage_logs (
  id          uuid primary key default gen_random_uuid(),
  item_name   text,
  qty         numeric default 0,
  unit        text,
  imported_at date,
  status      text,
  used_by     text,
  note        text,
  created_at  timestamptz default now()
);

-- RLS + policy đọc cho anon/authenticated
alter table public.chemical_profiles enable row level security;
alter table public.supplies          enable row level security;
alter table public.tool_usage_logs   enable row level security;

do $$
declare t text;
begin
  foreach t in array array['chemical_profiles', 'supplies', 'tool_usage_logs']
  loop
    execute format(
      'drop policy if exists "demo_select_anon" on public.%I;
       create policy "demo_select_anon" on public.%I for select to anon, authenticated using (true);',
      t, t
    );
  end loop;
end $$;
