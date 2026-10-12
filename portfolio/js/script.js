// Plain JavaScript: no frameworks or libraries.
// The content and links work even when JavaScript is turned off.
document.documentElement.classList.add('js-enabled');

// 1. Mobile navigation: keep the visual state and accessible state in sync.
const menuButton = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');

function closeMenu() {
  navLinks.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});

// 2. Project filters: the cards stay in the HTML for accessibility and no-JS use.
const filters = document.querySelector('#project-filters');
const projectCards = document.querySelectorAll('.project-card');
filters.classList.remove('hidden');
filters.classList.add('flex');

filters.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let visibleCount = 0;

    filters.querySelectorAll('button').forEach((filter) => {
      filter.setAttribute('aria-pressed', String(filter === button));
    });

    projectCards.forEach((card) => {
      const matches = category === 'all' || card.dataset.category === category;
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    document.querySelector('#filter-status').textContent =
      `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'} shown.`;
  });
});

// 3. Project notes. These describe the user's projects, not this site's stack.
const projects = {
  pixelforge: {
    title: 'PixelForge',
    summary: 'A small web studio I started to build websites for local businesses.',
    idea: 'Help businesses like gyms, boutiques, and hotels communicate clearly online. Start with what the business needs, then create a website around it.',
    learning: 'Responsive layouts, talking to clients, understanding requirements, and taking a website from an idea through deployment. The card artwork is an illustration, not a screenshot of the live website.',
    url: 'https://pixelfforge2026.netlify.app/'
  },
  fitness: {
    title: 'Fit24 Fitness',
    summary: 'A gym website demo from my small-business web development journey.',
    idea: 'Give a fitness business a place online where visitors can discover its offering and take the next step toward joining.',
    learning: 'Designing for a specific audience, presenting a business clearly, and making layouts work on both phones and larger screens. The card artwork is an illustration, not a screenshot of the live website.',
    url: 'https://fit24fitness.netlify.app'
  },
  jarvas: {
    title: 'JARVAS MathBot',
    summary: 'An in-progress AI mathematics project. The public repository currently describes the foundation as complete, with the solver and verification planned next.',
    idea: 'Generate a proposed mathematical solution, then use symbolic checks where possible. The goal is to distinguish verified, refuted, unverifiable, and error states rather than automatically trust a generated answer.',
    learning: 'Building a foundation for an AI product and exploring how to communicate the limits of an answer. The card is a concept illustration of the intended experience, not a screenshot or a claim that the solver is already working.',
    url: 'https://github.com/rdverma16u2858-netizen/Jarvas'
  },
  khanak: {
    title: 'KHANAK — SST Hustle',
    summary: 'The website for my campus business, created for the Hustle activity at Scaler School of Technology.',
    idea: 'Bring a campus collection into one storefront: jewellery, clothing, posters, room décor, and the Crave Cart food menu. Make it easy for students to discover the collection and share their interest.',
    learning: 'Validating a business idea with students, presenting products clearly, coordinating with a team, and learning from real customers. The portfolio card is a concept illustration; the Visit store link opens the actual business website.',
    url: 'https://khanak-store.onrender.com/'
  }
};

const projectDialog = document.querySelector('#project-dialog');

if (typeof projectDialog.showModal === 'function') {
  document.querySelectorAll('[data-project]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const project = projects[button.dataset.project];
      document.querySelector('#dialog-title').textContent = project.title;
      document.querySelector('#dialog-summary').textContent = project.summary;
      document.querySelector('#dialog-idea').textContent = project.idea;
      document.querySelector('#dialog-learning').textContent = project.learning;
      document.querySelector('#dialog-link').href = project.url;
      projectDialog.showModal();
    });
  });

  projectDialog.addEventListener('click', (event) => {
    // Clicks on the backdrop close the dialog; clicks inside its box do not.
    const box = projectDialog.getBoundingClientRect();
    const outside = event.clientX < box.left || event.clientX > box.right ||
      event.clientY < box.top || event.clientY > box.bottom;
    if (event.target === projectDialog && outside) projectDialog.close();
  });
}

// 4. Copying has an honest fallback for file:// or denied clipboard access.
const copyButton = document.querySelector('#copy-profile');
const copyStatus = document.querySelector('#copy-status');
const githubURL = 'https://github.com/rdverma16u2858-netizen';
copyButton.hidden = false;

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(githubURL);
    copyStatus.textContent = 'GitHub profile link copied.';
  } catch {
    copyStatus.textContent = `Copy this link: ${githubURL}`;
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

// 5. First-year goals: localStorage is a built-in browser API, not a database.
// Stable IDs keep progress attached to the right goal if its wording changes.
const goalCheckboxes = [...document.querySelectorAll('[data-goal]')];
const goalStorageKey = 'rudra-portfolio:year-one:2026-27:v1';
const goalProgress = document.querySelector('#goal-progress');
const goalProgressText = document.querySelector('#goal-progress-text');
const goalSaveStatus = document.querySelector('#goal-save-status');

function updateGoalProgress() {
  const completed = goalCheckboxes.filter((checkbox) => checkbox.checked).length;
  goalProgress.max = goalCheckboxes.length;
  goalProgress.value = completed;
  goalProgress.textContent = `${completed} of ${goalCheckboxes.length} goals complete`;
  goalProgressText.textContent = `${completed} / ${goalCheckboxes.length} complete`;

  document.querySelectorAll('.goal-phase').forEach((phase) => {
    const checkboxes = [...phase.querySelectorAll('[data-goal]')];
    const checked = checkboxes.filter((checkbox) => checkbox.checked).length;
    phase.querySelector('.phase-count').textContent = `${checked} / ${checkboxes.length} complete`;
    phase.classList.toggle('is-complete', checked === checkboxes.length);
  });
}

function saveGoalProgress() {
  const progress = {};
  goalCheckboxes.forEach((checkbox) => {
    progress[checkbox.dataset.goal] = checkbox.checked;
  });

  try {
    localStorage.setItem(goalStorageKey, JSON.stringify(progress));
    goalSaveStatus.textContent = 'Progress saved in this browser.';
  } catch {
    // Checkboxes still work if browser settings or storage limits block saving.
    goalSaveStatus.textContent = 'Saving is unavailable. Changes will last only while this page stays open.';
  }
}

try {
  const saved = JSON.parse(localStorage.getItem(goalStorageKey) || '{}');
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) {
    throw new Error('Invalid goal progress');
  }
  goalCheckboxes.forEach((checkbox) => {
    // Only the literal boolean true counts; unknown IDs and other values are ignored.
    checkbox.checked = saved[checkbox.dataset.goal] === true;
  });
} catch {
  goalSaveStatus.textContent = 'Saved progress could not be loaded. You can still mark goals on this page.';
}

goalCheckboxes.forEach((checkbox) => {
  checkbox.disabled = false;
  checkbox.addEventListener('change', () => {
    updateGoalProgress();
    saveGoalProgress();
  });
});
updateGoalProgress();
