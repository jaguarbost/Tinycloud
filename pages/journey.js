const currentPage = document.body.dataset.page || 'create';
const journeyDesignStyles = document.createElement('link');
journeyDesignStyles.rel = 'stylesheet';
journeyDesignStyles.href = 'designs.css';
document.head.append(journeyDesignStyles);
let savedJourneyDesign = 'cloud';
try { savedJourneyDesign = localStorage.getItem('tinycloudDesign') || 'cloud'; } catch { /* File previews can restrict storage. */ }
document.body.dataset.design = savedJourneyDesign === 'studio' ? 'studio' : 'cloud';

const navItems = [
  ['create', 'create.html', '+', 'Create'],
  ['tools', 'tools.html', '◫', 'Your tools'],
  ['approvals', 'approvals.html', '✓', 'Approvals'],
  ['governance', 'governance.html', '◇', 'Governance'],
  ['lifecycle', 'lifecycle.html', '↘', 'Lifecycle'],
  ['connectors', 'connectors.html', '⌁', 'Connectors'],
];

const header = document.querySelector('#journey-header');
const sidebar = document.querySelector('#journey-sidebar');

if (header) {
  header.innerHTML = `
    <a class="j-brand" href="../index.html"><span class="j-brand-mark"><i></i><i></i><i></i></span><strong>TinyCloud</strong><em>ACME</em></a>
    <div class="j-top-actions"><div class="j-design-switcher" aria-label="Compare visual designs"><button type="button" data-design-option="cloud">Cloud</button><button type="button" data-design-option="studio">Studio</button></div><button aria-label="Search">⌕</button><button aria-label="Help">?</button><button aria-label="Notifications">♢</button><span>MJ</span></div>`;
}

document.querySelectorAll('[data-design-option]').forEach((button) => {
  const selected = button.dataset.designOption === document.body.dataset.design;
  button.classList.toggle('active', selected);
  button.setAttribute('aria-pressed', String(selected));
  button.addEventListener('click', () => {
    const design = button.dataset.designOption === 'studio' ? 'studio' : 'cloud';
    document.body.dataset.design = design;
    try { localStorage.setItem('tinycloudDesign', design); } catch { /* Keep the current-page design. */ }
    document.querySelectorAll('[data-design-option]').forEach((option) => {
      const active = option.dataset.designOption === design;
      option.classList.toggle('active', active);
      option.setAttribute('aria-pressed', String(active));
    });
  });
});

if (sidebar) {
  sidebar.innerHTML = `
    <a class="j-new-tool" href="create.html">+ <span>New TinyTool</span></a>
    <nav>${navItems.map(([id, href, icon, label]) => `<a class="${currentPage === id ? 'active' : ''}" href="${href}"><i>${icon}</i><span>${label}</span>${id === 'approvals' ? '<em>2</em>' : ''}</a>`).join('')}</nav>
    <div class="j-sidebar-bottom"><div><span>AC</span><p><b>ACME Workspace</b><small>Enterprise</small></p></div><p class="j-usage"><span>TINY USAGE</span><b>14 / 100</b><i><em></em></i><small>£0.18 estimated this month</small></p></div>`;
}

document.querySelector('#create-journey-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const prompt = document.querySelector('#create-prompt').value.trim() || 'Create a tool to compare three supplier quotes including delivery costs';
  sessionStorage.setItem('tinycloudPrompt', prompt);
  window.location.href = 'creating.html';
});

document.querySelectorAll('[data-example]').forEach((button) => button.addEventListener('click', () => {
  const input = document.querySelector('#create-prompt');
  input.value = button.dataset.example;
  input.focus();
}));

const promptEcho = document.querySelector('[data-prompt-echo]');
if (promptEcho) promptEcho.textContent = sessionStorage.getItem('tinycloudPrompt') || 'Create a tool to compare three supplier quotes including delivery costs';

if (currentPage === 'creating') {
  const buildSteps = [...document.querySelectorAll('[data-creation-step]')];
  const progress = document.querySelector('.j-build-progress i');
  const status = document.querySelector('#creation-status');
  const messages = ['Understanding the small job…', 'Choosing the lightest architecture…', 'Building one HTML file…', 'Testing calculations and mobile layout…', 'Running ACME policy preflight…', 'Your TinyTool is ready'];
  buildSteps.forEach((step, index) => {
    setTimeout(() => {
      if (index > 0) {
        buildSteps[index - 1].classList.remove('active');
        buildSteps[index - 1].classList.add('done');
        buildSteps[index - 1].querySelector('i').textContent = '✓';
        buildSteps[index - 1].querySelector('em').textContent = 'Done';
      }
      step.classList.add('active');
      step.querySelector('em').textContent = 'Working';
      progress.style.width = `${Math.round(((index + 0.5) / buildSteps.length) * 100)}%`;
      status.textContent = messages[index];
    }, 300 + index * 760);
  });
  setTimeout(() => {
    const last = buildSteps.at(-1);
    last.classList.remove('active');
    last.classList.add('done');
    last.querySelector('i').textContent = '✓';
    last.querySelector('em').textContent = 'Done';
    progress.style.width = '100%';
    status.textContent = messages.at(-1);
    document.querySelector('.j-ready-reveal').hidden = false;
  }, 300 + buildSteps.length * 760);
  setTimeout(() => { window.location.href = 'tool.html'; }, 6200);
}

