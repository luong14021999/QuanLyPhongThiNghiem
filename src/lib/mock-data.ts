export type SampleStatus =
  | "Đã tiếp nhận"
  | "Đang phân tích"
  | "Chờ duyệt"
  | "Hoàn thành"
  | "Đã trả KQ";

export type Sample = {
  id: string;
  code: string;
  customer: string;
  type: string;
  receivedAt: string;
  dueAt: string;
  technician: string;
  status: SampleStatus;
  progress: number;
  criteria: string[];
};

export const samples: Sample[] = [
  {
    id: "1",
    code: "M-VNNTH-2026-00318",
    customer: "HTX Nông nghiệp Đông Sơn",
    type: "Đất canh tác lúa",
    receivedAt: "2026-05-18",
    dueAt: "2026-05-25",
    technician: "Trần Thị Mai",
    status: "Đang phân tích",
    progress: 62,
    criteria: ["pHKCl", "OM%", "N tổng", "P2O5 dt", "K2O dt", "CEC"],
  },
  {
    id: "2",
    code: "M-VNNTH-2026-00319",
    customer: "HTX Nông nghiệp Sông Mã",
    type: "Đất trồng mía",
    receivedAt: "2026-05-18",
    dueAt: "2026-05-24",
    technician: "Lê Văn Hùng",
    status: "Chờ duyệt",
    progress: 95,
    criteria: ["pHKCl", "OC", "N tổng", "P2O5", "K2O"],
  },
  {
    id: "3",
    code: "M-VNNTH-2026-00320",
    customer: "Trang trại Rau an toàn Yên Định",
    type: "Rau cải – Dư lượng BVTV",
    receivedAt: "2026-05-19",
    dueAt: "2026-05-26",
    technician: "Phạm Thu Hà",
    status: "Đang phân tích",
    progress: 35,
    criteria: [
      "Chlorpyrifos",
      "Cypermethrin",
      "Abamectin",
      "Carbendazim",
      "Imidacloprid",
    ],
  },
  {
    id: "4",
    code: "M-VNNTH-2026-00321",
    customer: "Phòng NN&PTNT huyện Thọ Xuân",
    type: "Nước tưới kênh nội đồng",
    receivedAt: "2026-05-19",
    dueAt: "2026-05-22",
    technician: "Nguyễn Quang Anh",
    status: "Đã tiếp nhận",
    progress: 0,
    criteria: ["pH", "EC", "TSS", "Coliform", "As", "Pb", "Cd"],
  },
  {
    id: "5",
    code: "M-VNNTH-2026-00315",
    customer: "Công ty CP Phân bón Tiến Nông",
    type: "Phân bón NPK 16-16-8",
    receivedAt: "2026-05-15",
    dueAt: "2026-05-20",
    technician: "Đỗ Minh Tuấn",
    status: "Hoàn thành",
    progress: 100,
    criteria: ["N tổng", "P2O5 hh", "K2O hh", "Độ ẩm", "Biuret"],
  },
  {
    id: "6",
    code: "M-VNNTH-2026-00310",
    customer: "HTX Cam Vân Du",
    type: "Quả cam – An toàn thực phẩm",
    receivedAt: "2026-05-12",
    dueAt: "2026-05-18",
    technician: "Trần Thị Mai",
    status: "Đã trả KQ",
    progress: 100,
    criteria: ["Dư lượng BVTV (GC-MS)", "Pb", "Cd", "Nitrat"],
  },
];

export type AnalysisTask = {
  id: string;
  sampleCode: string;
  criterion: string;
  method: string;
  technician: string;
  startedAt: string;
  status: "Chưa bắt đầu" | "Đang thực hiện" | "Hoàn thành" | "QA/QC";
  qaqc: "Đạt" | "Chưa duyệt" | "Cần làm lại";
};

export const analysisTasks: AnalysisTask[] = [
  {
    id: "a1",
    sampleCode: "M-VNNTH-2026-00318",
    criterion: "pHKCl",
    method: "TCVN 5979:2007",
    technician: "Trần Thị Mai",
    startedAt: "2026-05-19 08:30",
    status: "Đang thực hiện",
    qaqc: "Chưa duyệt",
  },
  {
    id: "a2",
    sampleCode: "M-VNNTH-2026-00318",
    criterion: "OM% (Walkley-Black)",
    method: "TCVN 8941:2011",
    technician: "Trần Thị Mai",
    startedAt: "2026-05-19 09:00",
    status: "Đang thực hiện",
    qaqc: "Chưa duyệt",
  },
  {
    id: "a3",
    sampleCode: "M-VNNTH-2026-00319",
    criterion: "N tổng (Kjeldahl)",
    method: "TCVN 6498:1999",
    technician: "Lê Văn Hùng",
    startedAt: "2026-05-18 14:15",
    status: "QA/QC",
    qaqc: "Đạt",
  },
  {
    id: "a4",
    sampleCode: "M-VNNTH-2026-00320",
    criterion: "Chlorpyrifos",
    method: "QuEChERS / GC-MS",
    technician: "Phạm Thu Hà",
    startedAt: "2026-05-19 10:20",
    status: "Đang thực hiện",
    qaqc: "Chưa duyệt",
  },
  {
    id: "a5",
    sampleCode: "M-VNNTH-2026-00315",
    criterion: "P2O5 hữu hiệu",
    method: "TCVN 8559:2010",
    technician: "Đỗ Minh Tuấn",
    startedAt: "2026-05-16 09:00",
    status: "Hoàn thành",
    qaqc: "Đạt",
  },
  {
    id: "a6",
    sampleCode: "M-VNNTH-2026-00321",
    criterion: "As (nước tưới)",
    method: "SMEWW 3114B",
    technician: "Nguyễn Quang Anh",
    startedAt: "—",
    status: "Chưa bắt đầu",
    qaqc: "Chưa duyệt",
  },
];

export type Equipment = {
  id: string;
  code: string;
  name: string;
  model: string;
  location: string;
  lastCalibration: string;
  nextCalibration: string;
  status: "Hoạt động" | "Hiệu chuẩn" | "Bảo trì" | "Ngừng";
  usageHours: number;
};

export const equipments: Equipment[] = [
  {
    id: "e1",
    code: "TB-AAS-01",
    name: "Máy quang phổ hấp thụ nguyên tử (AAS)",
    model: "Agilent 240FS",
    location: "P. Hóa lý 1",
    lastCalibration: "2026-02-10",
    nextCalibration: "2026-08-10",
    status: "Hoạt động",
    usageHours: 1240,
  },
  {
    id: "e2",
    code: "TB-ICP-01",
    name: "ICP-MS phân tích kim loại nặng đất – nông sản",
    model: "PerkinElmer NexION 2000",
    location: "P. Đất & Kim loại",
    lastCalibration: "2026-04-02",
    nextCalibration: "2026-06-02",
    status: "Hoạt động",
    usageHours: 860,
  },
  {
    id: "e3",
    code: "TB-HPLC-02",
    name: "HPLC đầu dò UV-VIS",
    model: "Shimadzu LC-2030",
    location: "P. Dư lượng BVTV",
    lastCalibration: "2025-12-20",
    nextCalibration: "2026-06-20",
    status: "Hoạt động",
    usageHours: 2310,
  },
  {
    id: "e4",
    code: "TB-GCMS-01",
    name: "GC-MS phân tích dư lượng thuốc BVTV",
    model: "Agilent 7890B/5977B",
    location: "P. Dư lượng BVTV",
    lastCalibration: "2025-11-15",
    nextCalibration: "2026-05-25",
    status: "Hiệu chuẩn",
    usageHours: 1750,
  },
  {
    id: "e5",
    code: "TB-pH-04",
    name: "Máy đo pH/EC để bàn",
    model: "Hanna HI-5222",
    location: "P. Hóa lý 2",
    lastCalibration: "2026-05-02",
    nextCalibration: "2026-08-02",
    status: "Hoạt động",
    usageHours: 540,
  },
  {
    id: "e6",
    code: "TB-AUTO-01",
    name: "Máy chuẩn độ tự động",
    model: "Metrohm 916 Ti-Touch",
    location: "P. Hóa lý 1",
    lastCalibration: "2026-01-08",
    nextCalibration: "2026-07-08",
    status: "Bảo trì",
    usageHours: 980,
  },
  {
    id: "e7",
    code: "TB-LO-02",
    name: "Tủ sấy đối lưu (sấy mẫu đất, nông sản)",
    model: "Memmert UF160",
    location: "P. Chuẩn bị mẫu",
    lastCalibration: "2026-03-12",
    nextCalibration: "2026-09-12",
    status: "Hoạt động",
    usageHours: 4200,
  },
  {
    id: "e8",
    code: "TB-KJ-01",
    name: "Hệ chưng cất – chuẩn độ Kjeldahl",
    model: "Buchi K-365 / B-324",
    location: "P. Đất & Phân bón",
    lastCalibration: "2026-02-20",
    nextCalibration: "2026-08-20",
    status: "Hoạt động",
    usageHours: 1620,
  },
];

export type ToolCategory =
  | "Dụng cụ thể tích"
  | "Dụng cụ thủy tinh"
  | "Dụng cụ cầm tay"
  | "Vật tư tiêu hao"
  | "Thiết bị nhỏ";

export type Tool = {
  id: string;
  code: string;
  name: string;
  category: ToolCategory;
  spec: string;
  qty: number;
  unit: string;
  minQty: number;
  location: string;
  calibrationRequired: boolean;
  lastCalibration?: string;
  nextCalibration?: string;
  status: "Sẵn sàng" | "Đang dùng" | "Hỏng" | "Chờ kiểm định";
};

