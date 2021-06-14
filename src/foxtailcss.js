console.log("Hello From Foxtail")


var Hpercent = (v) => {
  if (v == "full") return "100%"
  if (v.indexOf("/") > -1) {
    var p = v.split("/")
    return (parseInt(p[0]) / parseInt(p[1])) * 100 + "%"
  }
}
const Lspacing = {
  '0.5': '0.125','1': '0.25','1.5': '0.375','2': '0.5','2.5': '0.625',
  '3': '0.75', '3.5': '0.875', '4': '1','5': '1.25','6': '1.5','7': '1.75','8': '2','9': '2.25',
  '10': '2.5','11': '2.75','12': '3','14': '3.5','16': '4','20': '5','24': '6','28': '7','32': '8',
  '36': '9','40': '10','44': '11','48': '12','52': '13','56': '14','60': '15','64': '16','72': '18',
  '80': '20','96': '24',
}
var Hspacing = (v) => {
  if (v == "0" || v == "auto") return v
  if (v == "px") return "1px"
  v = Lspacing[v]
  if (v) v = v +"rem"
  return v
}
var HspacingPercent = (v) => {
  var r = Hspacing(v)
  if (!r) r = Hpercent(v)
  return r
}
var Hargs = (p, f) => p.slice(f).join("-")

var Udisplay = (p, n) => ({"display":Hargs(p, 0)})
var Uinline = (p, n) => ({"display":Hargs(p, 0)})

const Lflex = {
  "1":  "1 1 0%",
  "auto": "1 1 auto",
  "initial": "0 1 auto",
  "none": "none",
}
var Uflex = (p, n) => ({"flex":Lflex[p[1]]})

var UflexWrap = (p, n) => ({"flex-wrap":Hargs(p, 1)})

var UflexDirection = (p, n) => {
  if (p[1] == "col") p[1] = "column"
  return {"flex-direction":Hargs(p, 1)}
}

var UflexGrowShrink = (p, n) => ({["flex-" + p[1]]: p[2] == "0" ? "0" : "1"})

const Lorder = {
  "first": "-9999",
  "last": "9999",
  "none": "0",
}
var Uorder = (p, n) => {
  var r = Lorder[p[1]]
  if (!r) r = p[1]
  return {"order": r}

}

var UgridTemplate = (p, n) => {
  if (p[1] == "cols") p[1] = "columns"
  var r = p[2] == "none" ? "none" : "repeat(" + p[2] + ", minmax(0, 1fr))"
  return {["grid-template-" + p[1]]: r}
}
var UgridSpan = (p, n) => {
  if (p[0] == "col") p[0] = "column"
  var r = p[2] == "full" ? "1 / -1" : "span " + p[2] + " / " + "span " + p[2]
  if (p[1] == "auto") r = "auto"
  return {["grid-" + p[0]]: r}
}
var UgridStartEnd = (p, n) => {
  if (p[0] == "col") p[0] = "column"
  return {["grid-" + p[0] + "-" + p[1]]: p[2]}
}

var Utable = (p, n) => {
  if (p[1] == "auto" || p[1] == "fixed") return {"table-layout": p[1]}
  return {"display":Hargs(p, 0)}
}

var Uposition = (p, n) => ({"position":p[0]})

var Upadding = (p, n) => ({"padding":Hspacing(p[1])})
var UpaddingX = (p, n) => ({"padding-left":Hspacing(p[1]), "padding-right":Hspacing(p[1])})
var UpaddingY = (p, n) => ({"padding-top":Hspacing(p[1]), "padding-bottom":Hspacing(p[1])})
var UpaddingT = (p, n) => ({"padding-top":Hspacing(p[1])})
var UpaddingB = (p, n) => ({"padding-bottom":Hspacing(p[1])})
var UpaddingL = (p, n) => ({"padding-left":Hspacing(p[1])})
var UpaddingR = (p, n) => ({"padding-right":Hspacing(p[1])})

var Umargin = (p, n) => ({"margin":Hspacing(p[1])})
var UmarginX = (p, n) => ({"margin-left":Hspacing(p[1]), "margin-right":Hspacing(p[1])})
var UmarginY = (p, n) => ({"margin-top":Hspacing(p[1]), "margin-bottom":Hspacing(p[1])})
var UmarginT = (p, n) => ({"margin-top":Hspacing(p[1])})
var UmarginB = (p, n) => ({"margin-bottom":Hspacing(p[1])})
var UmarginL = (p, n) => ({"margin-left":Hspacing(p[1])})
var UmarginR = (p, n) => ({"margin-right":Hspacing(p[1])})

const LwidthHeight = {
  "screen": "100vw",
  "min": "min-content",
  "max": "max-content",
}
var UwidthHeight = (p, n) => {
  var prop = p[0] == "w" ? "width" : "height" 
  var r = HspacingPercent(p[1])
  if (!r) r = LwidthHeight[p[1]]
  if (p[0] = "h" && p[1] == "screen") r = "100vh"
  return {[prop]: r}
}

const lookup = {
  "block": Udisplay,
  "inline": Uinline,
  "flex": Udisplay,
  "flow-root": Udisplay,
  "grid": Udisplay,
  "grid-cols": UgridTemplate,
  "grid-rows":UgridTemplate,
  "col-span": UgridSpan,
  "row-span": UgridSpan,
  "col-auto": UgridSpan,
  "row-auto": UgridSpan,
  "col-start": UgridStartEnd,
  "col-end": UgridStartEnd,
  "row-start": UgridStartEnd,
  "row-end": UgridStartEnd,
  "contents": Udisplay,
  "list-item": Udisplay,
  "hidden": Udisplay,
  "table": Utable,


  "flex-wrap": UflexWrap,

  "flex-1": Uflex,
  "flex-auto": Uflex,
  "flex-initial": Uflex,
  "flex-none": Uflex,

  "flex-row": UflexDirection,
  "flex-col": UflexDirection,

  "order": Uorder,

  "flex-grow": UflexGrowShrink,
  "flex-shrink": UflexGrowShrink,

  "m": Umargin,
  "mx": UmarginX,
  "my": UmarginY,
  "mt": UmarginT,
  "mb": UmarginB,
  "ml": UmarginL,
  "mr": UmarginR,

  "p": Upadding,
  "px": UpaddingX,
  "py": UpaddingY,
  "pt": UpaddingT,
  "pb": UpaddingB,
  "pl": UpaddingL,
  "pr": UpaddingR,
  "h": UwidthHeight,
  "w": UwidthHeight,

  "static": Uposition,
  "fixed": Uposition,
  "absolute": Uposition,
  "relative": Uposition,
  "sticky": Uposition,
}

compile = (c) => {
  var parts = c.split("-")
  var i = parts.length;
  while (i > 0) {
    var s = parts.slice(0, i)
    s = s.join("-")
    var fn = lookup[s]
    if (fn) {
     return fn(parts);
    }
    i--;
  }
  return false
}

var Rules = {};

addClass = (c) => {
  var v = Rules[c]
  if (!(c in Rules)) {
    Rules[c] = compile(c);
  }
}

insertStyles = () => {
  var s = ""
  for (const [key, value] of Object.entries(Rules)) {
    if (!value) continue;
    s += "." + key + " {"
    for (const [p, v] of Object.entries(value)) {
      s += p + ":" + v + ";"
    }
    s += "}\n"
  }
  var style = document.createElement("style");
  document.head.append(style);
  console.log(s)
  style.textContent = s;
}

compilePage = () => {
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
  addClass("flex-wrap-reverse")

  insertStyles()

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