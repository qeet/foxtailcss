'use strict';

/*
 * Lookups
 */
const L_screens = { "sm": "640px", "md": "768px", "lg": "1024px", "xl": "1280px", "2xl": "1536px" };

const L_color = {
  'gray':   'F9FAFBF3F4F6E5E7EBD1D5DB9CA3AF6B72804B55633741511F2937111827',
  'red':    'FEF2F2FEE2E2FECACAFCA5A5F87171EF4444DC2626B91C1C991B1B7F1D1D',
  'yellow': 'FFFBEBFEF3C7FDE68AFCD34DFBBF24F59E0BD97706B4530992400E78350F',
  'green':  'ECFDF5D1FAE5A7F3D06EE7B734D39910B981059669047857065F46064E3B', 
  'blue':   'EFF6FFDBEAFEBFDBFE93C5FD60A5FA3B82F62563EB1D4ED81E40AF1E3A8A',
  'indigo': 'EEF2FFE0E7FFC7D2FEA5B4FC818CF86366F14F46E54338CA3730A3312E81',
  'pink':   'FDF2F8FCE7F3FBCFE8F9A8D4F472B6EC4899DB2777DB27779D174D831843',
  'purple': 'F5F3FFEDE9FEDDD6FEC4B5FDA78BFA8B5CF67C3AED6D28D95B21B64C1D95',
};

const L_objectFit = [ "contain", "cover", "fill", "none", "scale" ];

const L_flex = { "1":  "1 1 0%", "auto": "1 1 auto", "initial": "0 1 auto", "none": "none" };

const L_pseudo = {
  only: 1, "first-of-type": 2, "last-of-type": 3, target: 4, default: 5, indeterminate: 6,
  "placeholder-shown": 7, autofill: 8, valid: 9, invalid: 10, "in-range": 11, "out-of-range": 12,
  first: 13, last: 14, odd: 15, even: 16, visited: 17, checked: 18, "focus-within": 19, hover: 20,
  focus: 21, "focus-visible": 22, active: 23, disabled: 24,
};

const L_media = { sm: 100, md: 200, lg: 300, xl: 400, "2xl": 500, dark: 10 };

const L_order = {first: "-9999", last: "9999", none: "0"};

const L_gridAuto = { "auto": "auto", "min": "min-content", "max": "max-content", "fr": "minmax(0, 1fr)" };

/* 
 * Utilities
 */
var U_boxDecorationBreak = (p) => ({"box-decoration-break": p[1], "-webkit-box-decoration-break": p[1]});

var U_boxSizing = (p) => ({"box-sizing": p[1]+"-box"});

var U_display = (p) => ({display: p[0] == "hidden" ? "none" : Hargs(p, 0)});

var U_visibility = (p) => ({visibility: p[0] == "visible" ? p[0] : "hidden"});

var U_position = (p) => ({position: p[0]});

var U_zindex = (p) => ({"z-index": p[1]});

var U_clearFloat = (p) => ({[p[0]]: p[1]});

var U_isolation = (p) => ({isolation: p[1] ? "auto" : "isolate"});

var U_objectFitPosition = (p) => {
  if (L_objectFit.includes(p[1]))  return {"object-fit": Hargs(p, 1)}
  return {"object-position": Hargs(p, 1, " ")}
};

var U_overScrollFlow = (p) => {
  var n = p[0] == "overflow" ? p[0] : p[0] + "-behavior";
  if (p.length == 2) return {[n]: p[1]}
  return {[n + "-" + p[1]]: p[2]}  
};

var U_inset = (p, n) => {
  var v = p.length == 2 ? HspacingPercent(p[1], n) : HspacingPercent(p[2], n);
  if (p.length == 2) return {"top": v, "bottom": v, "right": v, "left": v}
  if (p[1] == "x") return {"right": v, "left": v}
  return {"top": v, "bottom": v}  
};

var U_flexDirection = (p) => {
  if (p[1] == "col") p[1] = "column";
  return {"flex-direction": Hargs(p, 1)}
};

var U_flexWrap = (p) => ({"flex-wrap": Hargs(p, 1)});

var U_flex = (p) => ({"flex": L_flex[p[1]]});

var U_flexGrowShrink = (p) => ({["flex-" + p[1]]: p[2] == "0" ? "0" : "1"});

var U_order = (p) => {
  var r = L_order[p[1]];
  return {"order": r ? r : p[1]}

};

var U_gridTemplate = (p) => {
  if (p[1] == "cols") p[1] = "columns";
  var r = p[2] == "none" ? "none" : "repeat(" + p[2] + ", minmax(0, 1fr))";
  return {["grid-template-" + p[1]]: r}
};

var U_gridAutoFlow= (p) => {
  if (p[2] == "col") p[2] = "column";
  return {"grid-auto-flow": Hargs(p, 2, ' ')}
};

var U_gridAuto = (p) => {
  if (p[1] == "cols") p[1] = "columns";
  return {["grid-auto-" + p[1]]: L_gridAuto[p[2]]}
};

var U_gap = (p, n) => {
  var v, prop;
  if (p.length == 2) {
    prop = "gap";
    v = Hspacing(p[1], n);
  }
  else {
    v = Hspacing(p[2], n);
    prop = p[1] == "x" ? "column-gap" : "row-gap";
  }
  return {[prop]: v}
};

var U_spaceBetween = (p, n) => {
  n.csel = "> :not([hidden]) ~ :not([hidden])";
  if (p[2] == "reverse") {
    n.priority++;
    return {["--tw-space-" + p[1] + "-reverse"]: "1"}
  }
  return {["--tw-space-"+ p[1] + "-reverse"]: "0",
    ["margin-" + (p[1] == 'x' ? "right" : "bottom")] : "calc(" + Hspacing(p[2], n) + " * var(--tw-space-" + p[1] + "-reverse))",
    ["margin-" + (p[1] == 'x' ? "left" : "top")]: "calc(" + Hspacing(p[2], n) + " * calc(1 - var(--tw-space-" + p[1] + "-reverse)))"
  }
};

var U_divideWidth = (p, n) => {
  n.csel = "> :not([hidden]) ~ :not([hidden])";
  if (p[2] == "reverse") {
    n.priority++;
    return {["--tw-divide-" + p[1] + "-reverse"]: "1"}
  }
  var w = p.length == 3 ? p[2] : "1"; 
  return {["--tw-divide-"+ p[1] + "-reverse"]: "0",
    ["border-" + (p[1] == 'x' ? "right" : "bottom") + "-width"] : "calc(" + w + "px * var(--tw-divide-" + p[1] + "-reverse))",
    ["border-" + (p[1] == 'x' ? "left" : "top") + "-width"]: "calc(" + w + "px * calc(1 - var(--tw-divide-" + p[1] + "-reverse)))"
  }
};

var U_divideColor = (p, n) => {
  n.csel = "> :not([hidden]) ~ :not([hidden])";
  if (HisColor(p[1])) return HcolorUtil(Hargs(p, 1), "border-color", "divide")
  return {"border-style": p[1]}
};

var U_backgroundOrigin = (p) => ({"background-origin": p[2] + "-box"});

var Hcomp = (s, i) => parseInt(s.substring(i, i+2), 16) + ",";

var HhexColor = (v) => {
  if (v == "white") return "ffffff"
  if (v == "black") return "000000"
  var p = v.split("-");
  var c = L_color[p[0]];
  if (c) {
    var s = parseInt(p[1])/100;
    s = s < 1 ? 0 : s*6;
    return c.substring(s, s+6)
  }
  return false
};

var HtransCurr = (v) => {
  if (v == "transparent") return v
  if (v == "current") return "currentColor"
  return false
};
var Hcolor = (v, o, h) => {
  if (!o) o = 1;
  var c = HhexColor(v);
  if (h) {
    if (c) return "#" + c
    if (HtransCurr(v)) return HtransCurr(v)
  }
  else if (c) return "rgba(" + Hcomp(c, 0) + Hcomp(c, 2) + Hcomp(c, 4) + o + ")"
};

var HisColor = (v) => L_color[v] || v == "black" || v == "white" || v == "transparent" || v == "current";
var HcolorUtil = (col, prop, name) => {
  var tc = HtransCurr(col);
  if (tc) return {[prop]: tc}
  return {[prop]: Hcolor(col, "var(--tw-" + name + "-opacity)"), ["--tw-"+ name +"-opacity"]: "1"}
};  