export const tools: Tool[] = [
  {
    id: "dc1",
    code: "DC-PIP-001",
    name: "Pipet bán tự động 100–1000 µL",
    category: "Dụng cụ thể tích",
    spec: "Eppendorf Research Plus, độ chính xác ±1.5%",
    qty: 6,
    unit: "cái",
    minQty: 4,
    location: "P. Đất & Phân bón – Tủ DC1",
    calibrationRequired: true,
    lastCalibration: "2026-03-12",
    nextCalibration: "2026-09-12",
    status: "Sẵn sàng",
  },
  {
    id: "dc2",
    code: "DC-PIP-008",
    name: "Pipet 10–100 µL",
    category: "Dụng cụ thể tích",
    spec: "Eppendorf Reference 2, ±0.8%",
    qty: 4,
    unit: "cái",
    minQty: 4,
    location: "P. Dư lượng BVTV – Tủ DC2",
    calibrationRequired: true,
    lastCalibration: "2026-02-20",
    nextCalibration: "2026-08-20",
    status: "Đang dùng",
  },
  {
    id: "dc3",
    code: "DC-BĐM-100",
    name: "Bình định mức 100 mL loại A",
    category: "Dụng cụ thể tích",
    spec: "Schott Duran, hiệu chuẩn 20°C, ±0.10 mL",
    qty: 24,
    unit: "cái",
    minQty: 15,
    location: "Kho dụng cụ thủy tinh – Kệ B",
    calibrationRequired: true,
    lastCalibration: "2025-12-05",
    nextCalibration: "2027-12-05",
    status: "Sẵn sàng",
  },
  {
    id: "dc4",
    code: "DC-BUR-50",
    name: "Buret chuẩn độ 50 mL",
    category: "Dụng cụ thể tích",
    spec: "Schott Duran, loại A, ±0.05 mL",
    qty: 8,
    unit: "cái",
    minQty: 6,
    location: "P. Đất & Phân bón – Kệ chuẩn độ",
    calibrationRequired: true,
    lastCalibration: "2026-01-15",
    nextCalibration: "2028-01-15",
    status: "Chờ kiểm định",
  },
  {
    id: "dc5",
    code: "DC-ON-15",
    name: "Ống nghiệm thủy tinh 15 mL có nắp",
    category: "Dụng cụ thủy tinh",
    spec: "Pyrex, chịu nhiệt 250°C",
    qty: 320,
    unit: "cái",
    minQty: 200,
    location: "Kho dụng cụ thủy tinh – Kệ A",
    calibrationRequired: false,
    status: "Sẵn sàng",
  },
  {
    id: "dc6",
    code: "DC-CL-450",
    name: "Cốc thủy tinh chịu nhiệt 250 mL",
    category: "Dụng cụ thủy tinh",
    spec: "Pyrex, vạch chia",
    qty: 45,
    unit: "cái",
    minQty: 30,
    location: "Kho dụng cụ thủy tinh – Kệ A",
    calibrationRequired: false,
    status: "Sẵn sàng",
  },
  {
    id: "dc7",
    code: "DC-FT-22",
    name: "Phễu lọc Whatman GF/A 47mm",
    category: "Vật tư tiêu hao",
    spec: "Sợi thủy tinh, lỗ 1.6 µm",
    qty: 120,
    unit: "hộp",
    minQty: 50,
    location: "Kho vật tư – Tủ VT1",
    calibrationRequired: false,
    status: "Sẵn sàng",
  },
  {
    id: "dc8",
    code: "DC-VOR-01",
    name: "Máy lắc vortex",
    category: "Thiết bị nhỏ",
    spec: "Velp ZX3, 200–2500 rpm",
    qty: 3,
    unit: "cái",
    minQty: 2,
    location: "P. Dư lượng BVTV",
    calibrationRequired: false,
    status: "Sẵn sàng",
  },
  {
    id: "dc9",
    code: "DC-CC-12",
    name: "Cối – chày sứ ø 120mm",
    category: "Dụng cụ cầm tay",
    spec: "Sứ chịu lực, đồng bộ chày sứ",
    qty: 8,
    unit: "bộ",
    minQty: 5,
    location: "P. Chuẩn bị mẫu",
    calibrationRequired: false,
    status: "Sẵn sàng",
  },
  {
    id: "dc10",
    code: "DC-RAY-200",
    name: "Rây mắt 2.0 mm (chuẩn bị mẫu đất)",
    category: "Dụng cụ cầm tay",
    spec: "Inox 304, ø 200 mm",
    qty: 3,
    unit: "cái",
    minQty: 3,
    location: "P. Chuẩn bị mẫu",
    calibrationRequired: false,
    status: "Đang dùng",
  },
];

export type Chemical = {
  id: string;
  code: string;
  name: string;
  cas: string;
  unit: string;
  stock: number;
  minStock: number;
  expiry: string;
  hazard: "Thường" | "Độc hại" | "Dễ cháy" | "Ăn mòn";
  location: string;
  technicalSpec: string;
  manufacturer: string;
  manufactureDate: string;
  receivedAt: string;
  storageCondition: string;
  usedFor: string[];
  isReference?: boolean;
};

export const chemicals: Chemical[] = [
  {
    id: "c1",
    code: "HC-0123",
    name: "Acid nitric HNO3 65%",
    cas: "7697-37-2",
    unit: "lít",
    stock: 18,
    minStock: 10,
    expiry: "2027-04-30",
    hazard: "Ăn mòn",
    location: "Kho acid – Tủ A1",
    technicalSpec: "Tinh khiết phân tích AR, ≥ 65%",
    manufacturer: "Merck",
    manufactureDate: "2025-04-30",
    receivedAt: "2025-06-12",
    storageCondition: "Tủ chống ăn mòn, thông gió, ≤ 28°C",
    usedFor: ["Phá mẫu KLN", "ICP-MS / AAS"],
  },
  {
    id: "c2",
    code: "HC-0145",
    name: "Acid sulfuric H2SO4 98%",
    cas: "7664-93-9",
    unit: "lít",
    stock: 6,
    minStock: 8,
    expiry: "2027-10-30",
    hazard: "Ăn mòn",
    location: "Kho acid – Tủ A2",
    technicalSpec: "Tinh khiết phân tích AR, ≥ 98%",
    manufacturer: "Xilong",
    manufactureDate: "2025-10-30",
    receivedAt: "2025-12-05",
    storageCondition: "Tủ chống ăn mòn, tách riêng acid – base",
    usedFor: ["Kjeldahl – đạm tổng", "Phá mẫu phân bón"],
  },
  {
    id: "c3",
    code: "HC-0210",
    name: "Methanol HPLC",
    cas: "67-56-1",
    unit: "lít",
    stock: 22,
    minStock: 12,
    expiry: "2027-01-15",
    hazard: "Dễ cháy",
    location: "Kho dung môi – Tủ S1",
    technicalSpec: "HPLC grade, ≥ 99.9%",
    manufacturer: "Honeywell",
    manufactureDate: "2025-01-15",
    receivedAt: "2025-03-02",
    storageCondition: "Tủ chống cháy, tránh nguồn nhiệt, ≤ 25°C",
    usedFor: ["HPLC dư lượng BVTV", "QuEChERS"],
  },
  {
    id: "c4",
    code: "HC-0308",
    name: "Dung dịch chuẩn As 1000 ppm",
    cas: "—",
    unit: "ml",
    stock: 250,
    minStock: 200,
    expiry: "2026-09-01",
    hazard: "Độc hại",
    location: "Tủ chuẩn – Ngăn 3",
    technicalSpec: "Chuẩn quốc gia, độ không đảm bảo ±0.5%",
    manufacturer: "Merck CertiPUR",
    manufactureDate: "2024-09-01",
    receivedAt: "2024-10-15",
    storageCondition: "Tủ chuẩn 2 – 8°C, tránh ánh sáng",
    usedFor: ["AAS – As", "ICP-MS – KLN đất, nông sản"],
    isReference: true,
  },
  {
    id: "c8",
    code: "HC-0703",
    name: "Hỗn hợp chuẩn BVTV (Chlorpyrifos, Cypermethrin...)",
    cas: "—",
    unit: "ml",
    stock: 35,
    minStock: 50,
    expiry: "2026-07-30",
    hazard: "Độc hại",
    location: "Tủ chuẩn lạnh – Ngăn 1",
    technicalSpec: "Hỗn hợp 20 BVTV, 100 µg/mL, trong acetonitril",
    manufacturer: "Sigma Aldrich",
    manufactureDate: "2024-07-30",
    receivedAt: "2024-09-10",
    storageCondition: "Tủ lạnh ≤ -18°C, kín khí",
    usedFor: ["GC-MS dư lượng BVTV", "QuEChERS rau quả"],
    isReference: true,
  },
  {
    id: "c9",
    code: "HC-0801",
    name: "Dung dịch đệm KCl 1M",
    cas: "7447-40-7",
    unit: "lít",
    stock: 12,
    minStock: 5,
    expiry: "2027-02-28",
    hazard: "Thường",
    location: "Tủ chuẩn – Ngăn 4",
    technicalSpec: "Pha sẵn 1M, độ tinh khiết ≥ 99%",
    manufacturer: "Pha nội bộ – PTN VNNTH",
    manufactureDate: "2026-02-28",
    receivedAt: "2026-02-28",
    storageCondition: "Nhiệt độ phòng, đậy kín",
    usedFor: ["Đo pHKCl đất", "Chuẩn bị mẫu OM"],
  },
  {
    id: "c5",
    code: "HC-0412",
    name: "Kali dichromate K2Cr2O7",
    cas: "7778-50-9",
    unit: "kg",
    stock: 0.3,
    minStock: 0.5,
    expiry: "2026-08-30",
    hazard: "Độc hại",
    location: "Tủ rắn – Ngăn 2",
    technicalSpec: "AR, tinh khiết ≥ 99.5%",
    manufacturer: "Xilong",
    manufactureDate: "2024-08-30",
    receivedAt: "2024-11-05",
    storageCondition: "Tủ khô, tránh ánh sáng, riêng biệt chất oxy hóa",
    usedFor: ["OM% – Walkley-Black", "Phân tích chất hữu cơ đất"],
  },
  {
    id: "c6",
    code: "HC-0501",
    name: "Đệm pH 4.01",
    cas: "—",
    unit: "lít",
    stock: 4,
    minStock: 2,
    expiry: "2026-06-30",
    hazard: "Thường",
    location: "Tủ chuẩn – Ngăn 1",
    technicalSpec: "Dung dịch đệm chuẩn pH 4.01 ± 0.02 ở 25°C",
    manufacturer: "Hanna Instruments",
    manufactureDate: "2024-06-30",
    receivedAt: "2024-08-12",
    storageCondition: "Nhiệt độ phòng, đậy kín sau khi dùng",
    usedFor: ["Hiệu chuẩn máy đo pH"],
    isReference: true,
  },
  {
    id: "c7",
    code: "HC-0612",
    name: "Acetonitril HPLC",
    cas: "75-05-8",
    unit: "lít",
    stock: 9,
    minStock: 6,
    expiry: "2027-03-10",
    hazard: "Dễ cháy",
    location: "Kho dung môi – Tủ S2",
    technicalSpec: "HPLC grade, ≥ 99.9%, lọc 0.2 µm",
    manufacturer: "Honeywell",
    manufactureDate: "2025-03-10",
    receivedAt: "2025-05-01",
    storageCondition: "Tủ chống cháy, tránh nguồn nhiệt",
    usedFor: ["HPLC – BVTV", "QuEChERS – chiết rau quả"],
  },
];

