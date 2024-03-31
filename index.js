const quizScreen = document.getElementById("screen");

let data = [];
let question = 0,
  score = 0, choice = 4;
let capitalCity, city, flag, country, check;

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

function country() {
  clearScreen();
  question += 1;
}

function flag() {

}

function capitalCities() {
  clearScreen();
  question += 1;

  capitalCity = Math.floor(Math.random() * data.length);

  if (data.length === 0 || data[capitalCity].capital === "") {
    city = [undefined]; 
    check = undefined;
  } else {
    city = [data[capitalCity].capital];
    check = data[capitalCity].capital;
  }

  // initialise the city into an array so it stores the answers from the user

  while (city.length < choice) {
    let options = data[Math.floor(Math.random() * data.length)].capital;

    if (!city.includes(options) || !city.includes(undefined)) {
      if (options === "") {
        city.push(undefined);
      } else {
        city.push(options);
      }
    }
  }

  quizScreen.textContent += 
  `
  <h2>Question ${question}</h2>
  <h2>What is the capital city of ${data[capitalCity].name}?</h2><br />
  
  `
}
