/*
 * Lookups
 */

const L_commonScreens = {
  tailwind: { "sm": "640px", "md": "768px", "lg": "1024px", "xl": "1280px", "2xl": "1536px" },
  bootstrap: { "sm": "576px", "md": "768px", "lg": "992px", "xl": "1200px", "2xl": "1400px" },
  bulma: { "sm": "640px", "md": "769px", "lg": "1024px", "xl": "1216px", "2xl": "1408px" },
  uikit: { "sm": "640px", "md": "768px", "lg": "960px", "xl": "1200px", "2xl": "1600px" },
}

var L_screens = L_commonScreens["bootstrap"]

const L_color = {
  'gray':   'F9FAFBF3F4F6E5E7EBD1D5DB9CA3AF6B72804B55633741511F2937111827',
  'red':    'FEF2F2FEE2E2FECACAFCA5A5F87171EF4444DC2626B91C1C991B1B7F1D1D',
  'yellow': 'FFFBEBFEF3C7FDE68AFCD34DFBBF24F59E0BD97706B4530992400E78350F',
  'green':  'ECFDF5D1FAE5A7F3D06EE7B734D39910B981059669047857065F46064E3B', 
  'blue':   'EFF6FFDBEAFEBFDBFE93C5FD60A5FA3B82F62563EB1D4ED81E40AF1E3A8A',
  'indigo': 'EEF2FFE0E7FFC7D2FEA5B4FC818CF86366F14F46E54338CA3730A3312E81',
  'pink':   'FDF2F8FCE7F3FBCFE8F9A8D4F472B6EC4899DB2777DB27779D174D831843',
  'purple': 'F5F3FFEDE9FEDDD6FEC4B5FDA78BFA8B5CF67C3AED6D28D95B21B64C1D95',
}

const L_objectFit = [ "contain", "cover", "fill", "none", "scale" ]

const L_flex = { "1":  "1 1 0%", "auto": "1 1 auto", "initial": "0 1 auto", "none": "none" }

const L_pseudo = {
  only: 1, "first-of-type": 2, "last-of-type": 3, target: 4, default: 5, indeterminate: 6,
  "placeholder-shown": 7, autofill: 8, valid: 9, invalid: 10, "in-range": 11, "out-of-range": 12,
  first: 13, last: 14, odd: 15, even: 16, visited: 17, checked: 18, "focus-within": 19, hover: 20,
  focus: 21, "focus-visible": 22, active: 23, disabled: 24,
}

const L_media = { sm: 100, md: 200, lg: 300, xl: 400, "2xl": 500, dark: 10 }

const L_order = {first: "-9999", last: "9999", none: "0"}

const L_gridAuto = { "auto": "auto", "min": "min-content", "max": "max-content", "fr": "minmax(0, 1fr)" }

/* 
 * Utilities
 */
var U_boxDecorationBreak = (p) => ({"box-decoration-break": p[1], "-webkit-box-decoration-break": p[1]})

var U_boxSizing = (p) => ({"box-sizing": p[1]+"-box"})

var U_display = (p) => ({display: p[0] == "hidden" ? "none" : Hargs(p, 0)})

var U_visibility = (p) => ({visibility: p[0] == "visible" ? p[0] : "hidden"})

var U_position = (p) => ({position: p[0]})

var U_zindex = (p) => ({"z-index": p[1]})

var U_clearFloat = (p) => ({[p[0]]: p[1]})

var U_isolation = (p) => ({isolation: p[1] ? "auto" : "isolate"})

var U_objectFitPosition = (p) => {
  if (L_objectFit.includes(p[1]))  return {"object-fit": Hargs(p, 1)}
  return {"object-position": Hargs(p, 1, " ")}
}

var U_overScrollFlow = (p) => {
  var n = p[0] == "overflow" ? p[0] : p[0] + "-behavior"
  if (p.length == 2) return {[n]: p[1]}
  return {[n + "-" + p[1]]: p[2]}  
}

var U_inset = (p, n) => {
  var v = p.length == 2 ? HspacingPercent(p[1], n) : HspacingPercent(p[2], n)
  if (p.length == 2) return {"top": v, "bottom": v, "right": v, "left": v}
  if (p[1] == "x") return {"right": v, "left": v}
  return {"top": v, "bottom": v}  
}

var U_flexDirection = (p) => {
  if (p[1] == "col") p[1] = "column"
  return {"flex-direction": Hargs(p, 1)}
}

var U_flexWrap = (p) => ({"flex-wrap": Hargs(p, 1)})

var U_flex = (p) => ({"flex": L_flex[p[1]]})

var U_flexGrowShrink = (p) => ({["flex-" + p[1]]: p[2] == "0" ? "0" : "1"})

var U_order = (p) => {
  var r = L_order[p[1]]
  return {"order": r ? r : p[1]}

}

