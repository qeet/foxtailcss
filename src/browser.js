import {compile, printRules} from "./compiler/index.js";

var Rules = {};

var addClass = (c) => {
  var v = Rules[c]
  if (!(c in Rules)) {
    Rules[c] = compile(c);
  }
}

var insertBaseStyles = () => {
  var style = document.createElement("style");
  document.head.append(style);
  style.textContent = `
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
@keyframes bounce { 0%, 100% { transform: translateY(-25%); animationTimingFunction: cubic-bezier(0.8, 0, 1, 1); }
  50% { transform: translateY(0); animationTimingFunction: cubic-bezier(0, 0, 0.2, 1); } }

*, ::before, ::after {
--tw-translate-x: 0;
--tw-translate-y: 0;
--tw-rotate: 0;
--tw-skew-x: 0;
--tw-skew-y: 0;
--tw-scale-x: 1;
--tw-scale-y: 1;
--tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
--tw-border-opacity: 1;
border-color: rgba(229, 231, 235, var(--tw-border-opacity));
--tw-shadow: 0 0 #0000;
--tw-ring-inset: var(--tw-empty, );
--tw-ring-offset-width: 0px;
--tw-ring-offset-color: #fff;
--tw-ring-color: rgba(59, 130, 246, 0.5);
--tw-ring-offset-shadow: 0 0 #0000;
--tw-ring-shadow: 0 0 #0000;
--tw-blur: var(--tw-empty, );
--tw-brightness: var(--tw-empty, );
--tw-contrast: var(--tw-empty, );
--tw-grayscale: var(--tw-empty, );
--tw-hue-rotate: var(--tw-empty, );
--tw-invert: var(--tw-empty, );
--tw-saturate: var(--tw-empty, );
--tw-sepia: var(--tw-empty, );
--tw-drop-shadow: var(--tw-empty, );
--tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
--tw-backdrop-blur: var(--tw-empty, );
--tw-backdrop-brightness: var(--tw-empty, );
--tw-backdrop-contrast: var(--tw-empty, );
--tw-backdrop-grayscale: var(--tw-empty, );
--tw-backdrop-hue-rotate: var(--tw-empty, );
--tw-backdrop-invert: var(--tw-empty, );
--tw-backdrop-opacity: var(--tw-empty, );
--tw-backdrop-saturate: var(--tw-empty, );
--tw-backdrop-sepia: var(--tw-empty, );
--tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}`;
}

var insertStyles = () => {
  var style = document.createElement("style");
  document.head.append(style);
  style.textContent = printRules(Object.values(Rules));
}

var compilePage = () => {
  var start = Date.now();

  var els = document.querySelectorAll('[class]');

  console.log(`Found ${els.length} nodes`);

  var total = 0;
  var i = 0, len = els.length;
  while (i < len) {
    var cl = els[i].classList;
    var j = 0, len2 = cl.length;
    while (j < len2) {
      addClass(cl[j])
      j++;
      total++;
    }
    i++
  }

  insertBaseStyles()
  insertStyles()

  els = document.getElementsByClassName("fx-cloak")
  var i = 0, len = els.length;
  while (i < len) {
    els[i].classList.remove("fx-cloak")
    i++;
  }

  console.log(`Processed ${total} classes`);

  console.log(`Unique ${Object.keys(Rules).length}`)

  console.log(`milliseconds elapsed = ${Date.now() - start}`);
}


if (document.readyState === "loading") {
  window.addEventListener('DOMContentLoaded', compilePage);
}
else {
  compilePage();
}