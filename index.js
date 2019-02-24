const cards = document.querySelectorAll('.memory-card');



let hasFlipedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlipedCard) {
        hasFlipedCard = true;
        firstCard = this;
    } else {

        hasFlipedCard = false;
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {

    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function resetBoard() {
    hasFlipedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}


function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
       resetBoard();
    }, 1500);
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}


(function shuffleCards() {
    cards.forEach(card => {
        let randomNumber = Math.floor(Math.random() *12);
        card.style.order = randomNumber;
    }
    )
})();



cards.forEach(card => card.addEventListener('click', flipCard));