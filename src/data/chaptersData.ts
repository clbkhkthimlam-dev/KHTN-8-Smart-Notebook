import { Chapter } from "../types";

export const CHAPTERS: Chapter[] = [
  {
    id: "CH_INTRO",
    code: "MỞ ĐẦU",
    name: "Bài mở đầu",
    discipline: "chemistry",
    description: "Sử dụng một số hoá chất, thiết bị cơ bản và quy tắc an toàn trong phòng thí nghiệm",
    lessonRange: [1, 1],
    themeColor: "from-amber-500 to-orange-600"
  },
  {
    id: "CH_I_CHEM",
    code: "CHƯƠNG I",
    name: "Phản ứng hoá học",
    discipline: "chemistry",
    description: "Khái niệm biến đổi hoá học, mol, tỉ khối, dung dịch, nồng độ, định luật bảo toàn khối lượng và tốc độ phản ứng",
    lessonRange: [2, 7],
    themeColor: "from-blue-600 to-cyan-600"
  },
  {
    id: "CH_II_COMPOUND",
    code: "CHƯƠNG II",
    name: "Một số hợp chất thông dụng",
    discipline: "chemistry",
    description: "Acid, Base, thang pH, Oxide, Muối và ứng dụng trong nông nghiệp qua Phân bón hoá học",
    lessonRange: [8, 12],
    themeColor: "from-indigo-600 to-violet-600"
  },
  {
    id: "CH_III_DENSITY_PRESSURE",
    code: "CHƯƠNG III",
    name: "Khối lượng riêng và áp suất",
    discipline: "physics",
    description: "Khối lượng riêng, áp suất bề mặt, áp suất chất lỏng, áp suất khí quyển và lực đẩy Archimedes",
    lessonRange: [13, 17],
    themeColor: "from-emerald-600 to-teal-600"
  },
  {
    id: "CH_IV_ROTATION",
    code: "CHƯƠNG IV",
    name: "Tác dụng làm quay của lực",
    discipline: "physics",
    description: "Moment lực, tác dụng làm quay của lực và ứng dụng các loại đòn bẩy trong đời sống",
    lessonRange: [18, 19],
    themeColor: "from-amber-600 to-yellow-600"
  },
  {
    id: "CH_V_ELECTRICITY",
    code: "CHƯƠNG V",
    name: "Điện",
    discipline: "physics",
    description: "Nhiễm điện do cọ xát, dòng điện, nguồn điện, mạch điện đơn giản, tác dụng dòng điện, đo I và U",
    lessonRange: [20, 25],
    themeColor: "from-purple-600 to-pink-600"
  },
  {
    id: "CH_VI_HEAT",
    code: "CHƯƠNG VI",
    name: "Nhiệt",
    discipline: "physics",
    description: "Năng lượng nhiệt, nội năng, đo năng lượng nhiệt bằng joulemeter, sự truyền nhiệt và sự nở vì nhiệt",
    lessonRange: [26, 29],
    themeColor: "from-rose-600 to-red-600"
  },
  {
    id: "CH_VII_HUMAN_BIO",
    code: "CHƯƠNG VII",
    name: "Sinh học cơ thể người",
    discipline: "biology",
    description: "Cấu tạo & hoạt động các hệ cơ quan: Vận động, Tiêu hoá, Tuần hoàn, Hô hấp, Bài tiết, Thần kinh, Nội tiết, Da và Sinh sản",
    lessonRange: [30, 40],
    themeColor: "from-sky-600 to-blue-700"
  },
  {
    id: "CH_VIII_ECOLOGY",
    code: "CHƯƠNG VIII",
    name: "Sinh vật và môi trường",
    discipline: "biology",
    description: "Môi trường, nhân tố sinh thái, quần thể, quần xã, hệ sinh thái, sinh quyển, cân bằng tự nhiên và bảo vệ môi trường",
    lessonRange: [41, 47],
    themeColor: "from-green-600 to-lime-600"
  }
];

export const CHAPTERS_DATA = CHAPTERS;
