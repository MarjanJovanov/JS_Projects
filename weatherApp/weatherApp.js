let statistics = document.getElementById("statistics");
let hourly = document.getElementById("hourly");
let cityField = document.getElementById("city");
let main = document.getElementsByClassName("main")[0];
let searchButton = document.getElementById("search");
let div1 = document.getElementsByClassName("result_one")[0];
let div2 = document.getElementsByClassName("result_two")[0];
let div3 = document.getElementsByClassName("result_three")[0];
let divTable = document.querySelector(".tableDiv");
let h1 = document.getElementsByTagName("h1")[0];
//---------------------------------------------------------------
let cityTempStatistics = (data) => {
  let obj = data.list;
  let main = obj.map((e) => {
    return e.main;
  });
  let temp = main.map((e) => {
    return e.temp;
  });
  let temp_min = main.map((e) => {
    return e.temp_min;
  });
  let temp_max = main.map((e) => {
    return e.temp_max;
  });
  temp_min.sort((a, b) => a - b);
  let minTemp = Math.round(temp_min[0]);
  let sum = 0;
  for (i = 0; i < temp.length; i++) {
    sum += temp[i];
  }
  let averageTemp = Math.round(sum / temp.length);
  temp_max.sort((a, b) => b - a);
  let maxTemp = Math.round(temp_max[0]);

  let humidity = main.map((e) => {
    return e.humidity;
  });

  humidity.sort((a, b) => a - b);
  let minHumidity = humidity[0];
  let sumHum = 0;
  for (let i = 0; i < humidity.length; i++) {
    sumHum += humidity[i];
  }
  let avgHumidity = Math.round(sumHum / humidity.length);

  let maxHumidity = humidity[humidity.length - 1];
  let dt_txt = obj.map((element) => {
    return element.dt_txt;
  });
  let coldestTime = new Date(dt_txt[0]).toUTCString();
  let warmestTime = new Date(dt_txt[dt_txt.length - 1]).toUTCString();

  let currentCity = {
    minTemp,
    averageTemp,
    maxTemp,
    minHumidity,
    avgHumidity,
    maxHumidity,
    coldestTime,
    warmestTime,
  };

  return currentCity;
};

//-----------------------------------------------------------------------
let createElemens = (currentCity) => {
  let minT = document.createElement("h3");
  minT.textContent = `MIN TEMP: ${currentCity.minTemp} °C`;
  div1.appendChild(minT);

  let avgT = document.createElement("h3");
  avgT.textContent = `AVG TEMP: ${currentCity.averageTemp} °C `;
  div1.appendChild(avgT);

  let maxT = document.createElement("h3");
  maxT.textContent = `MAX TEMP: ${currentCity.maxTemp} °C`;
  div1.appendChild(maxT);

  let minH = document.createElement("h3");
  minH.textContent = `MIN HUMIDITY: ${currentCity.minHumidity} %`;
  div2.appendChild(minH);

  let avgH = document.createElement("h3");
  avgH.textContent = `AVG HUMIDITY: ${currentCity.avgHumidity} %`;
  div2.appendChild(avgH);

  let maxH = document.createElement("h3");
  maxH.textContent = `MAX HUMIDITY: ${currentCity.maxHumidity} %`;
  div2.appendChild(maxH);

  let coldestT = document.createElement("h3");
  coldestT.textContent = `Coldest time of the period : ${currentCity.coldestTime}`;
  div3.appendChild(coldestT);

  let warmestT = document.createElement("h3");
  warmestT.textContent = `Warmest time of the period : ${currentCity.warmestTime}`;
  div3.appendChild(warmestT);
};

//-------------------------------------------------------

function hourlyStats(city) {
  let list = city.list;
  let main = list.map((e) => {
    return e.main;
  });
  let weather = list.map((e) => {
    return e.weather;
  });
  let icon = weather.map((e) => {
    return e[0].icon;
  });
  let description = weather.map((e) => {
    return e[0].description;
  });
  let dateTime = list.map((e) => {
    return e.dt_txt;
  });

  let temperature = main.map((e) => {
    return e.temp;
  });
  let humidity = main.map((e) => {
    return e.humidity;
  });
  let wind = list.map((e) => {
    return e.wind;
  });
  let windSpeed = wind.map((e) => {
    return e.speed;
  });
  let hourlySt = {
    icon,
    description,
    dateTime,
    temperature,
    humidity,
    wind,
    windSpeed,
  };
  return hourlySt;
}

//---------------------------------------------------------
let generateTable = (cityData) => {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  let columns = [
    "Icon",
    "Description",
    "Date & Time",
    "Temperature",
    "Humidity",
    "Wind Speed",
  ];

  let icon = cityData["icon"];
  let description = cityData["description"];
  let dateTime = cityData["dateTime"];
  let temperature = cityData["temperature"];
  let humidity = cityData["humidity"];
  let windSpeed = cityData["windSpeed"];

  let tableResult = [];

  for (let i = 0; i < icon.length; i++) {
    let item = [
      `${icon[i]}`,
      `${description[i]}`,
      `${dateTime[i]}`,
      `${temperature[i]}`,
      `${humidity[i]}`,
      `${windSpeed[i]}`,
    ];
    tableResult.push(item);
  }

  columns.forEach((column) => {
    let th = document.createElement("th");
    th.textContent = column;
    thead.appendChild(th);
  });

  tableResult.forEach((element) => {
    let tr = document.createElement("tr");

    for (let i = 0; i < element.length; i++) {
      if (i === 0) {
        let td = document.createElement("td");
        let img = document.createElement("img");
        td.appendChild(img);
        img.src = `http://openweathermap.org/img/w/${element[i]}.png`;
        tr.appendChild(td);
      } else {
        let td = document.createElement("td");
        td.textContent = element[i];
        tr.appendChild(td);
      }
    }

    tbody.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    divTable.appendChild(table);
  });
  console.log("table generated");
};
//----------------------------------------------------------------
async function getCity(city) {
  let myApiKey = "this key is private ...:) ";
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${myApiKey}`
    );
    const data = await res.json();
    createElemens(cityTempStatistics(data));
    generateTable(hourlyStats(data));
  } catch (error) {
    console.log(error);
  }
}
//--------------------------------------------------------------
let navItems = [statistics, hourly];

let borderNavbar = (item) => {
  for (let item of navItems) {
    item.style.border = "none";
  }
  item.style.border = "white 2px solid";
};

let clearElements = () => {
  div1.innerHTML = "";
  div2.innerHTML = "";
  div3.innerHTML = "";
  h1.innerHTML = "";
  divTable.innerHTML = "";
};

let showElement = (element) => {
  element.style.display = "block";
};

let hideElement = (element) => {
  element.style.display = "none";
};

let styleBackground = (element1) => {
  element1.style.background = "#222831";
};
//---------------------------------------------------------------
searchButton.addEventListener("click", function () {
  clearElements();
  let city = cityField.value;
  getCity(city);
  hideElement(divTable);
  borderNavbar(statistics);
  h1.textContent = `Weather in ${city}`;
  styleBackground(main);

  if (city.length <= 2) {
    h1.textContent = "Please enter valid city";
  }
  cityField.value = "";
});

statistics.addEventListener("click", () => {
  showElement(main);
  hideElement(divTable);
  borderNavbar(statistics);
});

hourly.addEventListener("click", () => {
  hideElement(main);
  showElement(divTable);
  borderNavbar(hourly);
});
