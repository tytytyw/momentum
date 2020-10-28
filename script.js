// DOM Elements
const time = document.querySelector('.time'),
days = document.querySelector('.day'),
dates = document.querySelector('.date'),
greeting = document.querySelector('.greeting'),
name = document.querySelector('.name'),
focusTitle = document.querySelector('.focus_title'),
focus = document.querySelector('.focus'),
body = document.querySelector('#body'),
quoteBody = document.querySelector('.quote__body'),
quoteAutor = document.querySelector('.quote__autor'),
quoteWrap = document.querySelector('.quote');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const forwBtn = document.querySelector("#forw");
const backBtn = document.querySelector("#back");

let num = 1;
// memoryHour = new Date().getHours();
let newIndex = null;
let timeOfDayIndex;
const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const mounths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const timeOfDay = ['morning','day','evening','night'];
const imagesNames = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg','20.jpg']
const imgRandom = imagesNames.sort(makeRandomArr);
// Options
let showAmPm = false;

// Random array
function makeRandomArr(a, b) {
  return Math.random() - 0.5;
}

// Show Time
function showTime() {
  
  let today = new Date(),
    day = today.getDay(),
    date = today.getDate(),
    mounth = today.getMonth(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? '<span>PM</span>' : '<span>AM</span>';

  min===0 && sec===0 ? setBgGreet():"";
  
  // 12hr Format
  if (showAmPm){
    hour = hour % 12 || 12;
  }
  
  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}${showAmPm ? amPm : ''}`;

  // Output Time
  days.innerHTML = `${week[day]}`;
  dates.innerHTML=`${date} ${mounths[mounth]}`;

  setTimeout(showTime, 1000);
}

time.onclick = () => {
  showAmPm= !showAmPm;
  if (showAmPm) {
    
    if (window.screen.width>800) {
      time.style.width = '37rem';
    }
  } else {

    if (window.screen.width>800) {
      time.style.width = '32rem';
    }
  }
  showTime();
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Get Background
GetBg = (folder) => {
  const img = document.createElement('img');
  let src = `./assets/images/${folder}/${imgRandom[num-1]}`;
  console.log(src)
  img.src = src;
  img.onload = () => {  
    body.style.backgroundImage = `url(${src})`;
  }; 
}

// Set Background and Greeting
TimeOfDay = () => {

let h = new Date().getHours();

  if (h < 12 && h > 5) {
    timeOfDayIndex=0
  } else if (h < 18  && h > 5) {
    timeOfDayIndex=1;
  } else if (h < 24 && h > 5) {
    timeOfDayIndex=2;
  } else {
    timeOfDayIndex=3;
  }
}

function setBgGreet(arg) {

  console.log(`фон ${num}`)
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12 && hour > 5) {
    // Morning

    if (!arg) {
      GetBg(timeOfDay[timeOfDayIndex])
    } else {
      GetBg(timeOfDay[newIndex])
    }
    
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = 'black';
  } else if (hour < 18  && hour > 5) {

    if (!arg) {
      GetBg(timeOfDay[timeOfDayIndex])
    } else {
      GetBg(timeOfDay[newIndex])
    }
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'black';
  } else if (hour < 24 && hour > 5) {
    // Evening

    if (!arg) {
      GetBg(timeOfDay[timeOfDayIndex])
    } else {
      GetBg(timeOfDay[newIndex])
    }
    greeting.textContent = 'Good Evening, ';
    document.body.childNodes.forEach(item => {
      
      if (item.className && item.className!=='bg-nav') {
        item.style.backgroundColor = "rgba(0, 0, 0, .4)";
      }
    })
    document.body.style.color = 'white';
  } else {

    if (!arg) {
      GetBg(timeOfDay[timeOfDayIndex])
    } else {
      GetBg(timeOfDay[newIndex])
    }
    greeting.textContent = 'Good Night, ';
    document.body.childNodes.forEach(item => {
      
      if (item.className && item.className!=='bg-nav') {
        item.style.backgroundColor = "rgba(0, 0, 0, .4)";
      }
    })
    document.body.style.color = 'white';
  }
  
  if (num>19) {
    num = 1;
    
    if (!!arg || arg===0) {
      newIndex===3 ? newIndex = 0 : newIndex+=1;
    } else {
      newIndex = timeOfDayIndex+1
    }
  } else {
    num++
  }
}
// Background navigation click

function DisableBtn () {
  disableBtn = true;
  backBtn.classList.add('disable');
  forwBtn.classList.add('disable');
  setTimeout(() => {
    disableBtn = false;
    backBtn.classList.remove('disable');
    forwBtn.classList.remove('disable');
  }, 1000);
}

let disableBtn = false
document.querySelector("#forw").onclick = () => {
  if (!disableBtn) {
    !newIndex && newIndex!==0 ? setBgGreet():setBgGreet(newIndex)
    DisableBtn()
  }
}

document.querySelector("#back").onclick = () => {
  
  if (!disableBtn) {
    if (num<3) {
      num ===1 ? num=21:num=22
      
      if (!!newIndex || newIndex===0) {
        newIndex===0 ? newIndex = 3 : newIndex-=1;
      } else {
        timeOfDayIndex===0? newIndex = 3 : newIndex = timeOfDayIndex-1
      }
    }
    num-=2;
    !newIndex && newIndex!==0 ? setBgGreet():setBgGreet(newIndex);
    DisableBtn();
  }
};

// Get Name
function getName(e) {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function ClickOnInput (e) {
  
  if (e.type === 'click') {
    e.target.textContent=null;
  }
 }

//Set City
function setCity(e) {

  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      let text = e.target.innerText[0].toUpperCase() + e.target.innerText.substring(1);
      localStorage.setItem('city', text);
      city.blur();
      WeatherApi();
    }
  } 

  if (e.type === 'blur') {

    if (e.target.textContent == "") {
      
      if (localStorage.getItem('city') !== "" && localStorage.getItem('city')!==null) {
        e.target.textContent=localStorage.getItem('city');
      } else {
      e.target.textContent="[Enter City]";
      }
    } else {
      let text = e.target.innerText[0].toUpperCase() + e.target.innerText.substring(1);
      localStorage.setItem('city', text);
      e.target.textContent = text;
      WeatherApi();
    }
  }
}

// Get City
function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
    WeatherApi();
  }
}

// Fetch Weather
WeatherApi = () => {
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem("city")}&lang=eng&appid=273dff07e552b3a5893e9a9b241eca05&units=metric`)
  .then(res => res.json())
  .then(json => {
    if (!!json.main) {
      weatherIcon.classList = `weather-icon owf`;
      weatherIcon.classList.add(`owf-${json.weather[0].id}`);
      temperature.textContent = `${json.main.temp.toFixed(0)}°C`;
      weatherDescription.textContent = json.weather[0].description;
    } else if (json.message=== "city not found") {
      weatherIcon.classList = "";
      temperature.textContent = "";
      weatherDescription.innerHTML= `<span class="error"> Error: ${json.message}</span>`
    }
  })
}

