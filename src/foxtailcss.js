console.log("Hello From Foxtail")

const Lscreens = {
  "sm": "640px", "md": "768px", "lg": "1024px", "xl": "1280px", "2xl": "1536px"
}
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
var HisColor = (v) => Lcolor[v] || v == "black" || v == "white" || v == "transparent" || v == "current"
var HcolorUtil = (col, prop, name) => {
  if (col == "transparent") return {[prop]:"transparent"}
  if (col == "current") return {[prop]: "currentColor"}
  return {[prop]: Hcolor(col, "var(--tw-" + name + "-opacity)"), ["--tw-"+ name +"-opacity"]: "1"}
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
var UcolorOpacity = (p, n) =>  ({["--tw-" + p[0] + "-opacity"]:Hfloat(p[2])})

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
var UgridAutoFlow= (p, n) => {
  if (p[2] == "col") p[2] = "column"
  return {"grid-auto-flow": Hargs(p, 2, ' ')}
}
const LgridAuto = {
  "auto": "auto", "min": "min-content", "max": "max-content", "fr": "minmax(0, 1fr)"
}
var UgridAuto = (p, n) => {
  if (p[1] == "cols") p[1] = "columns"
  return {["grid-auto-" + p[1]]: LgridAuto[p[2]]}
}
var Ugap = (p, n) => {
  var v, prop
  if (p.length == 2) {
    prop = "gap"
    v = Hspacing(p[1])
  }
  else {
    v = Hspacing(p[2])
    prop = p[1] == "x" ? "column-gap" : "row-gap"
  }
  return {[prop]: v}
}
const LflexContent = {
  "center": "center", "start": "start", "end": "end", "between": "space-between",
  "around":  "space-around", "evenly":  "space-evenly", "stretch": "stretch"
}
var UflexContent = (p, n) => {
  var prop = "align-content", s=1
  if (p[0] == "justify") prop = "justify-content"
  else if (p[0] == "place") {
    prop = "place-content"
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
  "screen": "100vh",
  "min": "min-content",
  "max": "max-content",
}
var UwidthHeight = (p, n) => {
  var prop = p[0] == "w" ? "width" : "height" 
  var r = HspacingPercent(p[1])
  if (!r) r = LwidthHeight[p[1]]
  if (p[0] = "w" && p[1] == "screen") r = "100vw"
  return {[prop]: r}
}
var UminWdithHeight = (p) => {
  var prop = p[1] == "w" ? "min-width" : "min-height" 
  var r = HspacingPercent(p[2])
  if (!r) r = LwidthHeight[p[2]]
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
  else {
    v = LwidthHeight[s]
    if (!v) v = Lscreens[s]
  }
  return {"max-width": v}
}
var UmaxHeight = (p) => { 
  var r = HspacingPercent(p[2])
  if (!r) r = LwidthHeight[p[2]]
  return {"max-height": r}
}

var Uappearance = (p) => ({[p0]: p1})
var Ucursor = (p) => ({[p0]: Hargs(p, 1)})
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

var Utransform = (p) => {
  if (p[1] == "none") return {"transform": "none"}
  var t = "translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))"
  if (p[1] == "gpu") t = "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0)"
  return {"--tw-translate-x": "0", "--tw-translate-y": "0", "--tw-rotate": "0", "--tw-skew-x": "0",
          "--tw-skew-y": "0", "--tw-scale-x": "1", "--tw-scale-y": "1", 
          "transform": t + " rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
  }
}
var UtransformOrigin = (p) => ({"transform-origin": Hargs(p, 1, ' ')})

var Uscale = (p) => {
  var v
  if (p[1] == "x") {
    v = Hfloat(p[2])
    return {"--tw-scale-x": v}
  } 
  else if (p[1] == "y") {
    v = Hfloat(p[2])
    return {"--tw-scale-y": v}
  }
  else {
    v = Hfloat(p[1])
    return {"--tw-scale-x": v, "--tw-scale-y": v}
  }
}
var Urotate = (p) => ({"--tw-rotate": p[1] + "deg"})
var Utranslate = (p) => ({["--tw-translate-"+p[1]]: HspacingPercent(p[2])})
var Uskew = (p) => ({["--tw-skew-"+p[1]]: p[2] + "deg"})

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
var Uease = (p) => ({"transition-timing-function": Lease[p[1]]})

var UborderCollapse = (p) => ({"border-collapse": p[1]})

var UblendMode = (p) => {
  if (p[0] == "bg") p[0] = "background" 
  return {[p[0]+"-blend-mode"]: Hargs(p, 2)}
}

var Uopacity = (p) =>  ({"opacity":Hfloat(p[2])})

var UboxDecorationBreak = (p) =>({"box-decoration-break": p[1]})
var UboxSizing = (p) =>({"box-sizing": p[1]+"-box"})
var UclearFloat = (p) =>({[p[0]]: p[1]})
var Uisolation = (p) =>({"isolation": p[1] ? "auto" : "isolate"})
const LobjectFit = [ "contain", "cover", "fill", "none", "scale" ]
var UobjectFitPosition = (p) => {
  if (LobjectFit.includes(p[1]))  return {"object-fit": Hargs(p, 1)}
  return {"object-position": Hargs(p, 1, ' ')}
}
var Uoverflow = (p) => {
  if (p.length == 2) return {"overflow": p[1]}
  return {["overflow-"+p[1]]: p[2]}  
}
var Uoverscroll = (p) => {
  if (p.length == 2) return {"overscroll-behavior": p[1]}
  return {["overscroll-behavior-"+p[1]]: p[2]}  
}
var Uinset = (p) => {
  var v = p.length == 2 ? HspacingPercent(p[1]) : HspacingPercent(p[2])
  if (p.length == 2) return {"top": v, "bottom": v, "right": v, "left": v}
  if (p[1] == "x") return {"right": v, "left": v}
  return {"top": v, "bottom": v}  
}
var UtopRightBottomLeft = (p) => ({[p[0]]: HspacingPercent(p[1])}) 

var Uvisibility = (p) => ({"visibility": p[0] == "visible" ? p[0] : "hidden"})

var Uzindex = (p) => ({"z-index": p[1]})

LboxShadow = {
  "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  "": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  "none": "0 0 #0000"
}
var UboxShadow = (p) => ({"--tw-shadow": LboxShadow[p[1] ? p[1] : ""]})

var Uring = (p) => {
  if (p[1] == "inset") return {"--tw-ring-inset": "inset"}
  if (!HisColor(p[1])) {
    var v = p[1] ? p[1] : "3"
    return {"--tw-ring-shadow": "var(--tw-ring-inset) 0 0 0 calc(" + v + "px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
    "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)"}
  }
  return HcolorUtil(Hargs(p, 1), "--tw-ring-color", "ring")
}

var UringOffset = (p) => {
  if (!HisColor(p[2])) return {"--tw-ring-offset-width": p[2] + "px"}
  return {"--tw-ring-offset-color": Hcolor(Hargs(p, 2), "", true)}
}
const LborderRadius = {
  "0": "0px", "sm": "0.125rem", "": "0.25rem", "md": "0.375rem", "lg": " 0.5rem",
  "xl": "0.75rem", "2xl": "1rem", "3xl": "1.5rem", "full": "9999px"
}
var UborderRadius = (p) => {
  v = LborderRadius[p[1] ? p[1] : ""]
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
  if (!p[1] || !isNaN(p[1])) return {"border-width": p[1] ? p[1] : "1" + "px"}
  return {"border-style": p[1]}
}
const LborderWidth = { "t": "top", "r": "right", "b": "bottom", "l": "left" }
var UborderWidth = (p) => {
  var s = LborderWidth[p[1]]
  return {["border-" + s + "-width"]: p[2] ? p[2] : "1" + "px" }
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
var UfontVariantNumeric = (p) => ({"font-variant-numeric": Hargs(p,0)}) 

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
  var prop = "word-break"
  if (p[1] == "normal") return {"overflow-wrap": "normal", [prop]: "normal"}
  if (p[1] == "words") return {[prop]: "break-word"}
  return {[prop]: "break-all"}
}
var UplaceholderColor = (p, n) => {
  n.element = "placeholder"
  return HcolorUtil(Hargs(p, 1), "color", "placeholder")
}
var UplaceholderOpacity = (p, n) => {
  n.element = "placeholder"
  return UcolorOpacity(p, n)
}

const lookup = {
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
  "animation": Uanimation,
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
  "z": Uzindex,
  "visible": Uvisibility,
  "invisible": Uvisibility,
  "top": UtopRightBottomLeft,
  "bottom": UtopRightBottomLeft,
  "right": UtopRightBottomLeft,
  "left": UtopRightBottomLeft,
  "inset": Uinset,
  "overscroll": Uoverscroll,
  "overflow": Uoverflow,
  "object": UobjectFitPosition,
  "isolation": Uisolation,
  "float": UclearFloat,
  "clear": UclearFloat,
  "decoration": UboxDecorationBreak,
  "box": UboxSizing,
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
  "transform": Utransform,
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
  "block": Udisplay,
  "inline": Uinline,
  "flex": Udisplay,
  "flow-root": Udisplay,
  "grid": Udisplay,
  "auto": UgridAuto,
  "grid-cols": UgridTemplate,
  "grid-rows":UgridTemplate,
  "grid-flow": UgridAutoFlow,
  "col-span": UgridSpan,
  "row-span": UgridSpan,
  "col-auto": UgridSpan,
  "row-auto": UgridSpan,
  "col-start": UgridStartEnd,
  "col-end": UgridStartEnd,
  "row-start": UgridStartEnd,
  "row-end": UgridStartEnd,
  "gap": Ugap,
  "justify": UflexContent,
  "content": UflexContent,
  "place-content": UflexContent,
  "contents": Udisplay,
  "justify-items": UjustifyPlaceSelfItems,
  "place-items": UjustifyPlaceSelfItems,
  "justify-self": UjustifyPlaceSelfItems,
  "place-self": UjustifyPlaceSelfItems,
  "align-items": UalignSelfItems,
  "align-self": UalignSelfItems,
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
  "min-w": UminWdithHeight,
  "min-h": UminWdithHeight,
  "max-w": UmaxWidth,
  "max-h": UmaxHeight,

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

escapeClass = (c) => {
  return "." + c.replace(":", "\\:")
}

var ShadowClasses = []

addShadowClass = (c) => {
  c = escapeClass(c)
  if (!ShadowClasses.includes(c)) ShadowClasses.push(c)
}

compile = (c) => {
  var node = {}
  var bc = variants(c, node)
  var parts = bc.split("-")
  if (parts[0] == "shadow" || parts[0] == "ring") addShadowClass(c)
  var i = parts.length;
  while (i > 0) {
    var s = parts.slice(0, i)
    s = s.join("-")
    var fn = lookup[s]
    if (fn) {
     node.props = fn(parts, node);
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

insertBaseStyles = () => {
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

insertStyles = () => {
  var s = ""
  if (ShadowClasses.length > 0) {
    s += ShadowClasses.join(",") + "{box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);}"
  }
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

  insertBaseStyles()
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