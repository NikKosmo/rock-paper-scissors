function game() {
    let winCounter = 0;
    for (let i = 0; i < 5; i++) {
        let roundWon = playRound();
        if (roundWon) {
            winCounter++;
        }
    }
    console.log(`You won ${winCounter} out of 5 rounds.`)
}

function playRound() {
    let playersChoice = getPlayersChoice();
    let computerChoise = getComputerChoice();
    return compareChoises(playersChoice, computerChoise);
}

function compareChoises(playersChoise, computerChoise) {
    let capitalizedPlayerChoise = capitalize(playersChoise);
    if (capitalizedPlayerChoise == computerChoise) {
        console.log(`It's a draw. You both picked ${capitalizedPlayerChoise}.`)
        return playRound()
    }
    let didYouWin = false;
    switch (capitalizedPlayerChoise) {
        case ("Rock"):
            didYouWin = computerChoise == "Scissors";
            break;
        case ("Paper"):
            didYouWin = computerChoise == "Rock";
            break;
        case ("Scissors"):
            didYouWin = computerChoise == "Paper";
            break;
    }
    if (didYouWin) {
        console.log(`You Win! ${capitalizedPlayerChoise} beats ${computerChoise}.`);
    } else {
        console.log(`You Lose! ${computerChoise} beats ${capitalizedPlayerChoise}.`);
    }
    return didYouWin;
}

function getPlayersChoice() {
    return prompt("Write your option from Rock, Paper, Scissors", "Rock");
}

function getComputerChoice() {
    let randomCase = Math.floor(Math.random() * 3);
    switch (randomCase) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
    }
}

function capitalize(string) {
    let lowerCaseString = string.toLowerCase();
    return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.substring(1);
}