// Set Name
function setName(e) {

  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } 

  if (e.type === 'blur') {

    if (e.target.textContent == "") {
      
      if (localStorage.getItem('name') !== "" && localStorage.getItem('name')!==null) {
        e.target.textContent=localStorage.getItem('name');
      } else {
      e.target.textContent="[Enter Name]";
      }
    } else {
      localStorage.setItem('name', e.target.innerText);
    }
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
if (localStorage.getItem('focus')) {
  setFocusTitle()
}

function setFocusTitle() {
  focusTitle.innerHTML = 'Your Focus For Today Is:';
}

function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  }

  if (e.type === 'blur') {

    if (e.target.textContent == "") {
      
      if (localStorage.getItem('focus') !== "" && localStorage.getItem('focus')!==null) {
        e.target.textContent=localStorage.getItem('focus');
      } else {
      e.target.textContent='[Enter Focus]';
      }
    } else {
      localStorage.setItem('focus', e.target.innerText);
      setFocusTitle();
    }
  }
}

// Quote
let ClickBlock = true;
QuoteDay = () => {
  fetch('https://favqs.com/api/qotd')
    .then(res => res.json())
    .then(json => {
      ClickBlock = true;
      quoteWrap.classList.add('blocked');
      for (let i=0;i<json.quote.body.length;i++) {
        setTimeout(() => {
          quoteBody.textContent += json.quote.body[i]
          
          if (i===json.quote.body.length-1) {
            
            for (let i=0;i<json.quote.author.length;i++) {
              setTimeout(() => {
                quoteAutor.textContent += json.quote.author[i];
                if (i===json.quote.author.length-1) {
                  ClickBlock = false;
                  quoteWrap.classList.remove('blocked')
                }
                
              }, 300 * i);
            }
          }
        }, 50 * i);
      }
    })
}

quoteWrap.onclick = () => {
  
  if (!ClickBlock) {
    QuoteDay();
    quoteBody.innerHTML = "";
    quoteAutor.innerHTML = "";
  }
}

name.addEventListener('click', ClickOnInput);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
city.addEventListener('click', ClickOnInput);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
focus.addEventListener('click', ClickOnInput);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
TimeOfDay();
showTime();
setBgGreet();
getName();
getFocus();
QuoteDay();
getCity();

// first load
if (!localStorage.length) {
  localStorage.setItem("loaded",true)
  alert('Доброго времени суток, цитата меняется по клику на нее (когда она полностью прогружена), в консоле есть полезная для кросс чека информация')
}