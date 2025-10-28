export const provinceDatas = [
  {
    id: "hanoi",
    name: "Hà Nội"
  },
  {
    id: "hochiminh",
    name: "Hồ Chí Minh"
  },
  {
    id: "danang",
    name: "Đà Nẵng"
  },
  {
    id: "hue",
    name: "Huế"
  },
  {
    id: "laocai",
    name: "Lào Cai"
  },
  {
    id: "phutho",
    name: "Phú Thọ"
  },
  {
    id: "vinhlong",
    name: "Vĩnh Long"
  },
  {
    id: "tuyenquang",
    name: "Tuyên Quang"
  },
  {
    id: "dongthap",
    name: "Đồng Tháp"
  },
  {
    id: "thanhhoa",
    name: "Thanh Hoá"
  },
  {
    id: "thainguyen",
    name: "Thái Nguyên"
  },
  {
    id: "hungyen",
    name: "Hưng Yên"
  },
  {
    id: "tayninh",
    name: "Tây Ninh"
  },
  {
    id: "sonla",
    name: "Sơn La"
  },
  {
    id: "cantho",
    name: "Cần Thơ"
  },
  {
    id: "quangtri",
    name: "Quảng Trị"
  },
  {
    id: "quangninh",
    name: "Quảng Ninh"
  },
  {
    id: "quangngai",
    name: "Quảng Ngãi"
  },
  {
    id: "daklak",
    name: "Đắk Lắk"
  },
  {
    id: "khanhhoa",
    name: "Khánh Hoà"
  },
  {
    id: "ninhbinh",
    name: "Ninh Bình"
  },
  {
    id: "nghean",
    name: "Nghệ An"
  },
  {
    id: "langson",
    name: "Lạng Sơn"
  },
  {
    id: "lamdong",
    name: "Lâm Đồng"
  },
  {
    id: "laichau",
    name: "Lai Châu"
  },
  {
    id: "angiang",
    name: "An Giang"
  },
  {
    id: "haiphong",
    name: "Hải Phòng"
  },
  {
    id: "hatinh",
    name: "Hà Tĩnh"
  },
  {
    id: "gialai",
    name: "Gia Lai"
  },
  {
    id: "dongnai",
    name: "Đồng Nai"
  },
  {
    id: "dienbien",
    name: "Điện Biên"
  },
  {
    id: "caobang",
    name: "Cao Bằng"
  },
  {
    id: "camau",
    name: "Cà Mau"
  },
  {
    id: "bacninh",
    name: "Bắc Ninh"
  },
];

export const domainDatas = [
  {
    id: "bac",
    name: "Miền Bắc"
  },
  {
    id: "trung",
    name: "Miền Trung"
  },
  {
    id: "nam",
    name: "Miền Nam"
  },
]

export const getProvinceName = (pid: string) => provinceDatas.find((p) => pid === p.id)?.name;
export const getDomainName = (did: string) => domainDatas.find((d) => did === d.id)?.name;