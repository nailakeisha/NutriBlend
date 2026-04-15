const EMOJI_MAP = {
  apple:'🍎', banana:'🍌', orange:'🍊', strawberry:'🍓', blueberry:'🫐',
  mango:'🥭', pineapple:'🍍', watermelon:'🍉', grape:'🍇', peach:'🍑',
  kiwi:'🥝', lemon:'🍋', lime:'🍋', cherry:'🍒', pear:'🍐',
  melon:'🍈', coconut:'🥥', avocado:'🥑', fig:'🍑', papaya:'🥭',
  pomegranate:'🍎', plum:'🍑', apricot:'🍑', raspberry:'🍓',
  blackberry:'🫐', cranberry:'🍒', durian:'🍑', guava:'🍈',
  lychee:'🍑', dragon:'🍎', passion:'🍊', star:'⭐', jackfruit:'🥭',
  mulberry:'🍇', persimmon:'🍊', quince:'🍐', tamarind:'🌿',
  mandarine:'🍊', tangerine:'🍊', clementine:'🍊', grapefruit:'🍊',
  feijoa:'🍏', longan:'🍑', rambutan:'🍒', salak:'🌿',

  apricot:'🍑', nectarine:'🍑', honeydew:'🍈', cantaloupe:'🍈',
  boysenberry:'🫐', gooseberry:'🟢', elderberry:'🟣', acai:'🟣',
  breadfruit:'🍞', custard:'🍮', date:'🌴', huckleberry:'🫐',
  jujube:'🔴', kumquat:'🍊', loquat:'🍊', marionberry:'🫐',
  olive:'🫒', plantain:'🍌', prickly:'🌵', sapote:'🥭',
  soursop:'🍏', sugar:'🍬', tamarillo:'🍅', ugli:'🍊',
  yuzu:'🍋', acerola:'🍒', bilberry:'🫐', cloudberry:'🍊',
  damson:'🍑', jabuticaba:'🟣', kiwano:'🟠', lingonberry:'🔴',
  medlar:'🍎', nance:'🟡', ogeechee:'🍒', pepino:'🍐',
  quenepa:'🟢', rosehip:'🌹', salal:'🫐', tayberry:'🔴',
  umbu:'🟡', voavanga:'🟢', white:'🍎', ximenia:'🔴',
  yangmei:'🔴', zapote:'🥭'
};

const PRESETS = [
  { label: '🌅 Sunrise Boost',  fruits: ['Mango','Orange','Papaya','Pineapple'] },
  { label: '🫐 Berry Blast',    fruits: ['Blueberry','Strawberry','Raspberry','Blackberry'] },
  { label: '🥝 Green Power',    fruits: ['Kiwi','Avocado','Lime','Feijoa'] },
  { label: '🍑 Tropical Kiss',  fruits: ['Peach','Mango','Guava','Lychee'] },
  { label: '🍋 Citrus Zing',    fruits: ['Lemon','Lime','Grapefruit','Tangerine'] },
  { label: '🍒 Cherry Bliss',   fruits: ['Cherry','Strawberry','Raspberry','Pomegranate'] },
  { label: '🥤 Lean & Clean',   fruits: ['Watermelon','Cucumber','Lime'] },
  { label: '🍌 Energy Bomb',    fruits: ['Banana','Mango','Pineapple','Coconut'] },
  { label: '🍎 Autumn Harvest', fruits: ['Apple','Pear','Cranberry','Fig'] },
  { label: '🟣 Purple Power',   fruits: ['Grape','Plum','Elderberry','Acai'] },
  { label: '🍊 Vitamin C Bomb', fruits: ['Orange','Grapefruit','Kiwi','Strawberry'] },
  { label: '🥑 Creamy Dream',   fruits: ['Avocado','Banana','Coconut','Date'] }
];

let allFruits = [];
let blender   = []; 

function getEmoji(name) {
  const n = name.toLowerCase();
  for (const [k, v] of Object.entries(EMOJI_MAP)) {
    if (n.includes(k)) return v;
  }
  return '🍑';
}


