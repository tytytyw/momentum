// DOM Elements
const time = document.querySelector('.time'),
  days = document.querySelector('.day'),
  dates = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focusTitle = document.querySelector('.focus_title'),
  focus = document.querySelector('.focus');

// Options
let showAmPm = false;

// Show Time
function showTime() {
  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const mounths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let today = new Date(),
    day = today.getDay(),
    date = today.getDate(),
    mounth = today.getMonth(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  
  // Set AM or PM
  const amPm = hour >= 12 ? '<span>PM</span>' : '<span>AM</span>';
  
  // 12hr Format
  if (showAmPm){
    hour = hour % 12 || 12;
  }

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}${showAmPm ? amPm : ''}`;

  // Output Time
  days.innerHTML = `${week[day]}`;
  dates.innerHTML=`${date} ${mounths[mounth]}`

  time.onclick = () => {
    showAmPm= !showAmPm;
    
  }

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
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