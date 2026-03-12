// Data Arrays
const adLinks = [
    "https://www.effectivegatecpm.com/szaxcfckwf?key=16135805dc97698328fbcff487238624",
    "https://omg10.com/4/10716564"
];
const femaleNames = ["Maria", "Ana", "Alice", "Helena", "Valentina", "Fernanda", "Juliana", "Sophia", "Amanda", "Letícia"];

let clickCount = 0;
let matches = [];
let currentPartner = null;

// The "Fail-Safe" Card Creator
function createCard() {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    // We use a relative path for your local images, but a backup URL if they fail
    const localImg = `img/foto${randomNum}.jpg`; 
    const backupImg = `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400`;
    const name = femaleNames[Math.floor(Math.random() * femaleNames.length)];
    
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${localImg}" 
             onerror="this.onerror=null; this.src='${backupImg}';" 
             alt="Profile">
        <div class="card-info">
            <h2>${name}, 22</h2>
            <p>Online agora</p>
        </div>`;
    
    // Store data inside the element for easy access later
    card.dataset.name = name;
    card.dataset.img = localImg; 
    
    return card;
}

// Global Swipe Function
window.swipe = function(isLike) {
    const stack = document.getElementById('card-stack');
    const cards = stack.querySelectorAll('.card');
    const topCard = cards[cards.length - 1];

    if (!topCard) return;

    // Animation
    topCard.style.transform = isLike ? "translateX(200%) rotate(30deg)" : "translateX(-200%) rotate(-30deg)";
    topCard.style.opacity = "0";
    
    handleAdClick();

    if (isLike && Math.random() > 0.4) {
        showMatch(topCard.dataset.name, topCard.querySelector('img').src);
    }
    
    setTimeout(() => {
        topCard.remove();
        stack.prepend(createCard());
    }, 400);
};

function handleAdClick() {
    clickCount++;
    if (clickCount % 3 === 0) {
        window.open(adLinks[Math.floor(Math.random() * adLinks.length)], '_blank');
    }
}

function showMatch(name, img) {
    currentPartner = { name, img };
    const popup = document.getElementById('match-popup');
    const label = document.getElementById('match-name-label');
    if(popup && label) {
        label.innerText = name;
        popup.style.display = 'flex';
        // Add to inbox data
        matches.push(currentPartner);
        updateInbox();
    }
}

window.showView = function(id, navEl) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById('view-' + id);
    if(target) target.classList.add('active');

    if (navEl) {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        navEl.classList.add('active');
    }
};

function updateInbox() {
    const list = document.getElementById('inbox-list');
    if(!list) return;
    list.innerHTML = matches.map(m => `
        <div class="inbox-item" style="display:flex; padding:15px; border-bottom:1px solid #eee; align-items:center;">
            <img src="${m.img}" style="width:50px; height:50px; border-radius:50%; object-fit:cover;">
            <div style="margin-left:12px;"><b>${m.name}</b><br><small>Nova combinação!</small></div>
        </div>
    `).join('');
}

window.closeMatch = function() {
    document.getElementById('match-popup').style.display = 'none';
};

// CRITICAL: This waits for the HTML to be ready before injecting data
document.addEventListener('DOMContentLoaded', () => {
    console.log("Elo App Initialized");
    const stack = document.getElementById('card-stack');
    if (stack) {
        for (let i = 0; i < 3; i++) {
            stack.prepend(createCard());
        }
    } else {
        console.error("Error: Element #card-stack not found!");
    }
});
