const landing = document.querySelector('#landing');
const app = document.querySelector('#app');
const appViews = [...document.querySelectorAll('.app-view')];
const sideNavButtons = [...document.querySelectorAll('.app-sidebar [data-view]')];
let pendingPrompt = '';

const showApp = (prompt = '') => {
  pendingPrompt = prompt;
  landing.hidden = true;
  app.hidden = false;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  if (prompt) {
    document.querySelector('#app-prompt').value = prompt;
    showView('builder');
    startBuild();
  } else {
    showView('create');
  }
};

const showView = (name) => {
  appViews.forEach((view) => view.classList.toggle('active', view.dataset.page === name));
  sideNavButtons.forEach((button) => button.classList.toggle('active', button.dataset.view === name));
  window.scrollTo(0, 0);
};

document.querySelectorAll('[data-open-app]').forEach((button) => button.addEventListener('click', () => showApp()));
document.querySelector('#back-to-site').addEventListener('click', () => {
  app.hidden = true;
  landing.hidden = false;
  window.scrollTo(0, 0);
});

document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.view)));
document.querySelectorAll('.open-builder').forEach((button) => button.addEventListener('click', () => {
  showView('builder');
  startBuild();
}));

document.querySelector('#hero-prompt-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const prompt = document.querySelector('#hero-prompt').value.trim() || 'Compare three supplier quotes including delivery costs';
  sessionStorage.setItem('tinycloudPrompt', prompt);
  window.location.href = 'pages/creating.html';
});

document.querySelectorAll('[data-prompt]').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('#hero-prompt').value = button.dataset.prompt;
  document.querySelector('#hero-prompt').focus();
}));

document.querySelector('#app-prompt-form').addEventListener('submit', (event) => {
  event.preventDefault();
  pendingPrompt = document.querySelector('#app-prompt').value.trim() || 'Create a supplier quote comparison tool';
  showView('builder');
  startBuild();
});

document.querySelectorAll('[data-app-prompt]').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('#app-prompt').value = button.dataset.appPrompt;
  document.querySelector('#app-prompt').focus();
}));

let buildTimers = [];
function startBuild() {
  buildTimers.forEach(clearTimeout);
  buildTimers = [];
  const steps = [...document.querySelectorAll('[data-build-step]')];
  const state = document.querySelector('.save-state');
  const ready = document.querySelector('.ready-message');
  steps.forEach((step) => {
    step.classList.remove('done');
    step.querySelector('i').textContent = '·';
    step.querySelector('span').textContent = 'Building';
  });
  state.textContent = 'Building…';
  ready.hidden = true;
  steps.forEach((step, index) => {
    buildTimers.push(setTimeout(() => {
      step.classList.add('done');
      step.querySelector('i').textContent = '✓';
      step.querySelector('span').textContent = 'Ready';
      if (index === steps.length - 1) {
        state.textContent = 'All changes saved';
        ready.hidden = false;
      }
    }, 550 + index * 520));
  });
}

const settingsButton = document.querySelector('#settings-button');
const settings = document.querySelector('#tool-settings');
const toolBrowser = document.querySelector('#tool-browser');
const openSettings = () => {
  settings.hidden = false;
  toolBrowser.hidden = true;
};
const closeSettings = () => {
  settings.hidden = true;
  toolBrowser.hidden = false;
};
settingsButton.addEventListener('click', openSettings);
document.querySelector('#close-settings').addEventListener('click', closeSettings);
document.querySelector('#preview-tab').addEventListener('click', closeSettings);

document.querySelector('#edit-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#edit-input');
  if (!input.value.trim()) return;
  const message = document.createElement('div');
  message.className = 'edit-history-message';
  message.textContent = input.value.trim();
  document.querySelector('#edit-history').appendChild(message);
  input.value = '';
  document.querySelector('.save-state').textContent = 'Updating…';
  setTimeout(() => { document.querySelector('.save-state').textContent = 'All changes saved'; }, 900);
});

let quoteRows = [
  { supplier: 'Northstar Ltd.', base: 12400, delivery: 650 },
  { supplier: 'Arc Supply Co.', base: 11900, delivery: 800 },
  { supplier: 'Meridian', base: 12100, delivery: 950 },
];

