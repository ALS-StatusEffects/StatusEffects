const effects = [ 
    { name: "Black Flames", category: "dot", slug: "black-flames", desc: "Inimigos afetados recebem 75% do dano da unidade ao longo de 10s." },
    
    { name: "Bleed", category: "dot", slug: "bleed", desc: "Inimigos afetados recebem 30% do dano da unit ao longo de 6s." },

    { name: "Burn", category: "dot", slug: "burn", desc: "Inimigos afetados recebem 50% do dano da unidade ao longo de 8s." },

    { name: "Electrified", category: "dot", slug: "electrified", desc: "Causa 1,2x o dano em 6 ticks durante 3s, atordoa os inimigos por 1s a cada 2 ticks (CD: 10s)." },

    { name: "Poison", category: "dot", slug: "poison", desc: "Inimigos afetados recebem 35% do dano da unit ao longo de 6s e reduz a regeneração em 50%." },

    { name: "Crippled", category: "efeito", slug: "crippled", desc: "Inimigos afetados por 'Crippled' recebem 15% a mais de dano de units de subtype Physical." },

    { name: "Freeze", category: "efeito", slug: "freeze", desc: "Inimigos afetados por 'Freeze' tem sua velocidade de movimento reduzida em 100%." },

    { name: "Fear", category: "efeito", slug: "fear", desc: "Inimigos afetados por 'Fear' são atordoados por 0,5s a cada segundo durante 12s. Além disso, unidades do elemento Dark causam 15% a mais de dano (CD: 20s)." },

    { name: "Slow", category: "efeito", slug: "slow", desc: "Inimigos afetados por 'Slow' tem sua velocidade de movimento reduzida em 30% por 8s." },

    { name: "Stun", category: "efeito", slug: "stun", desc: "Inimigos em estado de 'Stun' recebem 10% a mais de dano e tem sua velocidade de movimento reduzida em 100% por 5 segundos (CD: 15s).", image: "Stun.webp" }
];

function renderEffects(data) {
    const grid = document.getElementById('effectsGrid');
    grid.innerHTML = '';

    if (data.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nenhum efeito encontrado.</p>';
        return;
    }

    data.forEach(effect => {
        const card = document.createElement('div');
        card.className = `card effect-${effect.slug}`;
        card.innerHTML = `
            <div>
                ${effect.image ? `<img src="${effect.image}" alt="${effect.name}" class="effect-img">` : ''}
                <h3>${effect.name}</h3>
                <p>${effect.desc}</p>
            </div>
            <span class="tag">${effect.category}</span>
        `;
        grid.appendChild(card);
    });
}

function filterCategory(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    const filtered = effects.filter(effect => {
        const matchesCategory = category === 'all' || effect.category === category;
        const matchesSearch = effect.name.toLowerCase().includes(searchInput) || effect.desc.toLowerCase().includes(searchInput);
        return matchesCategory && matchesSearch;
    });

    renderEffects(filtered);
}

function filterEffects() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active').getAttribute('onclick').match(/'([^']+)'/)[1];

    const filtered = effects.filter(effect => {
        const matchesCategory = activeCategory === 'all' || effect.category === activeCategory;
        const matchesSearch = effect.name.toLowerCase().includes(searchInput) || effect.desc.toLowerCase().includes(searchInput);
        return matchesCategory && matchesSearch;
    });

    renderEffects(filtered);
}

function toggleDotInfo() {
    const box = document.getElementById('dotExplanation');
    if (box.style.display === 'none' || box.style.display === '') {
        box.style.display = 'block';
    } else {
        box.style.display = 'none';
    }
}

renderEffects(effects);