export type ChemicalUsageLog = {
  id: string;
  chemicalCode: string;
  chemicalName: string;
  qty: number;
  unit: string;
  sampleCode: string;
  method: string;
  technician: string;
  usedAt: string;
};

export const chemicalUsageLogs: ChemicalUsageLog[] = [
  {
    id: "uc1",
    chemicalCode: "HC-0123",
    chemicalName: "Acid nitric HNO3 65%",
    qty: 0.5,
    unit: "lít",
    sampleCode: "M-VNNTH-2026-00321",
    method: "Phá mẫu KLN – nước tưới",
    technician: "Nguyễn Quang Anh",
    usedAt: "2026-05-19 14:10",
  },
  {
    id: "uc2",
    chemicalCode: "HC-0703",
    chemicalName: "Hỗn hợp chuẩn BVTV",
    qty: 5,
    unit: "ml",
    sampleCode: "M-VNNTH-2026-00320",
    method: "QuEChERS – rau cải",
    technician: "Phạm Thu Hà",
    usedAt: "2026-05-19 10:40",
  },
  {
    id: "uc3",
    chemicalCode: "HC-0801",
    chemicalName: "Dung dịch đệm KCl 1M",
    qty: 0.25,
    unit: "lít",
    sampleCode: "M-VNNTH-2026-00318",
    method: "Đo pHKCl đất ruộng lúa",
    technician: "Trần Thị Mai",
    usedAt: "2026-05-19 08:30",
  },
  {
    id: "uc4",
    chemicalCode: "HC-0412",
    chemicalName: "Kali dichromate K2Cr2O7",
    qty: 0.05,
    unit: "kg",
    sampleCode: "M-VNNTH-2026-00318",
    method: "OM% – Walkley-Black",
    technician: "Trần Thị Mai",
    usedAt: "2026-05-19 09:15",
  },
  {
    id: "uc5",
    chemicalCode: "HC-0145",
    chemicalName: "Acid sulfuric H2SO4 98%",
    qty: 0.3,
    unit: "lít",
    sampleCode: "M-VNNTH-2026-00319",
    method: "Kjeldahl – đạm tổng",
    technician: "Lê Văn Hùng",
    usedAt: "2026-05-18 14:15",
  },
  {
    id: "uc6",
    chemicalCode: "HC-0308",
    chemicalName: "Dung dịch chuẩn As 1000 ppm",
    qty: 25,
    unit: "ml",
    sampleCode: "M-VNNTH-2026-00321",
    method: "AAS – chuẩn nội bộ",
    technician: "Nguyễn Quang Anh",
    usedAt: "2026-05-18 16:20",
  },
];

export type CustomerKind =
  | "Doanh nghiệp"
  | "HTX / Trang trại"
  | "Nông hộ"
  | "Cơ quan nhà nước"
  | "Viện / Trường";

export type Customer = {
  id: string;
  code: string;
  name: string;
  kind: CustomerKind;
  contact: string;
  phone: string;
  address: string;
  samplesYTD: number;
  lastSampleAt: string;
};

export const customers: Customer[] = [
  {
    id: "kh1",
    code: "KH-VNNTH-0124",
    name: "HTX Nông nghiệp Sông Mã",
    kind: "HTX / Trang trại",
    contact: "Ông Lê Văn Hợp",
    phone: "0912 345 678",
    address: "Xã Cẩm Thành, huyện Cẩm Thủy, Thanh Hóa",
    samplesYTD: 28,
    lastSampleAt: "2026-05-18",
  },
  {
    id: "kh2",
    code: "KH-VNNTH-0118",
    name: "Công ty CP Phân bón Tiến Nông",
    kind: "Doanh nghiệp",
    contact: "Bà Nguyễn Thị Lan",
    phone: "0918 226 145",
    address: "Khu CN Đình Hương – Tây Bắc Ga, TP Thanh Hóa",
    samplesYTD: 64,
    lastSampleAt: "2026-05-15",
  },
  {
    id: "kh3",
    code: "KH-VNNTH-0211",
    name: "HTX Cam Vân Du",
    kind: "HTX / Trang trại",
    contact: "Ông Trịnh Văn Sơn",
    phone: "0905 778 412",
    address: "Thị trấn Vân Du, huyện Thạch Thành, Thanh Hóa",
    samplesYTD: 17,
    lastSampleAt: "2026-05-12",
  },
  {
    id: "kh4",
    code: "KH-VNNTH-0156",
    name: "Phòng NN&PTNT huyện Thọ Xuân",
    kind: "Cơ quan nhà nước",
    contact: "Ông Hoàng Minh Đức",
    phone: "0237 3 833 220",
    address: "TT Thọ Xuân, huyện Thọ Xuân, Thanh Hóa",
    samplesYTD: 41,
    lastSampleAt: "2026-05-19",
  },
  {
    id: "kh5",
    code: "KH-VNNTH-0298",
    name: "Trang trại Rau an toàn Yên Định",
    kind: "HTX / Trang trại",
    contact: "Bà Phạm Thị Hằng",
    phone: "0987 654 321",
    address: "Xã Định Tường, huyện Yên Định, Thanh Hóa",
    samplesYTD: 22,
    lastSampleAt: "2026-05-19",
  },
  {
    id: "kh6",
    code: "KH-VNNTH-0312",
    name: "Hộ ông Lê Bá Khánh",
    kind: "Nông hộ",
    contact: "Ông Lê Bá Khánh",
    phone: "0944 112 233",
    address: "Xã Hà Long, huyện Hà Trung, Thanh Hóa",
    samplesYTD: 4,
    lastSampleAt: "2026-04-28",
  },
  {
    id: "kh7",
    code: "KH-VNNTH-0335",
    name: "Trường Đại học Hồng Đức",
    kind: "Viện / Trường",
    contact: "TS. Nguyễn Quốc Tuấn",
    phone: "0237 3 910 222",
    address: "565 Quang Trung, TP Thanh Hóa",
    samplesYTD: 9,
    lastSampleAt: "2026-04-15",
  },
];

export type Staff = {
  id: string;
  code: string;
  fullName: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  joinedAt: string;
  competencies: string[];
  trainings: { name: string; year: number }[];
  status: "Đang làm việc" | "Nghỉ phép" | "Thử việc";
};

export const staff: Staff[] = [
  {
    id: "ns1",
    code: "NV-VNNTH-0012",
    fullName: "Nguyễn Đình Lương",
    position: "Trưởng phòng PTN",
    department: "Ban Giám đốc PTN",
    email: "luongnd@vnnth.gov.vn",
    phone: "0912 800 121",
    joinedAt: "2014-03-01",
    competencies: ["Quản lý ISO/IEC 17025", "Phân tích kim loại nặng", "Phê duyệt KQ"],
    trainings: [
      { name: "ISO/IEC 17025:2017 – ĐLVN", year: 2024 },
      { name: "Đánh giá nội bộ PTN", year: 2025 },
    ],
    status: "Đang làm việc",
  },
  {
    id: "ns2",
    code: "NV-VNNTH-0034",
    fullName: "Trần Thị Mai",
    position: "Phó phòng – Phụ trách QA/QC",
    department: "Nhóm Đảm bảo chất lượng",
    email: "maitt@vnnth.gov.vn",
    phone: "0987 211 504",
    joinedAt: "2016-09-15",
    competencies: ["QA/QC", "Hóa lý", "Đánh giá độ không đảm bảo đo"],
    trainings: [
      { name: "Ước lượng độ không đảm bảo đo", year: 2024 },
      { name: "Kiểm soát mẫu chuẩn nội bộ", year: 2025 },
    ],
    status: "Đang làm việc",
  },
  {
    id: "ns3",
    code: "NV-VNNTH-0067",
    fullName: "Lê Văn Hùng",
    position: "Kỹ thuật viên chính",
    department: "Nhóm Đất & Phân bón",
    email: "hunglv@vnnth.gov.vn",
    phone: "0973 442 119",
    joinedAt: "2018-04-10",
    competencies: ["Phân tích đất", "Phân tích phân bón", "Kjeldahl", "AAS"],
    trainings: [
      { name: "Phương pháp phân tích đất theo TCVN", year: 2023 },
      { name: "AAS – kim loại nặng trong đất", year: 2024 },
    ],
    status: "Đang làm việc",
  },
  {
    id: "ns4",
    code: "NV-VNNTH-0082",
    fullName: "Phạm Thu Hà",
    position: "Kỹ thuật viên",
    department: "Nhóm Dư lượng BVTV & ATTP",
    email: "haptt@vnnth.gov.vn",
    phone: "0908 776 540",
    joinedAt: "2020-06-22",
    competencies: ["GC-MS", "HPLC", "QuEChERS"],
    trainings: [
      { name: "QuEChERS – chiết tách dư lượng BVTV", year: 2024 },
      { name: "Vận hành GC-MS Agilent", year: 2025 },
    ],
    status: "Đang làm việc",
  },
  {
    id: "ns5",
    code: "NV-VNNTH-0094",
    fullName: "Nguyễn Quang Anh",
    position: "Kỹ thuật viên",
    department: "Nhóm Nước & Môi trường",
    email: "anhnq@vnnth.gov.vn",
    phone: "0916 330 887",
    joinedAt: "2021-11-08",
    competencies: ["ICP-MS", "Phân tích nước", "SMEWW"],
    trainings: [
      { name: "ICP-MS – kim loại trong nước tưới", year: 2024 },
    ],
    status: "Nghỉ phép",
  },
  {
    id: "ns6",
    code: "NV-VNNTH-0103",
    fullName: "Đỗ Minh Tuấn",
    position: "Kỹ thuật viên",
    department: "Nhóm Đất & Phân bón",
    email: "tuandm@vnnth.gov.vn",
    phone: "0939 218 661",
    joinedAt: "2022-02-14",
    competencies: ["Phân tích phân bón", "P2O5 hữu hiệu", "Chuẩn độ"],
    trainings: [{ name: "Phân tích phân bón TCVN 8559:2010", year: 2024 }],
    status: "Đang làm việc",
  },
  {
    id: "ns7",
    code: "NV-VNNTH-0118",
    fullName: "Hoàng Thị Linh",
    position: "Nhân viên tiếp nhận mẫu",
    department: "Văn phòng PTN",
    email: "linhht@vnnth.gov.vn",
    phone: "0934 552 109",
    joinedAt: "2025-09-01",
    competencies: ["Tiếp nhận mẫu", "Lập phiếu", "QR mã hóa"],
    trainings: [{ name: "Quản lý hồ sơ mẫu ISO/IEC 17025", year: 2025 }],
    status: "Thử việc",
  },
];

