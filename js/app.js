'use strict';

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

var container = document.getElementById('container');
var totalVotesOnPage = 0;
var PRODUCTS = {};
var lastProducts = [];
var currentProducts = [];

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

}
var ol = document.getElementById('orderedResultList');

function displayResults(){
  // console.log(PRODUCTS['bag']);
  for(var i = 0; i < productArray.length; i++){
    // console.log(PRODUCTS[productArray[3][1]]);
    var li = document.createElement('li');

    li.textContent = `${PRODUCTS[productArray[i][1]].totalVotes} votes for ${PRODUCTS[productArray[i][1]].name}`;
    ol.appendChild(li);
  }
}

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

  var datasetItem = {
    data: [PRODUCTS[productArray[0][1]].totalVotes, PRODUCTS[productArray[1][1]].totalVotes, PRODUCTS[productArray[2][1]].totalVotes, PRODUCTS[productArray[3][1]].totalVotes, PRODUCTS[productArray[4][1]].totalVotes,
      PRODUCTS[productArray[5][1]].totalVotes, PRODUCTS[productArray[6][1]].totalVotes, PRODUCTS[productArray[7][1]].totalVotes, PRODUCTS[productArray[8][1]].totalVotes, PRODUCTS[productArray[9][1]].totalVotes,
      PRODUCTS[productArray[10][1]].totalVotes, PRODUCTS[productArray[11][1]].totalVotes, PRODUCTS[productArray[12][1]].totalVotes, PRODUCTS[productArray[13][1]].totalVotes, PRODUCTS[productArray[14][1]].totalVotes,
      PRODUCTS[productArray[15][1]].totalVotes, PRODUCTS[productArray[16][1]].totalVotes, PRODUCTS[productArray[17][1]].totalVotes, PRODUCTS[productArray[18][1]].totalVotes, PRODUCTS[productArray[19][1]].totalVotes],
    backgroundColor: backgroundColors,
  };

  var data = {
    labels: [PRODUCTS[productArray[0][1]].name, PRODUCTS[productArray[1][1]].name, PRODUCTS[productArray[2][1]].name, PRODUCTS[productArray[3][1]].name, PRODUCTS[productArray[4][1]].name,
      PRODUCTS[productArray[5][1]].name, PRODUCTS[productArray[6][1]].name, PRODUCTS[productArray[7][1]].name, PRODUCTS[productArray[8][1]].name, PRODUCTS[productArray[9][1]].name,
      PRODUCTS[productArray[10][1]].name, PRODUCTS[productArray[11][1]].name, PRODUCTS[productArray[12][1]].name, PRODUCTS[productArray[13][1]].name, PRODUCTS[productArray[14][1]].name,
      PRODUCTS[productArray[15][1]].name, PRODUCTS[productArray[16][1]].name, PRODUCTS[productArray[17][1]].name, PRODUCTS[productArray[18][1]].name, PRODUCTS[productArray[19][1]].name],
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

function handleClick(event) {
  // console.log(event.target.id);
  event.preventDefault();

  if(event.target.className === 'product'){
    totalVotesOnPage++;
    // console.log(totalVotesOnPage);
    // console.log(PRODUCTS[productArray[0][1]].name);
    // console.log(PRODUCTS[productArray[15][1]].totalVotes);
    PRODUCTS[event.target.id].totalVotes++;
    //TODO if total clicks stop listening
    if(totalVotesOnPage === 25){
      container.removeEventListener('click', handleClick);
      //TODO remove eventlistener from container
      displayResults();
      displayBarChart();
      return;
    }

    for (var j = 0; j < 3; j++) {
      var parent = document.getElementById(`item_${j}`);
      parent.removeChild(parent.lastChild);
      // console.log(parent);
    }
    addCurrentImages();
  }
}

container.addEventListener('click', handleClick);

for (var i = 0; i < productArray.length; i++) {
  new Product(productArray[i][0], productArray[i][1], productArray[i][2]);
}

function addCurrentImages(){
  randomImageSelector();

  for (var i = 0; i < currentProducts.length; i++) {
    PRODUCTS[productArray[currentProducts[i]][1]].render(`item_${i}`);
  }
}

addCurrentImages();
// console.log(totalVotesOnPage);


