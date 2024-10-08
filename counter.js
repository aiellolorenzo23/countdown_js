const countdownElement = document.getElementById("countdown");

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

// Aggiorna il countdown ogni secondo
setInterval(updateCountdown, 1000);
