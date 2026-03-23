// =============== EXPANDED PROJECTS DATA (fixed categories, links, descriptions) ===============
const projectsData = [
  {
    id: 1,
    title: "Match Master: Card Memory Game",
    category: "Minor",
    desc: "A beautifully designed, fully interactive memory card game that challenges players to match pairs of cards with stunning visuals. Built with pure HTML5, CSS3, and JavaScript, this game offers a smooth 3D flip animation experience with multiple difficulty levels to test and improve memory skills.",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    icon: "fa-arrow-right-arrow-left",
    liveLink: "../Card Memory Game/Card.html",
    codeLink: "#",
  },
  {
    id: 2,
    title: "My Portfolio",
    category: "Frontend",
    desc: "A modern, responsive portfolio website showcasing my skills and projects. Built with clean HTML5, CSS3, and JavaScript, featuring smooth animations, dark/light mode toggle, and an interactive project gallery.",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    icon: "fa-user",
    liveLink: "../index.html",
    codeLink: "#",
  },
  {
    id: 3,
    title: "Nexus AI Dashboard",
    category: "Fullstack",
    desc: "Enterprise-grade AI analytics dashboard with real-time data pipelines. Backend built with FastAPI + PostgreSQL, React frontend with Recharts and WebSockets for live metrics. Includes JWT auth and role-based access.",
    tech: ["React", "FastAPI", "PostgreSQL", "WebSockets", "Docker"],
    icon: "fa-chart-line",
    liveLink: "#",
    codeLink: "https://github.com/yashsingh/nexus-dashboard",
  },
  {
    id: 4,
    title: "UrbanCart E‑commerce",
    category: "Fullstack",
    desc: "Scalable e‑commerce platform with product search, cart, Stripe payments, and order management. Built with Next.js 14, Node.js microservices, MongoDB, and Redis caching.",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redis"],
    icon: "fa-shopping-cart",
    liveLink: "#",
    codeLink: "https://github.com/yashsingh/urbancart",
  },
  {
    id: 5,
    title: "WeatherScape PWA",
    category: "Frontend",
    desc: "Progressive Web App with geolocation, 7-day forecast, animated weather icons, and offline support. Uses OpenWeatherMap API and IndexedDB for caching.",
    tech: ["React", "PWA", "CSS Modules", "OpenWeather API"],
    icon: "fa-cloud-sun",
    liveLink: "#",
    codeLink: "https://github.com/yashsingh/weatherscape",
  },
  {
    id: 6,
    title: "TaskFlow Kanban",
    category: "Frontend",
    desc: "Drag-and-drop task management board inspired by Trello. Fully responsive, local storage persistence, custom themes, and keyboard shortcuts.",
    tech: ["React", "React DnD", "TailwindCSS", "LocalStorage"],
    icon: "fa-tasks",
    liveLink: "#",
    codeLink: "https://github.com/yashsingh/taskflow",
  },
  {
    id: 7,
    title: "DevConnect API",
    category: "Fullstack",
    desc: "RESTful API for developer social network featuring JWT auth, profile management, posts, comments, and real-time notifications via Socket.io. Documented with Swagger.",
    tech: ["Node.js", "Express", "MongoDB", "Socket.io", "Swagger"],
    icon: "fa-code-branch",
    liveLink: "#",
    codeLink: "https://github.com/yashsingh/devconnect-api",
  },
  {
    id: 8,
    title: "PixelSnap Gallery",
    category: "Minor",
    desc: "Minimalist image gallery with infinite scroll, Unsplash API integration, and like/favorite feature. Built with vanilla JS and CSS Grid.",
    tech: ["JavaScript", "CSS Grid", "Unsplash API", "Intersection Observer"],
    icon: "fa-images",
    liveLink: "#",
    codeLink: "https://github.com/yashsingh/pixelsnap",
  },
  {
    id: 9,
    title: "Portfolio 3D Experience",
    category: "Frontend",
    desc: "Immersive 3D portfolio using Three.js with interactive particles, model viewer, and shader effects. Optimized for performance and mobile.",
    tech: ["Three.js", "WebGL", "GSAP", "Vite"],
    icon: "fa-cube",
    liveLink: "#",
    codeLink: "https://github.com/yashsingh/3d-portfolio",
  },
  {
    id: 10,
    title: "QuickSnip Code Snippets",
    category: "Minor",
    desc: "A lightweight snippet manager with syntax highlighting and copy-to-clipboard. Stores snippets in browser's IndexedDB, supports markdown notes.",
    tech: ["HTML", "JavaScript", "IndexedDB", "Prism.js"],
    icon: "fa-code",
    liveLink: "#",
    codeLink: "https://github.com/yashsingh/quicksnip",
  },
];

const gridContainer = document.getElementById("projectsGrid");
let activeFilter = "all";

// Helper: generate gradient styles for card images (dynamic vibe)
function getGradientStyle(id) {
  const gradients = [
    "linear-gradient(125deg, #0b1120, #111c2e)",
    "linear-gradient(145deg, #071524, #0a1a2c)",
    "linear-gradient(135deg, #0a1022, #121d32)",
    "linear-gradient(115deg, #0c1628, #09192e)",
    "linear-gradient(140deg, #0e172a, #0b1425)",
  ];
  return gradients[id % gradients.length];
}

// Escape helper to prevent injection
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Format category label with correct icon mapping
function formatCategoryLabel(category) {
  const upperCategory = category.toUpperCase();
  if (upperCategory === "FULLSTACK") {
    return '<i class="fas fa-code-branch"></i> FULL‑STACK';
  } else if (upperCategory === "FRONTEND") {
    return '<i class="fas fa-desktop"></i> FRONTEND';
  } else if (upperCategory === "MINOR") {
    return '<i class="fas fa-star-of-life"></i> MINOR';
  } else {
    return `<i class="fas fa-folder"></i> ${upperCategory}`;
  }
}

