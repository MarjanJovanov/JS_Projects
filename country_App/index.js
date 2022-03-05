const button = document.querySelector(".btn");
const search = document.querySelector(".search");
const message = document.querySelector(".message");
const tableDiv = document.querySelector(".table");

function getCountryData(data) {
  let countries = [];
  let len = data.length;
  if (len) {
    for (let i = 0; i < len; i++) {
      let country = [];
      country.push(
        data[i].flags.png,
        data[i].name.common,
        data[i].capital,
        data[i].population,
        data[i].area,
        Object.values(data[i].languages).join(", "),
        Object.keys(data[i].currencies).map(
          (key) => data[i].currencies[key].name
        )
      );
      countries.push(country);
    }
  }
  return countries;
}

function generateTable(countries) {
  tableDiv.innerHTML = "";

  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  let columns = [
    "Flag",
    "Name",
    "Capital",
    "Population",
    "Area",
    "Languages",
    "Currencies",
  ];
  columns.forEach((column) => {
    let th = document.createElement("th");
    th.textContent = column;
    thead.appendChild(th);
  });

  countries.forEach((element) => {
    let tr = document.createElement("tr");

    for (let i = 0; i < element.length; i++) {
      if (i === 0) {
        let td = document.createElement("td");
        let img = document.createElement("img");
        img.src = `${element[i]}`;
        img.style.width = "50px";
        td.appendChild(img);
        tr.appendChild(td);
      } else {
        let td = document.createElement("td");
        element[i] ? (td.textContent = element[i]) : (td.textContent = " /");
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  tableDiv.appendChild(table);
}

button.addEventListener("click", function () {
  message.innerHTML = "";
  let country = search.value;
  if (country.length > 1) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        let apiResult = myJson;
        let countries = getCountryData(apiResult);
        generateTable(countries);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    tableDiv.innerHTML = "";
    message.textContent = "Unexisting country selected";
    message.style.color = "red";
  }
  search.value = "";
});