var U_gridTemplate = (p) => {
  if (p[1] == "cols") p[1] = "columns"
  var r = p[2] == "none" ? "none" : "repeat(" + p[2] + ", minmax(0, 1fr))"
  return {["grid-template-" + p[1]]: r}
}

var U_gridAutoFlow= (p) => {
  if (p[2] == "col") p[2] = "column"
  return {"grid-auto-flow": Hargs(p, 2, ' ')}
}

var U_gridAuto = (p) => {
  if (p[1] == "cols") p[1] = "columns"
  return {["grid-auto-" + p[1]]: L_gridAuto[p[2]]}
}

var U_gap = (p, n) => {
  var v, prop
  if (p.length == 2) {
    prop = "gap"
    v = Hspacing(p[1], n)
  }
  else {
    v = Hspacing(p[2], n)
    prop = p[1] == "x" ? "column-gap" : "row-gap"
  }
  return {[prop]: v}
}

var U_spaceBetween = (p, n) => {
  n.csel = "> :not([hidden]) ~ :not([hidden])"
  if (p[2] == "reverse") {
    n.priority++
    return {["--tw-space-" + p[1] + "-reverse"]: "1"}
  }
  return {["--tw-space-"+ p[1] + "-reverse"]: "0",
    ["margin-" + (p[1] == 'x' ? "right" : "bottom")] : "calc(" + Hspacing(p[2], n) + " * var(--tw-space-" + p[1] + "-reverse))",
    ["margin-" + (p[1] == 'x' ? "left" : "top")]: "calc(" + Hspacing(p[2], n) + " * calc(1 - var(--tw-space-" + p[1] + "-reverse)))"
  }
}

var U_divideWidth = (p, n) => {
  n.csel = "> :not([hidden]) ~ :not([hidden])"
  if (p[2] == "reverse") {
    n.priority++
    return {["--tw-divide-" + p[1] + "-reverse"]: "1"}
  }
  var w = p.length == 3 ? p[2] : "1" 
  return {["--tw-divide-"+ p[1] + "-reverse"]: "0",
    ["border-" + (p[1] == 'x' ? "right" : "bottom") + "-width"] : "calc(" + w + "px * var(--tw-divide-" + p[1] + "-reverse))",
    ["border-" + (p[1] == 'x' ? "left" : "top") + "-width"]: "calc(" + w + "px * calc(1 - var(--tw-divide-" + p[1] + "-reverse)))"
  }
}

var U_divideColor = (p, n) => {
  n.csel = "> :not([hidden]) ~ :not([hidden])"
  if (HisColor(p[1])) return HcolorUtil(Hargs(p, 1), "border-color", "divide")
  return {"border-style": p[1]}
}

var U_backgroundOrigin = (p) => ({"background-origin": p[2] + "-box"})

var Hcomp = (s, i) => parseInt(s.substring(i, i+2), 16) + ","

var HhexColor = (v) => {
  if (v == "white") return "ffffff"
  if (v == "black") return "000000"
  var p = v.split("-")
  var c = L_color[p[0]]
  if (c) {
    var s = parseInt(p[1])/100
    s = s < 1 ? 0 : s*6
    return c.substring(s, s+6)
  }
  return false
}

var HtransCurr = (v) => {
  if (v == "transparent") return v
  if (v == "current") return "currentColor"
  return false
}
var Hcolor = (v, o, h) => {
  if (!o) o = 1
  var c = HhexColor(v)
  if (h) {
    if (c) return "#" + c
    if (HtransCurr(v)) return HtransCurr(v)
  }
  else if (c) return "rgba(" + Hcomp(c, 0) + Hcomp(c, 2) + Hcomp(c, 4) + o + ")"
}

var HisColor = (v) => L_color[v] || v == "black" || v == "white" || v == "transparent" || v == "current"
var HcolorUtil = (col, prop, name) => {
  var tc = HtransCurr(col)
  if (tc) return {[prop]: tc}
  return {[prop]: Hcolor(col, "var(--tw-" + name + "-opacity)"), ["--tw-"+ name +"-opacity"]: "1"}
}  