function renderQuotes() {
  const list = document.querySelector('#quote-rows');
  const best = Math.min(...quoteRows.map((row) => row.base + row.delivery));
  list.innerHTML = quoteRows.map((row) => {
    const total = row.base + row.delivery;
    return `<div class="live-row${total === best ? ' best' : ''}"><span><b>${escapeHtml(row.supplier)}</b></span><span>£${row.base.toLocaleString()}</span><span>£${row.delivery.toLocaleString()}</span><span><b>£${total.toLocaleString()}</b></span></div>`;
  }).join('');
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}

document.querySelector('#quote-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const supplier = document.querySelector('#supplier-name');
  const base = document.querySelector('#supplier-base');
  const delivery = document.querySelector('#supplier-delivery');
  if (!supplier.value.trim() || !base.value) return;
  quoteRows.push({ supplier: supplier.value.trim(), base: Number(base.value), delivery: Number(delivery.value || 0) });
  supplier.value = '';
  base.value = '';
  delivery.value = '';
  renderQuotes();
});
renderQuotes();

const connectors = [
  { name: 'Jira', code: 'Ji', color: '#155eef', tint: '#e6edff', detail: 'Projects & issues', connected: true, category: 'Operations' },
  { name: 'Snowflake', code: 'Sf', color: '#1386ad', tint: '#e1f4fa', detail: 'Warehouse data', connected: true, category: 'Data' },
  { name: 'HubSpot', code: 'Hs', color: '#e85536', tint: '#ffebe4', detail: 'Marketing & CRM', connected: false, category: 'Marketing' },
  { name: 'Salesforce', code: 'Sa', color: '#1689bd', tint: '#e4f3fa', detail: 'Customer data', connected: false, category: 'Sales' },
  { name: 'Google Sheets', code: 'Gs', color: '#24865e', tint: '#e1f1e8', detail: 'Sheets & ranges', connected: true, category: 'Data' },
  { name: 'Stripe', code: 'St', color: '#635bff', tint: '#eceaff', detail: 'Payments & billing', connected: false, category: 'Finance' },
];

function renderConnectors() {
  document.querySelector('#connectors-grid').innerHTML = connectors.map((connector, index) => `
    <article class="connector-card">
      <div class="connector-card-head"><span class="connector-logo" style="color:${connector.color};background:${connector.tint}">${connector.code}</span><em class="${connector.connected ? 'connected' : ''}">${connector.connected ? '● Connected' : 'Available'}</em></div>
      <h3>${connector.name}</h3><p>${connector.detail}</p>
      <div class="connector-tags"><span>◇ Governed</span><span>${connector.name === 'Snowflake' ? 'Read only' : 'Scoped access'}</span></div>
      <button class="${connector.connected ? 'managing' : ''}" data-connector-index="${index}">${connector.connected ? 'Manage connection' : 'Connect'} <span>→</span></button>
    </article>`).join('');
  document.querySelectorAll('[data-connector-index]').forEach((button) => button.addEventListener('click', () => {
    const connector = connectors[Number(button.dataset.connectorIndex)];
    connector.connected = !connector.connected;
    renderConnectors();
  }));
}
renderConnectors();

const modal = document.querySelector('#publish-modal');
const publishForm = document.querySelector('#publish-form');
const reviewLoader = document.querySelector('#review-loader');
const publishSuccess = document.querySelector('#publish-success');
const publishButton = document.querySelector('.publish-button');
const toolbarReviewState = document.querySelector('#toolbar-review-state');
let reviewSubmitted = false;
let reviewTimers = [];

