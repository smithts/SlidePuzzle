"use strict";

(function() {
        var emptyX = 300; // x coordinate of empty space
        var emptyY = 300; // y coordinate of empty space
        var TOTAL_ROWS_COLS = 4;
        var PIECE_SIZE = 100;
        var totalMoves = 0;
        var emotion = "";
        
        window.addEventListener('load', function() {
            putPuzzle();
            
            updateMoves();
            
            document.getElementById('shufflebutton').addEventListener('click', shuffle);
                        
            var pieces = document.getElementById('puzzlearea').getElementsByTagName('div');
            
            for (var i = 0; i < pieces.length; i++) {
                pieces[i].addEventListener('click', moveHelper);
                pieces[i].addEventListener('mouseout', unselect);
                pieces[i].addEventListener('mouseover', select);
            }
            
        });
        
        function updateMoves() {
                if (totalMoves >= 0 && totalMoves <= 100) {
                        emotion = ": )"
                } else if (totalMoves <= 200) {
                        emotion = ": |";
                } else {
                        emotion = ": (";
                }
                document.getElementById('moves').innerHTML = "Total Moves: " + totalMoves;
                document.getElementById('emotion').innerHTML = emotion;
        }
        
        // Places the pieces of the puzzle in the right place and adds them to the HTML.
        // Also assigns the correct position for the background image for each piece.
        function putPuzzle() {
            for (var i = 0; i < TOTAL_ROWS_COLS; i++) {
                for (var j = 1; j <= TOTAL_ROWS_COLS; j++) { // adds 16 pieces to the puzzle
                    var piece = document.createElement("div");
                    piece.classList.add("piece");
                    var id = j + TOTAL_ROWS_COLS * i;
                    piece.id = id;
                    piece.innerHTML = id;
                    
                    // assigns background position using the row and column given and the piece size
                    piece.style.backgroundPosition = -(PIECE_SIZE) * (j - 1) + "px "+ -(i * (PIECE_SIZE)) + "px";
                   
                    // assigns overall position in puzzle using row and column
                    piece.style.top = (i * PIECE_SIZE) + "px";
                    piece.style.left = PIECE_SIZE * (j - 1) + "px";
                   
                    document.getElementById("puzzlearea").appendChild(piece);
                }
            }
            //removes the 16th piece of puzzle, leaving the empty space.
            document.getElementById("puzzlearea").removeChild(document.getElementById('16'));
        }
        
        // Used to allow the passing of a parameter into the move function.
        function moveHelper() {
            move(this);
        }
        
        // If piece is a valid move, this function moves that piece to where the empty
        // piece used to be, and reassigns values for the empty piece.
        function move(tile) {
            if (isValidMove(parseInt(tile.style.top), parseInt(tile.style.left))) {
                var x = parseInt(tile.style.left);
                var y = parseInt(tile.style.top);
                tile.style.left = emptyX + "px";
                tile.style.top = emptyY + "px";
                emptyX = x;
                emptyY = y;
                totalMoves += 1;
                updateMoves();
            }
            
        }
        
        // Highlights the pieces that are valid moves
        function select() {
            if (isValidMove(parseInt(this.style.top), parseInt(this.style.left))) {
                this.classList.add("validmove");
            }  
        }
        
        // Unhighlights the pieces that are valid moves when mouse if moved away.
        function unselect() {
            this.classList.remove("validmove");
        }
        
        // Used to test if a piece is allowed to be moved or not.
        function isValidMove(top, left) {
            var thisSum = top + left;
            var emptySum = emptyX + emptyY;
            if (Math.abs(thisSum - emptySum) == 100) {
                if ((Math.abs(top - emptyY) == 100 && Math.abs(left - emptyX) == 100) ||
                        ((Math.abs(top - emptyY) > 100 || Math.abs(left - emptyX) > 100))) {
                    return false;
                }
                return true;
            }
            return false;
        }
        
        // Shuffles the puzzle, making 1000 legal moves.
        function shuffle() {
            var pieces = document.getElementById('puzzlearea').getElementsByTagName('div');
            for (var moves = 0; moves < 1000 ; moves++) {   
                var borders = [];
                for (var i = 0; i < pieces.length; i++) {
                    if (isValidMove(parseInt(pieces[i].style.top), parseInt(pieces[i].style.left))) {
                        borders.push(pieces[i]);
                    }
                }
                var num = Math.floor(Math.random() * borders.length); 
                move(borders[num]);   
            }
            totalMoves = 0;
            updateMoves();
        }
})();
