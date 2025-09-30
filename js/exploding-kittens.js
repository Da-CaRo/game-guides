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

function showCardInfo(card) {
    const modal = document.getElementById('card-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalDetail = document.getElementById('modal-detail');
    modalImg.src = card.image;
    modalTitle.textContent = card.name;
    modalDesc.textContent = card.description;
    modalDetail.textContent = card.detailedDescription || '';
    let tags = [];
    if (card.isNow) {
        tags.push('<span style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:#111;border-radius:50%;margin-right:8px;">'
            + '<img src="img/exploding-kittens/card-icons/now.png" alt="NOW" style="width:32px;height:32px;vertical-align:middle;">'
            + '</span>');
    }
    if (card.canBeNoped !== undefined) {
        if (card.canBeNoped) {
            tags.push('<span style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:#111;border-radius:50%;margin-right:8px;">'
                + '<img src="img/exploding-kittens/card-icons/nope.png" alt="Nope" style="width:32px;height:32px;vertical-align:middle;">'
                + '</span>');
        }
    }
    modalTags.innerHTML = tags.join(' ');
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('card-modal').style.display = 'none';
}