export type EquipmentUsageLog = {
  id: string;
  equipmentCode: string;
  equipmentName: string;
  technician: string;
  sampleCode: string;
  startedAt: string;
  durationMin: number;
};

export const equipmentUsageLogs: EquipmentUsageLog[] = [
  {
    id: "u1",
    equipmentCode: "TB-ICP-01",
    equipmentName: "ICP-MS",
    technician: "Nguyễn Quang Anh",
    sampleCode: "M-VNNTH-2026-00321",
    startedAt: "2026-05-19 14:20",
    durationMin: 95,
  },
  {
    id: "u2",
    equipmentCode: "TB-GCMS-01",
    equipmentName: "GC-MS dư lượng BVTV",
    technician: "Phạm Thu Hà",
    sampleCode: "M-VNNTH-2026-00320",
    startedAt: "2026-05-19 10:40",
    durationMin: 140,
  },
  {
    id: "u3",
    equipmentCode: "TB-KJ-01",
    equipmentName: "Hệ Kjeldahl",
    technician: "Lê Văn Hùng",
    sampleCode: "M-VNNTH-2026-00319",
    startedAt: "2026-05-19 08:55",
    durationMin: 75,
  },
  {
    id: "u4",
    equipmentCode: "TB-AAS-01",
    equipmentName: "AAS",
    technician: "Đỗ Minh Tuấn",
    sampleCode: "M-VNNTH-2026-00315",
    startedAt: "2026-05-18 15:10",
    durationMin: 60,
  },
  {
    id: "u5",
    equipmentCode: "TB-pH-04",
    equipmentName: "pH/EC để bàn",
    technician: "Trần Thị Mai",
    sampleCode: "M-VNNTH-2026-00318",
    startedAt: "2026-05-18 09:00",
    durationMin: 25,
  },
];

export type MaintenanceEntry = {
  id: string;
  equipmentCode: string;
  equipmentName: string;
  scheduledAt: string;
  kind: "Bảo trì định kỳ" | "Hiệu chuẩn" | "Sửa chữa";
  vendor: string;
};

export type EnvironmentReading = {
  id: string;
  room: string;
  parameter: "Nhiệt độ" | "Độ ẩm";
  value: number;
  unit: string;
  limit: string;
  recordedAt: string;
  observer: string;
  pass: boolean;
};

export const environmentReadings: EnvironmentReading[] = [
  {
    id: "ev1",
    room: "P. Đất & Phân bón",
    parameter: "Nhiệt độ",
    value: 24.5,
    unit: "°C",
    limit: "20 – 25 °C",
    recordedAt: "2026-05-20 08:00",
    observer: "Lê Văn Hùng",
    pass: true,
  },
  {
    id: "ev2",
    room: "P. Đất & Phân bón",
    parameter: "Độ ẩm",
    value: 58,
    unit: "%RH",
    limit: "≤ 65 %RH",
    recordedAt: "2026-05-20 08:00",
    observer: "Lê Văn Hùng",
    pass: true,
  },
  {
    id: "ev3",
    room: "P. Dư lượng BVTV",
    parameter: "Nhiệt độ",
    value: 22.8,
    unit: "°C",
    limit: "20 – 24 °C",
    recordedAt: "2026-05-20 08:05",
    observer: "Phạm Thu Hà",
    pass: true,
  },
  {
    id: "ev4",
    room: "P. Dư lượng BVTV",
    parameter: "Độ ẩm",
    value: 67,
    unit: "%RH",
    limit: "≤ 60 %RH",
    recordedAt: "2026-05-20 08:05",
    observer: "Phạm Thu Hà",
    pass: false,
  },
  {
    id: "ev5",
    room: "Kho hóa chất",
    parameter: "Nhiệt độ",
    value: 26.0,
    unit: "°C",
    limit: "≤ 28 °C",
    recordedAt: "2026-05-20 08:10",
    observer: "Hoàng Thị Linh",
    pass: true,
  },
  {
    id: "ev6",
    room: "Tủ chuẩn lạnh",
    parameter: "Nhiệt độ",
    value: 3.4,
    unit: "°C",
    limit: "2 – 8 °C",
    recordedAt: "2026-05-20 08:12",
    observer: "Phạm Thu Hà",
    pass: true,
  },
];

export const maintenanceSchedule: MaintenanceEntry[] = [
  {
    id: "m1",
    equipmentCode: "TB-GCMS-01",
    equipmentName: "GC-MS dư lượng BVTV",
    scheduledAt: "2026-05-25",
    kind: "Hiệu chuẩn",
    vendor: "Agilent VN",
  },
  {
    id: "m2",
    equipmentCode: "TB-ICP-01",
    equipmentName: "ICP-MS",
    scheduledAt: "2026-06-02",
    kind: "Hiệu chuẩn",
    vendor: "PerkinElmer VN",
  },
  {
    id: "m3",
    equipmentCode: "TB-AUTO-01",
    equipmentName: "Máy chuẩn độ tự động",
    scheduledAt: "2026-06-10",
    kind: "Bảo trì định kỳ",
    vendor: "Metrohm – đại lý KV2",
  },
  {
    id: "m4",
    equipmentCode: "TB-HPLC-02",
    equipmentName: "HPLC UV-VIS",
    scheduledAt: "2026-06-20",
    kind: "Hiệu chuẩn",
    vendor: "Shimadzu VN",
  },
  {
    id: "m5",
    equipmentCode: "TB-KJ-01",
    equipmentName: "Hệ Kjeldahl",
    scheduledAt: "2026-08-20",
    kind: "Bảo trì định kỳ",
    vendor: "Buchi VN",
  },
];

export type ArchivedSample = {
  id: string;
  archiveCode: string;
  originalSampleCode: string;
  customer: string;
  type: string;
  archivedAt: string;
  expiryAt: string;
  location: string;
  storageCondition: string;
  amount: string;
  status: "Đang lưu" | "Đã phân tích QC" | "Đã hủy";
  qcAnalysisAt?: string;
  qcNote?: string;
  purpose: string;
};

export const archivedSamples: ArchivedSample[] = [
  {
    id: "ml1",
    archiveCode: "ML-VNNTH-2026-001",
    originalSampleCode: "M-VNNTH-2026-00310",
    customer: "HTX Cam Vân Du",
    type: "Quả cam – An toàn thực phẩm",
    archivedAt: "2026-05-18",
    expiryAt: "2026-08-18",
    location: "Tủ đông -20°C – Ngăn C2",
    storageCondition: "Đông sâu -20°C, kín khí, gói foil",
    amount: "≈ 200 g",
    status: "Đang lưu",
    purpose: "Phân tích đối chứng QC nội bộ 3 tháng",
  },
  {
    id: "ml2",
    archiveCode: "ML-VNNTH-2026-002",
    originalSampleCode: "M-VNNTH-2026-00315",
    customer: "Công ty CP Phân bón Tiến Nông",
    type: "Phân bón NPK 16-16-8",
    archivedAt: "2026-05-20",
    expiryAt: "2026-11-20",
    location: "Kho mẫu khô – Kệ M3",
    storageCondition: "Nhiệt độ phòng, hộp kín, hút ẩm",
    amount: "≈ 500 g",
    status: "Đang lưu",
    purpose: "Mẫu đối chứng phân bón – tái lặp 3 tháng",
  },
  {
    id: "ml3",
    archiveCode: "ML-VNNTH-2026-003",
    originalSampleCode: "M-VNNTH-2026-00319",
    customer: "HTX Nông nghiệp Sông Mã",
    type: "Đất trồng mía",
    archivedAt: "2026-05-19",
    expiryAt: "2027-05-19",
    location: "Kho mẫu khô – Kệ M1",
    storageCondition: "Nhiệt độ phòng, túi PE kín",
    amount: "≈ 800 g",
    status: "Đang lưu",
    purpose: "Lưu đối chiếu đất – tái lặp định kỳ",
  },
  {
    id: "ml4",
    archiveCode: "ML-VNNTH-2026-004",
    originalSampleCode: "M-VNNTH-2026-00320",
    customer: "Trang trại Rau an toàn Yên Định",
    type: "Rau cải – Dư lượng BVTV",
    archivedAt: "2026-05-22",
    expiryAt: "2026-06-22",
    location: "Tủ đông -20°C – Ngăn C1",
    storageCondition: "Đông sâu -20°C, kín khí",
    amount: "≈ 150 g",
    status: "Đang lưu",
    purpose: "Mẫu lưu rau quả – hạn ngắn (1 tháng)",
  },
  {
    id: "ml5",
    archiveCode: "ML-VNNTH-2026-005",
    originalSampleCode: "M-VNNTH-2026-00321",
    customer: "Phòng NN&PTNT huyện Thọ Xuân",
    type: "Nước tưới kênh nội đồng",
    archivedAt: "2026-05-21",
    expiryAt: "2026-06-21",
    location: "Tủ lạnh 4°C – Ngăn B3",
    storageCondition: "Bảo quản 2 – 8°C, axit hóa pH<2",
    amount: "≈ 500 ml",
    status: "Đang lưu",
    purpose: "Mẫu lưu nước – đối chứng KLN",
  },
  {
    id: "ml6",
    archiveCode: "ML-VNNTH-2026-006",
    originalSampleCode: "M-VNNTH-2026-00280",
    customer: "HTX Nông nghiệp Đông Sơn",
    type: "Đất canh tác lúa",
    archivedAt: "2026-02-15",
    expiryAt: "2027-02-15",
    location: "Kho mẫu khô – Kệ M1",
    storageCondition: "Nhiệt độ phòng, túi PE kín",
    amount: "≈ 800 g",
    status: "Đã phân tích QC",
    qcAnalysisAt: "2026-05-15",
    qcNote: "Tái lặp pHKCl & OM% – sai số < 5%, ĐẠT",
    purpose: "Tái lặp 3 tháng – mẫu đối chứng đất",
  },
  {
    id: "ml7",
    archiveCode: "ML-VNNTH-2025-098",
    originalSampleCode: "M-VNNTH-2025-00910",
    customer: "Công ty TNHH Mía đường Lam Sơn",
    type: "Đất trồng mía – đối chứng",
    archivedAt: "2025-11-02",
    expiryAt: "2026-05-02",
    location: "Kho mẫu khô – Kệ M2",
    storageCondition: "Nhiệt độ phòng",
    amount: "≈ 0 g",
    status: "Đã hủy",
    qcAnalysisAt: "2026-05-05",
    qcNote: "Đã hủy theo BB-HM-2026-003, hết hạn lưu",
    purpose: "Mẫu lưu định kỳ – đã hết hạn",
  },
];

