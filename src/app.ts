#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
function stopAnimation() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}
async function welcomeScreen() {
  let title = chalkAnimation.rainbow("Welcome To The Game");

  await stopAnimation();
  title.stop();
}
await welcomeScreen();
function generateNum(): number {
  let randomNum = Math.floor(Math.random() * 10 + 1);
  // console.log(randomNum)
  return randomNum;
}
async function startGame() {
 
  let lives = 5;
  let points = 0;
  let randomNumber=generateNum()

  console.log(`You Got ${lives} lives and ${points} points! \nBetter Luck ;)`);
  do {
   
    var userChoice = await inquirer.prompt([
      {
        name: "guess",
        type: "input",
        message: "Select A Number Between 1-10:",
        
      },
    ]);
    
   if(!isNaN(userChoice.guess) || userChoice.guess<10||userChoice.guess>0){

   
    if (userChoice.guess == randomNumber) {
      console.log(`\nCongratulation he Number You Guessed Was Right!\nYou Got 10 Points And +1 Life!`);
      lives++;
      points+=10;
      console.log(`Lives: ${lives}\nPoints: ${points}\n`);
      randomNumber=generateNum();
      
    }
    else if(userChoice.guess<randomNumber){
        console.log(`\nOOps The Number You Guessed Was Too Low\nYou Have Encountered -10 Points And -1 Life!`);
      lives--;
      points-=10;
      console.log(`Lives: ${lives}\nPoints: ${points}\n`);
    }else if(userChoice.guess>randomNumber){
        console.log(`\nOOps The Number You Guessed Was Too High\nYou Have Encountered -10 Points And -1 Life!`);
      lives--;
      points-=10;
      console.log(`Lives: ${lives}\nPoints: ${points}\n`);
    }else{
        console.log("Invalid Input")
    }}
  } while (lives != 0);
}
await startGame();
console.log("\n\n\nGAME ENDED\n\n\n");


async function playAgain(){
    let decision = true;
    do{
        let askAgain=await inquirer.prompt([
            {
                name:"userDecision",
                type:"input",
                message:"Wanna Play Again?\nPress 'Y' Or Enter 'Yes' To Continue\nHit Enter To Exit!"
            }
        ])
        if(askAgain.userDecision=="Y"||askAgain.userDecision=="Yes"){
            decision=true;
            await startGame();
        }else{
            decision=false;
        }
    }while(decision);
}
await playAgain();
