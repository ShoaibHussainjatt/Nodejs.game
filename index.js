// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Enter the bet amount 
// 4. Spin the slot machine
// 5. check if the user won 
// 6. give the user their winnings
// 7. play again 

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

 // These objects allows us to have keys mapped with diff value 
//Obejcts allows you to have properties / attributes / keys ...
const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}
const SYMBOLS_VALUES = { // MULTIPLIER * COUNT*VALUES 
    "A":5,
    "B":4,
    "C":3,
    "D":2
}

const deposit = () => {
    while(true) {
    const depositAmount = prompt ("Enter a deposit amount:  ")
    const numberDepositAmount = parseFloat(depositAmount);

     if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid deposit amount, try again.");
     } else {
        return numberDepositAmount;
    } 
}
};
// Here we are entering the deposit amount and storing into the function(const depositAmount)
// Then we are getting the value from user by using the prompt variable
//Converts a string to a floating-point number. parseFloat
// The if statemnt gets the function isNaN to check the right value is inserted
const getNumberOFLines = () => {
    while(true) {
    const lines = prompt ("Enter the number of lines to bet on (1-3):  ");
    const numberOFLines = parseFloat(lines);

     if (isNaN(numberOFLines) || numberOFLines <= 0 || numberOFLines > 3){
        console.log("Invalid number of lines, try again.");
     } else {
        return numberOFLines;
    } 
}
};

const getBet = (balance, lines) => {
    while(true) {
        const bet = prompt ("Enter the bet per line :  ");
        const numberBet = parseFloat(bet);
    
         if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
            console.log("Invalid bet, try again.");
         } else {
            return numberBet;
        } 
    }
 };

 const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){ //add the count to the symbol array
    for (let i = 0; i < count; i++){
        symbols.push(symbol);
    }
   
    }
    //(1)Generate whatever is inside of the nested arrays
    //nested for-loops are used here bcs we have nested arrays ---> 
    //Nested arrays can be used to represent data structures like trees. 
    //Each nested array represents a node in the tree, and it can have its own nested arrays as children.
    const reels = []; 
    for (let i =0; i< COLS; i++){  //(1)
        reels.push([]);
        const reelSymbols = [...symbols]; //craeting another vrb- reelSymbols   
      for (let j =0; j < ROWS; j++){    
        const randomIndex = Math.floor(Math.random() * reelSymbols.length)
        const selectedSymbol = reelSymbols[randomIndex] // generating a random index 
        reels[i].push(selectedSymbol); // push the selectedSymbol to the reels [i]
        reelSymbols.pop(randomIndex,1);  // take 1 each time down so don't reuse the element again in stack of array
    }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i<ROWS; i++){
        rows.push([]);
        for(let j=0; j< COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}

const printRows = (rows) =>{
    for (const row of rows){
        let rowString = "";
        for(const[i,symbol]of row.entries()){
            rowString += symbol
            if (i != row.length){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet,lines) =>{
    let winnings = 0;

    for (let row =0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true; //we won

        for (const lol of symbols){
            if (lol != symbols[0]){
                allSame = false; //we lost. the letters didn't match in rows
                break;
            }
        }
        if (allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
}


const game = () =>{
let balance = deposit(); //returning the fucntion into the terminal

while (true){
    console.log("You have a balance of £" + balance);
const numberOFLines = getNumberOFLines();
const bet = getBet(balance, numberOFLines)
balance -= bet * numberOFLines
const reels = spin();
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows,bet,numberOFLines)
balance += winnings;
console.log("You won, £" + winnings.toString());

if (balance <= 0){
    console.log("You ran out of money");
    break;
} 
 const playAgain = prompt("Do you want to play again (y/n)? ");
 if (playAgain != "y") break;
}
};

ganme();