export type QCPoint = {
  date: string;
  value: number;
  technician: string;
};

export type WestgardRule = "1-3s" | "2-2s" | "R-4s" | "4-1s" | "10x";

export type QCChart = {
  id: string;
  criterion: string;
  matrix: string;
  method: string;
  unit: string;
  mean: number;
  sd: number;
  referenceMaterial: string;
  points: QCPoint[];
};

export const qcCharts: QCChart[] = [
  {
    id: "qc1",
    criterion: "Pb tổng",
    matrix: "Đất",
    method: "AAS – TCVN 6649:2000",
    unit: "mg/kg",
    mean: 15.2,
    sd: 1.1,
    referenceMaterial: "CRM NIST 2710a – pha loãng x10",
    points: [
      { date: "2025-04-08", value: 14.8, technician: "Nguyễn Quang Anh" },
      { date: "2025-05-06", value: 15.4, technician: "Nguyễn Quang Anh" },
      { date: "2025-06-10", value: 15.1, technician: "Đỗ Minh Tuấn" },
      { date: "2025-07-08", value: 14.9, technician: "Nguyễn Quang Anh" },
      { date: "2025-08-05", value: 15.6, technician: "Lê Văn Hùng" },
      { date: "2025-09-09", value: 14.7, technician: "Nguyễn Quang Anh" },
      { date: "2025-10-07", value: 15.3, technician: "Đỗ Minh Tuấn" },
      { date: "2025-11-04", value: 15.0, technician: "Nguyễn Quang Anh" },
      { date: "2025-12-02", value: 17.5, technician: "Đỗ Minh Tuấn" },
      { date: "2026-01-06", value: 17.6, technician: "Nguyễn Quang Anh" },
      { date: "2026-02-03", value: 15.2, technician: "Lê Văn Hùng" },
      { date: "2026-03-10", value: 14.8, technician: "Đỗ Minh Tuấn" },
      { date: "2026-04-07", value: 15.5, technician: "Nguyễn Quang Anh" },
      { date: "2026-05-05", value: 14.9, technician: "Đỗ Minh Tuấn" },
      { date: "2026-06-02", value: 18.7, technician: "Nguyễn Quang Anh" },
    ],
  },
  {
    id: "qc2",
    criterion: "Cd tổng",
    matrix: "Nông sản (rau quả)",
    method: "ICP-MS – TCVN 7929:2008",
    unit: "mg/kg",
    mean: 0.08,
    sd: 0.012,
    referenceMaterial: "CRM ERM-CD281 (cải bó xôi)",
    points: [
      { date: "2025-05-12", value: 0.078, technician: "Phạm Thu Hà" },
      { date: "2025-06-09", value: 0.082, technician: "Nguyễn Quang Anh" },
      { date: "2025-07-14", value: 0.075, technician: "Phạm Thu Hà" },
      { date: "2025-08-11", value: 0.085, technician: "Phạm Thu Hà" },
      { date: "2025-09-08", value: 0.079, technician: "Nguyễn Quang Anh" },
      { date: "2025-10-13", value: 0.083, technician: "Phạm Thu Hà" },
      { date: "2025-11-10", value: 0.077, technician: "Phạm Thu Hà" },
      { date: "2025-12-08", value: 0.081, technician: "Nguyễn Quang Anh" },
      { date: "2026-01-12", value: 0.084, technician: "Phạm Thu Hà" },
      { date: "2026-02-09", value: 0.076, technician: "Phạm Thu Hà" },
      { date: "2026-03-09", value: 0.082, technician: "Nguyễn Quang Anh" },
      { date: "2026-04-13", value: 0.080, technician: "Phạm Thu Hà" },
      { date: "2026-05-11", value: 0.079, technician: "Phạm Thu Hà" },
      { date: "2026-06-08", value: 0.083, technician: "Nguyễn Quang Anh" },
    ],
  },
  {
    id: "qc3",
    criterion: "P₂O₅ hữu hiệu",
    matrix: "Phân bón NPK",
    method: "Quang phổ Mo-vanadat – TCVN 8559:2010",
    unit: "%",
    mean: 8.4,
    sd: 0.32,
    referenceMaterial: "Mẫu chuẩn nội bộ – pha lặp",
    points: [
      { date: "2025-06-03", value: 8.3, technician: "Đỗ Minh Tuấn" },
      { date: "2025-07-01", value: 8.5, technician: "Đỗ Minh Tuấn" },
      { date: "2025-08-05", value: 8.2, technician: "Lê Văn Hùng" },
      { date: "2025-09-02", value: 8.6, technician: "Đỗ Minh Tuấn" },
      { date: "2025-10-07", value: 8.4, technician: "Đỗ Minh Tuấn" },
      { date: "2025-11-04", value: 8.5, technician: "Lê Văn Hùng" },
      { date: "2025-12-02", value: 8.3, technician: "Đỗ Minh Tuấn" },
      { date: "2026-01-06", value: 8.7, technician: "Đỗ Minh Tuấn" },
      { date: "2026-02-03", value: 8.4, technician: "Lê Văn Hùng" },
      { date: "2026-03-03", value: 8.2, technician: "Đỗ Minh Tuấn" },
      { date: "2026-04-07", value: 9.5, technician: "Đỗ Minh Tuấn" },
      { date: "2026-05-05", value: 8.5, technician: "Lê Văn Hùng" },
      { date: "2026-06-02", value: 8.3, technician: "Đỗ Minh Tuấn" },
    ],
  },
  {
    id: "qc4",
    criterion: "pHKCl",
    matrix: "Đất canh tác",
    method: "Điện cực thủy tinh – TCVN 5979:2007",
    unit: "đơn vị pH",
    mean: 5.2,
    sd: 0.18,
    referenceMaterial: "Mẫu chuẩn nội bộ đất Hà Trung",
    points: [
      { date: "2025-06-10", value: 5.18, technician: "Lê Văn Hùng" },
      { date: "2025-07-08", value: 5.22, technician: "Trần Thị Mai" },
      { date: "2025-08-05", value: 5.15, technician: "Lê Văn Hùng" },
      { date: "2025-09-09", value: 5.24, technician: "Lê Văn Hùng" },
      { date: "2025-10-07", value: 5.19, technician: "Trần Thị Mai" },
      { date: "2025-11-04", value: 5.26, technician: "Lê Văn Hùng" },
      { date: "2025-12-02", value: 5.20, technician: "Lê Văn Hùng" },
      { date: "2026-01-06", value: 5.23, technician: "Trần Thị Mai" },
      { date: "2026-02-03", value: 5.17, technician: "Lê Văn Hùng" },
      { date: "2026-03-10", value: 5.25, technician: "Lê Văn Hùng" },
      { date: "2026-04-07", value: 5.21, technician: "Trần Thị Mai" },
      { date: "2026-05-05", value: 5.19, technician: "Lê Văn Hùng" },
      { date: "2026-06-02", value: 5.23, technician: "Lê Văn Hùng" },
    ],
  },
];

export type ExternalQCRound = {
  id: string;
  type: "Thử nghiệm thành thạo" | "So sánh liên phòng";
  provider: string;
  round: string;
  criterion: string;
  z: number;
  verdict: "Đạt" | "Cảnh báo" | "Không đạt";
  closedAt: string;
};

export const externalQCRounds: ExternalQCRound[] = [
  {
    id: "ext1",
    type: "Thử nghiệm thành thạo",
    provider: "VinaCert PT (Việt Nam)",
    round: "PT-EARTH-2026-01",
    criterion: "Pb, Cd, As trong đất",
    z: 0.7,
    verdict: "Đạt",
    closedAt: "2026-03-28",
  },
  {
    id: "ext2",
    type: "Thử nghiệm thành thạo",
    provider: "FAPAS (UK)",
    round: "FAPAS-PESTI-2025-04",
    criterion: "Dư lượng BVTV trong rau quả",
    z: 1.4,
    verdict: "Đạt",
    closedAt: "2025-11-12",
  },
  {
    id: "ext3",
    type: "So sánh liên phòng",
    provider: "Mạng PTN Bộ NN&PTNT",
    round: "ILC-FERT-2025-02",
    criterion: "P₂O₅ hữu hiệu trong phân bón",
    z: 2.3,
    verdict: "Cảnh báo",
    closedAt: "2025-08-30",
  },
  {
    id: "ext4",
    type: "Thử nghiệm thành thạo",
    provider: "VinaCert PT (Việt Nam)",
    round: "PT-WATER-2025-03",
    criterion: "Kim loại nặng trong nước",
    z: 0.4,
    verdict: "Đạt",
    closedAt: "2025-09-20",
  },
];

