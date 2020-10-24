// DOM Elements
const time = document.querySelector('.time'),
  days = document.querySelector('.day'),
  dates = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focusTitle = document.querySelector('.focus_title'),
  focus = document.querySelector('.focus');
  body = document.querySelector('#body');
  let num = 1,
  memoryHour = new Date().getHours();

// Options
let showAmPm = false;

// Show Time
const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const mounths = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function showTime() {
  
  let today = new Date(),
    day = today.getDay(),
    date = today.getDate(),
    mounth = today.getMonth(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    hour = 1;

  // Set AM or PM
  const amPm = hour >= 12 ? '<span>PM</span>' : '<span>AM</span>';
  
  // 12hr Format
  if (showAmPm){
    hour = hour % 12 || 12;
    
    if (hour !== memoryHour % 12 && hour !== 12) {
      setBgGreet();
      memoryHour=hour;
    } else if (hour === 12) {
      memoryHour=hour
    }
  }  else if (hour !== memoryHour) {
    setBgGreet();
    memoryHour=hour;
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
    time.style.width = '37rem';
  } else {
    time.style.width = '32rem';
  }
  showTime();

///////////////////////////////////////
  console.log('цитаты')
  console.log('прогноз')
  console.log('адаптив')
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 12 && hour > 5) {
    // Morning
    body.style.backgroundImage =
    `url('./assets/images/morning/${num}.jpg')`;
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = 'black';
  } else if (hour < 18  && hour > 5) {
    // Afternoon
    body.style.backgroundImage =
    `url('./assets/images/day/${num}.jpg')`;
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'black';
  } else if (hour < 24 && hour > 5) {
    // Evening
    body.style.backgroundImage =
    `url('./assets/images/evening/${num}.jpg')`;
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundImage = `url('./assets/images/night/${num}.jpg')`;
    greeting.textContent = 'Good Night, ';
    document.body.childNodes.forEach(item => {
      if (item.style) {
        item.style.backgroundColor = "rgba(0, 0, 0, .2)";
      }
    })
    document.body.style.color = 'white';
  }
  if (num>19) {
    num = 1
  } else {
    num++
  }
}


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
// focusTitle.innerHTML = 'Your Focus For Today Is:';
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

document.querySelector("#forw").onclick = () => setBgGreet();
document.querySelector("#back").onclick = () => {
  if (num<3) {
    num=21;
  }
  num-=2;
  setBgGreet()
};

name.addEventListener('click', ClickOnInput);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', ClickOnInput);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