publishButton.addEventListener('click', () => {
  modal.hidden = false;
  publishForm.hidden = reviewSubmitted;
  reviewLoader.hidden = true;
  publishSuccess.hidden = !reviewSubmitted;
});
document.querySelector('.modal-close').addEventListener('click', () => { modal.hidden = true; });
modal.addEventListener('click', (event) => { if (event.target === modal) modal.hidden = true; });
document.querySelector('.request-publish').addEventListener('click', () => {
  publishForm.hidden = true;
  reviewLoader.hidden = false;
  publishSuccess.hidden = true;
  reviewTimers.forEach(clearTimeout);
  reviewTimers = [];
  const checks = [...document.querySelectorAll('[data-review-check]')];
  const progress = document.querySelector('.loader-progress i');
  checks.forEach((check) => {
    check.className = '';
    check.querySelector('i').textContent = '·';
    check.querySelector('em').textContent = 'Waiting';
  });
  progress.style.width = '0';
  checks.forEach((check, index) => {
    reviewTimers.push(setTimeout(() => {
      if (index > 0) {
        const previous = checks[index - 1];
        previous.className = 'passed';
        previous.querySelector('i').textContent = '✓';
        previous.querySelector('em').textContent = 'Passed';
      }
      check.className = 'scanning';
      check.querySelector('i').textContent = '↻';
      check.querySelector('em').textContent = 'Checking';
      progress.style.width = `${(index + 0.5) * 25}%`;
    }, 220 + index * 760));
  });
  reviewTimers.push(setTimeout(() => {
    const finalCheck = checks[checks.length - 1];
    finalCheck.className = 'passed';
    finalCheck.querySelector('i').textContent = '✓';
    finalCheck.querySelector('em').textContent = 'Passed';
    progress.style.width = '100%';
  }, 220 + checks.length * 760));
  reviewTimers.push(setTimeout(() => {
    reviewSubmitted = true;
    reviewLoader.hidden = true;
    publishSuccess.hidden = false;
    toolbarReviewState.textContent = '✓ Initial checks approved · Internal review';
    toolbarReviewState.classList.add('preflight-approved');
    publishButton.textContent = 'In review';
    publishButton.classList.add('in-review');
  }, 720 + checks.length * 760));
});
document.querySelector('.back-to-tool').addEventListener('click', () => { modal.hidden = true; });

const shareModal = document.querySelector('#share-modal');
const shareButton = document.querySelector('.share-button');
const closeShare = () => { shareModal.hidden = true; };
shareButton.addEventListener('click', () => { shareModal.hidden = false; });
document.querySelector('.share-close').addEventListener('click', closeShare);
document.querySelector('.share-done').addEventListener('click', closeShare);
shareModal.addEventListener('click', (event) => { if (event.target === shareModal) closeShare(); });
document.querySelector('#copy-link').addEventListener('click', async (event) => {
  const link = 'https://supplier-compare.acme.tinycloud.com';
  try { await navigator.clipboard.writeText(link); } catch { /* Clipboard may be unavailable in a local file preview. */ }
  event.currentTarget.textContent = 'Copied ✓';
  setTimeout(() => { event.currentTarget.textContent = 'Copy link'; }, 1600);
});

document.querySelectorAll('.approve-request').forEach((button) => button.addEventListener('click', () => {
  const item = button.closest('[data-approval-item]');
  item.classList.add('approved-item');
  const status = item.querySelector('.status');
  status.className = 'status live';
  status.textContent = 'Approved · shared';
  item.querySelector('.preflight-passed span').textContent = '✓ Human review approved';
}));

document.querySelectorAll('.return-tool').forEach((button) => button.addEventListener('click', () => {
  const item = button.closest('[data-approval-item]');
  item.classList.add('approved-item');
  const status = item.querySelector('.status');
  status.className = 'status sleeping';
  status.textContent = 'Returned to owner';
  item.querySelector('.preflight-passed span').textContent = '↩ Returned with reviewer note';
}));

document.querySelectorAll('.archive-tool').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('[data-lifecycle-card]');
  card.classList.add('lifecycle-card-done');
  const lifecycle = card.querySelectorAll(':scope > span')[0];
  lifecycle.querySelector('b').textContent = 'Archived · restorable';
}));

document.querySelectorAll('.wake-tool').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('[data-lifecycle-card]');
  card.classList.add('lifecycle-card-done');
  const lifecycle = card.querySelectorAll(':scope > span')[0];
  lifecycle.querySelector('b').textContent = 'Awake for 30 days';
}));

document.querySelector('#approve-tool').addEventListener('click', () => {
  const request = document.querySelector('#approval-request');
  const status = document.querySelector('#approval-status');
  request.classList.add('approved-request');
  status.className = 'status live';
  status.textContent = 'Approved';
  document.querySelector('#approve-tool').closest('.request-actions').remove();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) modal.hidden = true;
  if (event.key === 'Escape' && !shareModal.hidden) shareModal.hidden = true;
});
