/*
Author: Arien Barley
Created: 20 October 2022
License: Public Domain
*/

var osAndXs = {
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
                document.write("Something fucked up.")
        }
    },// end num to char

    print_board: function(){
        //prints the board of the
        //tickTackToe game to the document
        //step through rows
        document.write("<br>Turn: ", osAndXs.turn, "<br>");
        document.write("  |a|b|c| <br>");
        for (let i = 0; i<3; i++){
            document.write("—————————<br>");
            //step through columns
            document.write((i+1).toString()+":");
            for (let j = 0; j<3; j++){
                document.write("|");
                //write the chatecter corresponding to the number
                document.write(osAndXs.num_to_char(osAndXs.board[i][j]));
            }//end col stepper
            document.write("|<br>")
        }//end row stepper
        document.write("—————————<br>");
    },//end print board


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
        for (let i=0; i<n;i++){
            if (arrays[i].includes(-1)){
                continue;
            }else if (arrays[i].includes(0)){
                if (arrays[i].includes(1)){
                    continue;
                }else{
                    winner = 0;
                }
            }else{
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
        //rotate it
        var rotated = [];
        for (let j = 0; j<3; j++){
            rotated.push([osAndXs.board[0][j],
                        osAndXs.board[1][j],
                        osAndXs.board[2][j]
                    ]);
        }
        winner = osAndXs.check_arrays(rotated,3,winner);
        //check diagonals
        winner = osAndXs.check_arrays([[osAndXs.board[0][0], osAndXs.board[1][1], osAndXs.board[2][2]],
                                        [osAndXs.board[0][2],osAndXs.board[1,1],osAndXs.board[2][0]]],
                                        2,winner);
        if ((winner == -1) && (osAndXs.check_board_full())){
             winner = 10;
        }
        osAndXs.winner = winner;
    },//end check for winner


    check_move: function(move){
        //takes an array ex ['a','1'], move and
        //returns weather it is a valid move or not
        rows = ['1','2','3'];
        cols = ['a','b','c'];
        //check user input
        if (cols.includes(move[0]) && rows.includes(move[1])) {
            //check if square is free
            //converts move to [row,col] form
            coords = osAndXs.input_to_coord(move);
            console.log(coords);
            console.log(osAndXs.board[coords[0] ][ coords[1]]);
            if (osAndXs.board[ coords[0] ][ coords[1] ] == -1){
                return "Valid";
            }else{
                return "Tyle is not free.";
            }
        }else{
            return "Input Error.";
        }
    },//end check_move

    take_turn: function(){

        if (osAndXs.turn % 2 == 0){
            player = 'O';
        }else{
            player = 'X';
        }

        var move = window.prompt(player +
            ", choose a square, for example 'a1' or 'b3' or 'c2' etc : ");

        console.log("move = ", move);
        //turn move string to array
        move = move.split('');
        move = [move[0],move[1]];

        console.log(move)
        moveStatus = osAndXs.check_move(move);
        console.log("moveStatus=",moveStatus)
        //loops until player makes a valid choice
        while (moveStatus != "Valid"){
            move = window.prompt(moveStatus+" "+player+", Please try again: " );
            //turn move string to array of chars
            move = move.split('');
            move = [move[0],move[1]];

            moveStatus = osAndXs.check_move(move);
        }//end while

        move = osAndXs.input_to_coord(move);
        osAndXs.board[move[0]][move[1]] = osAndXs.turn%2;
        osAndXs.turn++;
    },//end take turn
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
                document.write("<br>no-one won :((<br>");
                break;
            case 0:
                document.write("<br>Well Done O!! You win :)<br>");
                break;
            case 1:
                document.write("<br>Well Done X!! You win :)<br>");
                break;
            default:
                document.write("ut oh im confusned");
        }//end switch


    },//end game_loop
}//end tickTackToe
osAndXs.game_loop();
