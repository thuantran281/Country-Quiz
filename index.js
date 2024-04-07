const quizScreen = document.getElementById("screen");

let data = [];
let question = 0,
  score = 0,
  choice = 4;
let capitalCity, cities, flag, country, check, previousAns;

fetch("https://restcountries.com/v3.1/all?fields=name,capital,flag")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw Error(response.statusText);
  })
  .then((result) => {
    data = result;
  })
  .catch((error) => {
    console.log(error);
  });

function clearScreen() {
  quizScreen.textContent = "";
}

function capitalCities() {
  clearScreen();
  question += 1;

  capitalCity = Math.floor(Math.random() * data.length);

  if (data.length === 0 || data[capitalCity].capital === "") {
    cities = [undefined];
    check = undefined;
  } else {
    cities = [data[capitalCity].capital];
    check = data[capitalCity].capital;
  }

  while (cities.length < choice) {
    let options = data[Math.floor(Math.random() * data.length)].capital;

    if (!cities.includes(options) || !cities.includes(undefined)) {
      if (options === "") {
        cities.push(undefined);
      } else {
        cities.push(options);
      }
    }
  }

  const answerBtn = document.getElementById("answers");
  answerBtn.textContent = "";

  quizScreen.textContent += `
    <h2>Question ${question}</h2>
    <h2>What is the capital city of ${data[capitalCity].name}?</h2><br />
    <button type="submit" id="answers"></button>
  `;

  cities.map((city) => {
    const cityBtn = document.createElement("button");
    cityBtn.textContent = city;
    cityBtn.onclick = isCapitalCorrect.bind(null, city);
    answerBtn.appendChild(cityBtn);
  });
}

function isCapitalCorrect(ans) {
  clearScreen();

  if (ans === check) {
    score += 1;
    capitalCities();
  } else {
    previousAns.textContent += `
      Wrong answer :(\n
      The capital city of ${data[capitalCity].name} is ${check} 
    `;
  }
}

function countries() {
  clearScreen();
  question += 1;
}
