function checkEmptyValue(thongBao, value) {
  if (value == "") {
    thongBao.innerHTML = "Vui lòng không để trống";
    thongBao.style = "display:block";
    return false;
  } else {
    thongBao.innerHTML = "";
    return true;
  }
}

function checkMinMaxValue(thongBao, value, min, max) {
  let doDai = value.length;
  if (doDai < min || doDai > max) {
    thongBao.innerHTML = `vui lòng nhập trong khoảng từ ${min} đến ${max}`;
    thongBao.style = "display:block";

    return false;
  } else {
    thongBao.innerHTML = ``;
    return true;
  }
}

function checkEmailValue(thongBao, value) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkEmail = regexEmail.test(value); // true || false
  if (checkEmail) {
    thongBao.innerHTML = "";
    return true;
  } else {
    thongBao.innerHTML = "vui lòng nhập đúng định dạng email";
    thongBao.style = "display:block";
    return false;
  }
}

function checkPassValue(thongBao, value) {
  let regexPass = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
  let checkPass = regexPass.test(value);
  if (checkPass) {
    thongBao.innerHTML = "";
    return true;
  } else {
    thongBao.innerHTML =
      "Vui lòng nhập mật khẩu có chứa 1 ký tự đặc biệt và 1 ký tự viết hoa";
    thongBao.style = "display:block";

    return false;
  }
}