// Toast notification helper
function showToast(msg, type = "info") {
  const existingToast = document.querySelector(".custom-toast");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = `custom-toast toast-${type}`;
  toast.innerHTML = `<i class="fas ${type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i> ${escapeHtml(msg)}`;
  document.body.appendChild(toast);
  toast.offsetHeight; // force reflow
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 300);
  }, 2500);
}

// handle demo links with smart toast for disabled or placeholder links
function attachLinkHandlers() {
  document.querySelectorAll(".card-links a").forEach((link) => {
    // Remove existing listener to avoid duplicates
    link.removeEventListener("click", link._clickHandler);
    const handler = (e) => {
      const href = link.getAttribute("href");
      // If href is "#" or null/undefined or disabled-link class, prevent default and show toast
      if (
        !href ||
        href === "#" ||
        link.classList.contains("disabled-link") ||
        href === ""
      ) {
        e.preventDefault();
        const linkText =
          link.querySelector("i")?.nextSibling?.textContent?.trim() || "link";
        showToast(`✨ ${linkText} — coming soon!`, "info");
      } else {
        // optional: external links open normally, but we also catch broken local paths gracefully
        // but we keep default behaviour, just small guard for relative paths that might 404
        // For better UX we don't block legit links, but if liveLink points to missing local we still show toast?
        // No — keep default navigation.
      }
    };
    link.addEventListener("click", handler);
    link._clickHandler = handler;
  });
}

// Render projects based on current filter
function renderProjects(filter) {
  if (!gridContainer) return;
  const filtered =
    filter === "all"
      ? projectsData
      : projectsData.filter(
          (p) => p.category.toUpperCase() === filter.toUpperCase(),
        );

  if (filtered.length === 0) {
    gridContainer.innerHTML = `<div class="no-projects-message">
        <i class="fas fa-cube"></i>
        <p>No projects in this category — explore others!</p>
      </div>`;
    return;
  }

  let cardsHTML = "";
  filtered.forEach((project, idx) => {
    const iconClass = project.icon || "fa-cube";
    const gradientBg = getGradientStyle(project.id);
    const categoryLabel = formatCategoryLabel(project.category);

    // tech tags rendering
    const techTags =
      Array.isArray(project.tech) && project.tech.length
        ? project.tech
            .map(
              (t) =>
                `<span class="tech-tag"><i class="fas fa-code"></i> ${escapeHtml(t)}</span>`,
            )
            .join("")
        : '<span class="tech-tag"><i class="fas fa-microchip"></i> Tech stack</span>';

    // Determine link attributes: if link is missing or "#" -> disabled-link class
    const liveUrl =
      project.liveLink && project.liveLink !== "#" ? project.liveLink : null;
    const codeUrl =
      project.codeLink && project.codeLink !== "#" ? project.codeLink : null;

    const liveLinkAttr = liveUrl
      ? `href="${escapeHtml(liveUrl)}" target="_blank" rel="noopener noreferrer" class="live-link"`
      : `href="#" class="disabled-link live-link"`;

    const codeLinkAttr = codeUrl
      ? `href="${escapeHtml(codeUrl)}" target="_blank" rel="noopener noreferrer"`
      : `href="#" class="disabled-link"`;

    cardsHTML += `
        <div class="project-card" data-category="${escapeHtml(project.category)}">
          <div class="card-img" style="background: ${gradientBg};">
            <i class="fas ${escapeHtml(iconClass)}"></i>
          </div>
          <div class="card-content">
            <div class="card-header">
              <div class="project-title">${escapeHtml(project.title)}</div>
              <div class="project-category">${categoryLabel}</div>
            </div>
            <div class="project-desc">${escapeHtml(project.desc)}</div>
            <div class="tech-tags">${techTags}</div>
            <div class="card-links">
              <a ${liveLinkAttr}><i class="fas fa-external-link-alt"></i> Live demo</a>
              <a ${codeLinkAttr}><i class="fab fa-github"></i> Source code</a>
            </div>
          </div>
        </div>
      `;
  });

  gridContainer.innerHTML = cardsHTML;
  // attach handlers for interactive links (toast on disabled)
  attachLinkHandlers();
  // trigger scroll animation observer for newly added cards
  observeNewCards();
}

// Intersection Observer to add "visible" class on scroll
function observeNewCards() {
  const cards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
  );

  cards.forEach((card) => {
    // if already visible, mark but still observe to be safe
    if (card.getBoundingClientRect().top < window.innerHeight - 100) {
      card.classList.add("visible");
    } else {
      observer.observe(card);
    }
  });
}

// Filter buttons initialization
function initFilters() {
  const btns = document.querySelectorAll(".filter-btn");
  if (!btns.length) return;

  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const filterValue = btn.getAttribute("data-filter");
      if (!filterValue) return;
      activeFilter = filterValue;
      // Update active class
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(activeFilter);
      // Smooth scroll to grid for better UX
      const gridEl = document.getElementById("projectsGrid");
      if (gridEl) {
        setTimeout(() => {
          gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
    });
  });
}

// initial render and observers
function init() {
  renderProjects("all");
  initFilters();
  observeNewCards();
  // Optional: handle any global link defaults for social footer (just prevent no-action)
  const socialLinks = document.querySelectorAll(".social-links a");
  socialLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (!link.getAttribute("href") || link.getAttribute("href") === "#") {
        e.preventDefault();
        showToast("🔗 Social profile integration coming soon!", "info");
      }
    });
  });
}

// Start everything when DOM ready
window.addEventListener("DOMContentLoaded", init);