async function fetchFruits() {
  const grid = document.getElementById('fruit-grid');
  grid.innerHTML = '<div class="state-msg"><div class="spinner"></div>Memuat data dari API Fruityvice...</div>';
  try {
    const res = await axios.get(
  'https://api.allorigins.win/raw?url=https://www.fruityvice.com/api/fruit/all'
);
    allFruits  = res.data;
    populateFamilyFilter();
    renderFruits();
  } catch (e) {
    grid.innerHTML = `
      <div class="state-msg error">
        Gagal memuat data.<br><small>${e.message}</small><br>
        <button class="retry-btn" onclick="fetchFruits()">Coba Lagi</button>
      </div>`;
  }
}

function populateFamilyFilter() {
  const families = [...new Set(allFruits.map(f => f.family).filter(Boolean))].sort();
  const sel = document.getElementById('filter-family');
  sel.innerHTML = '<option value="">Semua Family</option>';
  families.forEach(fam => {
    const opt = document.createElement('option');
    opt.value = fam; opt.textContent = fam;
    sel.appendChild(opt);
  });
}

function getFiltered() {
  const q    = document.getElementById('search').value.toLowerCase();
  const fam  = document.getElementById('filter-family').value;
  const sort = document.getElementById('sort-by').value;
  let list = allFruits.filter(f =>
    (!q   || f.name.toLowerCase().includes(q)) &&
    (!fam || f.family === fam)
  );
  if (sort === 'calories') list.sort((a,b) => (b.nutritions.calories||0) - (a.nutritions.calories||0));
  else if (sort === 'sugar') list.sort((a,b) => (b.nutritions.sugar||0) - (a.nutritions.sugar||0));
  else list.sort((a,b) => a.name.localeCompare(b.name));
  return list;
}

function renderFruits() {
  const list = getFiltered();
  const grid = document.getElementById('fruit-grid');
  document.getElementById('fruit-count').textContent = list.length;
  if (!list.length) { grid.innerHTML = '<div class="no-results">Buah tidak ditemukan 😔</div>'; return; }
  grid.innerHTML = list.map(f => {
    const em = getEmoji(f.name);
    const n  = f.nutritions;
    return `
      <div class="fruit-card" onclick="openModal(${f.id})" data-id="${f.id}">
        <span class="fruit-emoji">${em}</span>
        <div class="fruit-name">${f.name}</div>
        <div class="fruit-family">${f.family || '–'}</div>
        <div class="fruit-mini-stats">
          <span class="mini-pill cal">${n.calories||0} kcal</span>
          <span class="mini-pill">${n.sugar||0}g gula</span>
        </div>
        <button class="add-btn" onclick="event.stopPropagation(); addFruit(${f.id})">+</button>
      </div>`;
  }).join('');
}

function applyPreset(preset) {
  if (allFruits.length === 0) return;
  clearBlender();
  preset.fruits.forEach(name => {
    const f = allFruits.find(x => x.name.toLowerCase() === name.toLowerCase());
    if (f) blender.push({ fruit: f, qty: 1 });
  });
  renderBlender();
}

function renderPresets() {
  const row = document.getElementById('presets-row');
  row.innerHTML = PRESETS.map((p, i) => `
    <button class="preset-btn" onclick="applyPreset(PRESETS[${i}])">${p.label}</button>
  `).join('');
}

function openModal(id) {
  const f = allFruits.find(x => x.id === id);
  if (!f) return;
  const n = f.nutritions;
  document.getElementById('m-emoji').textContent  = getEmoji(f.name);
  document.getElementById('m-name').textContent   = f.name;
  document.getElementById('m-family').textContent = `Family: ${f.family||'–'} · Genus: ${f.genus||'–'}`;
  document.getElementById('m-cal').textContent    = (n.calories||0).toFixed(1);
  document.getElementById('m-sugar').textContent  = (n.sugar||0).toFixed(1);
  document.getElementById('m-carb').textContent   = (n.carbohydrates||0).toFixed(1);
  document.getElementById('m-fat').textContent    = (n.fat||0).toFixed(1);
  document.getElementById('m-add-btn').onclick    = () => {
    addFruit(id);
    document.getElementById('modal').classList.remove('open');
  };
  document.getElementById('modal').classList.add('open');
}
function closeModal(e) { if (e.target === e.currentTarget) e.currentTarget.classList.remove('open'); }

function addFruit(id) {
  const f = allFruits.find(x => x.id === id);
  if (!f) return;
  const existing = blender.find(b => b.fruit.id === id);
  if (existing) existing.qty++;
  else blender.push({ fruit: f, qty: 1 });

  const card = document.querySelector(`.fruit-card[data-id="${id}"]`);
  if (card) { card.classList.add('adding'); setTimeout(() => card.classList.remove('adding'), 400); }
  renderBlender();
}

