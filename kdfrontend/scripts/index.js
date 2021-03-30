function renderDonorUI(data) {
  userData.textContent = "";
  let userName = document.createElement("p");
  userName.textContent = data.username;
  let districtName = document.createElement("p");
  districtName.textContent = data.district;
  userData.appendChild(userName);
  userData.appendChild(districtName);
}

function renderNgoUI(data) {
  userData.textContent = "";
  let ngoName = document.createElement("p");
  ngoName.textContent = data.ngoName;
  let district = document.createElement("p");
  district.textContent = data.district;
  let areaOfInterest = document.createElement("p");
  areaOfInterest.textContent = `Area of Interest: ${data.area}`;
  userData.appendChild(ngoName);
  userData.appendChild(district);
  userData.appendChild(areaOfInterest);
}

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);

  var select = document.querySelectorAll("select");
  var instances = M.FormSelect.init(select);
});