var Hpercent = (v, n) => {
  if (v == "full") return n.minus + "100%"
  if (v.indexOf("/") > -1) {
    var p = v.split("/")
    return n.minus + (parseInt(p[0]) / parseInt(p[1])) * 100 + "%"
  }
}
const Lspacing = {
  '0.5': '0.125','1': '0.25','1.5': '0.375','2': '0.5','2.5': '0.625',
  '3': '0.75', '3.5': '0.875', '4': '1','5': '1.25','6': '1.5','7': '1.75','8': '2','9': '2.25',
  '10': '2.5','11': '2.75','12': '3','14': '3.5','16': '4','20': '5','24': '6','28': '7','32': '8',
  '36': '9','40': '10','44': '11','48': '12','52': '13','56': '14','60': '15','64': '16','72': '18',
  '80': '20','96': '24',
}
var Hspacing = (v, n) => {
  if (v == "0" || v == "auto") return v
  if (v == "px") return n.minus + "1px"
  v = Lspacing[v]
  if (v) v = n.minus + v +"rem"
  return v
}
var HspacingPercent = (v, n) => {
  var r = Hspacing(v, n)
  if (!r) r = Hpercent(v, n)
  return r
}
var Hfloat = (v) => (parseInt(v)/100).toString()

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
  return HcolorUtil(Hargs(p, 1), "background-color", "bg")
}
var UcolorOpacity = (p, n) =>  {
  n.priority++
  return {["--tw-" + p[0] + "-opacity"]:Hfloat(p[2])}
}

const LbackgroudnGradient = {
  "t": "top", "tr": "top right", "r": "right", "br": "bottom right", 
  "b": "bottom", "bl": "bottom left", "l": "left", "tl": "top left"
}
var UbackgroundGradient = (p, n) => ({"background-image": "linear-gradient(to " + 
                        LbackgroudnGradient[p[3]] + ", var(--tw-gradient-stops))"})
var Ufrom = (p, n) => {
  var to = Hargs(p, 1)
  if (p[1] == "transparent") to = "black"
  else if (p[1] == "current") to = "white"
  return {"--tw-gradient-from": Hcolor(Hargs(p, 1), 1, true),
    "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to, " + Hcolor(to, "0") +")"}
}

var Uto = (p, n) => ({"--tw-gradient-to": Hcolor(Hargs(p, 1), 1, true)})

var Uvia = (p, n) => {
  var to = Hargs(p, 1)
  if (p[1] == "transparent") to = "black"
  else if (p[1] == "current") to = "white"
  return {"--tw-gradient-stops": "var(--tw-gradient-from), " +  Hcolor(Hargs(p, 1), 1, true) +  ", var(--tw-gradient-to, " + Hcolor(to, "0")  + ")"}
}

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



var Uinline = (p, n) => ({"display":Hargs(p, 0)})













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



const LflexContent = {
  "center": "center", "start": "flex-start", "end": "flex-end", "between": "space-between",
  "around":  "space-around", "evenly":  "space-evenly", "stretch": "stretch"
}
var UflexContent = (p, n) => {
  var prop = "align-content", s=1
  if (p[0] == "justify") prop = "justify-content"
  else if (p[0] == "place") {
    prop = "place-content"
    if (p[2] == "start" || p[2] == "end") return {[prop]: p[2]} 
    s = 2
  }
  return {[prop]: LflexContent[p[s]]}
}
var UjustifyPlaceSelfItems = (p, n) => ({[p[0] + "-" + p[1]]: p[2]})
var UalignSelfItems = (p, n) => {
  var v = p[1]
  if (p[1] == "start") v = "flex-start"
  else if (p[1] == "end") v = "flex-end"
  return {["align-"+p[0]]: v}
}

var Utable = (p, n) => {
  if (p[1] == "auto" || p[1] == "fixed") return {"table-layout": p[1]}
  return {"display":Hargs(p, 0)}
}



var Upadding = (p, n) => ({"padding":Hspacing(p[1], n)})
var UpaddingX = (p, n) => ({"padding-left":Hspacing(p[1], n), "padding-right":Hspacing(p[1], n)})
var UpaddingY = (p, n) => ({"padding-top":Hspacing(p[1], n), "padding-bottom":Hspacing(p[1], n)})
var UpaddingT = (p, n) => ({"padding-top":Hspacing(p[1], n)})
var UpaddingB = (p, n) => ({"padding-bottom":Hspacing(p[1], n)})
var UpaddingL = (p, n) => ({"padding-left":Hspacing(p[1], n)})
var UpaddingR = (p, n) => ({"padding-right":Hspacing(p[1], n)})

var Umargin = (p, n) => ({"margin":Hspacing(p[1], n)})
var UmarginX = (p, n) => ({"margin-left":Hspacing(p[1], n), "margin-right":Hspacing(p[1], n)})
var UmarginY = (p, n) => ({"margin-top":Hspacing(p[1], n), "margin-bottom":Hspacing(p[1], n)})
var UmarginT = (p, n) => ({"margin-top":Hspacing(p[1], n)})
var UmarginB = (p, n) => ({"margin-bottom":Hspacing(p[1], n)})
var UmarginL = (p, n) => ({"margin-left":Hspacing(p[1], n)})
var UmarginR = (p, n) => ({"margin-right":Hspacing(p[1], n)})

