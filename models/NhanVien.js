class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "" * 1;

  tongLuong = function () {
    switch (true) {
      case this.chucvu == "Giám đốc":
        return this.luongCB * 3;
      case this.chucvu == "Trưởng phòng":
        return this.luongCB * 2;
      case this.chucvu == "Nhân viên":
        return this.luongCB * 1;
    }
  };

  xepLoai = function () {
    switch (true) {
      case this.chucvu == "Nhân viên":
        switch (true) {
          case this.gioLam < 160:
            return "Nhân viên trung bình";
          case 160 <= this.gioLam && this.gioLam < 176:
            return "Nhân viên khá";
          case 176 <= this.gioLam && this.gioLam < 192:
            return "Nhân viên giỏi";
          case this.gioLam >= 192:
            return "Nhân viên xuất sắc";
        }

      default:
        return "";
    }
  };
}
