// --- Initial Data ---
const femaleNames = ["Maria", "Ana", "Alice", "Helena", "Valentina", "Fernanda", "Juliana", "Sophia", "Amanda", "Letícia"];

// --- Helper: Create Card ---
function createCard() {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    // Fallback image if local photo fails
    const imgUrl = `img/foto${randomNum}.jpg`; 
    const backupUrl = `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400`;
    const name = femaleNames[Math.floor(Math.random() * femaleNames.length)];
    
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${imgUrl}" onerror="this.onerror=null; this.src='${backupUrl}';">
        <div class="card-info">
            <h2>${name}, 22</h2>
            <p>Online agora</p>
        </div>`;
    return card;
}

// --- App Control Functions ---
window.swipe = function(isLike) {
    const stack = document.getElementById('card-stack');
    const cards = stack.querySelectorAll('.card');
    const topCard = cards[cards.length - 1];

    if (!topCard) return;

    topCard.style.transform = isLike ? "translateX(200%) rotate(30deg)" : "translateX(-200%) rotate(-30deg)";
    topCard.style.opacity = "0";

    if (isLike && Math.random() > 0.5) {
        document.getElementById('match-popup').style.display = 'flex';
    }
    
    setTimeout(() => {
        topCard.remove();
        stack.prepend(createCard());
    }, 400);
};

window.showView = function(id, navEl) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + id).classList.add('active');
    if (navEl) {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        navEl.classList.add('active');
    }
};

window.closeMatch = function() {
    document.getElementById('match-popup').style.display = 'none';
};

// --- CRITICAL: Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const stack = document.getElementById('card-stack');
    if (stack) {
        // Initial cards load
        for (let i = 0; i < 3; i++) {
            stack.prepend(createCard());
        }
    }
});
