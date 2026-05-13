const LANGUAGES = [
  { id: 'java', label: 'Java' },
];

const fetchedData = {};
let activeLanguageId = null;

function init() {
  const sidebar = document.getElementById('sidebar');
  const header = sidebar.querySelector('.sidebar-header');

  LANGUAGES.forEach(lang => {
    const group = document.createElement('div');
    group.className = 'language-group';
    group.dataset.langId = lang.id;

    const toggle = document.createElement('button');
    toggle.className = 'language-toggle';
    toggle.textContent = lang.label;
    toggle.addEventListener('click', () => handleLanguageClick(lang, group));

    const topicList = document.createElement('ul');
    topicList.className = 'topic-list hidden';

    group.appendChild(toggle);
    group.appendChild(topicList);
    sidebar.appendChild(group);
  });

  showWelcome();
}

async function handleLanguageClick(lang, group) {
  const toggle = group.querySelector('.language-toggle');
  const topicList = group.querySelector('.topic-list');
  const isOpen = activeLanguageId === lang.id;

  // Collapse all language groups
  document.querySelectorAll('.language-group').forEach(g => {
    g.querySelector('.language-toggle').classList.remove('expanded');
    g.querySelector('.topic-list').classList.add('hidden');
  });

  if (isOpen) {
    activeLanguageId = null;
    showWelcome();
    return;
  }

  activeLanguageId = lang.id;
  toggle.classList.add('expanded');
  topicList.classList.remove('hidden');

  if (!fetchedData[lang.id]) {
    topicList.innerHTML = '<li class="loading">Loading…</li>';
    try {
      const res = await fetch(`data/${lang.id}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      fetchedData[lang.id] = await res.json();
    } catch (err) {
      topicList.innerHTML = '<li class="loading">Failed to load data.</li>';
      console.error(err);
      return;
    }
  }

  const topics = fetchedData[lang.id].topics;
  renderTopicList(topicList, topics);
  renderTopic(topics[0]);
}

function renderTopicList(topicList, topics) {
  topicList.innerHTML = '';
  topics.forEach(topic => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'topic-link';
    a.textContent = topic.title;
    a.dataset.topicId = topic.id;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.topic-link').forEach(l => l.classList.remove('active'));
      a.classList.add('active');
      renderTopic(topic);
    });
    li.appendChild(a);
    topicList.appendChild(li);
  });
}

function renderTopic(topic) {
  const content = document.getElementById('content');

  const article = document.createElement('article');
  article.className = 'topic-content';

  const title = document.createElement('h1');
  title.className = 'topic-title';
  title.textContent = topic.title;

  const desc = document.createElement('p');
  desc.className = 'topic-description';
  desc.textContent = topic.description;

  const bpSection = document.createElement('section');
  bpSection.className = 'best-practices';

  const bpHeading = document.createElement('h2');
  bpHeading.textContent = 'Best Practices';

  const bpList = document.createElement('ul');
  topic.best_practices.forEach(practice => {
    const li = document.createElement('li');
    li.textContent = practice;
    bpList.appendChild(li);
  });

  bpSection.appendChild(bpHeading);
  bpSection.appendChild(bpList);

  const codeSection = document.createElement('section');
  codeSection.className = 'code-section';

  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = topic.code;
  pre.appendChild(code);
  codeSection.appendChild(pre);

  article.appendChild(title);
  article.appendChild(desc);
  article.appendChild(bpSection);
  article.appendChild(codeSection);

  content.innerHTML = '';
  content.appendChild(article);

  // Mark first topic link active if none is active yet
  const firstLink = document.querySelector('.topic-link[data-topic-id="' + topic.id + '"]');
  if (firstLink) {
    document.querySelectorAll('.topic-link').forEach(l => l.classList.remove('active'));
    firstLink.classList.add('active');
  }
}

function showWelcome() {
  const content = document.getElementById('content');
  content.innerHTML = '<p class="welcome-message">Select a language to get started.</p>';
}

document.addEventListener('DOMContentLoaded', init);
