window.onload = function () {
  let lives = 6; //number of lives
  let numLetters = 5; //length of the word

  let row = 0; //current guess (attempt #)
  let col = 0; //current letter for that attempt

  let = gameOver = false;
  let randomWord = "SQUID";

  initialize();
  function initialize() {
    //create the game board
    for (let r = 0; r < lives; r++) {
      for (let c = 0; c < numLetters; c++) {
        // <span id="0-0" class="tile">P</span>
        let tile = document.createElement("span");
        tile.id = r.toString() + "-" + c.toString();
        tile.classList.add("tile");
        tile.innerText = "";
        document.getElementById("board").appendChild(tile);
      }
    }
  }

  // Listen to key press
  document.addEventListener("keyup", (e) => {
    if (gameOver) return;

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < numLetters) {
        let currTile = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        if (currTile.innerText == "") {
          currTile.innerHTML = e.code[3];
          col += 1;
        }
      }
    } else if (e.code == "Backspace") {
      if (0 < col && col <= numLetters) {
        col -= 1;
      }
      let currTile = document.getElementById(
        row.toString() + "-" + col.toString()
      );
      currTile.innerText = "";
    } else if (e.code == "Enter") {
      update();
      row += 1; //start new row
      col = 0; //start at zero
    }

    if (!gameOver && row == lives) {
      gameOver = true;
      document.getElementById("answer").innerText = randomWord;
    }
  });

  function update() {
    let correct = 0;
    for (let c = 0; c < numLetters; c++) {
      let currTile = document.getElementById(
        row.toString() + "-" + c.toString()
      );
      let letter = currTile.innerText;

      //Is it in the correct position?
      if (randomWord[c] == letter) {
        currTile.classList.add("correct");
        correct += 1;
      } else if (randomWord.includes(letter)) {
        currTile.classList.add("present");
      } else {
        currTile.classList.add("absent");
      }

      if (correct == numLetters) {
        gameOver = true;
      }
    }
  }
};
