(function () {
  'use strict';

  var THEMES = ['green', 'black'];
  var root = document.documentElement;

  function read() { try { return localStorage.getItem('mwham-theme'); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem('mwham-theme', v); } catch (e) { /* storage blocked */ } }

  function applyTheme(theme) {
    if (THEMES.indexOf(theme) === -1) theme = 'green';
    root.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-label', 'Switch to ' + (theme === 'green' ? 'black' : 'green') + ' theme');
  }

  var fromUrl = new URLSearchParams(location.search).get('theme');
  applyTheme(fromUrl || read() || 'green');

  var toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'green' ? 'black' : 'green';
    write(next);
    applyTheme(next);
  });

  /* Topic filter (posts page) */
  var topics = document.querySelectorAll('.topic');
  var rows = document.querySelectorAll('.post-row');
  var status = document.getElementById('list-status');
  var empty = document.getElementById('empty');
  if (!topics.length) return;

  function update() {
    var active = [].filter.call(topics, function (t) {
      return t.getAttribute('aria-pressed') === 'true' && t.dataset.tag !== 'all';
    }).map(function (t) { return t.dataset.tag; });
    var shown = 0;
    [].forEach.call(rows, function (row) {
      var tags = row.dataset.tags.split(',');
      var match = !active.length || active.every(function (t) { return tags.indexOf(t) !== -1; });
      row.hidden = !match;
      if (match) shown++;
    });
    status.textContent = 'Showing ' + shown + ' of ' + rows.length + ' posts' + (active.length ? ' tagged ' + active.join(' + ') : '');
    empty.hidden = shown !== 0;
  }

  [].forEach.call(topics, function (t) {
    t.addEventListener('click', function () {
      var all = document.querySelector('.topic[data-tag="all"]');
      if (t.dataset.tag === 'all') {
        [].forEach.call(topics, function (o) { o.setAttribute('aria-pressed', o === t ? 'true' : 'false'); });
      } else {
        t.setAttribute('aria-pressed', t.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        var any = [].some.call(topics, function (o) { return o.dataset.tag !== 'all' && o.getAttribute('aria-pressed') === 'true'; });
        all.setAttribute('aria-pressed', any ? 'false' : 'true');
      }
      update();
    });
  });
}());
