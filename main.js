/* main.js — shared across all pages */
(function () {
  /* ── Scroll Reveal ── */
  var obs = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });

  /* ── Auto-discover Animation Observers ── */
  document.querySelectorAll('[data-anim-target]').forEach(function (container) {
    var target = container.dataset.animTarget;
    var prop = container.dataset.animProp || 'width';
    var attr = container.dataset.animAttr || 'w';
    var o = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.querySelectorAll(target).forEach(function (el) {
            el.style[prop] = (el.dataset[attr] || 0) + '%';
          });
          o.unobserve(e.target);
        }
      });
    }, { threshold: .3 });
    o.observe(container);
  });
})();
