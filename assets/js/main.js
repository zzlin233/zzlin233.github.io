/* ============================================================
   jyywiki-blog: 页面脚本
   1) 将 Markdown 中 "> emoji 标题 …" 形式的引用块转换为
      jyywiki 风格的彩色提示卡片。
      GitHub Pages 不允许自装 Jekyll 插件, 所以用 JS 做等价转换。

      写作约定(与 jyywiki 一致):
        > #### ⏰ 截止日期          <- 标题独占一行
        >
        > 正文段落……

      也支持单行形式:  > ⏰ 一句话

   2) 为宽表格包一层可横向滚动的容器。
   ============================================================ */
(function () {
  'use strict';

  /* emoji 前缀 -> 卡片类别 */
  var CATEGORY = {
    danger:   ['\u23f0', '\u23f1', '\u23f2', '\u23f3', '\ud83d\uddd3', '\ud83d\udcc5', '\ud83d\udeab', '\ud83d\udea8', '\ud83d\udd34', '\ud83d\ude48'],   /* ⏰ 🗓 📅 🚫 🚨 🔴 🙈 */
    warn:     ['\u26a0\ufe0f', '\u2757', '\ud83d\ude4f', '\ud83d\udca4', '\ud83e\udd2f'],   /* ⚠️ ❗ 🙏 💤 🤯 */
    question: ['\u2753', '\u2754', '\u2139\ufe0f', '\ud83d\udd0d', '\ud83e\udde0'],       /* ❓ ❔ ℹ️ 🔎 🧠 */
    tip:      ['\ud83d\udca1', '\u2b50', '\ud83d\udccc', '\ud83d\udd11', '\ud83c\udfaf',
               '\u2699\ufe0f', '\u2705', '\ud83d\udcdd', '\ud83d\udd2c', '\ud83d\ude80',
               '\ud83d\udd2e', '\u2601\ufe0f', '\ud83d\udcd6'],                            /* 💡 ⭐ 📌 🔑 🎯 ⚙ ✅ 📝 🔬 🚀 🔮 ☁️ 📖 */
    meta:     ['\u26aa', '\ud83d\udcac', '\ud83d\udc4b', '\ud83d\udcc4']                   /* ⚪ 💬 👋 📄 */
  };
  var MAP = Object.create(null);
  Object.keys(CATEGORY).forEach(function (cat) {
    CATEGORY[cat].forEach(function (emo) { MAP[emo] = cat; });
  });

  /* emoji 前缀正则 (尽量覆盖 Unicode Emoji 区段) */
  var EMOJI_RE = /^([\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]{1,8})/u;

  function firstMeaningful(str) {
    var m = EMOJI_RE.exec(str);
    if (!m) return null;
    var cp = Array.from(m[1]).find(function (ch) { return ch !== '\ufe0f' && ch !== '\u200d'; });
    return cp || null;
  }

  function convert(bq) {
    if (!bq.parentNode || bq.classList.contains('note')) return;

    var kids = bq.children;
    var first = null;
    for (var i = 0; i < kids.length; i++) {
      var tag = kids[i].tagName;
      if (tag === 'P' || /^H[1-6]$/.test(tag)) { first = kids[i]; break; }
    }
    if (!first) return;

    var emo = firstMeaningful(first.textContent.trim());
    if (!emo || !MAP[emo]) return;

    var cat = MAP[emo];
    bq.classList.add('note', 'note-' + cat);

    /* 形式 A: 标题本身就是 h3/h4/h5 元素 —— 直接作为标签行 */
    if (/^H[1-6]$/.test(first.tagName)) return;

    /* 形式 B: 首段是普通段落。
       约定标题短小(<= 24 字符); 若很长则多半是折叠进了正文,
       此时整块只着色、不生成标签行, 避免吞掉正文。 */
    var rest = first.textContent.replace(EMOJI_RE, '').trim();
    if (rest.length <= 24) {
      var label = document.createElement('p');
      label.className = 'note-label';
      label.innerHTML = first.innerHTML;   /* 保留 emoji 与可能的加粗 */
      bq.insertBefore(label, first);
      first.remove();
    }
  }

  function decorate() {
    var scopes = document.querySelectorAll('.post-body, .page-body, .home-intro');
    for (var s = 0; s < scopes.length; s++) {
      var scope = scopes[s];
      /* 提示块 */
      var bqs = scope.querySelectorAll('blockquote');
      for (var i = 0; i < bqs.length; i++) convert(bqs[i]);
      /* 宽表格横向滚动 */
      var tables = scope.querySelectorAll('table');
      for (var j = 0; j < tables.length; j++) {
        var tbl = tables[j];
        if (tbl.parentNode && tbl.parentNode.classList.contains('table-wrap')) continue;
        var wrap = document.createElement('div');
        wrap.className = 'table-wrap';
        tbl.parentNode.insertBefore(wrap, tbl);
        wrap.appendChild(tbl);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', decorate);
  } else {
    decorate();
  }
})();
