import {compile, setScreen, printRules} from "./compiler.js";

const StyleId = "fx-styles"
const BaseStyleId = "fx-base"

var Prefix = false
var Update = true
var Rules = {}
var GetScreen

const MutationConfig = {
  attributes: true,
  attributeFilter: [ "class" ],
  childList: true,
  subtree: true,
}
 
const BaseStyles = `
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
@keyframes bounce { 0%, 100% { transform: translateY(-25%); animationTimingFunction: cubic-bezier(0.8, 0, 1, 1); }
50% { transform: translateY(0); animationTimingFunction: cubic-bezier(0, 0, 0.2, 1); } }
*,::before,::after {border-width: 0;border-style: solid;}
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
}`

var getStyle =(id) => {
  var style = document.getElementById(id);
  if (style === null) {
    style = document.createElement("style");
    style.id = id;
    document.head.append(style);
  }
  return style
}

var updateStyles = () => {
  if (Update) {
    getStyle(StyleId).textContent = printRules(Object.values(Rules));
    Update = false
  }
  var b = document.body
  if (b instanceof HTMLElement && b.hasAttribute("hidden")) b.removeAttribute("hidden")
}

var addClass = (c) => {
  if (!c) return
  if (!(c in Rules)) {
    if (Prefix && !c.includes(":")) {
      Rules[c] = false
    }
    else {
      var node = compile(c)
      if (node) Update = true
      Rules[c] = node
    }
  }
}

var addElement = (el) => {
  var cl = el.classList;
  if (!cl) return
  var len = cl.length, cloak = false
  for (var i=0; i < len; i++) {
    if (cl[i] === "fx-cloak") cloak = true 
    else addClass(cl[i])
  }
  if (cloak) cl.remove("fx-cloak")
}

var addNode = (node) => {
  addElement(node)   
  if (node.querySelectorAll) {
    var els = node.querySelectorAll('[class]');
    var i = 0, len = els.length;
    while (i < len) {
      addElement(els[i])
      i++
    }
  }
}

var start = () => {
  var body = document.body
  if (body instanceof HTMLElement) {
    /*
    var s = body.getAttribute("fx-screen") || body.getAttribute("data-fx-screen") 
    if (s) setScreen(s)
      */
    setScreen(GetScreen())
    if (body.hasAttribute("fx-prefix") || body.hasAttribute("data-fx-prefix")) Prefix = true
  }

  getStyle(BaseStyleId).textContent = BaseStyles 

  addNode(document)
  updateStyles()

  const callback = function(mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (var i=0; i<mutation.addedNodes.length; i++) {
          addNode(mutation.addedNodes[i])
        }
      }
      else if (mutation.type === 'attributes') {
        if (mutation.target) addElement(mutation.target)
      }
    }
    updateStyles();
  };

  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, MutationConfig);
}


if (document.readyState === "loading") {
  window.addEventListener('DOMContentLoaded', start);
}
else {
  start();
}

export function screen(fn) {
  GetScreen = fn
}