'use strict';

(function () {
  var SUPPORTED = ['en', 'ja', 'de', 'es', 'fr', 'it', 'ko', 'pt_BR', 'zh_CN', 'zh_TW'];
  var LANGUAGE_LABELS = {
    en: 'Language',
    ja: '言語',
    de: 'Sprache',
    es: 'Idioma',
    fr: 'Langue',
    it: 'Lingua',
    ko: '언어',
    pt_BR: 'Idioma',
    zh_CN: '语言',
    zh_TW: '語言'
  };

  function detectLang() {
    var n = (navigator.language || '').toLowerCase();
    if (n.startsWith('ja')) return 'ja';
    if (n.startsWith('ko')) return 'ko';
    if (n.startsWith('it')) return 'it';
    if (n.startsWith('de')) return 'de';
    if (n.startsWith('es')) return 'es';
    if (n.startsWith('fr')) return 'fr';
    if (n.startsWith('pt')) return 'pt_BR';
    if (n === 'zh-tw' || n === 'zh-hant' || n.startsWith('zh-hant')) return 'zh_TW';
    if (n.startsWith('zh')) return 'zh_CN';
    return 'en';
  }

  function getLang() {
    var saved = localStorage.getItem('gaf-lang') || localStorage.getItem('fbd-lang');
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    return detectLang();
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'en';
    localStorage.setItem('gaf-lang', lang);
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });
    document.documentElement.lang = lang.replace('_', '-');
    var sel = document.getElementById('lang-sel');
    if (sel) {
      sel.value = lang;
      sel.setAttribute('aria-label', LANGUAGE_LABELS[lang] || LANGUAGE_LABELS.en);
    }
    var active = document.querySelector('[data-lang="' + lang + '"] h1');
    if (active && active.textContent.trim()) {
      document.title = active.textContent.trim() + ' - Grab All Files';
    }
  }

  window.onLangChange = function (e) { setLang(e.target.value); };

  setLang(getLang());
})();
