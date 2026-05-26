(function () {
  'use strict';

  /* ── Theme toggle ────────────────────────────────────── */
  var toggle = document.getElementById('theme-toggle');
  var root   = document.documentElement;
  var stored = localStorage.getItem('theme');

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  }

  if (stored) {
    applyTheme(stored);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  /* ── Mobile nav toggle ───────────────────────────────── */
  var navToggle = document.getElementById('nav-toggle');
  var navLinks  = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    // close on link click
    var links = navLinks.querySelectorAll('.nav-link');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    }
  }

  /* ── Scroll-reveal (Intersection Observer) ───────────── */
  var reveals = document.querySelectorAll('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // fallback: show everything
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── Nav background on scroll ────────────────────────── */
  var nav = document.getElementById('nav');

  if (nav) {
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
      var y = window.pageYOffset;

      if (y > 80) {
        nav.style.borderBottomColor = 'var(--border2)';
      } else {
        nav.style.borderBottomColor = 'var(--border)';
      }

      lastScroll = y;
    }, { passive: true });
  }

  /* ── Project filter (used on projects.html) ──────────── */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projItems  = document.querySelectorAll('.proj-card[data-cat]');

  if (filterBtns.length && projItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var f = btn.getAttribute('data-filter');

        projItems.forEach(function (item) {
          var cats = (item.getAttribute('data-cat') || '').split(' ');
          if (f === 'all' || cats.indexOf(f) !== -1) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

})();
