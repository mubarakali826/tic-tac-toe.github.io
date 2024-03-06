const heading = document.querySelector("h2");
const boxes = document.querySelectorAll(".box");
const outer = document.querySelector(".outer");
const inner = document.querySelectorAll(".inner");
const refresh = document.querySelector(".refresh");
const gameOn = document.getElementById("initialize");
const start = document.getElementById("start");
const initializeText = document.querySelector("h4");
const form = document.querySelector("form");
const names = document.querySelectorAll(".name");
const span = document.querySelector("span");
const signs = document.querySelector(".signs");
const ps=document.querySelectorAll(".p");


let player1;
let player2;

outer.style.pointerEvents="none";
start.addEventListener("click", (e) => {
  e.preventDefault();
  player1 = names[0].value;
  player2 = names[1].value;
  if (player1 === "" || player2 === "") {
    span.classList.add("show");
  } else {
    outer.style.pointerEvents="auto";
    heading.style.fontWeight="bold"
    signs.style.opacity="100%";
    
    ps[0].innerText=player1+" : O";
    ps[0].style.color="aqua";
    ps[1].innerText=player2+" : X";
    ps[1].style.color="white";


    
 
    heading.innerText="Start Game";
    heading.style.color="rgb(159, 161, 211)"
    setTimeout(startGame,1);
    function startGame(){
      outer.style.backgroundColor = "rgb(202, 202, 202)";
    for (i of inner) {
      i.style.backgroundColor = "rgb(202, 202, 202)";
    }
    }
    setTimeout(function() {
      outer.style.backgroundColor = "#1b1e23"; // Revert to default background color
      for (i of inner) {
          i.style.backgroundColor = "#1b1e23"; // Revert to default background color
      }
  }, 400);
    span.classList.remove("show");
    gameOn.style.opacity = "100%";
    initializeText.style.opacity = "0";
    start.style.opacity = "0";
    form.style.opacity = "0 ";
  }
});

var currentPlayer = player1;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

gameOn.addEventListener("click", (e) => {
  e.target.style.opacity = "0";
  initializeText.style.opacity = "0";
  start.style.opacity = "100%";
  form.style.opacity = "100%";
  signs.style.opacity="0";

});
// Function to check for a winner
function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      return true; // Return true if a winning combination is found
    }
  }
  return false; // Return false if no winning combination is found
}

for (let box of boxes) {
  box.addEventListener("click", (e) => {
    if (e.target.innerText === "") {
      if (currentPlayer === player1) {
        e.target.style.color = "aqua";
        e.target.innerText = "O";
        currentPlayer = player2;
        heading.innerText = player2 + "'s " + "Turn";
        heading.style.color = "white";
        if (checkWinner()) {
          heading.innerText = player1 + " wins!";
          heading.style.color = "green";
          heading.style.fontSize = "80px";
          outer.style.backgroundColor = "green";
          for (i of inner) {
            i.style.backgroundColor = "green";
          }
          for (box of boxes) {
            box.style.pointerEvents = "none";
          }
          return;
        }
      } else {
        e.target.innerText = "X";
        currentPlayer = player1;
        heading.innerText = player1 + "'s " + "Turn";
        heading.style.color = "aqua";
        if (checkWinner()) {
          heading.innerText = player2 + " wins!";
          heading.style.color = "green";
          outer.style.backgroundColor = "green";
          heading.style.fontSize = "80px";
          for (i of inner) {
            i.style.backgroundColor = "green";
          }
          for (box of boxes) {
            box.style.pointerEvents = "none";
          }
          return;
        }
      }
    }
  });
}
refresh.addEventListener("click", () => {
  for (i of inner) {
    i.style.backgroundColor = "#1b1e23";
  }
  outer.style.backgroundColor = "#1b1e23";
  heading.style.color = "white";
  heading.innerText = "TIC TAC TOE";
  for (box of boxes) {
    box.style.pointerEvents = "auto";
    box.innerText = "";
    box.style.color="white"
  }
  heading.style.fontSize = "40px";
  currentPlayer = player1;
  
});
