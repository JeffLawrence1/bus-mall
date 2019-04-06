'use strict';
//array to store data
var productArray = [
  ['Bag', 'bag', './img/bag.jpg'],
  ['Banana', 'banana', './img/banana.jpg'],
  ['Bathroom', 'bathroom', './img/bathroom.jpg'],
  ['Boots', 'boots', './img/boots.jpg'],
  ['Breakfast', 'breakfast', './img/breakfast.jpg'],
  ['Bubblegum', 'bubblegum', './img/bubblegum.jpg'],
  ['Chair', 'chair', './img/chair.jpg'],
  ['Cthulhu', 'cthulhu', './img/cthulhu.jpg'],
  ['Dog and Duck', 'dogDuck', './img/dog-duck.jpg'],
  ['Dragon', 'dragon', './img/dragon.jpg'],
  ['Pen', 'pen', './img/pen.jpg'],
  ['Pet Sweep', 'petSweep', './img/pet-sweep.jpg'],
  ['Scissors', 'scissors', './img/scissors.jpg'],
  ['Shark', 'shark', './img/shark.jpg'],
  ['Sweep', 'sweep', './img/sweep.png'],
  ['Tauntaun', 'tauntaun', './img/tauntaun.jpg'],
  ['Unicorn', 'unicorn', './img/unicorn.jpg'],
  ['Usb', 'usb', './img/usb.gif'],
  ['Water Can', 'waterCan', './img/water-can.jpg'],
  ['Wine Glass', 'wineGlass', './img/wine-glass.jpg'],
];
//global vars
var container = document.getElementById('container');
var totalVotesOnPage = 0;
var PRODUCTS = {};
var lastProducts = [];
var currentProducts = [];
var curName = '';

var STATE_KEY = 'voteState';
var STATE_OBJ = {
  totalVotesOnPage: 0,
  lastProducts: [],
  currentProducts: [],
};
//constructor for PRODUCTS obj
function Product(name, HTMLid, imgURL){
  this.name = name;
  this.HTMLid = HTMLid;
  this.imgURL = imgURL;
  this.totalVotes = this.totalViews = 0;

  PRODUCTS[this.HTMLid] = this;
}

Product.prototype.clickPercent = function(){
  return this.totalVotes / this.totalViews;
};

Product.prototype.render = function(parentId){
  var parent = document.getElementById(parentId);

  var img = document.createElement('img');
  img.setAttribute('id', this.HTMLid);
  img.setAttribute('src', this.imgURL);
  img.setAttribute('class', 'product');

  parent.appendChild(img);
};
//randomimage selector function
function randomImageSelector(){
  currentProducts = [];

  while (currentProducts[2] === undefined) {
    var randomNum = Math.floor(Math.random() * productArray.length);

    if(lastProducts.includes(randomNum)){
      randomImageSelector();
    }else if(currentProducts.includes(randomNum)){
      randomImageSelector();
    }else{
      currentProducts.push(randomNum);
    }
  }
  lastProducts = currentProducts;
  STATE_OBJ.currentProducts = currentProducts;
  STATE_OBJ.lastProducts = lastProducts;

}
var ol = document.getElementById('orderedResultList');

//display results function
function displayResults(){

  for(var i = 0; i < productArray.length; i++){

    var li = document.createElement('li');
    li.textContent = `${PRODUCTS[productArray[i][1]].totalVotes} votes for ${PRODUCTS[productArray[i][1]].name}`;
    ol.appendChild(li);
  }
}
//chart creation
var chartDiv = document.getElementById('barChart');

function displayBarChart(){
  var canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'myChart');
  chartDiv.appendChild(canvas);

  var canvasChart = document.getElementById('myChart');
  var ctx = canvasChart.getContext('2d');

  var backgroundColors = [
    'rgba(255, 99, 132)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',
    'rgba(255, 99, 132)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',
    'rgba(255, 99, 132)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
  ];
  //------------------------------
  //dataSet and labels could be replaced by loading the keys in an array and passing it in
  //rather than hardcoding --- Adam's example from demo
  //----------------------------------------------

  var keys = Object.keys(PRODUCTS);
  var dataSets = [];
  var labels = [];

  for(var i = 0; i < keys.length; i++){
    dataSets.push(PRODUCTS[keys[i]].totalVotes);
    labels.push(PRODUCTS[keys[i]].name);
  }
  //------------------------------------------------
  var datasetItem = {
    data: dataSets,
    backgroundColor: backgroundColors,
  };

  var data = {
    labels: labels,
    datasets: [datasetItem]
  };

  var barChartConfig = {
    type: 'bar',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Vote Bar Chart'
      },
      legend: {
        display: false,
      }
    },
  };

  new Chart(ctx, barChartConfig);
}
//click handler
function handleClick(event) {

  event.preventDefault();

  if(event.target.className === 'product'){

    totalVotesOnPage++;
    PRODUCTS[event.target.id].totalVotes++;

    STATE_OBJ.totalVotesOnPage = totalVotesOnPage;
    curName = PRODUCTS[event.target.id].HTMLid;

    STATE_OBJ[curName] = PRODUCTS[event.target.id].totalVotes;
    if(totalVotesOnPage === 25){
      container.removeEventListener('click', handleClick);

      setStateToLocalStorage();
      displayResults();
      displayBarChart();
      return;
    }

    for (var j = 0; j < 3; j++) {
      var parent = document.getElementById(`item_${j}`);
      parent.removeChild(parent.lastChild);
    }
    addCurrentImages();
  }
}

container.addEventListener('click', handleClick);

//PRODUCTS obj builder/loader
for (var i = 0; i < productArray.length; i++) {
  new Product(productArray[i][0], productArray[i][1], productArray[i][2]);
}

//image adder
function addCurrentImages(){

  setStateToLocalStorage();
  randomImageSelector();

  for (var i = 0; i < currentProducts.length; i++) {

    PRODUCTS[productArray[currentProducts[i]][1]].render(`item_${i}`);
  }
}

//localstorage setter
function setStateToLocalStorage(){

  localStorage.setItem(STATE_KEY, JSON.stringify(STATE_OBJ));
}
//localstorage getter
function getStateFromLocalStorage(){

  var rawState = localStorage.getItem(STATE_KEY);

  STATE_OBJ = JSON.parse(rawState);
  currentProducts = STATE_OBJ.currentProducts;

  lastProducts = STATE_OBJ.lastProducts;
  totalVotesOnPage = STATE_OBJ.totalVotesOnPage;

  for(var i = 0; i < productArray.length; i++){

    curName = productArray[i][1];
    if(isNaN(STATE_OBJ[curName])){
      PRODUCTS[productArray[i][1]].totalVotes = 0;
    }else{
      PRODUCTS[productArray[i][1]].totalVotes = STATE_OBJ[curName];
    }
  }
}
//iffe to start the whole app
(function startBusMall(){

  if(localStorage[STATE_KEY] && JSON.parse(localStorage[STATE_KEY]).totalVotesOnPage < 25){
    getStateFromLocalStorage();
  }
  var RESET_OBJ = {
    totalVotesOnPage: 0,
    lastProducts: [],
    currentProducts: [],
  };

  localStorage.setItem(STATE_KEY, JSON.stringify(RESET_OBJ));

  addCurrentImages();

})();


