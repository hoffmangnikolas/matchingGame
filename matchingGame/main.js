var cardsArray = [
  {    'name': 'Babe Ruth',    'img': 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/BabeRuth.jpeg?raw=true',  },
  {    'name': 'Cristiano Ronaldo',    'img': 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/CristianoRonaldo.jpeg?raw=true',  },
  {    'name': 'Hank Aaron',    'img': 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/HankAaron.jpeg?raw=true',  },
  {    'name': 'Jackie Robinson',    'img': 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/JackieRobinson.jpeg?raw=true',  },
  {    'name': 'Joe Montana',    'img': 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/JoeMontana.png?raw=true',  },
  {    'name': 'Lebron James',    'img': 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/LebronJames.jpeg?raw=true',  },
  {    'name': 'Michael Jordan',    'img': 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/MichaelJordan.jpeg?raw=true',  },
  {    'name': 'Mickey Mantle',    'img': 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/MickeyMantle.jpg?raw=true',  },
  {    'name': 'Stephen Curry',    'img': 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/StephenCurry.jpg?raw=true',  },
  {    'name': 'Tim Duncan',    'img': 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/TimDuncan.jpeg?raw=true',  },
  {    'name': 'Tom Brady',    'img': 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/TomBrady.jpeg?raw=true',  },
  {    'name': 'Wayne Gretzky',    'img': 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/WayneGretzky.jpeg?raw=true',  },
];

//cardsArray[0].name; // 'Babe Ruth'
//cardsArray[1].img; // 'https://github.com/hoffmangnikolas/matchingGame/blob/main/matchingGame/img/BabeRuth.jpeg?raw=true'

//Duplicate `cardsArray` to create a match for the card
var gameGrid = cardsArray.concat(cardsArray);

//Randomize game grid on each load
gameGrid.sort(function() {
  return 0.5 - Math.random();
})

//Grab the div with an id of game-board & assign to a `var game`
var game = document.getElementById('game-board');

//Create a section element & assign it to the `var grid`
var grid = document.createElement('section');

//Give section element a class of `grid`
grid.setAttribute('class', 'grid');

//Append the grid section to the `div game-board`
game.appendChild(grid);

//Loop through each item in `var cardsArray`
for (i = 0; i < gameGrid.length; i++) {
  //create a `div element` & assign to `var card`
  var card  = document.createElement('div');
  //Apply a class of `card` to `div element`
  card.classList.add('card');
  //Set the data-name attribute of the div to the cardsArray name
  card.dataset.name = gameGrid[i].name;
  
  //Create front of card
  var front = document.createElement('div');
  front.classList.add('front');

  //Create back of card
  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${gameGrid[i].img})`;

  //Append card to grid
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
}

var firstGuess = '';
var secondGuess = '';

//Set count to 0
var count = 0;
var previousTarget = null;
var delay = 1200;

//Add match CSS
var match = function() {
  var selected = document.querySelectorAll('.selected');
  //loop through the array like object containing `selected` class
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.add('match');
  }
};

//Reset the guesses after two attempts
var resetGuesses = function() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.remove('selected')
  }
};

//Add event listener to grid
grid.addEventListener('click', function(event) {
  //Declare var to target our clicked item
  var clicked = event.target;

  //Do not allow the grid section itself to be selected;
  //only select divs inside the grid
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
    return;
  }

  //We only want to add `selected` class if the current count is less than 2
  if (count < 2) {
    count++;
    
    if (count === 1) {
      //Assign first guess
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      //Assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
    //If both guesses are not empty
    if (firstGuess !== '' && secondGuess !== '') {
      //And the firstGuess matches secondGuess
      if (firstGuess === secondGuess) {
        //Run the `match` function
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    previousTarget = clicked;
  }
});