const LwidthHeight = {
  "screen": "100vh",
  "min": "min-content",
  "max": "max-content",
}
var UwidthHeight = (p, n) => {
  var prop = p[0] == "w" ? "width" : "height" 
  var r = HspacingPercent(p[1], n)
  if (!r) r = LwidthHeight[p[1]]
  if (p[0] == "w" && p[1] == "screen") r = "100vw"
  return {[prop]: r}
}
var UminWdithHeight = (p, n) => {
  var prop = p[1] == "w" ? "min-width" : "min-height" 
  var r = LwidthHeight[p[2]]
  if (!r) {
    r = HspacingPercent(p[2], n)
    if (!r) r = LwidthHeight[p[2], n]
  }
  return {[prop]: r}
}
const LmaxWidth = {
  "0":"0", "xs":"20", "sm":"24", "md":"28", "lg":"32", "xl":"36", "2xl":"42",
  "3xl":"48", "4xl":"56", "5xl":"64", "6xl":"72", "7xl":"80"
}
var UmaxWidth = (p) => {
  var s = p[2]
  var v = LmaxWidth[s]
  if (v) v += "rem"
  else if (s == "none") v = "none"
  else if (s == "prose") v = "65ch"
  else if (s == "full") v = "100%"
  else {
    v = L_screens[p[3]]
    if (!v) v = LwidthHeight[s]
  }
  return {"max-width": v}
}
var UmaxHeight = (p, n) => { 
  var r = HspacingPercent(p[2], n)
  if (!r) r = LwidthHeight[p[2]]
  return {"max-height": r}
}

var Uappearance = (p) => ({[p[0]]: p[1]})
var Ucursor = (p) => ({[p[0]]: Hargs(p, 1)})
var Uoutline = (p) => {
  var o = "2px solid transparent"
  if (p[1] == "white") o = "2px dotted white"
  if (p[1] == "black") o = "2px dotted black"
  return {"outline": o, "outline-offset": "2px"}
}
var UpointerEvents = (p) => ({"pointer-events": p[2]})
const Lresize = {
  "none": "none", "y": "vertical", "x": "horizontal"
}
var Uresize = (p) => {
  if (p.length == 1) return {[p[0]]: "both"}
  return {[p[0]]: Lresize[p[1]]}
}
var UuserSelect = (p) => ({"user-select": p[1]})

var UtransformGpu = (p) => ({"--tw-transform": "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"})

var Htransform = (d) => {
  d.transform = "var(--tw-transform)"
  return d
}

var UtransformOrigin = (p) => ({"transform-origin": Hargs(p, 1, ' ')})

var Uscale = (p) => {
  var v
  if (p[1] == "x") {
    v = Hfloat(p[2])
    return Htransform({"--tw-scale-x": v})
  } 
  else if (p[1] == "y") {
    v = Hfloat(p[2])
    return Htransform({"--tw-scale-y": v})
  }
  else {
    v = Hfloat(p[1])
    return Htransform({"--tw-scale-x": v, "--tw-scale-y": v})
  }
}

var Urotate = (p, n) => Htransform({"--tw-rotate": n.minus + p[1] + "deg"})
var Utranslate = (p, n) => Htransform({["--tw-translate-"+p[1]]: HspacingPercent(p[2], n)})
var Uskew = (p, n) => Htransform({["--tw-skew-"+p[1]]: n.minus + p[2] + "deg"})

const Ltransition = {
  "none": "none",
  "all": "all",
  "": "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
  "colors": "background-color, border-color, color, fill, stroke",
  "opacity": "opacity",
  "shadow" : "box-shadow",
  "transform": "transform",
}
var Utransition = (p) => ({"transition-property": Ltransition[p[1] ? p[1] : ""], 
"transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)","transition-duration": "150ms"})
var UdelayDuration = (p) => ({["transition-" + p[0]]: p[1] + "ms"})
const Lease = { "linear": "linear", "in": "cubic-bezier(0.4, 0, 1, 1)",
  "out": "cubic-bezier(0, 0, 0.2, 1)", "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
}
var Uease = (p) => ({"transition-timing-function": Lease[Hargs(p, 1)]})

var UborderCollapse = (p) => ({"border-collapse": p[1]})

var UblendMode = (p) => {
  if (p[0] == "bg") p[0] = "background" 
  return {[p[0]+"-blend-mode"]: Hargs(p, 2)}
}

var Uopacity = (p) =>  ({"opacity":Hfloat(p[1])})


var UtopRightBottomLeft = (p, n) => ({[p[0]]: HspacingPercent(p[1], n)}) 





const LboxShadow = {
  "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  "": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  "none": "0 0 #0000"
}
var UboxShadow = (p) => ({"--tw-shadow": LboxShadow[p[1] ? p[1] : ""], 
  "box-shadow": "var(--tw-ring-offset-shadow,0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)"})