export type RiskCategory =
  | "Khách quan"
  | "Năng lực nhân sự"
  | "Thiết bị"
  | "Phương pháp"
  | "Cơ sở vật chất"
  | "Dữ liệu & An ninh"
  | "Cung ứng"
  | "Khách hàng & Bên ngoài"
  | "Quá trình";

export type RiskTreatment =
  | "Né tránh"
  | "Giảm thiểu"
  | "Chuyển giao"
  | "Chấp nhận";

export type RiskStatus =
  | "Mở"
  | "Đang xử lý"
  | "Đã giảm thiểu"
  | "Đã đóng";

export type Risk = {
  id: string;
  code: string;
  category: RiskCategory;
  title: string;
  cause: string;
  effect: string;
  likelihood: 1 | 2 | 3 | 4 | 5;
  impact: 1 | 2 | 3 | 4 | 5;
  controls: string;
  treatment: RiskTreatment;
  action: string;
  owner: string;
  reviewAt: string;
  residualLikelihood: 1 | 2 | 3 | 4 | 5;
  residualImpact: 1 | 2 | 3 | 4 | 5;
  status: RiskStatus;
  isoClause: string;
};

export const risks: Risk[] = [
  {
    id: "rr1",
    code: "RR-VNNTH-2026-001",
    category: "Khách quan",
    title: "KTV đồng thời nhận tư vấn cho khách hàng gửi mẫu",
    cause: "KTV có công việc tư vấn cá nhân ngoài giờ – có thể nhận tư vấn cho HTX/DN mà PTN đang phân tích mẫu",
    effect: "Mất tính khách quan, ảnh hưởng uy tín VILAS, KH khiếu nại",
    likelihood: 2,
    impact: 4,
    controls: "Cam kết khách quan đầu năm; nội quy nội bộ",
    treatment: "Né tránh",
    action: "Bổ sung Phiếu khai báo xung đột lợi ích trước mỗi đợt phân tích lớn; Trưởng phòng rà soát hằng quý",
    owner: "Trưởng phòng PTN",
    reviewAt: "2026-09-30",
    residualLikelihood: 1,
    residualImpact: 4,
    status: "Đang xử lý",
    isoClause: "§4.1 Tính khách quan",
  },
  {
    id: "rr2",
    code: "RR-VNNTH-2026-002",
    category: "Năng lực nhân sự",
    title: "KTV mới chưa được ủy quyền vận hành GC-MS độc lập",
    cause: "Tuyển 2 KTV mới (Phạm Thu Hà thử việc) trong khi nhu cầu phân tích dư lượng BVTV tăng cao",
    effect: "Kết quả phân tích BVTV có thể không đảm bảo độ tin cậy; quá tải KTV chính",
    likelihood: 3,
    impact: 3,
    controls: "Quy định ủy quyền PP nội bộ; Đào tạo ban đầu 2 tuần",
    treatment: "Giảm thiểu",
    action: "Khóa đào tạo QuEChERS + GC-MS Q3/2026; kiểm tra năng lực qua mẫu mù; ủy quyền chính thức sau khi đạt",
    owner: "Phó phòng QA/QC",
    reviewAt: "2026-09-15",
    residualLikelihood: 2,
    residualImpact: 2,
    status: "Đang xử lý",
    isoClause: "§6.2 Nhân sự",
  },
  {
    id: "rr3",
    code: "RR-VNNTH-2026-003",
    category: "Cơ sở vật chất",
    title: "Mất điện đột ngột làm mất dữ liệu raw từ ICP-MS / GC-MS",
    cause: "Lưới điện địa phương không ổn định mùa mưa bão; máy chạy mẻ kéo dài 2-4 giờ",
    effect: "Mất dữ liệu raw không phục hồi được; phải lặp lại mẻ; chi phí chuẩn cao",
    likelihood: 3,
    impact: 5,
    controls: "UPS 10 kVA cho phòng dụng cụ; máy phát dự phòng",
    treatment: "Giảm thiểu",
    action: "Auto-save raw 5 phút/lần; backup cloud trong 24h; chuyển dữ liệu sau mỗi mẻ về NAS",
    owner: "Quản trị hệ thống",
    reviewAt: "2026-07-31",
    residualLikelihood: 2,
    residualImpact: 2,
    status: "Đã giảm thiểu",
    isoClause: "§6.3 + §7.5",
  },
  {
    id: "rr4",
    code: "RR-VNNTH-2026-004",
    category: "Phương pháp",
    title: "Phương pháp QuEChERS chưa thẩm định cho matrix cam (quả mọng)",
    cause: "Mở rộng dịch vụ phân tích cam Vân Du, lê, mít – matrix chứa nhiều đường gây nhiễu khi chiết",
    effect: "Kết quả BVTV trên quả mọng có thể bị thiên lệch; rủi ro pháp lý cho phiếu KQ",
    likelihood: 3,
    impact: 4,
    controls: "Đối chiếu PP gốc AOAC; chạy mẫu chuẩn thêm",
    treatment: "Giảm thiểu",
    action: "Thẩm định nội bộ matrix cam/lê/mít trước 2026-09: spike recovery 70–120%, RSD < 20%; báo cáo phê duyệt",
    owner: "Phó phòng QA/QC",
    reviewAt: "2026-09-30",
    residualLikelihood: 2,
    residualImpact: 3,
    status: "Mở",
    isoClause: "§7.2.2 Lựa chọn & thẩm định PP",
  },
  {
    id: "rr5",
    code: "RR-VNNTH-2026-005",
    category: "Thiết bị",
    title: "Tủ chuẩn lạnh dao động nhiệt 5–9°C",
    cause: "Cảm biến cũ (>5 năm); rò rỉ joint; dao động khi mở thường xuyên",
    effect: "Chuẩn BVTV nhạy có thể phân hủy; chuẩn không đảm bảo độ ổn định",
    likelihood: 4,
    impact: 3,
    controls: "Ghi nhiệt độ 3 lần/ngày (đã tự động ở /equipment)",
    treatment: "Giảm thiểu",
    action: "Thay cảm biến + joint Q3/2026; cảnh báo tự động khi ngoài 2–8°C; mua tủ dự phòng",
    owner: "Phụ trách thiết bị",
    reviewAt: "2026-08-31",
    residualLikelihood: 2,
    residualImpact: 3,
    status: "Đang xử lý",
    isoClause: "§6.4.4 Kiểm soát thiết bị",
  },
  {
    id: "rr6",
    code: "RR-VNNTH-2026-006",
    category: "Cung ứng",
    title: "NCC chuẩn BVTV (Sigma) tăng leadtime từ 2 → 8 tuần",
    cause: "Hạn chế nhập khẩu chất chuẩn; chỉ có 1 NCC chính",
    effect: "Có thể đứt nguồn chuẩn BVTV trong Q3/2026; gián đoạn QC",
    likelihood: 3,
    impact: 4,
    controls: "Theo dõi tồn kho HC-0703; đặt hàng định kỳ",
    treatment: "Chuyển giao",
    action: "Bổ sung 2 NCC backup (LGC Standards, AccuStandard); duy trì tồn ≥ 20% MOQ; lập hợp đồng khung",
    owner: "Phòng vật tư",
    reviewAt: "2026-08-15",
    residualLikelihood: 2,
    residualImpact: 3,
    status: "Mở",
    isoClause: "§6.6 Sản phẩm/Dịch vụ bên ngoài",
  },
  {
    id: "rr7",
    code: "RR-VNNTH-2026-007",
    category: "Quá trình",
    title: "Mẫu lưu hết hạn không kịp phân tích QC 3 tháng/lần",
    cause: "Khối lượng mẫu tăng, KTV bỏ sót lịch QC mẫu lưu",
    effect: "Không có dữ liệu kiểm soát chéo theo thời gian; vi phạm §7.7.1",
    likelihood: 2,
    impact: 3,
    controls: "Lịch tự sinh trong /archive; gán KTV phụ trách",
    treatment: "Giảm thiểu",
    action: "Cảnh báo 30 ngày + 7 ngày qua email; tự gán KTV theo nhóm chuyên môn (đã làm /archive)",
    owner: "Trưởng nhóm Đảm bảo chất lượng",
    reviewAt: "2026-09-30",
    residualLikelihood: 1,
    residualImpact: 2,
    status: "Đã giảm thiểu",
    isoClause: "§7.4.4 Mẫu lưu",
  },
  {
    id: "rr8",
    code: "RR-VNNTH-2026-008",
    category: "Khách hàng & Bên ngoài",
    title: "KH khiếu nại chậm trả KQ phân tích",
    cause: "Mùa cao điểm (quý 2, quý 4) khối lượng mẫu tăng 40%; thiếu KTV BVTV",
    effect: "Mất uy tín với HTX/DN; ảnh hưởng tự chủ tài chính",
    likelihood: 3,
    impact: 3,
    controls: "Cam kết SLA 5–7 ngày làm việc; nhắc nhở khi gần hạn",
    treatment: "Giảm thiểu",
    action: "Triển khai KPI SLA per chỉ tiêu; cảnh báo trước hạn 3 ngày; mua thêm máy GC-MS thứ 2 trong 2027",
    owner: "Trưởng phòng PTN",
    reviewAt: "2026-12-31",
    residualLikelihood: 2,
    residualImpact: 2,
    status: "Đang xử lý",
    isoClause: "§7.9 Khiếu nại",
  },
  {
    id: "rr9",
    code: "RR-VNNTH-2026-009",
    category: "Dữ liệu & An ninh",
    title: "Truy cập trái phép vào dữ liệu kết quả",
    cause: "Hệ thống LIMS chưa triển khai phân quyền RBAC; nhân viên dùng chung tài khoản",
    effect: "Rò rỉ thông tin KH; sửa kết quả trái phép; mất uy tín VILAS",
    likelihood: 2,
    impact: 5,
    controls: "Mật khẩu BIOS máy chủ; phòng chứa máy chủ khóa",
    treatment: "Giảm thiểu",
    action: "Triển khai RBAC + 2FA cho Trưởng phòng/QA-QC + audit log toàn hệ thống (kế hoạch P2)",
    owner: "Quản trị hệ thống",
    reviewAt: "2026-12-31",
    residualLikelihood: 1,
    residualImpact: 4,
    status: "Mở",
    isoClause: "§7.11 Kiểm soát dữ liệu",
  },
  {
    id: "rr10",
    code: "RR-VNNTH-2026-010",
    category: "Quá trình",
    title: "Sai sót khi nhập tay kết quả từ ICP-MS / GC-MS",
    cause: "KTV phải gõ tay kết quả từ phần mềm máy vào hệ thống LIMS",
    effect: "Sai số nhập tay 0.5–2%; kết quả không khớp dữ liệu raw",
    likelihood: 4,
    impact: 3,
    controls: "QA/QC kiểm tra chéo; đối chiếu với raw file",
    treatment: "Giảm thiểu",
    action: "Tích hợp import CSV/XML trực tiếp từ phần mềm instrument vào LIMS (kế hoạch P4)",
    owner: "Quản trị hệ thống",
    reviewAt: "2027-03-31",
    residualLikelihood: 2,
    residualImpact: 2,
    status: "Mở",
    isoClause: "§7.5 Hồ sơ kỹ thuật",
  },
];