function removeIngredient(id) { blender = blender.filter(b => b.fruit.id !== id); renderBlender(); }

function changeQty(id, delta) {
  const b = blender.find(x => x.fruit.id === id);
  if (!b) return;
  b.qty = Math.max(1, b.qty + delta);
  renderBlender();
}

function clearBlender() { blender = []; renderBlender(); }

function renderBlender() {
  const panel = document.getElementById('ingredients-panel');
  const count = blender.reduce((s, b) => s + b.qty, 0);
  document.getElementById('ing-count').textContent = count;
  document.getElementById('blend-btn').disabled    = blender.length === 0;

  if (blender.length === 0) {
    panel.innerHTML = `<div class="empty-blender"><span class="icon">🫙</span>Belum ada buah. Pilih dari katalog!</div>`;
    resetBlenderVisual(); resetNutrition(); return;
  }

  panel.innerHTML = blender.map(b => `
    <div class="ingredient-row">
      <span class="ing-emoji">${getEmoji(b.fruit.name)}</span>
      <div class="ing-name">${b.fruit.name}</div>
      <div class="ing-qty">
        <button class="qty-btn" onclick="changeQty(${b.fruit.id}, -1)">−</button>
        <span class="qty-num">${b.qty}</span>
        <button class="qty-btn" onclick="changeQty(${b.fruit.id}, 1)">+</button>
      </div>
      <button class="remove-ing" onclick="removeIngredient(${b.fruit.id})">✕</button>
    </div>`).join('');

  calcNutrition();
  updateBlenderVisual();
}

function calcNutrition() {
  let cal=0, sugar=0, carb=0, protein=0, fat=0;
  blender.forEach(b => {
    const n = b.fruit.nutritions;
    cal     += (n.calories||0)       * b.qty;
    sugar   += (n.sugar||0)          * b.qty;
    carb    += (n.carbohydrates||0)  * b.qty;
    protein += (n.protein||0)        * b.qty;
    fat     += (n.fat||0)            * b.qty;
  });
  const r = v => Math.round(v * 10) / 10;
  document.getElementById('val-cal').textContent     = r(cal) + ' kcal';
  document.getElementById('val-sugar').textContent   = r(sugar) + 'g';
  document.getElementById('val-carb').textContent    = r(carb) + 'g';
  document.getElementById('val-protein').textContent = r(protein) + 'g';
  document.getElementById('val-fat').textContent     = r(fat) + 'g';

  setBar('bar-cal',     cal,     800);
  setBar('bar-sugar',   sugar,   100);
  setBar('bar-carb',    carb,    200);
  setBar('bar-protein', protein, 60);
  setBar('bar-fat',     fat,     65);

  showWarnings(cal, sugar, carb, protein, fat);
  updateScore(cal, sugar, carb, protein, fat);
}

function setBar(id, val, max) {
  document.getElementById(id).style.width = Math.min(100, (val/max)*100) + '%';
}

function showWarnings(cal, sugar, carb, protein, fat) {
  const area = document.getElementById('warning-area');
  if (blender.length === 0) { area.innerHTML = ''; return; }
  const msgs = [];
  if (sugar > 60)        msgs.push({ type:'danger',  icon:'⚠️', text:'Gula terlalu tinggi! Lebih dari 60g – waspadai lonjakan insulin.' });
  else if (sugar > 35)   msgs.push({ type:'warn',    icon:'⚠️', text:`Gula cukup tinggi (${Math.round(sugar)}g). Konsumsi dengan bijak.` });
  if (cal < 150)         msgs.push({ type:'success', icon:'✅', text:'Rendah kalori! Pilihan ringan dan segar untuk diet.' });
  else if (cal > 600)    msgs.push({ type:'danger',  icon:'🔥', text:`Kalori sangat tinggi (${Math.round(cal)} kcal). Kurangi porsi.` });
  else if (cal > 350)    msgs.push({ type:'warn',    icon:'🔥', text:`Kalori cukup besar (${Math.round(cal)} kcal). Bisa jadi pengganti makan.` });
  if (blender.length >= 4) msgs.push({ type:'info', icon:'🎨', text:`Smoothie ${blender.length} buah – kaya antioksidan dan vitamin beragam!` });
  if (protein > 5)       msgs.push({ type:'success', icon:'💪', text:`Protein lumayan (${Math.round(protein*10)/10}g). Bagus untuk pemulihan otot.` });
  area.innerHTML = msgs.map(m =>
    `<div class="badge ${m.type}"><span class="badge-icon">${m.icon}</span>${m.text}</div>`
  ).join('');
}