var Uring = (p) => {
  if (p[1] == "inset") return {"--tw-ring-inset": "inset"}
  if (!HisColor(p[1])) {
    var v = p[1] ? p[1] : "3"
    return {"--tw-ring-shadow": "var(--tw-ring-inset) 0 0 0 calc(" + v + "px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
    "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
    "box-shadow": "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)"}
  }
  return HcolorUtil(Hargs(p, 1), "--tw-ring-color", "ring")
}

var UringOffset = (p) => {
  if (!HisColor(p[2])) return {"--tw-ring-offset-width": p[2] + "px"}
  return {"--tw-ring-offset-color": Hcolor(Hargs(p, 2), "", true)}
}
const LborderRadius = {
  "none": "0px", "sm": "0.125rem", "": "0.25rem", "md": "0.375rem", "lg": "0.5rem",
  "xl": "0.75rem", "2xl": "1rem", "3xl": "1.5rem", "full": "9999px"
}
var UborderRadius = (p) => {
  var v = LborderRadius[p[1] ? p[1] : ""]
  if (v) return {"border-radius": v}
  v = LborderRadius[p[2] ? p[2] : ""] 
  var d = p[1], props = {}
  if (d == "t" || d == "l" || d == "tl") props["border-top-left-radius"] = v
  if (d == "t" || d == "r" || d == "tr") props["border-top-right-radius"] = v
  if (d == "r" || d == "b" || d == "br") props["border-bottom-right-radius"] = v
  if (d == "b" || d == "l" || d == "bl") props["border-bottom-left-radius"] = v  
  return props
}
var Uborder = (p) => {
  if (HisColor(p[1]))  return HcolorUtil(Hargs(p, 1), "border-color", "border")
  if (!p[1] || !isNaN(p[1])) return {"border-width": (p[1] ? p[1] : "1") + "px"}
  return {"border-style": p[1]}
}
const LborderWidth = { "t": "top", "r": "right", "b": "bottom", "l": "left" }
var UborderWidth = (p) => {
  var s = LborderWidth[p[1]]
  return {["border-" + s + "-width"]: (p[2] ? p[2] : "1") + "px" }
}
const Lanimation = {
  "none": "none",
  "spin": "spin 1s linear infinite",
  "ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  "bounce": "bounce 1s infinite"
}
var Uanimation = (p) => ({"animation": Lanimation[p[1]]})
const LfontFamily = {
  "sans": 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  "serif": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  "mono": 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
}
const LfontWeight = {
  "thin": "100", "extralight": "200", "light": "300", "normal": "400",
  "medium": "500", "semibold": "600", "bold": "700", "extrabold": "800", "black": "900"
}
var Ufont =(p) => {
  var v = LfontFamily[p[1]]
  if (v) return {"font-family": v}
  return {"font-weight": LfontWeight[p[1]]}
}
var UfontSmoothing = (p) => {
  var web = "antialiased", moz = "grayscale"
  if (p[1]) web = "auto", moz = "auto"
  return {"-webkit-font-smoothing": web, "-moz-osx-font-smoothing": moz}
}
var UfontStyle = (p) => {
  var v = "italic"
  if (p[1]) v = "normal"
  return {"font-style": v}
}
var UfontVariantNumeric = (p) => ({"font-variant-numeric": p[0] == "normal" ? "normal" : Hargs(p,0)}) 

const LletterSpacing = {
  "tighter": "-0.05", "tight": "-0.025", "normal": "0",
  "wide": "0.025", "wider": "0.05", "widest": "0.1"
}
var UletterSpacing = (p) => ({"letter-spacing": LletterSpacing[p[1]] + "em"}) 

const llineHeight = {
  "3": ".75rem", "4": "1rem", "5": "1.25rem", "6": "1.5rem", "7": "1.75rem", "8": "2rem",
  "9": "2.25rem", "10": "2.5rem", "none": "1", "tight": "1.25", "snug": "1.375",
  "normal": "1.5", "relaxed": "1.625", "loose": "2"
}
var UlineHeight = (p) => ({"line-height": llineHeight[p[1]]})

const LfontSize = {
  "xs": ["0.75", "1rem"], "sm": ["0.875", "1.25rem"], "base": ["1", "1.5rem"],
  "lg": ["1.125", "1.75rem"], "xl": ["1.25", "1.75rem"], "2xl": ["1.5", "2rem"],
  "3xl": ["1.875", "2.25rem"], "4xl": ["2.25", "2.5rem"], "5xl": ["3", "1"],
  "6xl": ["3.75", "1"], "7xl": ["4.5", "1"], "8xl": ["6", "1"],"9xl": ["8", "1"]
}
var Utext = (p) => {
  if (HisColor(p[1])) return HcolorUtil(Hargs(p, 1), "color", "text")
  var v = LfontSize[p[1]]
  if (v) return {"font-size": v[0]+"rem", "line-height": v[1]}
  return {"text-align": p[1]}
}
var UlistTypePosition = (p) => {
  if (p[1] =="inside" || p[1] == "outside") return {"list-style-position": p[1]}
  return {"list-style-type": p[1]}
}

