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
    var saved = localStorage.getItem('fbd-lang');
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    return detectLang();
  }

  function getAvailableLangs() {
    var langs = [];
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      var lang = el.getAttribute('data-lang');
      if (lang && langs.indexOf(lang) === -1) langs.push(lang);
    });
    return langs;
  }

  function setLang(lang, options) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'en';
    var available = getAvailableLangs();
    var activeLang = lang;
    if (available.length && available.indexOf(activeLang) === -1) {
      activeLang = available.indexOf('en') !== -1 ? 'en' : available[0];
    }
    var persist = !options || options.persist !== false;
    if (persist) localStorage.setItem('fbd-lang', activeLang);
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-lang') === activeLang);
    });
    document.documentElement.lang = activeLang.replace('_', '-');
    var sel = document.getElementById('lang-sel');
    if (sel) {
      sel.value = activeLang;
      sel.setAttribute('aria-label', LANGUAGE_LABELS[activeLang] || LANGUAGE_LABELS.en);
    }
    var toggle = document.getElementById('btn-lang-toggle');
    if (toggle) {
      toggle.setAttribute('aria-label', activeLang === 'ja'
        ? 'Switch to English / 英語に切り替え'
        : '日本語に切り替え / Switch to Japanese');
    }
    var active = document.querySelector('[data-lang="' + activeLang + '"] h1');
    if (active && active.textContent.trim()) {
      document.title = active.textContent.trim() + ' - Grab All Files';
    }
  }

  function toggleJaEn() {
    var current = (document.documentElement.lang || '').toLowerCase().startsWith('ja') ? 'ja' : 'en';
    setLang(current === 'ja' ? 'en' : 'ja');
  }

  window.onLangChange = function (e) { setLang(e.target.value); };

  var toggle = document.getElementById('btn-lang-toggle');
  if (toggle) toggle.addEventListener('click', toggleJaEn);

  setLang(getLang(), { persist: false });
})();