export type Opportunity = {
  id: string;
  title: string;
  description: string;
  expectedBenefit: string;
  owner: string;
  status: "Đề xuất" | "Đang triển khai" | "Đã đạt";
};

export const opportunities: Opportunity[] = [
  {
    id: "op1",
    title: "Nâng cấp GC-MS/MS thay cho GC-MS đơn",
    description:
      "Đầu tư GC-MS/MS để hạ giới hạn phát hiện (LOQ) BVTV xuống mức MRL EU – mở rộng dịch vụ phân tích nông sản xuất khẩu",
    expectedBenefit:
      "Tiếp cận thị trường nông sản xuất khẩu EU/Nhật; tăng doanh thu ~30% nhóm BVTV",
    owner: "Ban Giám đốc PTN",
    status: "Đề xuất",
  },
  {
    id: "op2",
    title: "Mở rộng phạm vi VILAS thêm dư lượng kháng sinh trong sữa & mật ong",
    description:
      "Đăng ký mở rộng phạm vi công nhận thêm 4 nhóm kháng sinh; tận dụng HPLC sẵn có",
    expectedBenefit:
      "Thêm dịch vụ mới; phục vụ HTX nuôi ong + trang trại sữa Thanh Hóa",
    owner: "Phó phòng QA/QC",
    status: "Đang triển khai",
  },
  {
    id: "op3",
    title: "Tích hợp instrument – LIMS",
    description:
      "Tự động lấy dữ liệu raw từ ICP-MS, GC-MS, HPLC vào LIMS qua CSV/XML watcher",
    expectedBenefit:
      "Giảm sai sót nhập tay > 95%; rút ngắn 1 ngày/mẫu chu trình trả KQ",
    owner: "Quản trị hệ thống",
    status: "Đề xuất",
  },
];

export type DecisionRuleType =
  | "Simple acceptance (không guard band)"
  | "Guarded acceptance (w = U)"
  | "Guarded rejection (w = U)"
  | "Theo thỏa thuận khách hàng";

export type DecisionRule = {
  id: string;
  criterion: string;
  matrix: string;
  method: string;
  unit: string;
  limit: number;
  limitDirection: "max" | "min" | "range";
  limitMin?: number;
  limitSource: string;
  uncertainty: number;
  ruleType: DecisionRuleType;
  acceptanceUpper?: number;
  rejectionUpper?: number;
  acceptanceLower?: number;
  rejectionLower?: number;
  notes: string;
  approvedBy: string;
  approvedAt: string;
};

export const decisionRules: DecisionRule[] = [
  {
    id: "dr1",
    criterion: "Pb tổng",
    matrix: "Rau lá (cải, xà lách)",
    method: "ICP-MS – TCVN 7929:2008",
    unit: "mg/kg",
    limit: 0.3,
    limitDirection: "max",
    limitSource: "QCVN 8-2:2011/BYT – KLN trong thực phẩm",
    uncertainty: 0.04,
    ruleType: "Guarded acceptance (w = U)",
    acceptanceUpper: 0.26,
    rejectionUpper: 0.34,
    notes:
      "Chấp nhận khi kết quả ≤ 0.26 mg/kg (≤ MRL − U); Từ chối khi > 0.34. Vùng giữa lập biên bản, có thể yêu cầu phân tích lại.",
    approvedBy: "TS. Nguyễn Đình Lương",
    approvedAt: "2026-01-15",
  },
  {
    id: "dr2",
    criterion: "Cd tổng",
    matrix: "Quả tươi (cam, lê)",
    method: "ICP-MS – TCVN 7929:2008",
    unit: "mg/kg",
    limit: 0.05,
    limitDirection: "max",
    limitSource: "QCVN 8-2:2011/BYT",
    uncertainty: 0.007,
    ruleType: "Guarded acceptance (w = U)",
    acceptanceUpper: 0.043,
    rejectionUpper: 0.057,
    notes:
      "Áp dụng JCGM 106:2012, k=2. Mức bảo vệ KH ưu tiên (KH thực phẩm xuất khẩu).",
    approvedBy: "TS. Nguyễn Đình Lương",
    approvedAt: "2026-01-15",
  },
  {
    id: "dr3",
    criterion: "Chlorpyrifos (dư lượng BVTV)",
    matrix: "Rau lá",
    method: "GC-MS QuEChERS – AOAC 2007.01",
    unit: "mg/kg",
    limit: 0.05,
    limitDirection: "max",
    limitSource: "Codex MRL CXL 17-2018 (rau lá)",
    uncertainty: 0.008,
    ruleType: "Guarded acceptance (w = U)",
    acceptanceUpper: 0.042,
    rejectionUpper: 0.058,
    notes:
      "Codex MRL nghiêm ngặt hơn QCVN cho rau lá. Khi KH yêu cầu chuẩn EU, áp giá trị 0.01 mg/kg theo thỏa thuận riêng.",
    approvedBy: "ThS. Trần Thị Mai",
    approvedAt: "2026-02-10",
  },
  {
    id: "dr4",
    criterion: "As tổng",
    matrix: "Nước tưới nông nghiệp",
    method: "AAS – SMEWW 3114B",
    unit: "mg/L",
    limit: 0.05,
    limitDirection: "max",
    limitSource: "QCVN 39:2011/BTNMT – Nước tưới tiêu",
    uncertainty: 0.005,
    ruleType: "Guarded acceptance (w = U)",
    acceptanceUpper: 0.045,
    rejectionUpper: 0.055,
    notes:
      "Sử dụng hydride generation cho mẫu nước; chuyển ICP-MS khi LOQ không đạt.",
    approvedBy: "TS. Nguyễn Đình Lương",
    approvedAt: "2026-01-15",
  },
  {
    id: "dr5",
    criterion: "pHKCl",
    matrix: "Đất canh tác",
    method: "Điện cực thủy tinh – TCVN 5979:2007",
    unit: "đơn vị pH",
    limit: 7.5,
    limitDirection: "range",
    limitMin: 4.5,
    limitSource: "TCVN 7373:2004 – Đất canh tác",
    uncertainty: 0.05,
    ruleType: "Simple acceptance (không guard band)",
    notes:
      "Trả kết quả số có ±U; KH/đơn vị tư vấn dùng để khuyến cáo bón vôi/phân, không kết luận đạt/không đạt.",
    approvedBy: "TS. Nguyễn Đình Lương",
    approvedAt: "2026-01-15",
  },
  {
    id: "dr6",
    criterion: "P₂O₅ hữu hiệu",
    matrix: "Phân bón NPK 16-16-8",
    method: "Quang phổ Mo-vanadat – TCVN 8559:2010",
    unit: "%",
    limit: 16.5,
    limitDirection: "range",
    limitMin: 15.5,
    limitSource: "NĐ 84/2019/NĐ-CP – Quản lý phân bón (dung sai ±0.5%)",
    uncertainty: 0.32,
    ruleType: "Guarded acceptance (w = U)",
    acceptanceUpper: 16.18,
    acceptanceLower: 15.82,
    notes:
      "Quy tắc 2 phía. Phân bón ngoài khoảng (15.82 – 16.18) % bị đánh giá Không đạt theo Nghị định 84.",
    approvedBy: "TS. Nguyễn Đình Lương",
    approvedAt: "2026-03-12",
  },
  {
    id: "dr7",
    criterion: "Tổng Coliform",
    matrix: "Nước tưới",
    method: "Lọc màng – TCVN 6187-1:2009",
    unit: "CFU/100 mL",
    limit: 200,
    limitDirection: "max",
    limitSource: "QCVN 39:2011/BTNMT",
    uncertainty: 0,
    ruleType: "Theo thỏa thuận khách hàng",
    notes:
      "Chỉ tiêu vi sinh có phân bố Poisson – không áp dụng guard band thông thường. Quy tắc theo thỏa thuận: KH có thể chọn ngưỡng quyết định 100 CFU/100 mL hoặc giữ nguyên QCVN.",
    approvedBy: "ThS. Trần Thị Mai",
    approvedAt: "2026-02-20",
  },
  {
    id: "dr8",
    criterion: "Nitrat (NO₃⁻)",
    matrix: "Rau lá",
    method: "HPLC – TCVN 8742:2011",
    unit: "mg/kg",
    limit: 500,
    limitDirection: "max",
    limitSource: "EC 1881/2006 – áp dụng tham chiếu cho rau xuất khẩu",
    uncertainty: 20,
    ruleType: "Guarded acceptance (w = U)",
    acceptanceUpper: 480,
    rejectionUpper: 520,
    notes:
      "Áp dụng cho KH có hợp đồng xuất khẩu EU. KH nội địa có thể chọn Simple acceptance qua thỏa thuận.",
    approvedBy: "ThS. Trần Thị Mai",
    approvedAt: "2026-02-10",
  },
];

export type SamplingSessionStatus =
  | "Đang chuẩn bị"
  | "Đang triển khai"
  | "Đã hoàn tất"
  | "Đã đóng";

