/*
Author: Arien Barley
Created: 20 October 2022
License: Public Domain
*/

var osAndXs = {
    //game of noughts and crosses
    //initialisation

    board: [[-1,-1,-1],
            [-1,-1,-1],
            [-1,-1,-1],],

    turn: 0,
    winner: -1,
    //functions
    //conversion functions
    input_to_coord: function(move){
        //takes an array move (ex: ['a', '2']) and
        //returns result, the corresponding coordinates
        //(ex: [1,0])
        var result = []
        switch (move[1]) {
            case '1':
                result.push(0);
                break;
            case '2':
                result.push(1);
                break;
            case '3':
                result.push(2)
                break;
            default:
        }//end switch
        switch (move[0]) {
            case 'a':
                result.push(0);
                break;
            case 'b':
                result.push(1);
                break;
            case 'c':
                result.push(2)
                break;
            default:

        }//end switch
        console.log("result=",result);
        return result;
    },//end input to coord

    num_to_char: function(num){
        switch(num){
            case -1:
                return " ";
                break;
            case 0:
                return "O";
                break;
            case 1:
                return "X";
                break;
            default:
                osAndXs.update_gameboard("Something fucked up.");
        }
    },// end num to char


    turn_to_player: function(){
        if (osAndXs.turn % 2 == 0){
            player = 'O';
        }else{
            player = 'X';
        }
        return player;
    },//end turn to player

    //display functions
    reset: function(){
        osAndXs.board = [[-1,-1,-1],
                [-1,-1,-1],
                [-1,-1,-1],];

        osAndXs.turn = 0;
        osAndXs.update_gameboard(osAndXs.print_board());
    },

    print_board: function(){
        //generates a HTML freindly string of the board
        //of the tickTackToe game to be printed to the document
        //step through rows
        var boardString = '';
        boardString += "<br>Turn: " + (osAndXs.turn).toString() + "<br>";
        boardString += "  |a|b|c| <br>";
        for (let i = 0; i<3; i++){
            boardString += "—————————<br>";
            //step through columns
            boardString += (i+1).toString()+":";
            for (let j = 0; j<3; j++){
                boardString += "|";
                //write the chatecter corresponding to the number
                boardString += osAndXs.num_to_char(osAndXs.board[i][j]);
            }//end col stepper
            boardString += "|<br>"
        }//end row stepper
        boardString += "—————————<br>";
        return boardString;
    },//end print board

    update_gameboard: function(text){
        //function to easily writte text to the div where the game is played
        document.getElementById("gameboard").innerHTML = "<pre>" +
                        text + "</pre>";
    },

    //gameplay functions
    check_board_full: function(){
        //checks if there are still valid moves

        //step through rows
        var full = true;
        for (let i=0; i<3;i++){
            if (osAndXs.board[i].includes(-1)){
                full = false;
            }else{
                console.log("row: ",i," full")
            }//endif
        }//endfor
        return full;
    },//end check board full

    check_arrays: function(arrays,n,winner){
        //arrays is an array of arrays to be checked for an array that only
        //includes 1s or only includes 0s
        //num is a flag to tell the program the number of arrays that have
        // been passed
        //returns -1 if there is no complete row of 1s or 0s
        //and 1 if there is a complte row of 1s and 0 similarly
        //step through arrays
        console.log("arrays passed to check arrays= ",arrays);
        for (let i=0; i<n;i++){

            if (arrays[i].includes(-1)){
                //not a winning line if the it contains an empty
                continue;
            }else if (arrays[i].includes(0)){

                if (arrays[i].includes(1)){
                    //not a winning line if it contains both a o and an x
                    console.log(arrays[i]);
                    console.log(winner);
                    continue;
                }else{
                    //if line contains only Os O has won
                    winner = 0;
                    console.log("only 0s?:",arrays[i]);
                    console.log(winner);
                };
            }else{
                //if line does not include blanks or Os then it is all Xs
                //so X has won
                winner = 1;
            }
        }//.end for
        return winner;
    },//end check three arrays

    check_for_winner: function(){
        //checks if there is a complete row, column or diagonal of 1s or 0s
        //returns the number that makes up the winning row or col
        //or -1 otherwise

        //check rows
        var winner = osAndXs.check_arrays(osAndXs.board, 3,-1);
        //rows have been checked

        //check columns
        //rotate the board and pass it to check_arrays
        var rotated = [];
        for (let j = 0; j<3; j++){
            rotated.push([osAndXs.board[0][j],
                        osAndXs.board[1][j],
                        osAndXs.board[2][j]
                    ]);
        }
        winner = osAndXs.check_arrays(rotated,3,winner);

        //check diagonals
        winner = osAndXs.check_arrays([ [ osAndXs.board[0][0], osAndXs.board[1][1], osAndXs.board[2][2] ],
                                        [osAndXs.board[0][2], osAndXs.board[1][1] ,osAndXs.board[2][0]]
                                        ], 2, winner);


        if ((winner == -1) && (osAndXs.check_board_full())){
             winner = 10;
        };

        osAndXs.winner = winner;
    },//end check for winner


    check_move: function(move){
        //takes an array ex ['a','1'], move and
        //returns weather it is a valid move or not
        rows = ['1','2','3'];
        cols = ['a','b','c'];
        //check user input
        if (cols.includes(move[0]) && rows.includes(move[1])) {
            //converts move to [row,col] form
            coords = osAndXs.input_to_coord(move);
            //check if square is free
            if (osAndXs.board[ coords[0] ][ coords[1] ] == -1){
                return "Valid";
            }else{
                return "Tyle is not free.";
            }
        }else{
            return "Input Error.";
        };
    },//end check_move

    take_turn: function(){

        player = osAndXs.turn_to_player();;
        //take input of players move
        var move = window.prompt(player +
            ", choose a square, for example 'a1' or 'b3' or 'c2' etc : ");

        //turn move string to array of chars
        move = move.split('');
        move = [move[0],move[1]];

        //check move is valid
        moveStatus = osAndXs.check_move(move);
        //loops until player makes a valid choice
        while (moveStatus != "Valid"){
            move = window.prompt(moveStatus+" "+player+", Please try again: " );

            //turn move string to array of chars
            move = move.split('');
            move = [move[0],move[1]];

            //check move is valid
            moveStatus = osAndXs.check_move(move);
        }//end while

        //update game
        move = osAndXs.input_to_coord(move);
        osAndXs.board[move[0]][move[1]] = osAndXs.turn%2;
        osAndXs.turn++;
    },//end take turn

    //computer functions
    computer_check_move: function(){

    },

    computer_get_moves: function(){
        var valid_moves = [],
        board = osAndXs.board
        for (var i = 0; i<board.length; i++){
            for (var j = 0; j<board[i].length;i++){
                if (board[i][j]<0){
                    valid_moves.push([i,j]);
                };
            };
        };
        return valid_moves;
    },


    computer_turn_easy: function(){
        //basic function that chooses a non-loosing position for the computer to play
        //get possible moves
        moves = osAndXs.computer_get_moves()

        //pick a move

        //check move

        //finish turn
    },

    //end computer functions


    board: [[-1,-1,-1],
            [-1,-1,-1],
            [-1,-1,-1],],

    next_turn: function(){

        //take a turn
        osAndXs.take_turn();

        //check if there is a winner
        osAndXs.check_for_winner();

        switch (osAndXs.winner) {
            case 10:
                osAndXs.update_gameboard(osAndXs.print_board() +"<br>no-one won :((<br>");
                break;
            case 0:
                osAndXs.update_gameboard(osAndXs.print_board() +"<br>Well Done O!! You win :)<br>");
                break;
            case 1:
                osAndXs.update_gameboard(osAndXs.print_board() +"<br>Well Done X!! You win :)<br>");
                break;
            default:
                console.log("no winner yet...")
                osAndXs.update_gameboard(osAndXs.print_board() + "<br>" +
                 osAndXs.turn_to_player() +", take your turn.")
        }//end switch
    },//end next turn
}//end tickTackToe