var UtextDecoration = (p) => ({"text-decoration":  p[0] =="no" ? "none" : Hargs(p, 0)})
var UtextTransform = (p) => ({"text-transform":  p[0] =="normal" ? "none" : p[0]})
var UtextOverflow = (p) => {
  var prop = "text-overflow"
  if (p[0] == "truncate") return {"overflow": "hidden", [prop]: "ellipsis", "white-space": "nowrap"}
  if (p[1] == "clip") return {[prop]: "clip"}
  return {[prop]: "ellipsis"}
}
var UverticalAlign = (p) => ({"vertical-align": Hargs(p, 1)})
var Uwhitespace = (p) => ({"white-space": Hargs(p, 1)})
var UwordBreak = (p) => {
  if (p[1] == "normal") return {"overflow-wrap": "normal", "word-break": "normal"}
  if (p[1] == "words") return {"overflow-wrap": "break-word"}
  return {"word-break": "break-all"}
}
var UplaceholderColor = (p, n) => {
  n.pelem = "placeholder"
  return HcolorUtil(Hargs(p, 1), "color", "placeholder")
}
var UplaceholderOpacity = (p, n) => {
  n.pelem = "placeholder"
  return UcolorOpacity(p, n)
}
const Lblur = {
  "none": "0", "sm": "4px", "": "8px", "md": "12px", "lg": "16px",
  "xl": "24px", "2xl": "40px","3xl": "64px"
}
var Hfilter = (t, d) => {
  if (t == "backdrop") d["backdrop-filter"] = "var(--tw-backdrop-filter)"
  else d.filter = "var(--tw-filter)"
  return d 
}

var Ublur = (p) => {
  var t = "", s = 1
  if (p[0] =="backdrop") {t = "-backdrop"; s = 2}
  return Hfilter(p[0], {["--tw" + t + "-blur"]: "blur(" + Lblur[p[s] ? p[s] : ""] + ")"})
}
var UfilterFloat = (p) => {
  var t = "", s = 1
  if (p[0] =="backdrop") {t = "-backdrop"; s = 2}
  return Hfilter(p[0], {["--tw" + t + "-" + p[s-1]]: p[s-1] + "(" + Hfloat(p[s]) + ")"})
}  
const LdropShadow = {
  "sm" : "(0 1px 1px rgba(0,0,0,0.05))",
  "": "(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06))",
  "md": "(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06))",
  "lg": "(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1))",
  "xl": "(0 20px 13px rgba(0, 0, 0, 0.03)) drop-shadow(0 8px 5px rgba(0, 0, 0, 0.08))",
  "2xl": "(0 25px 25px rgba(0, 0, 0, 0.15))",
  "none": "(0 0 #0000)"
}
var UdropShadow = (p) => Hfilter(p[0], {"--tw-drop-shadow": "drop-shadow" + LdropShadow[p[2] ? p[2] : ""]})  
var UgrayscaleInvertSepia = (p) => {
  var t = "", s = 1
  if (p[0] =="backdrop") {t = "-backdrop"; s = 2}
  return Hfilter(p[0], {["--tw" + t + "-" + p[s-1]]: p[s-1] + "(" + (p[s] ? "0" : "1") + ")"})
} 
var UhueRotate = (p, n) => {
  var t = "", s = 2
  if (p[0] =="backdrop") {t = "-backdrop"; s = 3}
  return Hfilter(p[0], {["--tw" + t + "-hue-rotate"]: "hue-rotate("+ n.minus + p[s] + "deg)"})
}
var UfillStroke = (p) => ({[p[0]]: "currentColor"})  
var UstrokeWidth = (p) => ({"stroke-width": p[1]}) 
var UscreenReaders = (p) => {
  if (p[0] == "sr") return {"position": "absolute", "width": "1px", "height": "1px", "padding": "0",
  "margin": "-1px", "overflow": "hidden", "clip": "rect(0, 0, 0, 0)", "white-space": "nowrap", "border-width": "0"}
  return {"position": "static", "width": "auto", "height": "auto", "padding": "0", "margin": "0",
  "overflow": "visible", "clip": "auto", "white-space": "normal"}
}

