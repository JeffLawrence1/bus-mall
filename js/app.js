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

Product.prototype.render = function(parentId, index){
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

function displayResults(){

}

function handleClick(event) {
  event.preventDefault();

  if(event.target.className === 'product'){
    totalVotesOnPage++;
    //PRODUCTS[productArray[currentProducts[]][1]].totalVotes++;
    //TODO if total clicks stop listening
    if(totalVotesOnPage === 25){
      //TODO remove eventlistener from container
      displayResults();
      return;
    }
    var parent = document.getElementById(event.target.id);
  
    //console.log(product1);
    //console.log(product1[0]);
    if (parent.childNodes) {
      //parent.replaceChild();
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

  for (let i = 0; i < currentProducts.length; i++) {
    PRODUCTS[productArray[currentProducts[i]][1]].render(`item_${i}`, i+1);
  }
}

addCurrentImages();
