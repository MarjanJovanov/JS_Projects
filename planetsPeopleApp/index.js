const button = document.querySelector(".button");
const tableDiv = document.querySelector(".table");
const url = "https://swapi.dev/api/people";

async function getData(url) {
  try {
    let response = await fetch(url);
    let res = await response.json();
    let result = await Promise.all(res.results);
    createTable(filterData(result));
  } catch (error) {
    console.log(error);
  }
}

function filterData(data) {
  let filData = [];
  data.forEach((e) => {
    let person = [];
    person.push(e.name, e.mass, e.height);
    filData.push(person);
  });
  return filData;
}

function createTable(data) {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let columns = ["Name", "Mass", "Height"];
  columns.forEach((column) => {
    let th = document.createElement("th");
    th.textContent = column;
    thead.appendChild(th);
  });

  data.forEach((e) => {
    let tr = document.createElement("tr");
    for (let i = 0; i < e.length; i++) {
      let td = document.createElement("td");
      td.textContent = e[i];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  tableDiv.appendChild(table);
}

button.addEventListener("click", function () {
  tableDiv.innerHTML = "";
  getData(url);
});