//buttons for the game to be played on the page

//to start the game
let resetButton = document.getElementById("reset");

resetButton.addEventListener('click', event => {
    osAndXs.reset();
});

//to take the next turn
let nextTurn = document.getElementById("next-turn-button");
console.log(nextTurn);
nextTurn.addEventListener('click', event => {
    osAndXs.next_turn();
});


/*
Author: Arien Barley
Created: 20 October 2022
License: Public Domain
*/
function shuffleArray(arr){
    //shuffles the passed array
    for(var i= arr.length -1;i>0;i--){
        //pick a random element from the array before
        //index i
        var j = Math.floor(Math.random() * (i+1));
        //swap elements i and j in nameArray
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }//end for
    return arr
}
//name sorting stuff for lab7
//functions
function fixUserName(name, method) {
    console.log("name = ", name);
    //split string to an array of characters
    var nameArray = name.split('');
    console.log("nameArray = ", nameArray);

    switch (method) {
        case 'sort':
            // sort nameArray
            var fixedNameArray = nameArray.sort();
            break;
        case 'shuffle':
            // thanks to ashleedawg on stack overflow for this algorithm
            //shuffle nameArray
            //step from the end of nameArray choosing a random
            //to the beggining, choosing a random element from
            //the positions before i to go into position i
            var fixedNameArray = nameArray
            console.log('fixed = ',fixedNameArray);
            for(var i= fixedNameArray.length -1;i>0;i--){
                //pick a random element from the array before
                //index i
                var j = Math.floor(Math.random() * (i+1));
                //swap elements i and j in nameArray
                var temp = fixedNameArray[i];
                fixedNameArray[i] = fixedNameArray[j];
                fixedNameArray[j] = temp;
            }//end for

            break;
        default:
            console.log("something must have gond wrong...");
    }

    //turn it back into a string
    var nameFixed = fixedNameArray.join('');
    console.log('fixed = ',fixedNameArray);
    return nameFixed;
}//end fixusername

