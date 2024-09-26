let arrNV = [];

function getDataNhanVien() {
  let arrField = document.querySelectorAll("#formNV input, #formNV select");
  let nhanVien = new NhanVien();

  let flag = true;
  for (let field of arrField) {
    let { id, value } = field;
    nhanVien[id] = value;

    let theCha = field.parentElement;
    let thongBao = theCha.parentElement.querySelector(".sp-thongbao");
    let dataMin = field.getAttribute("data-min");
    let dataMax = field.getAttribute("data-max");
    let dataValue = field.getAttribute("data-validation");
    checkEmptyValue(thongBao, value);
    switch (true) {
      case !checkEmptyValue(thongBao, value):
        flag = false;
        break;
      case dataValue == "tk" &&
        !checkMinMaxValue(thongBao, value, dataMin, dataMax):
        flag = false;
        break;
      case dataValue == "pass" &&
        !checkMinMaxValue(thongBao, value, dataMin, dataMax):
        flag = false;
        break;
      case dataValue == "email" && !checkEmailValue(thongBao, value):
        flag = false;
        break;
      case dataValue == "pass" && !checkPassValue(thongBao, value):
        flag = false;
        break;
    }
  }
  console.log(nhanVien);
  return flag ? nhanVien : null;
}

document.getElementById("btnThemNV").addEventListener("click", function () {
  document.getElementById("formNV").onsubmit(event);
});

document.getElementById("formNV").onsubmit = (event) => {
  event.preventDefault();
  let NV = getDataNhanVien();
  console.log(NV);
  if (NV) {
    arrNV.push(NV);
    setLocalStorage("arrNV", arrNV);
    console.log(arrNV);
    renderDataNV();
    event.target.reset();
  }
};

function renderDataNV() {
  let content = "";
  for (const nv of arrNV) {
    let newNV = new NhanVien();
    Object.assign(newNV, nv);
    let { tknv, name, email, datepicker, chucvu } = newNV;
    content += `
    <tr>
    <td>${tknv}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${datepicker}</td>
    <td>${chucvu}</td>
    <td>${newNV.tongLuong().toLocaleString()}</td>
    <td>${newNV.xepLoai()}</td>
    <td>
    <button onclick="setDataNV('${tknv}')" data-toggle="modal" data-target="#myModal" class="btn btn-primary">Sửa</button>
    <button onclick="XoaNV('${tknv}')"  class="btn btn-danger">Xóa</button>
    </td>
    </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

window.onload = function () {
  let dataLocal = getLocalStorage("arrNV");
  if (dataLocal) {
    arrNV = dataLocal;
    renderDataNV();
  }
};

function setLocalStorage(key, value) {
  let dataString = JSON.stringify(value);
  localStorage.setItem(key, dataString);
}

function getLocalStorage(key) {
  let dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
}

function XoaNV(tk) {
  let index = arrNV.findIndex((item, i) => item.tknv == tk);
  if (index != -1) {
    arrNV.splice(index, 1);
    renderDataNV();
    setLocalStorage("arrNV", arrNV);
  }
}

function setDataNV(tk) {
  let nv = arrNV.find((item, i) => item.tknv == tk);
  if (nv) {
    arrField = document.querySelectorAll("#formNV input, #formNV select");
    for (const field of arrField) {
      field.value = nv[field.id];
      if (field.id == "tknv") {
        field.readOnly = true;
      }
    }
  }
}

document.getElementById("btnCapNhat").onclick = () => {
  let nhanVien = getDataNhanVien();
  let i = arrNV.findIndex((item, i) => item.tknv == nhanVien.tknv);
  if (i != -1) {
    arrNV[i] = nhanVien;
    renderDataNV();
    setLocalStorage("arrNV", arrNV);
    document.getElementById("tknv").readOnly = false;
    document.getElementById("formNV").reset();
  }
};
