const countdownElement = document.getElementById("countdown");
const fateButton = document.getElementById("fate-button");
const countdownContainer = document.querySelector(".countdown");
const backgroundMusic = document.getElementById('background-music');

// Funzione per ottenere o impostare la data di scadenza nel localStorage
function getCountdownDate() {
    const storedDate = localStorage.getItem('countdownDate');
    if (storedDate) {
        return new Date(storedDate);
    } else {
        const newCountdownDate = new Date();
        newCountdownDate.setDate(newCountdownDate.getDate() + 28);
        localStorage.setItem('countdownDate', newCountdownDate);
        return newCountdownDate;
    }
}

// Imposta la data di scadenza usando il localStorage
const countdownDate = getCountdownDate();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Calcola giorni, ore, minuti e secondi
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mostra il countdown
    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Se il countdown è scaduto
    if (distance < 0) {
        countdownElement.innerHTML = "EXPIRED";
    }
}

// Funzione per avviare il countdown e la musica
function startCountdownAndMusic() {
    // Nascondi il bottone
    fateButton.style.display = 'none';

    // Mostra il titolo e il countdown
    countdownContainer.style.display = 'block';

    // Aggiorna il countdown ogni secondo
    setInterval(updateCountdown, 1000);

    // Prova a far partire la musica
    const playPromise = backgroundMusic.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            // L'audio è partito
            console.log('La musica è partita!');
        }).catch(error => {
            console.log('Autoplay bloccato. L\'utente deve interagire con la pagina per far partire l\'audio.');
        });
    }
}

// Aggiungi un event listener al pulsante per avviare tutto
fateButton.addEventListener('click', startCountdownAndMusic);
