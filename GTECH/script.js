// =========================================================
// G·TECH AUTOMATION — Site scripts
// (Bootstrap's own JS bundle handles the navbar collapse toggle)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Add a subtle shadow to the header once the page is scrolled
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    document.getElementById('logoImg').src = window.scrollY > 8 ? 'img/logo-g.png' : 'img/logo.png';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Close the mobile nav automatically after a link is tapped
  const navCollapseEl = document.getElementById('siteNav');
  if (navCollapseEl) {
    const bsCollapse = window.bootstrap ? new bootstrap.Collapse(navCollapseEl, { toggle: false }) : null;
    navCollapseEl.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navCollapseEl.classList.contains('show') && bsCollapse) {
          bsCollapse.hide();
        }
      });
    });
  }

  // Simple client-side handling for the newsletter form (demo only —
  // replace with a real endpoint before going live)
  const subscribeForm = document.getElementById('subscribeForm');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = subscribeForm.querySelector('input[type="email"]');
      const button = subscribeForm.querySelector('button');
      if (!input.value) return;

      const originalLabel = button.textContent;
      button.textContent = 'Thank you!';
      button.disabled = true;
      input.value = '';

      setTimeout(() => {
        button.textContent = originalLabel;
        button.disabled = false;
      }, 2500);
    });
  }
  // Scroll-spy: highlight the nav link matching the section in view
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    if (window.scrollY < 100) {
      current = "top";
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      current = "contact";
    }

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
});