const lookup = {
  absolute:         U_position,
  auto:             U_gridAuto,
  "bg-origin":      U_backgroundOrigin,
  block:            U_display,
  box:              U_boxSizing,
  clear:            U_clearFloat,
  contents:         U_display,
  decoration:       U_boxDecorationBreak,
  divide:           U_divideColor,
  "divide-opacity": UcolorOpacity, 
  "divide-x":       U_divideWidth,
  "divide-y":       U_divideWidth,
  fixed:            U_position,
  flex:             U_display,
  "flex-col":       U_flexDirection,
  "flex-row":       U_flexDirection,
  "flex-nowrap":    U_flexWrap,
  "flex-wrap":      U_flexWrap,
  "flex-1":         U_flex,
  "flex-auto":      U_flex,
  "flex-initial":   U_flex,
  "flex-none":      U_flex,
  "flex-grow":      U_flexGrowShrink,
  "flex-shrink":    U_flexGrowShrink,
  float:            U_clearFloat,
  "flow-root":      U_display,
  gap:              U_gap,
  grid:             U_display,
  "grid-cols":      U_gridTemplate,
  "grid-rows":      U_gridTemplate,
  "grid-flow":      U_gridAutoFlow,
  hidden:           U_display,
  inset:            U_inset,
  invisible:        U_visibility,
  isolate:          U_isolation,
  isolation:        U_isolation,
  "list-item":      U_display,
  object:           U_objectFitPosition,
  order:            U_order,
  relative:         U_position,
  space:            U_spaceBetween, 
  static:           U_position,
  sticky:           U_position,
  overflow:         U_overScrollFlow,
  overscroll:       U_overScrollFlow,
  visible:          U_visibility,
  z:                U_zindex,  
  


  "sr-only": UscreenReaders,
  "not-sr-only": UscreenReaders,
  "stroke": UstrokeWidth,
  "stroke-current": UfillStroke,
  "fill-current": UfillStroke,
  "backdrop-opacity":UfilterFloat,
  "sepia":UgrayscaleInvertSepia,
  "backdrop-sepia":UgrayscaleInvertSepia,
  "saturate": UfilterFloat,
  "backdrop-saturate": UfilterFloat,
  "invert":UgrayscaleInvertSepia,
  "backdrop-invert":UgrayscaleInvertSepia,
  "hue-rotate": UhueRotate,
  "backdrop-hue-rotate": UhueRotate,
  "grayscale":UgrayscaleInvertSepia,
  "backdrop-grayscale":UgrayscaleInvertSepia,
  "drop-shadow": UdropShadow,
  "contrast": UfilterFloat,
  "backdrop-contrast": UfilterFloat,
  "brightness": UfilterFloat,
  "backdrop-brightness": UfilterFloat,
  "blur": Ublur,
  "backdrop-blur": Ublur,
  "placeholder": UplaceholderColor,
  "placeholder-opacity": UplaceholderOpacity,
  "break": UwordBreak,
  "whitespace": Uwhitespace,
  "align": UverticalAlign,
  "truncate": UtextOverflow,
  "overflow-ellipsis": UtextOverflow,
  "overflow-clip": UtextOverflow,
  "uppercase": UtextTransform,
  "lowercase": UtextTransform,
  "capitalize": UtextTransform, 
  "normal-case": UtextTransform,
  "underline": UtextDecoration,
  "line-through": UtextDecoration,
  "no-underline": UtextDecoration,
  "list": UlistTypePosition,
  "text": Utext,
  "leading": UlineHeight,
  "tracking": UletterSpacing,
  "normal-nums": UfontVariantNumeric,
  "ordinal": UfontVariantNumeric,
  "slashed-zero": UfontVariantNumeric, 
  "lining-nums": UfontVariantNumeric,
  "oldstyle-nums": UfontVariantNumeric, 
  "proportional-nums": UfontVariantNumeric,
  "tabular-nums": UfontVariantNumeric, 
  "diagonal-fractions": UfontVariantNumeric, 
  "stacked-fractions": UfontVariantNumeric,
  "italic": UfontStyle,
  "not-italic": UfontStyle,
  "antialiased": UfontSmoothing,
  "subpixel-antialiased": UfontSmoothing,
  "font": Ufont,
  "animate": Uanimation,
  "border-t": UborderWidth,
  "border-r": UborderWidth,
  "border-b": UborderWidth,
  "border-l": UborderWidth,
  "border": Uborder,
  "rounded": UborderRadius,
  "border-opacity": UcolorOpacity,
  "text-opacity": UcolorOpacity,
  "ring-offset": UringOffset,
  "ring-opacity": UcolorOpacity,
  "ring": Uring,
  "shadow": UboxShadow,

 
  "top": UtopRightBottomLeft,
  "bottom": UtopRightBottomLeft,
  "right": UtopRightBottomLeft,
  "left": UtopRightBottomLeft,
  
  
  
 

 
  "opacity": Uopacity,
  "mix-blend": UblendMode,
  "bg-blend": UblendMode,
  "border-collapse": UborderCollapse,
  "border-separate": UborderCollapse,
  "transition": Utransition,
  "duration": UdelayDuration,
  "delay": UdelayDuration,
  "ease": Uease,
  "appearance-none": Uappearance,
  "cursor": Ucursor,
  "outline": Uoutline,
  "pointer-events": UpointerEvents,
  "resize": Uresize,
  "select": UuserSelect,
  "bg": Ubackground,
  "transform-gpu": UtransformGpu,
  "origin": UtransformOrigin,
  "scale": Uscale,
  "rotate": Urotate,
  "translate": Utranslate,
  "skew": Uskew,
  "bg-opacity": UcolorOpacity,
  "bg-clip": UbackgroundClip,
  "bg-repeat": UbackgroundRepeat,
  "bg-gradient-to": UbackgroundGradient,
  "from": Ufrom,
  "to": Uto,
  "via": Uvia,
  
  "inline": Uinline,
  
  
  "col-span": UgridSpan,
  "row-span": UgridSpan,
  "col-auto": UgridSpan,
  "row-auto": UgridSpan,
  "col-start": UgridStartEnd,
  "col-end": UgridStartEnd,
  "row-start": UgridStartEnd,
  "row-end": UgridStartEnd,
  
  "justify": UflexContent,
  "content": UflexContent,
  "place-content": UflexContent,
 
  "justify-items": UjustifyPlaceSelfItems,
  "place-items": UjustifyPlaceSelfItems,
  "justify-self": UjustifyPlaceSelfItems,
  "place-self": UjustifyPlaceSelfItems,
  "align-items": UalignSelfItems,
  "align-self": UalignSelfItems,
  "items": UalignSelfItems,
  "self": UalignSelfItems,

 
  "table": Utable,


  

 
 
  

 
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
  "min-w": UminWdithHeight,
  "min-h": UminWdithHeight,
  "max-w": UmaxWidth,
  "max-h": UmaxHeight,

 
}

