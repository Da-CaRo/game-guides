document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('card-icons-grid');
    if (!grid) return;
    fetch('data/exploding-kittens/cards-config.json')
        .then(res => res.json())
        .then(cards => {
            grid.innerHTML = '';
            cards.filter(card => card.show !== false).forEach(card => {
                const div = document.createElement('div');
                div.className = 'card-icon';
                div.innerHTML = `
                    <img src="${card.image}" alt="${card.name}" title="${card.name}" />
                    <span>${card.name}</span>
                `;
                div.onclick = () => showCardInfo(card);
                grid.appendChild(div);
            });
        });
});

// Las funciones showCardInfo y closeModal ahora están en js/exploding-kittens-functions.js
// Asegúrate de incluir <script src="js/exploding-kittens-functions.js"></script> antes de este script en el HTML