function updateScore(cal, sugar, carb, protein, fat) {
  const wrap = document.getElementById('score-wrap');
  if (blender.length === 0) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';

  let score = 100;
  if (sugar > 60) score -= 40;
  else if (sugar > 35) score -= 20;
  else if (sugar > 20) score -= 10;
  if (cal > 600) score -= 25;
  else if (cal > 350) score -= 10;
  if (protein > 3)  score += 5;
  if (blender.length >= 3) score += 5;
  score = Math.max(0, Math.min(100, score));

  const arc = document.getElementById('score-arc');
  const C   = 201;
  arc.style.strokeDashoffset = C - (C * score / 100);
  arc.style.stroke = score >= 75 ? '#6A7E3F' : score >= 45 ? '#E195AB' : '#DE3163';

  document.getElementById('score-num').textContent = score;
  const labels = ['Sangat Sehat 🌿','Cukup Sehat 🙂','Perlu Diperhatikan ⚠️','Tidak Disarankan ❌'];
  document.getElementById('score-label').textContent =
    score >= 80 ? labels[0] : score >= 55 ? labels[1] : score >= 35 ? labels[2] : labels[3];
}

const FRUIT_COLORS = {
  apple:'#a8e063', banana:'#f9d423', orange:'#ff9a00', strawberry:'#e84393',
  blueberry:'#6a5acd', mango:'#ff8c00', pineapple:'#e9c46a', watermelon:'#ff6b6b',
  grape:'#8e44ad', avocado:'#4caf50', kiwi:'#7cb518', cherry:'#c0392b',
  raspberry:'#d63031', passion:'#e17055', lychee:'#fab1a0', default:'#6A7E3F',
};

function updateBlenderVisual() {
  const totalItems = blender.reduce((s, b) => s + b.qty, 0);
  const fillPct    = Math.min(0.9, 0.1 + totalItems * 0.08);
  const yTop       = 130 - fillPct * 120;

  let hex = FRUIT_COLORS.default;
  if (blender.length > 0) {
    const firstName = blender[blender.length-1].fruit.name.toLowerCase();
    for (const [k, v] of Object.entries(FRUIT_COLORS)) {
      if (firstName.includes(k)) { hex = v; break; }
    }
  }

  const shape = document.getElementById('liquid-shape');
  const leftX  = 15 + (yTop-10) * 13/120;
  const rightX = 95 - (yTop-10) * 13/120;
  shape.setAttribute('points', `${leftX},${yTop} ${rightX},${yTop} 82,130 28,130`);
  shape.setAttribute('fill', hex);
  document.getElementById('straw').style.opacity = '0.9';
}

function resetBlenderVisual() {
  document.getElementById('liquid-shape').setAttribute('points', '15,130 95,130 82,130 28,130');
  document.getElementById('straw').style.opacity = '0';
  document.getElementById('score-wrap').style.display = 'none';
  document.getElementById('warning-area').innerHTML = '';
}

function resetNutrition() {
  ['cal','sugar','carb','protein','fat'].forEach(k => {
    document.getElementById('val-'+k).textContent  = k === 'cal' ? '0 kcal' : '0g';
    document.getElementById('bar-'+k).style.width  = '0%';
  });
}

function blendAnimation() {
  const cup = document.getElementById('blender-cup');
  cup.classList.add('blending');
  document.getElementById('blend-btn').textContent = 'Blending... 🌀';
  document.getElementById('blend-btn').disabled    = true;
  setTimeout(() => {
    cup.classList.remove('blending');
    document.getElementById('blend-btn').textContent = 'BLEND IT! 🌀';
    document.getElementById('blend-btn').disabled    = false;
  }, 2000);
}

document.getElementById('search').addEventListener('input', renderFruits);
document.getElementById('filter-family').addEventListener('change', renderFruits);
document.getElementById('sort-by').addEventListener('change', renderFruits);

renderPresets();
fetchFruits();