var Hpercent = (v, n) => {
  if (v == "full") return n.minus + "100%"
  if (v.indexOf("/") > -1) {
    var p = v.split("/");
    return n.minus + (parseInt(p[0]) / parseInt(p[1])) * 100 + "%"
  }
};
const Lspacing = {
  '0.5': '0.125','1': '0.25','1.5': '0.375','2': '0.5','2.5': '0.625',
  '3': '0.75', '3.5': '0.875', '4': '1','5': '1.25','6': '1.5','7': '1.75','8': '2','9': '2.25',
  '10': '2.5','11': '2.75','12': '3','14': '3.5','16': '4','20': '5','24': '6','28': '7','32': '8',
  '36': '9','40': '10','44': '11','48': '12','52': '13','56': '14','60': '15','64': '16','72': '18',
  '80': '20','96': '24',
};
var Hspacing = (v, n) => {
  if (v == "0" || v == "auto") return v
  if (v == "px") return n.minus + "1px"
  v = Lspacing[v];
  if (v) v = n.minus + v +"rem";
  return v
};
var HspacingPercent = (v, n) => {
  var r = Hspacing(v, n);
  if (!r) r = Hpercent(v, n);
  return r
};
var Hfloat = (v) => (parseInt(v)/100).toString();

var Hargs = (p, f, d) => p.slice(f).join(d ? d : '-');

var LbackgroundAttachment = ['fixed','local','scroll'];
var LbackgroundPosition = ['bottom','center','left','right','top'];
var LbackgroundSize = ['auto', 'cover', 'contain'];

var Ubackground = (p, n) => {
  var p1 = p[1];
  if (p1 == "no" && p[2] == "repeat") return {"background-repeat": "no-repeat"}
  if (p1 == "none") return {"background-image": "none"}
  if (LbackgroundAttachment.includes(p1)) return {"background-attachment": p1}
  if (LbackgroundPosition.includes(p1)) return {"background-position": Hargs(p, 1, ' ')}
  if (LbackgroundSize.includes(p1)) return {"background-size": p1}
  return HcolorUtil(Hargs(p, 1), "background-color", "bg")
};
var UcolorOpacity = (p, n) =>  {
  n.priority++;
  return {["--tw-" + p[0] + "-opacity"]:Hfloat(p[2])}
};

const LbackgroudnGradient = {
  "t": "top", "tr": "top right", "r": "right", "br": "bottom right", 
  "b": "bottom", "bl": "bottom left", "l": "left", "tl": "top left"
};
var UbackgroundGradient = (p, n) => ({"background-image": "linear-gradient(to " + 
                        LbackgroudnGradient[p[3]] + ", var(--tw-gradient-stops))"});
var Ufrom = (p, n) => {
  var to = Hargs(p, 1);
  if (p[1] == "transparent") to = "black";
  else if (p[1] == "current") to = "white";
  return {"--tw-gradient-from": Hcolor(Hargs(p, 1), 1, true),
    "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to, " + Hcolor(to, "0") +")"}
};

var Uto = (p, n) => ({"--tw-gradient-to": Hcolor(Hargs(p, 1), 1, true)});

var Uvia = (p, n) => {
  var to = Hargs(p, 1);
  if (p[1] == "transparent") to = "black";
  else if (p[1] == "current") to = "white";
  return {"--tw-gradient-stops": "var(--tw-gradient-from), " +  Hcolor(Hargs(p, 1), 1, true) +  ", var(--tw-gradient-to, " + Hcolor(to, "0")  + ")"}
};

var UbackgroundRepeat = (p, n) => {
  var prop = "background-repeat";
  if (p[2] == "round" || p[2] == "space") return {[prop]: p[2]}
  return {[prop]: Hargs(p, 1)}
};

const LbackgroundClip = {
  "border":"border-box",
  "padding":"padding-box",
  "content":"content-box",
  "text": "text"
};
var UbackgroundClip = (p, n) => ({"background-clip":LbackgroundClip[p[2]]});



var Uinline = (p, n) => ({"display":Hargs(p, 0)});













var UgridSpan = (p, n) => {
  if (p[0] == "col") p[0] = "column";
  var r = p[2] == "full" ? "1 / -1" : "span " + p[2] + " / " + "span " + p[2];
  if (p[1] == "auto") r = "auto";
  return {["grid-" + p[0]]: r}
};
var UgridStartEnd = (p, n) => {
  if (p[0] == "col") p[0] = "column";
  return {["grid-" + p[0] + "-" + p[1]]: p[2]}
};



const LflexContent = {
  "center": "center", "start": "flex-start", "end": "flex-end", "between": "space-between",
  "around":  "space-around", "evenly":  "space-evenly", "stretch": "stretch"
};
var UflexContent = (p, n) => {
  var prop = "align-content", s=1;
  if (p[0] == "justify") prop = "justify-content";
  else if (p[0] == "place") {
    prop = "place-content";
    if (p[2] == "start" || p[2] == "end") return {[prop]: p[2]} 
    s = 2;
  }
  return {[prop]: LflexContent[p[s]]}
};
var UjustifyPlaceSelfItems = (p, n) => ({[p[0] + "-" + p[1]]: p[2]});
var UalignSelfItems = (p, n) => {
  var v = p[1];
  if (p[1] == "start") v = "flex-start";
  else if (p[1] == "end") v = "flex-end";
  return {["align-"+p[0]]: v}
};

var Utable = (p, n) => {
  if (p[1] == "auto" || p[1] == "fixed") return {"table-layout": p[1]}
  return {"display":Hargs(p, 0)}
};



var Upadding = (p, n) => ({"padding":Hspacing(p[1], n)});
var UpaddingX = (p, n) => ({"padding-left":Hspacing(p[1], n), "padding-right":Hspacing(p[1], n)});
var UpaddingY = (p, n) => ({"padding-top":Hspacing(p[1], n), "padding-bottom":Hspacing(p[1], n)});
var UpaddingT = (p, n) => ({"padding-top":Hspacing(p[1], n)});
var UpaddingB = (p, n) => ({"padding-bottom":Hspacing(p[1], n)});
var UpaddingL = (p, n) => ({"padding-left":Hspacing(p[1], n)});
var UpaddingR = (p, n) => ({"padding-right":Hspacing(p[1], n)});

var Umargin = (p, n) => ({"margin":Hspacing(p[1], n)});
var UmarginX = (p, n) => ({"margin-left":Hspacing(p[1], n), "margin-right":Hspacing(p[1], n)});
var UmarginY = (p, n) => ({"margin-top":Hspacing(p[1], n), "margin-bottom":Hspacing(p[1], n)});
var UmarginT = (p, n) => ({"margin-top":Hspacing(p[1], n)});
var UmarginB = (p, n) => ({"margin-bottom":Hspacing(p[1], n)});
var UmarginL = (p, n) => ({"margin-left":Hspacing(p[1], n)});
var UmarginR = (p, n) => ({"margin-right":Hspacing(p[1], n)});

const LwidthHeight = {
  "screen": "100vh",
  "min": "min-content",
  "max": "max-content",
};
var UwidthHeight = (p, n) => {
  var prop = p[0] == "w" ? "width" : "height"; 
  var r = HspacingPercent(p[1], n);
  if (!r) r = LwidthHeight[p[1]];
  if (p[0] == "w" && p[1] == "screen") r = "100vw";
  return {[prop]: r}
};
var UminWdithHeight = (p, n) => {
  var prop = p[1] == "w" ? "min-width" : "min-height"; 
  var r = LwidthHeight[p[2]];
  if (!r) {
    r = HspacingPercent(p[2], n);
    if (!r) r = LwidthHeight[p[2], n];
  }
  return {[prop]: r}
};
const LmaxWidth = {
  "0":"0", "xs":"20", "sm":"24", "md":"28", "lg":"32", "xl":"36", "2xl":"42",
  "3xl":"48", "4xl":"56", "5xl":"64", "6xl":"72", "7xl":"80"
};
var UmaxWidth = (p) => {
  var s = p[2];
  var v = LmaxWidth[s];
  if (v) v += "rem";
  else if (s == "none") v = "none";
  else if (s == "prose") v = "65ch";
  else if (s == "full") v = "100%";
  else {
    v = L_screens[p[3]];
    if (!v) v = LwidthHeight[s];
  }
  return {"max-width": v}
};
var UmaxHeight = (p, n) => { 
  var r = HspacingPercent(p[2], n);
  if (!r) r = LwidthHeight[p[2]];
  return {"max-height": r}
};

var Uappearance = (p) => ({[p0]: p1});
var Ucursor = (p) => ({[p[0]]: Hargs(p, 1)});
var Uoutline = (p) => {
  var o = "2px solid transparent";
  if (p[1] == "white") o = "2px dotted white";
  if (p[1] == "black") o = "2px dotted black";
  return {"outline": o, "outline-offset": "2px"}
};
var UpointerEvents = (p) => ({"pointer-events": p[2]});
const Lresize = {
  "none": "none", "y": "vertical", "x": "horizontal"
};
var Uresize = (p) => {
  if (p.length == 1) return {[p[0]]: "both"}
  return {[p[0]]: Lresize[p[1]]}
};
var UuserSelect = (p) => ({"user-select": p[1]});

var UtransformGpu = (p) => ({"--tw-transform": "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"});

var Htransform = (d) => {
  d.transform = "var(--tw-transform)";
  return d
};

var UtransformOrigin = (p) => ({"transform-origin": Hargs(p, 1, ' ')});