var V_group = (c, n) => {
  c = c.split("-")
  var p = L_pseudo[c[1]]
  if (p) {
      n.priority += (p*10)
      n.psel = ".group:" + c[1]
  }
}

var V_type = (n, v, l, a) => {
  var p = l[v]
  if (p) {
      n.priority += (p*10)
      a.push(v)
      return true
    }
    return false
}

var V_compile = (c, n) => {
  var v = c.split(":")
  var len = v.length-1
  for (var i=0; i < len; i++) {
    var curr = v[i]
    if (!V_type(n, curr, L_media, n.media)) {
      if (!V_type(n, curr, L_pseudo, n.pseudo)) {
        if (curr.startsWith("group")) V_group(curr, n) 
        else n.pelem = curr
      }
    }
  }
  return v[len]
}

var classPrefix = (c, n) => {
  if (c.charAt(0) == ":") c = c.substring(1)
  if (c.charAt(0) == "!") {
    n.important = true
    c = c.substring(1)
  }
  if (c.charAt(0) == "-") {
    n.minus = "-"
    c = c.substring(1)
  }
  return c
}

export function compile(c) {
  var node = {class: c, minus: "", priority: 0, media: [], pseudo: []}
  var c = classPrefix(V_compile(c, node), node)

  var parts = c.split("-")
  for (var i=parts.length; i > 0; i--) {
    var fn = lookup[parts.slice(0, i).join("-")]
    if (fn) {
      node.props = fn(parts, node);
      for (const [key, value] of Object.entries(node.props)) {
        if (!value) return false;
      }
      return node
    }
  }
  return false
}

export function setScreen(s) {
  s = L_commonScreens[s]
  if (s) L_screens = s
}

/*
 * Rule printing
 */

var P_escape = (c) => {
  c = c.replace(/[^A-Za-z0-9_-]/g, "\\$&")
  if (/^[0-9]/.test(c)) {
    c = "\\" + c.charCodeAt(0).toString(16) + c.substring(1)
  }
  return "." + c
}

var P_Rule = (n) => {
  var s = []
  if (n.psel) s.push(n.psel + " ")
  s.push(P_escape(n.class))
  for (var i=0; i<n.pseudo.length; i++) s.push(":" + n.pseudo[i])
  if (n.pelem) s.push("::" + n.pelem)
  if (n.csel) s.push(" " + n.csel)  
  s.push("{")
  for (const [p, v] of Object.entries(n.props)) {
    s.push(p + ":" + v + " !important;")
  }
  s.push("}\n")
  return s.join("")
}

var P_sort = (rules) => {
   return rules.sort((e1, e2) => {
    if (!e1 && !e2) return 0
    if (!e1 && e2) return -1;
    if (e1 && !e2) return 1;
    if (e2.priority < e1.priority) return 1
    if (e2.priority > e1.priority) return -1
    return 0
  }) 
}

export function printRules(rules) {
  rules = P_sort(rules)
  var s = ""
  var i=0, len = rules.length
  while (i < len) {
    var n = rules[i]
    if (n) {
      if (n.media.length > 0) s += "@media (min-width: " + L_screens[n.media[0]] + "){"
      s += P_Rule(n)
      if (n.media.length > 0) s += "}"
    }
    i++
  }
  return s 
}