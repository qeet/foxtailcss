console.log("Hello From Foxtail")


const Lcolor = {
  'blue': 'EFF6FFDBEAFEBFDBFE93C5FD60A5FA3B82F62563EB1D4ED81E40AF1E3A8A' 
}
var Hcomp = (s, i) => parseInt(s.substring(i, i+2), 16) + ","   
var Hcolor = (v, o, h) => {
  if (!o) o = 1
  if (v == "black") return h ? "#000000" : "rgba(0, 0, 0," + o + ")"
  if (v == "white") return h ? "#ffffff" : "rgba(255, 255, 255," + o + ")"
  var p = v.split("-")
  var c = Lcolor[p[0]]
  if (c) {
    var s = parseInt(p[1])/100
    s = s < 1 ? 0 : s*6
    s = c.substring(s, s+6)
    if (h) return "#" + s
    return "rgba(" + Hcomp(s, 0) + Hcomp(s, 2) + Hcomp(s, 4) + o + ")"
  }
}

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
var Hopacity = (v) => (parseInt(v)/100).toString()

var Hargs = (p, f, d) => p.slice(f).join(d ? d : '-')

var LbackgroundAttachment = ['fixed','local','scroll']
var LbackgroundPosition = ['bottom','center','left','right','top']
var LbackgroundSize = ['auto', 'cover', 'contain']

var Ubackground = (p, n) => {
  var p1 = p[1]
  if (p1 == "no" && p[2] == "repeat") return {"background-repeat": "no-repeat"}
  if (p1 == "none") return {"background-image": "none"}
  if (LbackgroundAttachment.includes(p1)) return {"background-attachment": p1}
  if (LbackgroundPosition.includes(p1)) return {"background-position": Hargs(p, 1, ' ')}
  if (LbackgroundSize.includes(p1)) return {"background-size": p1}
  var bc = "background-color"
  if (p1 == "transparent") return {[bc]:"transparent"}
  if (p1 == "current") return {[bc]: "currentColor"}
  return {[bc]:Hcolor(Hargs(p, 1), "var(--tw-bg-opacity)"), "--tw-bg-opacity": "1"}
}
var UbackgroundOpacity = (p, n) =>  ({"--tw-bg-opacity":Hopacity(p[2])})

const LbackgroudnGradient = {
  "t": "top", "tr": "top right", "r": "right", "br": "bottom right", 
  "b": "bottom", "bl": "bottom left", "l": "left", "tl": "top left"
}
var UbackgroundGradient = (p, n) => ({"background-image": "linear-gradient(to " + 
                        LbackgroudnGradient[p[3]] + ", var(--tw-gradient-stops))"})
var Ufrom = (p, n) => ({"--tw-gradient-from": Hcolor(Hargs(p, 1), 1, true),
    "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to, " + Hcolor(Hargs(p, 1), "0") +")"
})
var Uto = (p, n) => ({"--tw-gradient-to": Hcolor(Hargs(p, 1), 1, true)})
var Uvia = (p, n) => ({"--tw-gradient-stops": "var(--tw-gradient-from), " +  Hcolor(Hargs(p, 1), 1, true) +  ", var(--tw-gradient-to, " + Hcolor(Hargs(p, 1), "0")  + ")"})

var UbackgroundRepeat = (p, n) => {
  var prop = "background-repeat"
  if (p[2] == "round" || p[2] == "space") return {[prop]: p[2]}
  return {[prop]: Hargs(p, 1)}
}

const LbackgroundClip = {
  "border":"border-box",
  "padding":"padding-box",
  "content":"content-box",
  "text": "text"
}
var UbackgroundClip = (p, n) => ({"background-clip":LbackgroundClip[p[2]]})

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
  "bg": Ubackground,
  "bg-opacity": UbackgroundOpacity,
  "bg-clip": UbackgroundClip,
  "bg-repeat": UbackgroundRepeat,
  "bg-gradient-to": UbackgroundGradient,
  "from": Ufrom,
  "to": Uto,
  "via": Uvia,
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

variants = (c, n) => {
  var parts = c.split(":")
  var i=0, len=parts.length-1
  while (i < len) {
    n.pseudo = parts[i]
    i++
  }
  return parts[parts.length-1]
}

compile = (c) => {
  var node = {}
  c = variants(c, node)
  var parts = c.split("-")
  var i = parts.length;
  while (i > 0) {
    var s = parts.slice(0, i)
    s = s.join("-")
    var fn = lookup[s]
    if (fn) {
     node.props = fn(parts);
     return node
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
    s += "." + key.replace(":", "\\:")
    if (value.pseudo) s += ":" + value.pseudo 
    s += " {"
    for (const [p, v] of Object.entries(value.props)) {
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

  console.log(Hcolor("blue-100"))

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