const projects = [
  {
    "title": "Building AI agents",
    "company": "INVOCA",
    "kind": "Agent builder UX",
    "desc": "Helping teams configure, test, and launch agents with confidence.",
    "role": "Product & interaction design",
    "status": "Design work · release status varies by feature",
    "problem": "How can teams move from a business goal to an agent they feel ready to launch?",
    "focus": [
      "Organize behavior, knowledge, tools, and guardrails.",
      "Make realistic testing part of the building experience.",
      "Keep configuration changes and launch decisions reviewable."
    ],
    "note": "This overview describes the design direction. Individual features and proposals need their own release evidence.",
    "visual": "builder"
  },
  {
    "title": "SMS & voice experiences",
    "company": "INVOCA",
    "kind": "Conversational AI",
    "desc": "Making automated conversations clear, useful, and easy to recover from.",
    "role": "Conversational experience design",
    "status": "Design work · release status varies by feature",
    "problem": "How do people get useful help from an agent when conversations do not follow a script?",
    "focus": [
      "Set clear expectations for what the agent can do.",
      "Support clarification, actions, and human handoff.",
      "Design for misunderstandings and incomplete information."
    ],
    "note": "This case focuses on the person talking to the agent; the builder case focuses on the team configuring it.",
    "visual": "voice"
  },
  {
    "title": "Customer Research Weekly",
    "company": "INVOCA",
    "kind": "Internal research agent",
    "desc": "Turning scattered feedback into searchable, source-linked evidence.",
    "role": "Research workflow design & building",
    "status": "Built internal workflow · user-reported",
    "problem": "How can Product & Design find customer evidence across Slack conversations and Gong calls?",
    "focus": [
      "Extract customer claims with quotes and source links.",
      "Separate source biases and flag insufficient evidence.",
      "Deliver weekly digests and evidence-backed answers."
    ],
    "note": "Reported October 2026 snapshot: 1,989 claims across 287 accounts. These counts describe coverage; adoption and accuracy need separate measurement.",
    "visual": "research"
  },
  {
    "title": "Project to be confirmed",
    "company": "SELECTED WORK",
    "kind": "Selection pending",
    "desc": "Reserved for the final project selection.",
    "role": "",
    "status": "Placeholder · final project selection pending",
    "problem": "This project slot will be updated when the final six projects are selected.",
    "focus": [],
    "note": "The cover is a conceptual placeholder. No project ownership, implementation, or outcome is claimed.",
    "visual": "mcp"
  },
  {
    "title": "AppearLocal AI",
    "company": "INDEPENDENT",
    "kind": "Product design & building",
    "desc": "Helping local businesses understand who AI recommends—and why.",
    "role": "Independent product design & development",
    "status": "Independent prototype",
    "problem": "How can a local business understand its place in AI recommendations for specific customer needs?",
    "focus": [
      "Compare recommendations by town, service, and need.",
      "Resolve business-name variations and review evidence.",
      "Iterate on the product with Claude Code and GitHub."
    ],
    "note": "Prototype work. No revenue or recommendation-ranking improvement is claimed.",
    "visual": "appear"
  },
  {
    "title": "Map Data View",
    "company": "NETBRAIN",
    "kind": "Complex enterprise systems",
    "desc": "Simplifying how network teams explore data and act on system changes.",
    "role": "UX & customer insights leadership",
    "status": "Prior product work",
    "problem": "How can network teams move between topology, historical data, and useful actions with less effort?",
    "focus": [
      "Bring related information into an integrated workflow.",
      "Use visual hierarchy to reveal important changes.",
      "Validate the experience with technical users."
    ],
    "note": "Prior NetBrain product work. This overview focuses on the design approach; historical outcome measures need source confirmation.",
    "visual": "network",
    "link": "earlier-work.html#portfolio"
  }
];

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navlinks');
const mobileLayout = window.matchMedia('(max-width: 900px)');

function closeMenu({ restoreFocus = false } = {}) {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  menu.textContent = 'Menu';
  if (restoreFocus) menu.focus();
}

menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Close menu' : 'Menu';
  nav.classList.toggle('open', open);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
    if (link.hash && link.origin === location.origin) {
      document.querySelector(link.hash)?.focus({ preventScroll: true });
    }
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu({ restoreFocus: true });
  }
});

document.addEventListener('click', event => {
  if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
});

mobileLayout.addEventListener('change', () => closeMenu());

// Native dialog supplies Escape dismissal, focus containment, and inert background.
const dialog = document.getElementById('project-dialog');
const modalBody = document.getElementById('modal-body');
let opener;
let previousOverflow = '';

function element(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value) node.textContent = value;
  return node;
}

function showProject(button) {
  const project = projects[Number(button.dataset.project)];
  if (!project || dialog.open) return;
  opener = button;
  modalBody.replaceChildren();
  modalBody.append(element('div', 'eyebrow', `${project.company} / ${project.kind}`));
  const title = element('h2', 'modal-title', project.title);
  title.id = 'modal-title';
  title.tabIndex = -1;
  modalBody.append(title);
  if (project.role) modalBody.append(element('div', 'modal-role', project.role));
  const problem = element('p', 'problem', project.problem);
  problem.id = 'modal-problem';
  modalBody.append(problem);
  if (project.focus.length) {
    modalBody.append(element('h3', '', 'Design focus'));
    const list = element('ul');
    project.focus.forEach(item => list.append(element('li', '', item)));
    modalBody.append(list);
  }
  modalBody.append(element('p', 'modal-note', project.note));
  if (project.link) {
    const link = element('a', '', 'Browse earlier case studies');
    link.href = project.link;
    modalBody.append(link);
  }
  modalBody.append(element('div', 'modal-footer', project.status));
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  dialog.showModal();
  dialog.scrollTop = 0;
  title.focus();
}

document.querySelectorAll('[data-project]').forEach(button => {
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-controls', dialog.id);
  button.addEventListener('click', () => showProject(button));
});

document.querySelector('.close').addEventListener('click', () => dialog.close());
let backdropStart = false;
function outsideDialog(event) {
  const rect = dialog.getBoundingClientRect();
  return event.target === dialog &&
    (event.clientX < rect.left || event.clientX > rect.right ||
     event.clientY < rect.top || event.clientY > rect.bottom);
}
dialog.addEventListener('pointerdown', event => { backdropStart = outsideDialog(event); });
dialog.addEventListener('click', event => {
  if (backdropStart && outsideDialog(event)) dialog.close();
  backdropStart = false;
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow;
  opener?.focus({ preventScroll: true });
});

// Follow the section nearest the top of the viewport, including when scrolling up.
const sections = [...document.querySelectorAll('main > section[id]')];
const sectionLinks = [...nav.querySelectorAll('a[href^="#"]')];
let framePending = false;
function updateCurrentSection() {
  framePending = false;
  const threshold = document.querySelector('.site-header').offsetHeight + 100;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) current = section;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    current = sections.at(-1);
  }
  sectionLinks.forEach(link => {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', () => {
  if (!framePending) {
    framePending = true;
    requestAnimationFrame(updateCurrentSection);
  }
}, { passive: true });
window.addEventListener('resize', updateCurrentSection);
updateCurrentSection();

// Keep Tab inside the dialog even when its initial heading has focus.
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...dialog.querySelectorAll('button, a[href], [tabindex="0"]')];
  const first = controls[0];
  const last = controls.at(-1);
  const active = document.activeElement;
  if (event.shiftKey && (active === first || !controls.includes(active))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (active === last || !controls.includes(active))) {
    event.preventDefault();
    first.focus();
  }
});
