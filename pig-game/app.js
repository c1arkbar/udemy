/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore;

// Run the new game initialize function
init();

/******************************
* Event Listeners
*/

// If the score is changed then update the winning score
document.querySelector('#winningScore').addEventListener('blur', scoreToWin);

// When new game is clicked run the new game initiliaze function
document.querySelector('.btn-new').addEventListener('click', init);

// When the Roll Dice button is clicked execute the function to get random numbers and calculate scores
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // Display dice from number
        var dice1DOM = document.querySelector('.dice1'); 
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';
        var dice2DOM = document.querySelector('.dice2'); 
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        // Update the round score IF the rolled number was NOT a 1
        if (dice1 === 1 || dice2 === 1) {
            //Next Player
            nextPlayer();
            document.querySelector(".loser").style.display = "block";
            gamePlaying = false;
            setTimeout(function(){
                document.querySelector(".loser").style.display = "none"; 
                gamePlaying = true;
               }, 1500);
        } else {

            // Add Score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
    }

});

// When the Hold button is pushed then save the scores and switch the active player
document.querySelector('.btn-hold').addEventListener('click', function(){
   if (gamePlaying){
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.getElementById('winningScore').disabled = true;
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
   }


    

});

/**************************************
* Functions
*/

// Change the players, zero the round scores, switch active class on player panel
function nextPlayer() {
    //Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.dice1').style.display = 'none';
    // document.querySelector('.dice2').style.display = 'none';
}



// Initialize new game function
function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    scoreToWin();

    document.getElementById('winningScore').disabled = false;

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}

// Set the winning score value
function scoreToWin(){
    winningScore = document.getElementById('winningScore').value;
}