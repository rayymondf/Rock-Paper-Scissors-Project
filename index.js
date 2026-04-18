let humanScore = 0
let computerScore = 0
let rounds = 1


function getComputerChoice(){
    let list = ["rock","paper","scissors"]
    let num = Math.floor(Math.random()*3)
    return list[num]
}
function getHumanChoice(){
  return prompt("Please enter 'rock', 'paper', or 'scissors':").toLowerCase()
}

function playRound(human,computer){
    if(human === computer){
        console.log(`Round ${rounds} Tie! Both players used ${human}. Redo round!`)
    }
    else if (
    (human === "rock" && computer === "scissors") ||
    (human=== "paper" && computer === "rock") ||
    (human === "scissors" && computer === "paper")){

        console.log(`Round ${rounds}, Human used ${human} and computer used ${computer}. Human wins!`)
        humanScore++
        rounds++
    }
    else{
        console.log(`Round ${rounds}, Human used ${human} and computer used ${computer}. Computer wins!`)
        computerScore++
        rounds++
    }
}

// console.log(getComputerChoice())
// console.log(getHumanChoice())


while (rounds<=5){
    playRound(getHumanChoice(),getComputerChoice())

}
console.log(`Human Score: ${humanScore}`)
console.log(`Computer Score: ${computerScore}`)