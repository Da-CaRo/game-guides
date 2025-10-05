document.addEventListener('DOMContentLoaded', function() {
    Promise.all([
        fetch('data/exploding-kittens/expansions-config.json').then(res => res.json()),
        fetch('data/exploding-kittens/cards-config.json').then(res => res.json())
    ]).then(([expansions, cardsConfig]) => {
        const cardIconMap = {};
        cardsConfig.forEach(card => {
            cardIconMap[card.id] = card.image;
        });
        renderExpansions(expansions, cardIconMap);
    });
});

function renderExpansions(expansions, cardIconMap) {
    const container = document.getElementById('expansions-list');
    container.innerHTML = '';
    expansions.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.className = 'expansion';
        expDiv.innerHTML = `
            <div class="expansion-title">${exp.name}</div>
            <div class="expansion-desc">${exp.description}</div>
            ${exp.packs.map(pack => `
                <div class="pack-title">${pack.name}</div>
                <div class="cards-grid">
                    ${pack.cards.map(card => `
                        <div class="card-icon">
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
}