document.querySelectorAll('[data-skip-tool]').forEach((button) => button.addEventListener('click', () => { window.location.href = 'tool.html'; }));

let quotes = [
  { name: 'Northstar Ltd.', base: 12400, delivery: 650 },
  { name: 'Arc Supply Co.', base: 11900, delivery: 800 },
  { name: 'Meridian', base: 12100, delivery: 950 },
];

const escapeText = (value) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);

function renderJourneyQuotes() {
  const target = document.querySelector('#journey-quote-rows');
  if (!target) return;
  const best = Math.min(...quotes.map((quote) => quote.base + quote.delivery));
  target.innerHTML = quotes.map((quote) => {
    const total = quote.base + quote.delivery;
    return `<div class="j-quote-row ${total === best ? 'best' : ''}"><span><b>${escapeText(quote.name)}</b>${total === best ? '<small>Best value</small>' : ''}</span><span>£${quote.base.toLocaleString()}</span><span>£${quote.delivery.toLocaleString()}</span><span><b>£${total.toLocaleString()}</b></span></div>`;
  }).join('');
}
renderJourneyQuotes();

document.querySelector('#journey-quote-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#journey-supplier-name');
  const base = document.querySelector('#journey-supplier-base');
  const delivery = document.querySelector('#journey-supplier-delivery');
  if (!name.value.trim() || !base.value) return;
  quotes.push({ name: name.value.trim(), base: Number(base.value), delivery: Number(delivery.value || 0) });
  name.value = ''; base.value = ''; delivery.value = '';
  renderJourneyQuotes();
});

document.querySelectorAll('[data-approve]').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('.j-action-card');
  card.classList.add('completed');
  card.querySelector('.j-status').className = 'j-status approved';
  card.querySelector('.j-status').textContent = 'Approved · shared';
  card.querySelector('.j-card-actions').innerHTML = '<span>✓ Organization sharing enabled</span>';
}));

document.querySelectorAll('[data-return]').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('.j-action-card');
  card.classList.add('completed');
  card.querySelector('.j-status').className = 'j-status returned';
  card.querySelector('.j-status').textContent = 'Returned to owner';
  card.querySelector('.j-card-actions').innerHTML = '<span>↩ Reviewer note sent</span>';
}));

document.querySelectorAll('[data-policy-toggle]').forEach((button) => button.addEventListener('click', () => {
  const enabled = button.dataset.enabled !== 'false';
  button.dataset.enabled = String(!enabled);
  button.textContent = enabled ? 'Off' : 'On';
  button.classList.toggle('off', enabled);
}));

document.querySelectorAll('[data-lifecycle]').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('.j-lifecycle-row');
  const result = button.dataset.lifecycle === 'archive' ? 'Archived · restorable for 90 days' : 'Awake for another 30 days';
  card.classList.add('completed');
  card.querySelector('.j-lifecycle-result').textContent = result;
  card.querySelector('.j-row-actions').innerHTML = '<span>✓ Updated</span>';
}));

document.querySelectorAll('[data-connect]').forEach((button) => button.addEventListener('click', () => {
  const connected = button.dataset.connected === 'true';
  button.dataset.connected = String(!connected);
  button.textContent = connected ? 'Connect →' : 'Manage connection →';
  button.classList.toggle('connected', !connected);
  button.closest('.j-connector-card').querySelector('.j-connector-state').textContent = connected ? 'Available' : '● Connected';
}));

document.querySelector('#settings-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.textContent = 'Saved ✓';
  setTimeout(() => { button.textContent = 'Save settings'; }, 1600);
});

document.querySelector('#copy-share-link')?.addEventListener('click', async (event) => {
  try { await navigator.clipboard.writeText('https://supplier-compare.acme.tinycloud.com'); } catch { /* Local previews may block clipboard access. */ }
  event.currentTarget.textContent = 'Copied ✓';
  setTimeout(() => { event.currentTarget.textContent = 'Copy link'; }, 1600);
});

document.querySelector('#join-community')?.addEventListener('click', (event) => {
  event.currentTarget.textContent = 'Joined ✓';
  event.currentTarget.disabled = true;
});

const deckSlides = [...document.querySelectorAll('.j-slide')];
const deckThumbs = [...document.querySelectorAll('[data-slide]')];
let activeSlide = 0;

function showDeckSlide(index) {
  if (!deckSlides.length) return;
  activeSlide = (index + deckSlides.length) % deckSlides.length;
  deckSlides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === activeSlide));
  deckThumbs.forEach((thumb, slideIndex) => thumb.classList.toggle('active', slideIndex === activeSlide));
  const counter = document.querySelector('#slide-count');
  if (counter) counter.textContent = `${activeSlide + 1} / ${deckSlides.length}`;
}

deckThumbs.forEach((thumb, index) => thumb.addEventListener('click', () => showDeckSlide(index)));
document.querySelector('#prev-slide')?.addEventListener('click', () => showDeckSlide(activeSlide - 1));
document.querySelector('#next-slide')?.addEventListener('click', () => showDeckSlide(activeSlide + 1));
showDeckSlide(0);

document.querySelector('#refresh-dashboard')?.addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.textContent = 'Refreshing…';
  button.disabled = true;
  setTimeout(() => {
    button.textContent = 'Updated ✓';
    setTimeout(() => {
      button.textContent = 'Refresh data';
      button.disabled = false;
    }, 1200);
  }, 800);
});
