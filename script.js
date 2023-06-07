setUpRound();

function setUpRound() {
    resetField();
}

function registerPlayersChoice(playersChoiceEvent) {

    let playersSign = document.querySelector(`#${playersChoiceEvent.currentTarget.id}`);
    playersSign.classList.add("selected-sign");
    let computerChoice = getComputerChoice();
    let opponentSing = document.querySelector(`#opponents-${computerChoice.toLowerCase()}`);
    opponentSing.classList.add("selected-sign");
    let notSelectedSigns = document.querySelectorAll(`.sign:not(.selected-sign)`);
    notSelectedSigns.forEach(sign => sign.classList.add("non-selected-sign"))
    let playersChoice = capitalize(playersSign.id);
    let roundResult = compareChoises(playersChoice, computerChoice);
    showRoundResult(roundResult, playersChoice, computerChoice);
    addNewRoundBurron();
}

function addNewRoundBurron() {
    const newRoundButton = document.createElement("button");
    newRoundButton.textContent = "New round";
    newRoundButton.addEventListener("click", resetField);
    let resultElement = document.querySelector(`#round-result`);
    resultElement.appendChild(newRoundButton);
}

function resetField() {
    let resultElement = document.querySelector(`#round-result`);
    let newRoundButton = document.querySelector(`#round-result button`);
    if (newRoundButton != null) {
        resultElement.removeChild(newRoundButton);
    }
    let resultParagraph = document.querySelector(`#round-result p`);
    resultParagraph.textContent = "";
    const playersSigns = document.querySelectorAll("#players-choice > .sign");
    playersSigns.forEach(sign =>
        sign.addEventListener("click", registerPlayersChoice, { once: true }));
    const signs = document.querySelectorAll(".sign");
    signs.forEach(sign =>
        sign.classList.remove("selected-sign", "non-selected-sign"));
}

function removeSignListeners() {
    const playersSigns = document.querySelectorAll("#players-choice > .sign");
    playersSigns.forEach(sign =>
        sign.removeEventListener("click", registerPlayersChoice));
}

function compareChoises(playersChoice, computerChoice) {
    if (playersChoice == computerChoice) {
        return "Draw"
    }
    let youWon = false;
    switch (playersChoice) {
        case ("Rock"):
            youWon = computerChoice == "Scissors";
            break;
        case ("Paper"):
            youWon = computerChoice == "Rock";
            break;
        case ("Scissors"):
            youWon = computerChoice == "Paper";
            break;
    }
    return youWon ? "Win" : "Lose";
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

function showRoundResult(roundResult, playersChoice, computerChoice) {
    let resultElement = document.querySelector(`#round-result p`);
    switch (roundResult) {
        case "Draw":
            resultElement.textContent = `It's a Draw!\r\nYou both picked ${playersChoice}.`;
            break;
        case "Win":
            resultElement.textContent = `You Win!\r\n${playersChoice} beats ${computerChoice}.`;
            break;
        case "Lose":
            resultElement.textContent = `You Lose!\r\n${computerChoice} beats ${playersChoice}.`;
            break
    }
}

function capitalize(string) {
    let lowerCaseString = string.toLowerCase();
    return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.substring(1);
}