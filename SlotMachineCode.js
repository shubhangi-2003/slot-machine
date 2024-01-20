//1. Deposit some money
//2. Determine number of lines to bet on
//3. Collect bet amount
//4. spin the slot machine
//5. check if the user has won 
//6. give user their winnings
//7. play again

const prompt = require("prompt-sync")(); //calling the prompt sync module

//Global variables:

const ROWS = 3;
const COLS = 3;

//4.1 Objects that saves value with symbols as keys 

const SYMBOLS_COUNT = { 
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOL_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}

//1. deposit function asks user to input amount of deposit money

const deposit = () => {
    while (true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
        
            if(isNaN(numberDepositAmount) || numberDepositAmount <=0) {
            console.log("Invalid deposit amount, try again!");
        }
            else{
            return numberDepositAmount; //breaks the while loop returning value
        }
        }
    };

    


//2. getting the number of lines to bet on

const getNumberOfLines = () => {
    while (true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);
        
            if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3) {
            console.log("Please choose between 1 to 3, try again!");
        }
            else{
            return numberOfLines; //breaks the while loop returning value
        }
        }
};
       

//3. Collecting bet amount based on balance and bet lines

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again.");
    } else {
      return numberBet;
    }
  }
};

//4.2 Spinning the slot machine

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
      for (let i = 0; i < count; i++) {
        symbols.push(symbol);
      }
    }

    //nested array for columns of the slot machine
    const reels = [];
    for(let i = 0; i < COLS; i++)
    {   
        reels.push([]);
        const reelSymbols = [...symbols]; //shallow copy of symbols to manipulate
        for(let j = 0; j < ROWS; j++)
        {
            //random selection of an index
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];

            reels[i].push(selectedSymbol); //pushing the random index
            reelSymbols.splice(randomIndex,1); //removing selected index
        }
    }
    return reels;
};

//5. Check if the user won

const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i < ROWS; i++)
    {
        rows.push([]);
        for(let j = 0; j < COLS; j++)
        {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

    //print rows
    const printRows = (rows) => {
        for(const row of rows)
        {
            let rowString = "";
            for(const[i,symbol] of row.entries())
            {
                rowString += symbol 
                if(i != row.length-1) {
                    rowString += " | "
                }
            }
            console.log(rowString);
        }
    };

    const getWinnings = (rows, bet, lines) => {
        let winnings = 0;
      
        for (let row = 0; row < lines; row++) {
          const symbols = rows[row];
          let allSame = true;
      
          for (const symbol of symbols) {
            if (symbol != symbols[0]) {
              allSame = false;
              break;
            }
          }
      
          if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
          }
        }
      
        return winnings;
      };

     const game = () => {
        let balance = deposit();

        while(true){
            console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance,numberOfLines);
        balance -= bet * numberOfLines; 
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if(balance <= 0)
        {
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again? (y/n)");

        if(playAgain != "y") break;
    }
     }
        game();

    