export type SamplingSession = {
  id: string;
  code: string;
  name: string;
  area: string;
  leader: string;
  team: string[];
  vehicle: string;
  startedAt: string;
  endedAt?: string;
  customer: string;
  matrix: string[];
  status: SamplingSessionStatus;
  plannedSamples: number;
  collectedSamples: number;
  syncedSamples: number;
};

export const samplingSessions: SamplingSession[] = [
  {
    id: "ss1",
    code: "LM-VNNTH-2026-018",
    name: "Quan trắc đất canh tác lúa Đông Sơn vụ Đông Xuân",
    area: "Xã Cẩm Thành & Cẩm Tâm – huyện Cẩm Thủy, Thanh Hóa",
    leader: "Lê Văn Hùng",
    team: ["Lê Văn Hùng", "Đỗ Minh Tuấn", "Hoàng Thị Linh"],
    vehicle: "Ô tô bán tải 36C-12345",
    startedAt: "2026-06-19 07:00",
    customer: "HTX Nông nghiệp Đông Sơn",
    matrix: ["Đất canh tác lúa", "Nước tưới ruộng"],
    status: "Đang triển khai",
    plannedSamples: 12,
    collectedSamples: 9,
    syncedSamples: 6,
  },
  {
    id: "ss2",
    code: "LM-VNNTH-2026-017",
    name: "Lấy mẫu rau cải dư lượng BVTV – Yên Định",
    area: "Xã Định Tường, huyện Yên Định, Thanh Hóa",
    leader: "Phạm Thu Hà",
    team: ["Phạm Thu Hà", "Hoàng Thị Linh"],
    vehicle: "Xe máy 36AB-78901 + 36AB-78902",
    startedAt: "2026-06-21 06:30",
    customer: "Trang trại Rau an toàn Yên Định",
    matrix: ["Rau cải lá", "Đất rau"],
    status: "Đang triển khai",
    plannedSamples: 8,
    collectedSamples: 3,
    syncedSamples: 0,
  },
  {
    id: "ss3",
    code: "LM-VNNTH-2026-015",
    name: "Quan trắc nước tưới kênh nội đồng Q2/2026",
    area: "Hệ thống kênh Bái Thượng – huyện Thọ Xuân, Thanh Hóa",
    leader: "Nguyễn Quang Anh",
    team: ["Nguyễn Quang Anh", "Trần Thị Mai"],
    vehicle: "Ô tô con 36A-22113",
    startedAt: "2026-06-10 06:00",
    endedAt: "2026-06-12 17:30",
    customer: "Phòng NN&PTNT huyện Thọ Xuân",
    matrix: ["Nước tưới mặt"],
    status: "Đã hoàn tất",
    plannedSamples: 25,
    collectedSamples: 25,
    syncedSamples: 25,
  },
];

export type FieldSampleStatus =
  | "Đang thu"
  | "Chờ đồng bộ"
  | "Đã đồng bộ"
  | "Đã chuyển vào PTN";

export type OnSiteReading = { name: string; value: string; unit: string };

export type FieldSample = {
  id: string;
  fieldCode: string;
  sessionCode: string;
  matrix: string;
  collectorName: string;
  collectedAt: string;
  location: { lat: number; lng: number; address: string };
  depth?: string;
  amount: string;
  container: string;
  preservation: string;
  onSiteReadings: OnSiteReading[];
  photos: number;
  hasSignature: boolean;
  status: FieldSampleStatus;
  linkedSampleCode?: string;
  notes?: string;
};

export const fieldSamples: FieldSample[] = [
  {
    id: "fs1",
    fieldCode: "FM-VNNTH-2026-00451",
    sessionCode: "LM-VNNTH-2026-018",
    matrix: "Đất ruộng lúa – tầng 0-20 cm",
    collectorName: "Lê Văn Hùng",
    collectedAt: "2026-06-22 08:45",
    location: {
      lat: 20.1736,
      lng: 105.4658,
      address: "Thửa số 27, cánh đồng Cẩm Thành, Cẩm Thủy",
    },
    depth: "0–20 cm",
    amount: "≈ 1.2 kg",
    container: "Túi PE kín, dán nhãn QR",
    preservation: "Nhiệt độ phòng, tránh ẩm",
    onSiteReadings: [
      { name: "Nhiệt độ đất", value: "27.3", unit: "°C" },
      { name: "Độ ẩm đất", value: "62", unit: "%" },
      { name: "pH cầm tay", value: "5.4", unit: "" },
    ],
    photos: 3,
    hasSignature: true,
    status: "Đã đồng bộ",
    linkedSampleCode: "M-VNNTH-2026-00451",
  },
  {
    id: "fs2",
    fieldCode: "FM-VNNTH-2026-00452",
    sessionCode: "LM-VNNTH-2026-018",
    matrix: "Nước tưới mương ruộng",
    collectorName: "Đỗ Minh Tuấn",
    collectedAt: "2026-06-22 09:20",
    location: {
      lat: 20.1742,
      lng: 105.4671,
      address: "Mương cấp 2 – cánh đồng Cẩm Thành",
    },
    amount: "1.0 L",
    container: "Chai PE, axit hóa pH<2 bằng HNO3",
    preservation: "Bảo quản lạnh 2-8°C",
    onSiteReadings: [
      { name: "pH", value: "7.1", unit: "" },
      { name: "EC", value: "0.92", unit: "mS/cm" },
      { name: "Nhiệt độ nước", value: "29.5", unit: "°C" },
      { name: "DO", value: "5.8", unit: "mg/L" },
    ],
    photos: 2,
    hasSignature: true,
    status: "Đã đồng bộ",
    linkedSampleCode: "M-VNNTH-2026-00452",
  },
  {
    id: "fs3",
    fieldCode: "FM-VNNTH-2026-00455",
    sessionCode: "LM-VNNTH-2026-018",
    matrix: "Đất ruộng lúa – tầng 20-40 cm",
    collectorName: "Hoàng Thị Linh",
    collectedAt: "2026-06-22 11:05",
    location: {
      lat: 20.1755,
      lng: 105.4682,
      address: "Thửa số 31, cánh đồng Cẩm Tâm, Cẩm Thủy",
    },
    depth: "20–40 cm",
    amount: "≈ 1.0 kg",
    container: "Túi PE kín, dán nhãn QR",
    preservation: "Nhiệt độ phòng",
    onSiteReadings: [
      { name: "Nhiệt độ đất", value: "26.8", unit: "°C" },
      { name: "pH cầm tay", value: "5.2", unit: "" },
    ],
    photos: 4,
    hasSignature: true,
    status: "Chờ đồng bộ",
    notes: "Ngoài vùng phủ sóng – chờ về Viện đồng bộ",
  },
  {
    id: "fs4",
    fieldCode: "FM-VNNTH-2026-00458",
    sessionCode: "LM-VNNTH-2026-017",
    matrix: "Rau cải lá – ruộng A1",
    collectorName: "Phạm Thu Hà",
    collectedAt: "2026-06-22 07:15",
    location: {
      lat: 19.9758,
      lng: 105.6611,
      address: "Vườn rau số 12, Định Tường, Yên Định",
    },
    amount: "≈ 500 g",
    container: "Túi giấy bạc, kín khí",
    preservation: "Bảo quản đông sâu -20°C ngay khi về xe",
    onSiteReadings: [
      { name: "Nhiệt độ không khí", value: "31.2", unit: "°C" },
      { name: "Độ ẩm", value: "78", unit: "%" },
    ],
    photos: 5,
    hasSignature: true,
    status: "Đang thu",
    notes: "Đang ghi nhận lịch sử phun BVTV của KH",
  },
  {
    id: "fs5",
    fieldCode: "FM-VNNTH-2026-00459",
    sessionCode: "LM-VNNTH-2026-017",
    matrix: "Đất trồng rau – ruộng A1",
    collectorName: "Hoàng Thị Linh",
    collectedAt: "2026-06-22 07:35",
    location: {
      lat: 19.9762,
      lng: 105.6619,
      address: "Vườn rau số 12, Định Tường, Yên Định",
    },
    depth: "0–15 cm",
    amount: "≈ 800 g",
    container: "Túi PE kín, dán nhãn QR",
    preservation: "Nhiệt độ phòng",
    onSiteReadings: [
      { name: "pH cầm tay", value: "6.1", unit: "" },
      { name: "Độ ẩm đất", value: "45", unit: "%" },
    ],
    photos: 2,
    hasSignature: false,
    status: "Đang thu",
  },
  {
    id: "fs6",
    fieldCode: "FM-VNNTH-2026-00432",
    sessionCode: "LM-VNNTH-2026-015",
    matrix: "Nước tưới kênh Bái Thượng – điểm K12",
    collectorName: "Nguyễn Quang Anh",
    collectedAt: "2026-06-12 09:40",
    location: {
      lat: 19.9421,
      lng: 105.5034,
      address: "Cầu K12 – kênh Bái Thượng, Thọ Xuân",
    },
    amount: "1.0 L + 0.5 L (lưu)",
    container: "Chai PE, axit hóa pH<2",
    preservation: "Bảo quản lạnh 2-8°C trong thùng đá",
    onSiteReadings: [
      { name: "pH", value: "7.4", unit: "" },
      { name: "EC", value: "0.78", unit: "mS/cm" },
      { name: "DO", value: "6.2", unit: "mg/L" },
      { name: "Độ đục", value: "12", unit: "NTU" },
    ],
    photos: 3,
    hasSignature: true,
    status: "Đã chuyển vào PTN",
    linkedSampleCode: "M-VNNTH-2026-00432",
  },
];

export const dashboardKpis = {
  sampleTotal: samples.length,
  sampleInProgress: samples.filter((s) =>
    ["Đang phân tích", "Chờ duyệt"].includes(s.status),
  ).length,
  sampleOverdue: 1,
  equipmentCalibrationDue: equipments.filter(
    (e) => new Date(e.nextCalibration) <= new Date("2026-06-30"),
  ).length,
  chemicalLowStock: chemicals.filter((c) => c.stock < c.minStock).length,
  chemicalExpiringSoon: chemicals.filter(
    (c) => new Date(c.expiry) <= new Date("2026-08-31"),
  ).length,
};
