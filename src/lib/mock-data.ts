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
