const quizScreen = document.getElementById("screen");
const previousAns = document.getElementById("prevAns");

let quizData = [];
let question = 0,
  score = 0,
  limit = 4;
let capitalCity, cities, flag, country, check;

async function fetchCountries() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,flag"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

fetchCountries().then((result) => {
  if (result) {
    quizData = result;
  }
});

function clearScreen() {
  quizScreen.innerHTML = "";
}

function capitalCities() {
  clearScreen();
  question += 1;

  capitalCity = Math.floor(Math.random() * quizData.length);

  if (quizData.length === 0 || quizData[capitalCity].capital === "") {
    cities = ["N/A"];
    check = "N/A";
  } else {
    cities = [quizData[capitalCity].capital];
    check = quizData[capitalCity].capital;
  }

  while (cities.length < limit) {
    let options = quizData[Math.floor(Math.random() * quizData.length)].capital;

    if (!cities.includes(options) || !cities.includes("N/A")) {
      if (options == "") {
        cities.push("N/A");
      } else {
        cities.push(options);
      }
    }
  }

  quizScreen.innerHTML += `
    <h2>Question ${question}</h2>
    <h2>What is the capital city of ${quizData[capitalCity].name.common}?</h2><br />
    <div id="answers"></div>
  `;

  cities.forEach((city) => {
    document.getElementById("answers").innerHTML += `
      <button onclick="isCapitalCorrect(\`${city}\`)">${city}</button>`;
  });
}

function isCapitalCorrect(ans) {
  clearScreen();

  if (ans == check) {
    score += 1;
    previousAns.innerHTML = `
      Correct!<br />
      The capital city of ${quizData[capitalCity].name.common} is ${check}<br />
      Score: ${score}<br />
    `;
    capitalCities();
  } else {
    previousAns.innerHTML = `
      Wrong answer :( <br />
      The capital city of ${quizData[capitalCity].name.common} is ${check} <br />
      Score: ${score} <br />
    `;
    capitalCities();
  }
}
