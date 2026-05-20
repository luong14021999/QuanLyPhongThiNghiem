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
  },
  {
    id: "c4",
    code: "HC-0308",
    name: "Dung dịch chuẩn As 1000 ppm (KLN trong đất, nông sản)",
    cas: "—",
    unit: "ml",
    stock: 250,
    minStock: 200,
    expiry: "2026-09-01",
    hazard: "Độc hại",
    location: "Tủ chuẩn – Ngăn 3",
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
  },
  {
    id: "c9",
    code: "HC-0801",
    name: "Dung dịch đệm KCl 1M (đo pH đất)",
    cas: "7447-40-7",
    unit: "lít",
    stock: 12,
    minStock: 5,
    expiry: "2027-02-28",
    hazard: "Thường",
    location: "Tủ chuẩn – Ngăn 4",
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