var Uscale = (p) => {
  var v;
  if (p[1] == "x") {
    v = Hfloat(p[2]);
    return Htransform({"--tw-scale-x": v})
  } 
  else if (p[1] == "y") {
    v = Hfloat(p[2]);
    return Htransform({"--tw-scale-y": v})
  }
  else {
    v = Hfloat(p[1]);
    return Htransform({"--tw-scale-x": v, "--tw-scale-y": v})
  }
};

var Urotate = (p) => Htransform({"--tw-rotate": p[1] + "deg"});
var Utranslate = (p, n) => Htransform({["--tw-translate-"+p[1]]: HspacingPercent(p[2], n)});
var Uskew = (p) => Htransform({["--tw-skew-"+p[1]]: p[2] + "deg"});

const Ltransition = {
  "none": "none",
  "all": "all",
  "": "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
  "colors": "background-color, border-color, color, fill, stroke",
  "opacity": "opacity",
  "shadow" : "box-shadow",
  "transform": "transform",
};
var Utransition = (p) => ({"transition-property": Ltransition[p[1] ? p[1] : ""], 
"transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)","transition-duration": "150ms"});
var UdelayDuration = (p) => ({["transition-" + p[0]]: p[1] + "ms"});
const Lease = { "linear": "linear", "in": "cubic-bezier(0.4, 0, 1, 1)",
  "out": "cubic-bezier(0, 0, 0.2, 1)", "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
var Uease = (p) => ({"transition-timing-function": Lease[p[1]]});

var UborderCollapse = (p) => ({"border-collapse": p[1]});

var UblendMode = (p) => {
  if (p[0] == "bg") p[0] = "background"; 
  return {[p[0]+"-blend-mode"]: Hargs(p, 2)}
};

var Uopacity = (p) =>  ({"opacity":Hfloat(p[2])});


var UtopRightBottomLeft = (p, n) => ({[p[0]]: HspacingPercent(p[1], n)}); 





const LboxShadow = {
  "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  "": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  "none": "0 0 #0000"
};
var UboxShadow = (p) => ({"--tw-shadow": LboxShadow[p[1] ? p[1] : ""], 
  "box-shadow": "var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)"});

var Uring = (p) => {
  if (p[1] == "inset") return {"--tw-ring-inset": "inset"}
  if (!HisColor(p[1])) {
    var v = p[1] ? p[1] : "3";
    return {"--tw-ring-shadow": "var(--tw-ring-inset) 0 0 0 calc(" + v + "px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
    "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
    "box-shadow": "var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)"}
  }
  return HcolorUtil(Hargs(p, 1), "--tw-ring-color", "ring")
};

var UringOffset = (p) => {
  if (!HisColor(p[2])) return {"--tw-ring-offset-width": p[2] + "px"}
  return {"--tw-ring-offset-color": Hcolor(Hargs(p, 2), "", true)}
};
const LborderRadius = {
  "none": "0px", "sm": "0.125rem", "": "0.25rem", "md": "0.375rem", "lg": "0.5rem",
  "xl": "0.75rem", "2xl": "1rem", "3xl": "1.5rem", "full": "9999px"
};
var UborderRadius = (p) => {
  var v = LborderRadius[p[1] ? p[1] : ""];
  if (v) return {"border-radius": v}
  v = LborderRadius[p[2] ? p[2] : ""]; 
  var d = p[1], props = {};
  if (d == "t" || d == "l" || d == "tl") props["border-top-left-radius"] = v;
  if (d == "t" || d == "r" || d == "tr") props["border-top-right-radius"] = v;
  if (d == "r" || d == "b" || d == "br") props["border-bottom-right-radius"] = v;
  if (d == "b" || d == "l" || d == "bl") props["border-bottom-left-radius"] = v;  
  return props
};
var Uborder = (p) => {
  if (HisColor(p[1]))  return HcolorUtil(Hargs(p, 1), "border-color", "border")
  if (!p[1] || !isNaN(p[1])) return {"border-width": (p[1] ? p[1] : "1") + "px"}
  return {"border-style": p[1]}
};
const LborderWidth = { "t": "top", "r": "right", "b": "bottom", "l": "left" };
var UborderWidth = (p) => {
  var s = LborderWidth[p[1]];
  return {["border-" + s + "-width"]: (p[2] ? p[2] : "1") + "px" }
};
const Lanimation = {
  "none": "none",
  "spin": "spin 1s linear infinite",
  "ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  "bounce": "bounce 1s infinite"
};
var Uanimation = (p) => ({"animation": Lanimation[p[1]]});
const LfontFamily = {
  "sans": 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  "serif": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  "mono": 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
};
const LfontWeight = {
  "thin": "100", "extralight": "200", "light": "300", "normal": "400",
  "medium": "500", "semibold": "600", "bold": "700", "extrabold": "800", "black": "900"
};
var Ufont =(p) => {
  var v = LfontFamily[p[1]];
  if (v) return {"font-family": v}
  return {"font-weight": LfontWeight[p[1]]}
};
var UfontSmoothing = (p) => {
  var web = "antialiased", moz = "grayscale";
  if (p[1]) web = "auto", moz = "auto";
  return {"-webkit-font-smoothing": web, "-moz-osx-font-smoothing": moz}
};
var UfontStyle = (p) => {
  var v = "italic";
  if (p[1]) v = "normal";
  return {"font-style": v}
};
var UfontVariantNumeric = (p) => ({"font-variant-numeric": p[0] == "normal" ? "normal" : Hargs(p,0)}); 

const LletterSpacing = {
  "tighter": "-0.05", "tight": "-0.025", "normal": "0",
  "wide": "0.025", "wider": "0.05", "widest": "0.1"
};
var UletterSpacing = (p) => ({"letter-spacing": LletterSpacing[p[1]] + "em"}); 

const llineHeight = {
  "3": ".75rem", "4": "1rem", "5": "1.25rem", "6": "1.5rem", "7": "1.75rem", "8": "2rem",
  "9": "2.25rem", "10": "2.5rem", "none": "1", "tight": "1.25", "snug": "1.375",
  "normal": "1.5", "relaxed": "1.625", "loose": "2"
};
var UlineHeight = (p) => ({"line-height": llineHeight[p[1]]});

const LfontSize = {
  "xs": ["0.75", "1rem"], "sm": ["0.875", "1.25rem"], "base": ["1", "1.5rem"],
  "lg": ["1.125", "1.75rem"], "xl": ["1.25", "1.75rem"], "2xl": ["1.5", "2rem"],
  "3xl": ["1.875", "2.25rem"], "4xl": ["2.25", "2.5rem"], "5xl": ["3", "1"],
  "6xl": ["3.75", "1"], "7xl": ["4.5", "1"], "8xl": ["6", "1"],"9xl": ["8", "1"]
};
var Utext = (p) => {
  if (HisColor(p[1])) return HcolorUtil(Hargs(p, 1), "color", "text")
  var v = LfontSize[p[1]];
  if (v) return {"font-size": v[0]+"rem", "line-height": v[1]}
  return {"text-align": p[1]}
};
var UlistTypePosition = (p) => {
  if (p[1] =="inside" || p[1] == "outside") return {"list-style-position": p[1]}
  return {"list-style-type": p[1]}
};

var UtextDecoration = (p) => ({"text-decoration":  p[0] =="no" ? "none" : Hargs(p, 0)});
var UtextTransform = (p) => ({"text-transform":  p[0] =="normal" ? "none" : p[0]});
var UtextOverflow = (p) => {
  var prop = "text-overflow";
  if (p[0] == "truncate") return {"overflow": "hidden", [prop]: "ellipsis", "white-space": "nowrap"}
  if (p[1] == "clip") return {[prop]: "clip"}
  return {[prop]: "ellipsis"}
};
var UverticalAlign = (p) => ({"vertical-align": Hargs(p, 1)});
var Uwhitespace = (p) => ({"white-space": Hargs(p, 1)});
var UwordBreak = (p) => {
  if (p[1] == "normal") return {"overflow-wrap": "normal", "word-break": "normal"}
  if (p[1] == "words") return {"overflow-wrap": "break-word"}
  return {"word-break": "break-all"}
};
var UplaceholderColor = (p, n) => {
  n.pelem = "placeholder";
  return HcolorUtil(Hargs(p, 1), "color", "placeholder")
};
var UplaceholderOpacity = (p, n) => {
  n.pelem = "placeholder";
  return UcolorOpacity(p, n)
};
const Lblur = {
  "0": "0", "sm": "4px", "": "8px", "md": "12px", "lg": "16px",
  "xl": "24px", "2xl": "40px","3xl": "64px"
};
var Hfilter = (t, d) => {
  if (t == "backdrop") d["backdrop-filter"] = "var(--tw-backdrop-filter)";
  else d.filter = "var(--tw-filter)";
  return d 
};

var Ublur = (p) => {
  var t = "", s = 1;
  if (p[0] =="backdrop") {t = "-backdrop"; s = 2;}
  return Hfilter(p[0], {["--tw" + t + "-blur"]: "blur(" + Lblur[p[s] ? p[s] : ""] + ")"})
};
var UfilterFloat = (p) => {
  var t = "", s = 1;
  if (p[0] =="backdrop") {t = "-backdrop"; s = 2;}
  return Hfilter(p[0], {["--tw" + t + "-" +p[0]]: p[0] + "(" + Hfloat(p[s]) + ")"})
};  
const LdropShadow = {
  "sm" : "(0 1px 1px rgba(0,0,0,0.05))",
  "": "(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06))",
  "md": "(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06))",
  "lg": "(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1))",
  "xl": "(0 20px 13px rgba(0, 0, 0, 0.03)) drop-shadow(0 8px 5px rgba(0, 0, 0, 0.08))",
  "2xl": "(0 25px 25px rgba(0, 0, 0, 0.15))",
  "none": "(0 0 #0000)"
};
var UdropShadow = (p) => Hfilter(p[0], {"--tw-drop-shadow": "drop-shadow" + LdropShadow[p[2] ? p[2] : ""]});  
var UgrayscaleInvertSepia = (p) => {
  var t = "", s = 1;
  if (p[0] =="backdrop") {t = "-backdrop"; s = 2;}
  return Hfilter(p[0], {["--tw" + t + "-" + p[0]]: p[0] + "(" + (p[s] ? "0" : "1") + ")"})
}; 
var UhueRotate = (p) => {
  var t = "", s = 2;
  if (p[0] =="backdrop") {t = "-backdrop"; s = 3;}
  return Hfilter(p[0], {["--tw" + t + "-hue-rotate"]: "hue-rotate("+p[s]+"deg)"})
};
var UfillStroke = (p) => ({[p[0]]: "currentColor"});  
var UstrokeWidth = (p) => ({"stroke-width": p[1]}); 
var UscreenReaders = (p) => {
  if (p[0] == "sr") return {"position": "absolute", "width": "1px", "height": "1px", "padding": "0",
  "margin": "-1px", "overflow": "hidden", "clip": "rect(0, 0, 0, 0)", "white-space": "nowrap", "border-width": "0"}
  return {"position": "static", "width": "auto", "height": "auto", "padding": "0", "margin": "0",
  "overflow": "visible", "clip": "auto", "white-space": "normal"}
};

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

 
};