// to run the program
let sortButton = document.getElementById("sort");

sortButton.addEventListener('click', event => {
    //get userName
    var rawform = document.getElementById("helloForm");
    console.log("rawform = ",rawform);
    name = rawform[0].value;
    //fix it
    nameSorted = fixUserName(name,'sort');
    //write it
    document.getElementById("name-sort-output").innerHTML = "<pre>Wrong: " +
                            name+"\nFixed: "+nameSorted+"</pre>";
});

let shuffleButton = document.getElementById('shuffle');

shuffleButton.addEventListener('click', event => {
    //get userName
    var rawform = document.getElementById("helloForm");
    console.log("rawform = ",rawform);
    var name = rawform[0].value;

    //fix it
    var nameShuffled = fixUserName(name,'shuffle');

    //write it
    document.getElementById("name-sort-output").innerHTML = "<pre>Wrong: " +
                            name+"\nFixed: "+nameShuffled+"</pre>";
});


breakerArray = [[0,1,0],
                [1,1,0],
                [0,0,1]];
/* code dump

game_loop: function(){
    //loops until the game is complete
    while (osAndXs.winner == -1){
        //print board
        osAndXs.print_board();
        //take a turn
        osAndXs.take_turn();
        console.log("winner = ",osAndXs.winner);
        //check if there is a winner
        osAndXs.check_for_winner();
        console.log("winner = ",osAndXs.winner);

    }//end while

    osAndXs.print_board();

    //output the winner
    switch (osAndXs.winner) {
        case 10:
            osAndXs.update_gameboard("<br>no-one won :((<br>");
            break;
        case 0:
            osAndXs.update_gameboard("<br>Well Done O!! You win :)<br>");
            break;
        case 1:
            osAndXs.update_gameboard("<br>Well Done X!! You win :)<br>");
            break;
        default:
            osAndXs.update_gameboard("ut oh im confusned");
    }//end switch


},//end game_loop
*/
