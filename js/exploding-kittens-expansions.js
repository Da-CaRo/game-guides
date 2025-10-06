document.addEventListener('DOMContentLoaded', function() {
    // Referencia al contenedor de expansiones
    const container = document.getElementById('expansions-list');
    Promise.all([
        fetch('data/exploding-kittens/expansions-config.json').then(res => res.json()),
        fetch('data/exploding-kittens/cards-config.json').then(res => res.json())
    ]).then(([expansions, cardsConfig]) => {
        const cardIconMap = {};
        const cardDataMap = {};
        cardsConfig.forEach(card => {
            cardIconMap[card.id] = card.image;
            cardDataMap[card.id] = card;
        });
        renderExpansions(expansions, cardIconMap, cardDataMap, container);
        setupModal();
    });
});

function setupModal() {
    // Reutiliza el modal de la página principal si existe, si no lo crea
    if (!document.getElementById('card-modal')) {
        const modalHtml = `
        <div id="card-modal" style="
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6);
            align-items: center;
            justify-content: center;
            z-index: 1000;
        ">
            <div style="background: #fff; border-radius: 10px; padding: 2rem; max-width: 350px; width: 90%; text-align: center; position: relative;">
                <button onclick="closeModal()" style="position: absolute; top: 10px; right: 10px; background: #eee; border: none; border-radius: 50%; width: 28px; height: 28px; font-size: 1.2rem; cursor: pointer;">&times;</button>
                <img id="modal-img" src="" alt="" style="width: 80px; height: 80px; object-fit: contain; margin-bottom: 1rem;" />
                <h3 id="modal-title"></h3>
                <div id="modal-tags" style="margin-bottom: 0.5rem;"></div>
                <p id="modal-desc" style="color: #444;"></p>
                <p id="modal-detail" style="color: #666; font-size: 0.97em; margin-top: 1.2em;"></p>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
    window.closeModal = function() {
        document.getElementById('card-modal').style.display = 'none';
    };
}

function renderExpansions(expansions, cardIconMap, cardDataMap, container) {
    container.innerHTML = '';
    expansions.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.className = 'expansion';
        expDiv.innerHTML = `
            <div class="expansion-title">${exp.name}</div>
            <div class="expansion-desc">${exp.description}</div>
            ${exp.packs.map(pack => `
                <div class="pack-title" style="display:flex;align-items:center;gap:0.5em;">
                    ${pack.icon ? `<span style="width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:${pack.iconBg || '#eaeaea'};margin-right:0.2em;"><img src="${pack.icon}" alt="icono pack" style="width:22px;height:22px;object-fit:contain;border-radius:50%;"></span>` : ''}
                    <span>${pack.name}</span>
                </div>
                <div class="cards-grid">
                    ${pack.cards.map(card => `
                        <div class="card-icon" data-card-id="${card.id}" style="cursor:pointer;">
                            <img src="${cardIconMap[card.id] || ''}" alt="${card.id}" />
                            <div class="card-name">${card.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                            <div class="card-count">x${card.count}</div>
                        </div>
                    `).join('')}
            </div>
            `).join('')}
        `;
        container.appendChild(expDiv);
    });
    // Añadir eventos para mostrar el modal al hacer click en una carta
    container.querySelectorAll('.card-icon[data-card-id]').forEach(el => {
        el.onclick = function() {
            const cardId = this.getAttribute('data-card-id');
            const card = cardDataMap[cardId];
            if (card) showCardInfo(card);
        };
    });
}

// Las funciones showCardInfo y closeModal ahora están en js/exploding-kittens-functions.js
// Asegúrate de incluir <script src="js/exploding-kittens-functions.js"></script> antes de este script en el HTML