var V_group = (c, n) => {
  c = c.split("-");
  var p = L_pseudo[c[1]];
  if (p) {
      n.priority += (p*10);
      n.psel = ".group:" + c[1];
  }
};

var V_type = (n, v, l, a) => {
  var p = l[v];
  if (p) {
      n.priority += (p*10);
      a.push(v);
      return true
    }
    return false
};

var V_compile = (c, n) => {
  var v = c.split(":");
  var len = v.length-1;
  for (var i=0; i < len; i++) {
    var curr = v[i];
    if (!V_type(n, curr, L_media, n.media)) {
      if (!V_type(n, curr, L_pseudo, n.pseudo)) {
        if (curr.startsWith("group")) V_group(curr, n); 
        else n.pelem = curr;
      }
    }
  }
  return v[len]
};

var classPrefix = (c, n) => {
  if (c.charAt(0) == "!") {
    n.important = true;
    c = c.substring(1);
  }
  if (c.charAt(0) == "-") {
    n.minus = "-";
    c = c.substring(1);
  }
  return c
};

function compile(c) {
  var node = {class: c, minus: "", priority: 0, media: [], pseudo: []};
  var c = classPrefix(V_compile(c, node), node);

  var parts = c.split("-");
  for (var i=parts.length; i > 0; i--) {
    var fn = lookup[parts.slice(0, i).join("-")];
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

var tests = [
  ["decoration-slice", {"box-decoration-break": "slice", "-webkit-box-decoration-break": "slice"}],
  ["decoration-clone", {"box-decoration-break": "clone", "-webkit-box-decoration-break": "clone"}],
  ["decoration-xxx", {"box-decoration-break": "xxx", "-webkit-box-decoration-break": "xxx"}],
  ["decoration-", false],
  ["decoration", false],
  ["box-border", {"box-sizing": "border-box"}],
  ["box-content", {"box-sizing": "content-box"}],
  ["box-xxx", {"box-sizing": "xxx-box"}],
  ["inline-block", {"display": "inline-block"}],
  ["inline",  {"display": "inline"}],
  ["flex",  {"display": "flex"}],
  ["inline-flex", {"display": "inline-flex"}],
  ["table", {"display": "table"}],
  ["inline-table", {"display": "inline-table"}],
  ["table-caption", {"display": "table-caption"}],
  ["table-cell", {"display": "table-cell"}],
  ["table-column", {"display": "table-column"}],
  ["table-column-group", {"display": "table-column-group"}],
  ["table-footer-group", {"display": "table-footer-group"}],
  ["table-header-group", {"display": "table-header-group"}],
  ["table-row-group", {"display": "table-row-group"}],
  ["table-row", {"display": "table-row"}],
  ["flow-root", {"display": "flow-root"}],
  ["grid", {"display": "grid"}],
  ["inline-grid", {"display": "inline-grid"}],
  ["contents", {"display": "contents"}],
  ["list-item", {"display": "list-item"}],
  ["hidden",  {"display": "none"}],
  ["float-right", {"float": "right"}],
  ["float-left",  {"float": "left"}],
  ["float-none",  {"float": "none"}],
  ["clear-left",  {"clear": "left"}],
  ["clear-right", {"clear": "right"}],
  ["clear-both", {"clear": "both"}],
  ["clear-none",  {"clear": "none"}],
  ["isolate", {"isolation": "isolate"}],
  ["isolation-auto", {"isolation": "auto"}],
  ["object-contain",  {"object-fit": "contain"}],
  ["object-cover",  {"object-fit": "cover"}],
  ["object-fill", {"object-fit": "fill"}],
  ["object-none", {"object-fit": "none"}],
  ["object-scale-down", {"object-fit": "scale-down"}],
  ["object-bottom", {"object-position": "bottom"}],
  ["object-center", {"object-position": "center"}],
  ["object-left", {"object-position": "left"}],
  ["object-left-bottom", {"object-position": "left bottom"}],
  ["object-left-top", {"object-position": "left top"}],
  ["object-right", {"object-position": "right"}],
  ["object-right-bottom", {"object-position": "right bottom"}],
  ["object-right-top", {"object-position": "right top"}],
  ["object-top", {"object-position": "top"}],
  ["overflow-auto", {"overflow": "auto"}],
  ["overflow-hidden", {"overflow": "hidden"}],
  ["overflow-visible",  {"overflow": "visible"}],
  ["overflow-scroll", {"overflow": "scroll"}],
  ["overflow-x-auto", {"overflow-x": "auto"}],
  ["overflow-y-auto", {"overflow-y": "auto"}],
  ["overflow-x-hidden", {"overflow-x": "hidden"}],
  ["overflow-y-hidden", {"overflow-y": "hidden"}],
  ["overflow-x-visible", {"overflow-x": "visible"}],
  ["overflow-y-visible", {"overflow-y": "visible"}],
  ["overflow-x-scroll", {"overflow-x": "scroll"}],
  ["overflow-y-scroll", {"overflow-y": "scroll"}],
  ["overscroll-auto", {"overscroll-behavior": "auto"}],
  ["overscroll-contain", {"overscroll-behavior": "contain"}],
  ["overscroll-none", {"overscroll-behavior": "none"}],
  ["overscroll-y-auto", {"overscroll-behavior-y": "auto"}],
  ["overscroll-y-contain", {"overscroll-behavior-y": "contain"}],
  ["overscroll-y-none", {"overscroll-behavior-y": "none"}],
  ["overscroll-x-auto", {"overscroll-behavior-x": "auto"}],
  ["overscroll-x-contain", {"overscroll-behavior-x": "contain"}],
  ["overscroll-x-none", {"overscroll-behavior-x": "none"}],
  ["static", {"position": "static"}],
  ["fixed", {"position": "fixed"}],
  ["absolute", {"position": "absolute"}],
  ["relative", {"position": "relative"}],
  ["sticky",  {"position": "sticky"}],
  ["visible", {"visibility": "visible"}],
  ["invisible", {"visibility": "hidden"}],
  ["z-0", {"z-index": "0"}],
  ["z-10",  {"z-index": "10"}],
  ["z-auto",  {"z-index": "auto"}],
  ["z-1000",  {"z-index": "1000"}],
  
  ["inset-auto", {"top": "auto", "right": "auto", "bottom": "auto", "left": "auto"}],
  ["-inset-auto", {"top": "auto", "right": "auto", "bottom": "auto", "left": "auto"}],
  ["inset-0", {"top": "0", "right": "0", "bottom": "0", "left": "0"}],
  ["inset-px", {"top": "1px", "right": "1px", "bottom": "1px", "left": "1px"}],
  ["-inset-0", {"top": "0", "right": "0", "bottom": "0", "left": "0"}],
  ["-inset-px", {"top": "-1px", "right": "-1px", "bottom": "-1px", "left": "-1px"}],
  ["inset-1", {"top": "0.25rem", "right": "0.25rem", "bottom": "0.25rem", "left": "0.25rem"}],
  ["-inset-1", {"top": "-0.25rem", "right": "-0.25rem", "bottom": "-0.25rem", "left": "-0.25rem"}],
  ["inset-1/2", {"top": "50%", "right": "50%", "bottom": "50%", "left": "50%"}],
  ["-inset-1/2", {"top": "-50%", "right": "-50%", "bottom": "-50%", "left": "-50%"}],
  ["inset-full", {"top": "100%", "right": "100%", "bottom": "100%", "left": "100%"}],
  ["-inset-full", {"top": "-100%", "right": "-100%", "bottom": "-100%", "left": "-100%"}],
  ["inset-9/10", {"top": "90%", "right": "90%", "bottom": "90%", "left": "90%"}],

  ["inset-x-auto", {"right": "auto", "left": "auto"}],
  ["-inset-x-auto", {"right": "auto", "left": "auto"}],
  ["inset-x-0", {"right": "0", "left": "0"}],
  ["inset-x-px", {"right": "1px", "left": "1px"}],
  ["-inset-x-0", {"right": "0", "left": "0"}],
  ["-inset-x-px", {"right": "-1px", "left": "-1px"}],
  ["inset-x-1", {"right": "0.25rem", "left": "0.25rem"}],
  ["-inset-x-1", {"right": "-0.25rem", "left": "-0.25rem"}],
  ["inset-x-1/2", {"right": "50%", "left": "50%"}],
  ["-inset-x-1/2", {"right": "-50%", "left": "-50%"}],
  ["inset-x-full", {"right": "100%", "left": "100%"}],
  ["-inset-x-full", {"right": "-100%", "left": "-100%"}],

  ["inset-y-auto", {"top": "auto", "bottom": "auto"}],
  ["-inset-y-auto", {"top": "auto", "bottom": "auto"}],
  ["inset-y-0", {"top": "0", "bottom": "0"}],
  ["inset-y-px", {"top": "1px", "bottom": "1px"}],
  ["-inset-y-0", {"top": "0", "bottom": "0"}],
  ["-inset-y-px", {"top": "-1px", "bottom": "-1px"}],
  ["inset-y-1", {"top": "0.25rem", "bottom": "0.25rem"}],
  ["-inset-y-1", {"top": "-0.25rem", "bottom": "-0.25rem"}],
  ["inset-y-1/2", {"top": "50%", "bottom": "50%"}],
  ["-inset-y-1/2", {"top": "-50%", "bottom": "-50%"}],
  ["inset-y-full", {"top": "100%", "bottom": "100%"}],
  ["-inset-y-full", {"top": "-100%", "bottom": "-100%"}],

  ["top-auto", {"top": "auto"}],
  ["-top-auto", {"top": "auto"}],
  ["top-0", {"top": "0"}],
  ["top-px", {"top": "1px"}],
  ["-top-0", {"top": "0"}],
  ["-top-px", {"top": "-1px"}],
  ["top-1", {"top": "0.25rem"}],
  ["-top-1", {"top": "-0.25rem"}],
  ["top-1/2", {"top": "50%"}],
  ["-top-1/2", {"top": "-50%"}],
  ["top-full", {"top": "100%"}],
  ["-top-full", {"top": "-100%"}],

  ["bottom-auto", {"bottom": "auto"}],
  ["-bottom-auto", {"bottom": "auto"}],
  ["bottom-0", {"bottom": "0"}],
  ["bottom-px", {"bottom": "1px"}],
  ["-bottom-0", {"bottom": "0"}],
  ["-bottom-px", {"bottom": "-1px"}],
  ["bottom-1", {"bottom": "0.25rem"}],
  ["-bottom-1", {"bottom": "-0.25rem"}],
  ["bottom-1/2", {"bottom": "50%"}],
  ["-bottom-1/2", {"bottom": "-50%"}],
  ["bottom-full", {"bottom": "100%"}],
  ["-bottom-full", {"bottom": "-100%"}],

  ["left-1", {"left": "0.25rem"}],
  ["right-1", {"right": "0.25rem"}],

  ["flex-row", {"flex-direction": "row"}],
  ["flex-row-reverse", {"flex-direction": "row-reverse"}],
  ["flex-col", {"flex-direction": "column"}],
  ["flex-col-reverse", {"flex-direction": "column-reverse"}],

  ["flex-wrap", {"flex-wrap": "wrap"}], 
  ["flex-wrap-reverse", {"flex-wrap": "wrap-reverse"}],
  ["flex-nowrap", {"flex-wrap": "nowrap"}],

  ["flex-1", {"flex": "1 1 0%"}],
  ["flex-auto", {"flex": "1 1 auto"}],
  ["flex-initial", {"flex": "0 1 auto"}],
  ["flex-none", {"flex": "none"}],

  ["flex-grow-0", {"flex-grow": "0"}],
  ["flex-grow", {"flex-grow": "1"}],
  ["flex-shrink-0", {"flex-shrink": "0"}],
  ["flex-shrink", {"flex-shrink": "1"}],

  ["order-12",  {"order": "12"}],
  ["order-first", {"order": "-9999"}],
  ["order-last",  {"order": "9999"}],
  ["order-none",  {"order": "0"}],

  ["grid-cols-12", {"grid-template-columns": "repeat(12, minmax(0, 1fr))"}],
  ["grid-cols-none", {"grid-template-columns": "none"}],
  ["grid-cols-21", {"grid-template-columns": "repeat(21, minmax(0, 1fr))"}],

  ["grid-rows-12", {"grid-template-rows": "repeat(12, minmax(0, 1fr))"}],
  ["grid-rows-none", {"grid-template-rows": "none"}],
  ["grid-rows-21", {"grid-template-rows": "repeat(21, minmax(0, 1fr))"}],

  ["col-auto", {"grid-column": "auto"}],
  ["col-span-1", {"grid-column": "span 1 / span 1"}],
  ["col-span-full", {"grid-column": "1 / -1"}],
  ["col-start-2", {"grid-column-start": "2"}],
  ["col-start-auto", {"grid-column-start": "auto"}],
  ["col-end-2", {"grid-column-end": "2"}],
  ["col-end-auto", {"grid-column-end": "auto"}],

  ["row-auto", {"grid-row": "auto"}],
  ["row-span-1", {"grid-row": "span 1 / span 1"}],
  ["row-span-full", {"grid-row": "1 / -1"}],
  ["row-start-2", {"grid-row-start": "2"}],
  ["row-start-auto", {"grid-row-start": "auto"}],
  ["row-end-2", {"grid-row-end": "2"}],
  ["row-end-auto", {"grid-row-end": "auto"}],

  ["grid-flow-row", {"grid-auto-flow": "row"}],
  ["grid-flow-col", {"grid-auto-flow": "column"}],
  ["grid-flow-row-dense", {"grid-auto-flow": "row dense"}],
  ["grid-flow-col-dense", {"grid-auto-flow": "column dense"}],

  ["auto-cols-auto", {"grid-auto-columns": "auto"}],
  ["auto-cols-min", {"grid-auto-columns": "min-content"}],
  ["auto-cols-max", {"grid-auto-columns": "max-content"}],
  ["auto-cols-fr",  {"grid-auto-columns": "minmax(0, 1fr)"}],

  ["auto-rows-auto", {"grid-auto-rows": "auto"}],
  ["auto-rows-min", {"grid-auto-rows": "min-content"}],
  ["auto-rows-max", {"grid-auto-rows": "max-content"}],
  ["auto-rows-fr",  {"grid-auto-rows": "minmax(0, 1fr)"}],

  ["items-start", {"align-items": "flex-start"}],
  ["items-end", {"align-items": "flex-end"}],
  ["items-center", {"align-items": "center"}],
  ["items-baseline", {"align-items": "baseline"}],
  ["items-stretch", {"align-items": "stretch"}],

  ["gap-0", {"gap": "0"}],
  ["gap-x-0", {"column-gap": "0"}],
  ["gap-y-0", {"row-gap": "0"}],
  ["gap-4", {"gap": "1rem"}],
  ["gap-x-4", {"column-gap": "1rem"}],
  ["gap-y-4", {"row-gap": "1rem"}],

  ["justify-start", {"justify-content": "flex-start"}],
  ["justify-end", {"justify-content": "flex-end"}],
  ["justify-center",  {"justify-content": "center"}],
  ["justify-between", {"justify-content": "space-between"}],
  ["justify-around",  {"justify-content": "space-around"}],
  ["justify-evenly",  {"justify-content": "space-evenly"}],

  ["justify-items-start", {"justify-items": "start"}],    
  ["justify-items-end", {"justify-items": "end"}],
  ["justify-items-center",  {"justify-items": "center"}],
  ["justify-items-stretch", {"justify-items": "stretch"}],

  ["justify-self-auto", {"justify-self": "auto"}],
  ["justify-self-start", {"justify-self": "start"}],
  ["justify-self-end",  {"justify-self": "end"}],
  ["justify-self-center", {"justify-self": "center"}],
  ["justify-self-stretch", {"justify-self": "stretch"}],

  ["content-center",  {"align-content": "center"}],
  ["content-start", {"align-content": "flex-start"}],
  ["content-end", {"align-content": "flex-end"}],
  ["content-between", {"align-content": "space-between"}],
  ["content-around", {"align-content": "space-around"}],
  ["content-evenly", {"align-content": "space-evenly"}],

  ["items-start", {"align-items": "flex-start"}],
  ["items-end", {"align-items": "flex-end"}],
  ["items-center", {"align-items": "center"}],
  ["items-baseline", {"align-items": "baseline"}],
  ["items-stretch", {"align-items": "stretch"}],

  ["self-auto", {"align-self": "auto"}],
  ["self-start", {"align-self": "flex-start"}],
  ["self-end", {"align-self": "flex-end"}],
  ["self-center", {"align-self": "center"}],
  ["self-stretch", {"align-self": "stretch"}],

  ["place-content-center", {"place-content": "center"}],
  ["place-content-start", {"place-content": "start"}],
  ["place-content-end", {"place-content": "end"}],
  ["place-content-between", {"place-content": "space-between"}],
  ["place-content-around",  {"place-content": "space-around"}],
  ["place-content-evenly", {"place-content": "space-evenly"}],
  ["place-content-stretch", {"place-content": "stretch"}],

  ["place-items-start", {"place-items": "start"}],
  ["place-items-end", {"place-items": "end"}],
  ["place-items-center", {"place-items": "center"}],
  ["place-items-stretch", {"place-items": "stretch"}],

  ["place-self-auto", {"place-self": "auto"}],
  ["place-self-start",  {"place-self": "start"}],
  ["place-self-end",  {"place-self": "end"}],
  ["place-self-center", {"place-self": "center"}],
  ["place-self-stretch",  {"place-self": "stretch"}],

  ["p-0", {"padding": "0"}],
  ["px-0", {"padding-left": "0", "padding-right": "0"}],
  ["py-0", {"padding-top": "0", "padding-bottom": "0"}],
  ["pt-0", {"padding-top": "0"}],
  ["pb-0", {"padding-bottom": "0"}],
  ["pl-0", {"padding-left": "0"}],
  ["pr-0", {"padding-right": "0"}],
  ["p-96", {"padding": "24rem"}],
  ["px-96", {"padding-left": "24rem", "padding-right": "24rem"}],
  ["py-96", {"padding-top": "24rem", "padding-bottom": "24rem"}],
  ["pt-96", {"padding-top": "24rem"}],
  ["pb-96", {"padding-bottom": "24rem"}],
  ["pl-96", {"padding-left": "24rem"}],
  ["pr-96", {"padding-right": "24rem"}],

  ["m-0", {"margin": "0"}],
  ["-m-0", {"margin": "0"}],
  ["mx-0", {"margin-left": "0", "margin-right": "0"}],
  ["my-0", {"margin-top": "0", "margin-bottom": "0"}],
  ["mt-0", {"margin-top": "0"}],
  ["mb-0", {"margin-bottom": "0"}],
  ["ml-0", {"margin-left": "0"}],
  ["mr-0", {"margin-right": "0"}],
  ["m-96", {"margin": "24rem"}],
  ["mx-96", {"margin-left": "24rem", "margin-right": "24rem"}],
  ["my-96", {"margin-top": "24rem", "margin-bottom": "24rem"}],
  ["mt-96", {"margin-top": "24rem"}],
  ["mb-96", {"margin-bottom": "24rem"}],
  ["ml-96", {"margin-left": "24rem"}],
  ["mr-96", {"margin-right": "24rem"}],
  ["-m-96", {"margin": "-24rem"}],
  ["-mx-96", {"margin-left": "-24rem", "margin-right": "-24rem"}],
  ["-my-96", {"margin-top": "-24rem", "margin-bottom": "-24rem"}],
  ["-mt-96", {"margin-top": "-24rem"}],
  ["-mb-96", {"margin-bottom": "-24rem"}],
  ["-ml-96", {"margin-left": "-24rem"}],
  ["-mr-96", {"margin-right": "-24rem"}],

  ["space-x-1", {"--tw-space-x-reverse": "0", "margin-right": "calc(0.25rem * var(--tw-space-x-reverse))",
                  "margin-left": "calc(0.25rem * calc(1 - var(--tw-space-x-reverse)))"}],
  ["space-x-reverse", {"--tw-space-x-reverse": "1"}], 
  ["space-y-1", {"--tw-space-y-reverse": "0", "margin-top": "calc(0.25rem * calc(1 - var(--tw-space-y-reverse)))",
                  "margin-bottom": "calc(0.25rem * var(--tw-space-y-reverse))"}],
  ["space-y-reverse", {"--tw-space-y-reverse": "1"}], 

  ["w-5", {"width": "1.25rem"}],
  ["w-auto", {"width": "auto"}],
  ["w-1/3", {"width": "33.33333333333333%"}],
  ["w-full", {"width": "100%"}],
  ["w-screen", {"width": "100vw"}],
  ["w-min", {"width": "min-content"}],
  ["w-max", {"width": "max-content"}],

  ["h-5", {"height": "1.25rem"}],
  ["h-auto", {"height": "auto"}],
  ["h-1/3", {"height": "33.33333333333333%"}],
  ["h-full", {"height": "100%"}],
  ["h-screen", {"height": "100vh"}],

  ["min-w-0", {"min-width": "0"}],
  ["min-w-full", {"min-width": "100%"}],
  ["min-w-min", {"min-width": "min-content"}],
  ["min-w-max", {"min-width": "max-content"}],
  ["min-h-0", {"min-height": "0"}],
  ["min-h-full", {"min-height": "100%"}],
  ["min-h-screen", {"min-height": "100vh"}],

  ["max-w-0", {"max-width": "0rem"}],
  ["max-w-none", {"max-width": "none"}],
  ["max-w-xs", {"max-width": "20rem"}],
  ["max-w-sm", {"max-width": "24rem"}],
  ["max-w-md", {"max-width": "28rem"}],
  ["max-w-lg", {"max-width": "32rem"}],
  ["max-w-xl", {"max-width": "36rem"}],
  ["max-w-2xl", {"max-width": "42rem"}],
  ["max-w-3xl", {"max-width": "48rem"}],
  ["max-w-4xl", {"max-width": "56rem"}],
  ["max-w-5xl", {"max-width": "64rem"}],
  ["max-w-6xl", {"max-width": "72rem"}],
  ["max-w-7xl", {"max-width": "80rem"}],
  ["max-w-full",  {"max-width": "100%"}],
  ["max-w-min", {"max-width": "min-content"}],
  ["max-w-max", {"max-width": "max-content"}],
  ["max-w-prose", {"max-width": "65ch"}],
  ["max-w-screen-sm", {"max-width": "640px"}],
  ["max-w-screen-md", {"max-width": "768px"}],
  ["max-w-screen-lg", {"max-width": "1024px"}],
  ["max-w-screen-xl", {"max-width": "1280px"}],
  ["max-w-screen-2xl", {"max-width": "1536px"}],

  ["max-h-4", {"max-height": "1rem"}],
  ["max-h-full", {"max-height": "100%"}],
  ["max-h-screen", {"max-height": "100vh"}],

  ["font-sans", {"font-family": 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}],
  ["font-serif", {"font-family": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'}],
  ["font-mono", {"font-family": 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'}],

  ["text-xs", {"font-size": "0.75rem", "line-height": "1rem"}],
  ["text-sm", {"font-size": "0.875rem", "line-height": "1.25rem"}],
  ["text-base", {"font-size": "1rem", "line-height": "1.5rem"}],
  ["text-lg", {"font-size": "1.125rem", "line-height": "1.75rem"}],
  ["text-xl", {"font-size": "1.25rem", "line-height": "1.75rem"}],
  ["text-2xl", {"font-size": "1.5rem", "line-height": "2rem"}],
  ["text-3xl", {"font-size": "1.875rem", "line-height": "2.25rem"}],
  ["text-4xl", {"font-size": "2.25rem", "line-height": "2.5rem"}],
  ["text-5xl", {"font-size": "3rem", "line-height": "1"}],
  ["text-6xl", {"font-size": "3.75rem", "line-height": "1"}],
  ["text-7xl", {"font-size": "4.5rem", "line-height": "1"}],
  ["text-8xl", {"font-size": "6rem", "line-height": "1"}],
  ["text-9xl", {"font-size": "8rem", "line-height": "1"}],

  ["antialiased", {"-webkit-font-smoothing": "antialiased", "-moz-osx-font-smoothing": "grayscale"}],
  ["subpixel-antialiased", {"-webkit-font-smoothing": "auto", "-moz-osx-font-smoothing": "auto"}],

  ["italic", {"font-style": "italic"}],
  ["not-italic", {"font-style": "normal"}],

  ["font-thin", {"font-weight": "100"}],
  ["font-extralight", {"font-weight": "200"}],
  ["font-light",  {"font-weight": "300"}],
  ["font-normal", {"font-weight": "400"}],
  ["font-medium", {"font-weight": "500"}],
  ["font-semibold", {"font-weight": "600"}],
  ["font-bold", {"font-weight": "700"}],
  ["font-extrabold", {"font-weight": "800"}],
  ["font-black", {"font-weight": "900"}],

  ["normal-nums", {"font-variant-numeric": "normal"}],
  ["ordinal", {"font-variant-numeric": "ordinal"}],
  ["slashed-zero", {"font-variant-numeric": "slashed-zero"}],
  ["lining-nums", {"font-variant-numeric": "lining-nums"}],
  ["oldstyle-nums", {"font-variant-numeric": "oldstyle-nums"}],
  ["proportional-nums", {"font-variant-numeric": "proportional-nums"}],
  ["tabular-nums", {"font-variant-numeric": "tabular-nums"}],
  ["diagonal-fractions", {"font-variant-numeric": "diagonal-fractions"}],
  ["stacked-fractions", {"font-variant-numeric": "stacked-fractions"}],

  ["tracking-tighter",  {"letter-spacing": "-0.05em"}],
  ["tracking-tight",  {"letter-spacing": "-0.025em"}],
  ["tracking-normal", {"letter-spacing": "0em"}],
  ["tracking-wide", {"letter-spacing": "0.025em"}],
  ["tracking-wider",  {"letter-spacing": "0.05em"}],
  ["tracking-widest", {"letter-spacing": "0.1em"}],

  ["leading-3", {"line-height": ".75rem"}],
  ["leading-4", {"line-height": "1rem"}],
  ["leading-5", {"line-height": "1.25rem"}],
  ["leading-6", {"line-height": "1.5rem"}],
  ["leading-7", {"line-height": "1.75rem"}],
  ["leading-8", {"line-height": "2rem"}],
  ["leading-9", {"line-height": "2.25rem"}],
  ["leading-10", {"line-height": "2.5rem"}],
  ["leading-none", {"line-height": "1"}],
  ["leading-tight", {"line-height": "1.25"}],
  ["leading-snug", {"line-height": "1.375"}],
  ["leading-normal", {"line-height": "1.5"}],
  ["leading-relaxed", {"line-height": "1.625"}],
  ["leading-loose", {"line-height": "2"}],

  ["list-none", {"list-style-type": "none"}],
  ["list-disc", {"list-style-type": "disc"}],
  ["list-decimal", {"list-style-type": "decimal"}],

  ["list-inside", {"list-style-position": "inside"}],
  ["list-outside", {"list-style-position": "outside"}],

  ["placeholder-transparent", {"color": "transparent", "_pelem": "placeholder"}],
  ["placeholder-current", {"color": "currentColor", "_pelem": "placeholder"}],
  ["placeholder-red-100", {"--tw-placeholder-opacity": "1", "_pelem": "placeholder", 
    "color": "rgba(254,226,226,var(--tw-placeholder-opacity))"}],

  ["placeholder-opacity-0", {"--tw-placeholder-opacity": "0"}],
  ["placeholder-opacity-5", {"--tw-placeholder-opacity": "0.05"}],
  ["placeholder-opacity-10",  {"--tw-placeholder-opacity": "0.1"}],

  ["text-left", {"text-align": "left"}],
  ["text-center", {"text-align": "center"}],
  ["text-right",  {"text-align": "right"}],
  ["text-justify",  {"text-align": "justify"}],

  ["text-transparent", {"color": "transparent"}],
  ["text-current", {"color": "currentColor"}],
  ["text-purple-900", {"--tw-text-opacity": "1", "color": "rgba(76,29,149,var(--tw-text-opacity))"}],

  ["text-opacity-0", {"--tw-text-opacity": "0"}],
  ["text-opacity-5", {"--tw-text-opacity": "0.05"}],
  ["text-opacity-10",  {"--tw-text-opacity": "0.1"}],

  ["underline", {"text-decoration": "underline"}],
  ["line-through", {"text-decoration": "line-through"}],
  ["no-underline",  {"text-decoration": "none"}],

  ["uppercase", {"text-transform": "uppercase"}],
  ["lowercase", {"text-transform": "lowercase"}],
  ["capitalize", {"text-transform": "capitalize"}],
  ["normal-case", {"text-transform": "none"}],

  ["truncate", {"overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap"}],
  ["overflow-ellipsis", {"text-overflow": "ellipsis"}],
  ["overflow-clip", {"text-overflow": "clip"}],

  ["align-baseline", {"vertical-align": "baseline"}],
  ["align-top", {"vertical-align": "top"}],
  ["align-middle", {"vertical-align": "middle"}],
  ["align-bottom", {"vertical-align": "bottom"}],
  ["align-text-top", {"vertical-align": "text-top"}],
  ["align-text-bottom", {"vertical-align": "text-bottom"}],

  ["whitespace-normal", {"white-space": "normal"}],
  ["whitespace-nowrap", {"white-space": "nowrap"}],
  ["whitespace-pre",  {"white-space": "pre"}],
  ["whitespace-pre-line", {"white-space": "pre-line"}],
  ["whitespace-pre-wrap", {"white-space": "pre-wrap"}],

  ["break-normal", {"overflow-wrap": "normal", "word-break": "normal"}],
  ["break-words", {"overflow-wrap": "break-word"}],
  ["break-all", {"word-break": "break-all"}],

  ["bg-fixed", {"background-attachment": "fixed"}],
  ["bg-local", {"background-attachment": "local"}],
  ["bg-scroll", {"background-attachment": "scroll"}],

  ["bg-clip-border", {"background-clip": "border-box"}],
  ["bg-clip-padding", {"background-clip": "padding-box"}],
  ["bg-clip-content", {"background-clip": "content-box"}],
  ["bg-clip-text", {"background-clip": "text"}],

  ["bg-transparent", {"background-color": "transparent"}],
  ["bg-current", {"background-color": "currentColor"}],
  ["bg-yellow-200", {"--tw-bg-opacity": "1", "background-color": "rgba(253,230,138,var(--tw-bg-opacity))"}],

  ["bg-opacity-0", {"--tw-bg-opacity": "0"}],
  ["bg-opacity-5", {"--tw-bg-opacity": "0.05"}],
  ["bg-opacity-20",  {"--tw-bg-opacity": "0.2"}],

  ["bg-origin-border", {"background-origin": "border-box"}],
  ["bg-origin-padding", {"background-origin": "padding-box"}],
  ["bg-origin-content", {"background-origin": "content-box"}],

  ["bg-bottom", {"background-position": "bottom"}],
  ["bg-center", {"background-position": "center"}],
  ["bg-left", {"background-position": "left"}],
  ["bg-left-bottom", {"background-position": "left bottom"}],
  ["bg-left-top", {"background-position": "left top"}],
  ["bg-right", {"background-position": "right"}],
  ["bg-right-bottom", {"background-position": "right bottom"}],
  ["bg-right-top", {"background-position": "right top"}],
  ["bg-top", {"background-position": "top"}],

  ["bg-repeat", {"background-repeat": "repeat"}],
  ["bg-no-repeat", {"background-repeat": "no-repeat"}],
  ["bg-repeat-x", {"background-repeat": "repeat-x"}],
  ["bg-repeat-y", {"background-repeat": "repeat-y"}],
  ["bg-repeat-round", {"background-repeat": "round"}],
  ["bg-repeat-space", {"background-repeat": "space"}],

  ["bg-auto", {"background-size": "auto"}],
  ["bg-cover", {"background-size": "cover"}],
  ["bg-contain", {"background-size": "contain"}],

  ["bg-none", {"background-image": "none"}],
  ["bg-gradient-to-t", {"background-image": "linear-gradient(to top, var(--tw-gradient-stops))"}],
  ["bg-gradient-to-tr", {"background-image": "linear-gradient(to top right, var(--tw-gradient-stops))"}],
  ["bg-gradient-to-r", {"background-image": "linear-gradient(to right, var(--tw-gradient-stops))"}],
  ["bg-gradient-to-br", {"background-image": "linear-gradient(to bottom right, var(--tw-gradient-stops))"}],
  ["bg-gradient-to-b", {"background-image": "linear-gradient(to bottom, var(--tw-gradient-stops))"}],
  ["bg-gradient-to-bl", {"background-image": "linear-gradient(to bottom left, var(--tw-gradient-stops))"}],
  ["bg-gradient-to-l", {"background-image": "linear-gradient(to left, var(--tw-gradient-stops))"}],
  ["bg-gradient-to-tl", {"background-image": "linear-gradient(to top left, var(--tw-gradient-stops))"}],

  ["from-transparent", {"--tw-gradient-from": "transparent",
      "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to, rgba(0,0,0,0))"}],
  ["from-current", {"--tw-gradient-from": "currentColor",
      "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to, rgba(255,255,255,0))"}],
  ["from-black", {"--tw-gradient-from": "#000000",
      "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to, rgba(0,0,0,0))"}], 
  ["from-white", {"--tw-gradient-from": "#ffffff",
      "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to, rgba(255,255,255,0))"}], 
  ["from-gray-300", {"--tw-gradient-from": "#D1D5DB",
    "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to, rgba(209,213,219,0))"}],

  ["via-transparent", {"--tw-gradient-stops": "var(--tw-gradient-from), transparent, var(--tw-gradient-to, rgba(0,0,0,0))"}],
  ["via-current", {"--tw-gradient-stops": "var(--tw-gradient-from), currentColor, var(--tw-gradient-to, rgba(255,255,255,0))"}],
  ["via-black", {"--tw-gradient-stops": "var(--tw-gradient-from), #000000, var(--tw-gradient-to, rgba(0,0,0,0))"}],
  ["via-white", {"--tw-gradient-stops": "var(--tw-gradient-from), #ffffff, var(--tw-gradient-to, rgba(255,255,255,0))"}],
  ["via-purple-50", {"--tw-gradient-stops": "var(--tw-gradient-from), #F5F3FF, var(--tw-gradient-to, rgba(245,243,255,0))"}],

  ["to-transparent", {"--tw-gradient-to": "transparent"}],  
  ["to-current",  {"--tw-gradient-to": "currentColor"}], 
  ["to-black", {"--tw-gradient-to": "#000000"}], 
  ["to-white", {"--tw-gradient-to": "#ffffff"}],
  ["to-gray-50", {"--tw-gradient-to": "#F9FAFB"}],

  ["rounded-none", {"border-radius": "0px"}],
  ["rounded-sm", {"border-radius": "0.125rem"}],
  ["rounded", {"border-radius": "0.25rem"}],
  ["rounded-md", {"border-radius": "0.375rem"}],
  ["rounded-lg", {"border-radius": "0.5rem"}],
  ["rounded-xl", {"border-radius": "0.75rem"}],
  ["rounded-2xl", {"border-radius": "1rem"}],
  ["rounded-3xl", {"border-radius": "1.5rem"}],
  ["rounded-full", {"border-radius": "9999px"}],
  ["rounded-t-lg", {"border-top-left-radius": "0.5rem", "border-top-right-radius": "0.5rem"}],
  ["rounded-r-sm", {"border-top-right-radius": "0.125rem", "border-bottom-right-radius": "0.125rem"}],
  ["rounded-b-full", {"border-bottom-right-radius": "9999px", "border-bottom-left-radius": "9999px"}],
  ["rounded-l-2xl", {"border-top-left-radius": "1rem", "border-bottom-left-radius": "1rem"}],
  ["rounded-tl-md", {"border-top-left-radius": "0.375rem"}],
  ["rounded-tr-md", {"border-top-right-radius": "0.375rem"}],
  ["rounded-bl-md", {"border-bottom-left-radius": "0.375rem"}],
  ["rounded-br-md", {"border-bottom-right-radius": "0.375rem"}],

  ["border-0", {"border-width": "0px"}],
  ["border-2", {"border-width": "2px"}],
  ["border-4", {"border-width": "4px"}],
  ["border-8", {"border-width": "8px"}],
  ["border", {"border-width": "1px"}],
  ["border-t-4", {"border-top-width": "4px"}],
  ["border-b", {"border-bottom-width": "1px"}],
  ["border-l-0", {"border-left-width": "0px"}],
  ["border-r-8", {"border-right-width": "8px"}],

  ["border-transparent", {"border-color": "transparent"}],
  ["border-current", {"border-color": "currentColor"}],
  ["border-purple-900", {"--tw-border-opacity": "1", "border-color": "rgba(76,29,149,var(--tw-border-opacity))"}],
  ["border-black", {"--tw-border-opacity": "1", "border-color": "rgba(0,0,0,var(--tw-border-opacity))"}],
  ["border-white", {"--tw-border-opacity": "1", "border-color": "rgba(255,255,255,var(--tw-border-opacity))"}],

  ["border-opacity-0", {"--tw-border-opacity": "0"}],
  ["border-opacity-5", {"--tw-border-opacity": "0.05"}],
  ["border-opacity-100",  {"--tw-border-opacity": "1"}],

  ["border-solid", {"border-style": "solid"}],
  ["border-dashed", {"border-style": "dashed"}],
  ["border-dotted", {"border-style": "dotted"}],
  ["border-double", {"border-style": "double"}],
  ["border-none", {"border-style": "none"}],

  ["divide-x", {"--tw-divide-x-reverse": "0",
    "border-right-width": "calc(1px * var(--tw-divide-x-reverse))", 
    "border-left-width": "calc(1px * calc(1 - var(--tw-divide-x-reverse)))"}],
  ["divide-x-0", {"--tw-divide-x-reverse": "0",
    "border-right-width": "calc(0px * var(--tw-divide-x-reverse))", 
    "border-left-width": "calc(0px * calc(1 - var(--tw-divide-x-reverse)))"}],
  ["divide-x-2", {"--tw-divide-x-reverse": "0",
    "border-right-width": "calc(2px * var(--tw-divide-x-reverse))", 
    "border-left-width": "calc(2px * calc(1 - var(--tw-divide-x-reverse)))"}],
  ["divide-x-4", {"--tw-divide-x-reverse": "0",
    "border-right-width": "calc(4px * var(--tw-divide-x-reverse))", 
    "border-left-width": "calc(4px * calc(1 - var(--tw-divide-x-reverse)))"}],

  ["divide-y", {"--tw-divide-y-reverse": "0",
    "border-bottom-width": "calc(1px * var(--tw-divide-y-reverse))", 
    "border-top-width": "calc(1px * calc(1 - var(--tw-divide-y-reverse)))"}],
  ["divide-y-0", {"--tw-divide-y-reverse": "0",
    "border-bottom-width": "calc(0px * var(--tw-divide-y-reverse))", 
    "border-top-width": "calc(0px * calc(1 - var(--tw-divide-y-reverse)))"}],
  ["divide-y-2", {"--tw-divide-y-reverse": "0",
    "border-bottom-width": "calc(2px * var(--tw-divide-y-reverse))", 
    "border-top-width": "calc(2px * calc(1 - var(--tw-divide-y-reverse)))"}],
  ["divide-y-4", {"--tw-divide-y-reverse": "0",
    "border-bottom-width": "calc(4px * var(--tw-divide-y-reverse))", 
    "border-top-width": "calc(4px * calc(1 - var(--tw-divide-y-reverse)))"}],

  ["divide-transparent", {"border-color": "transparent"}],
  ["divide-current", {"border-color": "currentColor"}],
  ["divide-purple-900", {"--tw-divide-opacity": "1", "border-color": "rgba(76,29,149,var(--tw-divide-opacity))"}],
  ["divide-black", {"--tw-divide-opacity": "1", "border-color": "rgba(0,0,0,var(--tw-divide-opacity))"}],
  ["divide-white", {"--tw-divide-opacity": "1", "border-color": "rgba(255,255,255,var(--tw-divide-opacity))"}],

  ["divide-opacity-0", {"--tw-divide-opacity": "0"}],
  ["divide-opacity-5", {"--tw-divide-opacity": "0.05"}],
  ["divide-opacity-100", {"--tw-divide-opacity": "1"}],

  ["divide-solid", {"border-style": "solid"}],
  ["divide-dashed", {"border-style": "dashed"}],
  ["divide-dotted", {"border-style": "dotted"}],
  ["divide-double", {"border-style": "double"}],
  ["divide-none", {"border-style": "none"}],

  ["xxxx", false],
  ["", false],
  ["-", false],
  ["!", false],
];

var ntests = tests.length;
for (var i=0; i<ntests;i++) {
  var t = tests[i];
  var n = compile(t[0]);
  var expected = t[1];
  var got = n.props;

  if (!expected) {
    if (expected !== n) {
      console.log("Test Failed!!! - " + t[0]);
      console.log(n);
      continue;
    }
  }

  if (!n && expected) {
    console.log("Test Failed!!! - " + t[0]);
    console.log(n);
    continue;
  }

  for (const [key, value] of Object.entries(expected)) {
    if (key.startsWith("_")) {
      var key2 = key.substring(1);
      if (n[key2] != value) {
        console.log("Test Failed!!! - " + t[0]);
        console.log(n);
      }
    }
    else if (got[key] != value) {
      console.log("Test Failed!!! - " + t[0]);
      console.log(got);
    }
  }
}

console.log(`Processed ${ntests} tests`);
