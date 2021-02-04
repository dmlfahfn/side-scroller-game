let hero = document.getElementById("hero");
let enemy = document.getElementById("enemy");
const loserText = document.getElementById("loserText");
const lifeValue = document.querySelector(".lifeValue");
const scoreValue = document.querySelector(".scoreValue");
//let scoreValue = document.getElementById("scoreValue");
let counter = 0;
let bottom = 0;
let score = 0;
let life = 3;
let isJumping = false; // To only jump once.

// function for sound when page loading
window.onload = function () {
  document.getElementById("overWorld").play();
};
///////////////////////////////////////////////////
//skapa ett knapptryck som drar igpåg functionen för våran hero
document.addEventListener("keyup", function (e) {
  //only one key (ArrowUp) is needed for this game
  //console.log(e.key, hero);
  //console.log(e);
  switch (e.key) {
    case "ArrowUp":
      if (!isJumping) {
        isJumping = true;
        //hero.classList.add("heroStyle"); // class not existing
        //console.log("hi");
        goUp();
      }
      break;
    case "Space":
      moveLeft();
      break;
  }
});
///////////////////////////////////////////////////
// function för att hoppa endast 10px och sedan ner igen ....
function goUp() {
  //Janne's code, jumping function for the hero
  //counter = 0;
  let timer = setInterval(function () {
    counter++;
    bottom += 10;

    if (counter == 13) {
      clearInterval(timer);
      counter = 13;
      let timerDown = setInterval(function () {
        counter--;
        bottom -= 10;
        if (counter == 0) {
          clearInterval(timerDown);
          isJumping = false;
        }
        hero.style.bottom = bottom + "px";
        //console.log(hero.style.bottom);
      }, 40);
    }
    //console.log("Hej!" + counter);
    hero.style.bottom = bottom + "px";
    //console.log(hero.style.bottom);
  }, 40);
}
///////////////////////////////////////////////////
let lose = setInterval(function () {
  //we set of 10 sec, where we check the position of both blocks and if the collide we set game to be over
  let heroBottom = parseInt(
    // gör om string till nr
    window.getComputedStyle(hero).getPropertyValue("bottom")
  ); //getComputedStyle - taking all css propeties for hero, with getPropertyValue we are specifically taking the value of "bottom".

  let enemyLeft = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("left")
  );
  //getComputedStyle - taking all css propeties for enemy, with getPropertyValue we are specifically taking the value of "left".
  ///////////////////////////////////////////////////

  if (enemyLeft < 160 && enemyLeft > 60 && heroBottom < 50) {
    life--;
    //condition for checking the collision
    alert("you loses one life ,Now your life is : " + life);
    //console.log(life);
    lifeValue.innerHTML = life;
    if (life == 0) {
      enemy.style.animation = "none";
      alert("you lose");
      pauseAudio();
      gameOverAudio();
      loserText.innerHTML = "GAME OVER!";
    }
  }
}, 100);

///////////////////////////////////////////////////
let success = setInterval(function () {
  //we set of 10 sec, where we check the position of both blocks and if the collide we set game to be over
  let heroBottom = parseInt(
    window.getComputedStyle(hero).getPropertyValue("bottom")
  ); //getComputedStyle - taking all css propeties for hero, with getPropertyValue we are specifically taking the value of "bottom".
  let enemyLeft = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("left")
  );
  if (enemyLeft <= 0) {
    //console.log("score:",score);
    score++;
    scoreValue.innerHTML = score;
  }
}, 100);
// function for sound when Game Over
function gameOverAudio() {
  document.getElementById("gameover").play();
}
//function for pausing the sound befor game ends
function pauseAudio() {
  document.getElementById("overWorld").pause();
}
