import {compile} from "./compiler/index.js";

var Rules = {};

var addClass = (c) => {
  var v = Rules[c]
  if (!(c in Rules)) {
    Rules[c] = compile(c);
  }
}

var escapeClass = (c) => {
  return "." + c.replace(":", "\\:")
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

*, ::after, ::before { border: 0 solid #e5e7eb; }

* {
--tw-shadow: 0 0 transparent;
--tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);
--tw-ring-offset-width: 0px;
--tw-ring-offset-color: #fff;
--tw-ring-color: rgba(59,130,246,0.5);
--tw-ring-offset-shadow: 0 0 transparent;
--tw-ring-shadow: 0 0 transparent;
}`;
}

var insertStyles = () => {
  var s = ""
  for (const [key, value] of Object.entries(Rules)) {
    if (!value) continue;
    s += escapeClass(key)
    if (value.pseudo) s += ":" + value.pseudo
    if (value.element) s += "::" + value.element  
    s += " {"
    for (const [p, v] of Object.entries(value.props)) {
      s += p + ":" + v + ";"
    }
    s += "}\n"
  }
  var style = document.createElement("style");
  document.head.append(style);
  style.textContent = s;
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