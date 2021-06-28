(function () {
  'use strict';

  /*
   * Lookups
   */

  var L_screens = null;

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

  const L_spacing = {
    '0.5': '0.125','1': '0.25','1.5': '0.375','2': '0.5','2.5': '0.625',
    '3': '0.75', '3.5': '0.875', '4': '1','5': '1.25','6': '1.5','7': '1.75','8': '2','9': '2.25',
    '10': '2.5','11': '2.75','12': '3','14': '3.5','16': '4','20': '5','24': '6','28': '7','32': '8',
    '36': '9','40': '10','44': '11','48': '12','52': '13','56': '14','60': '15','64': '16','72': '18',
    '80': '20','96': '24',
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

  const L_backgroundGradient = {
    "t": "top", "tr": "top right", "r": "right", "br": "bottom right", 
    "b": "bottom", "bl": "bottom left", "l": "left", "tl": "top left"
  };

  const L_flexContent = {
    "center": "center", "start": "flex-start", "end": "flex-end", "between": "space-between",
    "around":  "space-around", "evenly":  "space-evenly", "stretch": "stretch"
  };

  const L_widthHeight = {
    "screen": "100vh",
    "min": "min-content",
    "max": "max-content",
  };

  const L_maxWidth = {
    "0":"0", "xs":"20", "sm":"24", "md":"28", "lg":"32", "xl":"36", "2xl":"42",
    "3xl":"48", "4xl":"56", "5xl":"64", "6xl":"72", "7xl":"80"
  };

  const L_transition = {
    "none": "none",
    "all": "all",
    "": "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
    "colors": "background-color, border-color, color, fill, stroke",
    "opacity": "opacity",
    "shadow" : "box-shadow",
    "transform": "transform",
  };

  const L_boxShadow = {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    "none": "0 0 #0000"
  };

  const L_animation = {
    "none": "none",
    "spin": "spin 1s linear infinite",
    "ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    "bounce": "bounce 1s infinite"
  };

  const L_fontFamily = {
    "sans": 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    "serif": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    "mono": 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  };

  const L_fontWeight = {
    "thin": "100", "extralight": "200", "light": "300", "normal": "400",
    "medium": "500", "semibold": "600", "bold": "700", "extrabold": "800", "black": "900"
  };

  const L_fontSize = {
    "xs": ["0.75", "1rem"], "sm": ["0.875", "1.25rem"], "base": ["1", "1.5rem"],
    "lg": ["1.125", "1.75rem"], "xl": ["1.25", "1.75rem"], "2xl": ["1.5", "2rem"],
    "3xl": ["1.875", "2.25rem"], "4xl": ["2.25", "2.5rem"], "5xl": ["3", "1"],
    "6xl": ["3.75", "1"], "7xl": ["4.5", "1"], "8xl": ["6", "1"],"9xl": ["8", "1"]
  };

  const L_borderRadius = {
    "none": "0px", "sm": "0.125rem", "": "0.25rem", "md": "0.375rem", "lg": "0.5rem",
    "xl": "0.75rem", "2xl": "1rem", "3xl": "1.5rem", "full": "9999px"
  };

  const L_letterSpacing = {
    "tighter": "-0.05", "tight": "-0.025", "normal": "0",
    "wide": "0.025", "wider": "0.05", "widest": "0.1"
  };

  const L_lineHeight = {
    "3": ".75rem", "4": "1rem", "5": "1.25rem", "6": "1.5rem", "7": "1.75rem", "8": "2rem",
    "9": "2.25rem", "10": "2.5rem", "none": "1", "tight": "1.25", "snug": "1.375",
    "normal": "1.5", "relaxed": "1.625", "loose": "2"
  };

  const L_dropShadow = {
    "sm" : "(0 1px 1px rgba(0,0,0,0.05))",
    "": "(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06))",
    "md": "(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06))",
    "lg": "(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1))",
    "xl": "(0 20px 13px rgba(0, 0, 0, 0.03)) drop-shadow(0 8px 5px rgba(0, 0, 0, 0.08))",
    "2xl": "(0 25px 25px rgba(0, 0, 0, 0.15))",
    "none": "(0 0 #0000)"
  };

  const L_backgroundAttachment = ['fixed','local','scroll'];

  const L_backgroundPosition = ['bottom','center','left','right','top'];

  const L_backgroundSize = ['auto', 'cover', 'contain'];

  const L_backgroundClip = {
    "border":"border-box",
    "padding":"padding-box",
    "content":"content-box",
    "text": "text"
  };

  const L_blur = {
    "none": "0", "sm": "4px", "": "8px", "md": "12px", "lg": "16px",
    "xl": "24px", "2xl": "40px","3xl": "64px"
  };

  const L_borderWidth = { "t": "top", "r": "right", "b": "bottom", "l": "left" };

  const L_resize = { "none": "none", "y": "vertical", "x": "horizontal" };

  const L_ease = { "linear": "linear", "in": "cubic-bezier(0.4, 0, 1, 1)",
    "out": "cubic-bezier(0, 0, 0.2, 1)", "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
  };

  /*
   * Utility Helpers
   */
  var H_comp = (s, i) => parseInt(s.substring(i, i+2), 16) + ",";

  var H_hexColor = (v) => {
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

  var H_transCurr = (v) => {
    if (v == "transparent") return v
    if (v == "current") return "currentColor"
    return false
  };

  var H_color = (v, o, h) => {
    if (!o) o = 1;
    var c = H_hexColor(v);
    if (h) {
      if (c) return "#" + c
      if (H_transCurr(v)) return H_transCurr(v)
    }
    else if (c) return "rgba(" + H_comp(c, 0) + H_comp(c, 2) + H_comp(c, 4) + o + ")"
  };

  var H_isColor = (v) => L_color[v] || v == "black" || v == "white" || v == "transparent" || v == "current";

  var H_colorUtil = (col, prop, name) => {
    var tc = H_transCurr(col);
    if (tc) return {[prop]: tc}
    return {[prop]: H_color(col, "var(--tw-" + name + "-opacity)"), ["--tw-"+ name +"-opacity"]: "1"}
  };  

  var H_percent = (v, n) => {
    if (v == "full") return n.minus + "100%"
    if (v.indexOf("/") > -1) {
      var p = v.split("/");
      return n.minus + (parseInt(p[0]) / parseInt(p[1])) * 100 + "%"
    }
  };

  var H_spacing = (v, n) => {
    if (v == "0" || v == "auto") return v
    if (v == "px") return n.minus + "1px"
    v = L_spacing[v];
    if (v) v = n.minus + v +"rem";
    return v
  };

  var H_spacingPercent = (v, n) => {
    var r = H_spacing(v, n);
    if (!r) r = H_percent(v, n);
    return r
  };

  var H_float = (v) => (parseInt(v)/100).toString();

  var H_args = (p, f, d) => p.slice(f).join(d ? d : '-');

  var H_transform = (d) => {
    d.transform = "var(--tw-transform)";
    return d
  };

  var H_filter = (t, d) => {
    if (t == "backdrop") d["backdrop-filter"] = "var(--tw-backdrop-filter)";
    else d.filter = "var(--tw-filter)";
    return d 
  };


  /* 
   * Utilities
   */
  var U_boxDecorationBreak = (p) => ({"box-decoration-break": p[1], "-webkit-box-decoration-break": p[1]});

  var U_boxSizing = (p) => ({"box-sizing": p[1]+"-box"});

  var U_display = (p) => ({display: p[0] == "hidden" ? "none" : H_args(p, 0)});

  var U_visibility = (p) => ({visibility: p[0] == "visible" ? p[0] : "hidden"});

  var U_position = (p) => ({position: p[0]});

  var U_zindex = (p) => ({"z-index": p[1]});

  var U_clearFloat = (p) => ({[p[0]]: p[1]});

  var U_isolation = (p) => ({isolation: p[1] ? "auto" : "isolate"});

  var U_objectFitPosition = (p) => {
    if (L_objectFit.includes(p[1]))  return {"object-fit": H_args(p, 1)}
    return {"object-position": H_args(p, 1, " ")}
  };

  var U_overScrollFlow = (p) => {
    var n = p[0] == "overflow" ? p[0] : p[0] + "-behavior";
    if (p.length == 2) return {[n]: p[1]}
    return {[n + "-" + p[1]]: p[2]}  
  };

  var U_inset = (p, n) => {
    var v = p.length == 2 ? H_spacingPercent(p[1], n) : H_spacingPercent(p[2], n);
    if (p.length == 2) return {"top": v, "bottom": v, "right": v, "left": v}
    if (p[1] == "x") return {"right": v, "left": v}
    return {"top": v, "bottom": v}  
  };

  var U_flexDirection = (p) => {
    if (p[1] == "col") p[1] = "column";
    return {"flex-direction": H_args(p, 1)}
  };

  var U_flexWrap = (p) => ({"flex-wrap": H_args(p, 1)});

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
    return {"grid-auto-flow": H_args(p, 2, ' ')}
  };

  var U_gridAuto = (p) => {
    if (p[1] == "cols") p[1] = "columns";
    return {["grid-auto-" + p[1]]: L_gridAuto[p[2]]}
  };

  var U_gap = (p, n) => {
    var v, prop;
    if (p.length == 2) {
      prop = "gap";
      v = H_spacing(p[1], n);
    }
    else {
      v = H_spacing(p[2], n);
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
      ["margin-" + (p[1] == 'x' ? "right" : "bottom")] : "calc(" + H_spacing(p[2], n) + " * var(--tw-space-" + p[1] + "-reverse))",
      ["margin-" + (p[1] == 'x' ? "left" : "top")]: "calc(" + H_spacing(p[2], n) + " * calc(1 - var(--tw-space-" + p[1] + "-reverse)))"
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
    if (H_isColor(p[1])) return H_colorUtil(H_args(p, 1), "border-color", "divide")
    return {"border-style": p[1]}
  };

  var U_backgroundOrigin = (p) => ({"background-origin": p[2] + "-box"});

  var U_background = (p, n) => {
    var p1 = p[1];
    if (p1 == "no" && p[2] == "repeat") return {"background-repeat": "no-repeat"}
    if (p1 == "none") return {"background-image": "none"}
    if (L_backgroundAttachment.includes(p1)) return {"background-attachment": p1}
    if (L_backgroundPosition.includes(p1)) return {"background-position": H_args(p, 1, ' ')}
    if (L_backgroundSize.includes(p1)) return {"background-size": p1}
    return H_colorUtil(H_args(p, 1), "background-color", "bg")
  };

  var U_backgroundGradient = (p, n) => ({"background-image": "linear-gradient(to " + 
                          L_backgroundGradient[p[3]] + ", var(--tw-gradient-stops))"});

  var U_backgroundRepeat = (p, n) => {
    var prop = "background-repeat";
    if (p[2] == "round" || p[2] == "space") return {[prop]: p[2]}
    return {[prop]: H_args(p, 1)}
  };

  var U_backgroundClip = (p, n) => ({"background-clip":L_backgroundClip[p[2]]});

  var U_padding = (p, n) => ({"padding":H_spacing(p[1], n)});

  var U_paddingX = (p, n) => ({"padding-left":H_spacing(p[1], n), "padding-right":H_spacing(p[1], n)});

  var U_paddingY = (p, n) => ({"padding-top":H_spacing(p[1], n), "padding-bottom":H_spacing(p[1], n)});

  var U_paddingT = (p, n) => ({"padding-top":H_spacing(p[1], n)});

  var U_paddingB = (p, n) => ({"padding-bottom":H_spacing(p[1], n)});

  var U_paddingL = (p, n) => ({"padding-left":H_spacing(p[1], n)});

  var U_paddingR = (p, n) => ({"padding-right":H_spacing(p[1], n)});

  var U_margin = (p, n) => ({"margin":H_spacing(p[1], n)});

  var U_marginX = (p, n) => ({"margin-left":H_spacing(p[1], n), "margin-right":H_spacing(p[1], n)});

  var U_marginY = (p, n) => ({"margin-top":H_spacing(p[1], n), "margin-bottom":H_spacing(p[1], n)});

  var U_marginT = (p, n) => ({"margin-top":H_spacing(p[1], n)});

  var U_marginB = (p, n) => ({"margin-bottom":H_spacing(p[1], n)});

  var U_marginL = (p, n) => ({"margin-left":H_spacing(p[1], n)});

  var U_marginR = (p, n) => ({"margin-right":H_spacing(p[1], n)});

  var U_colorOpacity = (p, n) =>  {
    n.priority++;
    return {["--tw-" + p[0] + "-opacity"]:H_float(p[2])}
  };

  var U_from = (p, n) => {
    var to = H_args(p, 1);
    if (p[1] == "transparent") to = "black";
    else if (p[1] == "current") to = "white";
    return {"--tw-gradient-from": H_color(H_args(p, 1), 1, true),
      "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to, " + H_color(to, "0") +")"}
  };

  var U_to = (p, n) => ({"--tw-gradient-to": H_color(H_args(p, 1), 1, true)});

  var U_via = (p, n) => {
    var to = H_args(p, 1);
    if (p[1] == "transparent") to = "black";
    else if (p[1] == "current") to = "white";
    return {"--tw-gradient-stops": "var(--tw-gradient-from), " +  H_color(H_args(p, 1), 1, true) +  ", var(--tw-gradient-to, " + H_color(to, "0")  + ")"}
  };

  var U_inline = (p, n) => ({"display":H_args(p, 0)});

  var U_gridSpan = (p, n) => {
    if (p[0] == "col") p[0] = "column";
    var r = p[2] == "full" ? "1 / -1" : "span " + p[2] + " / " + "span " + p[2];
    if (p[1] == "auto") r = "auto";
    return {["grid-" + p[0]]: r}
  };

  var U_maxWidth = (p) => {
    var s = p[2];
    var v = L_maxWidth[s];
    if (v) v += "rem";
    else if (s == "none") v = "none";
    else if (s == "prose") v = "65ch";
    else if (s == "full") v = "100%";
    else {
      v = L_screens[p[3]];
      if (!v) v = L_widthHeight[s];
    }
    return {"max-width": v}
  };

  var U_maxHeight = (p, n) => { 
    var r = H_spacingPercent(p[2], n);
    if (!r) r = L_widthHeight[p[2]];
    return {"max-height": r}
  };

  var U_widthHeight = (p, n) => {
    var prop = p[0] == "w" ? "width" : "height"; 
    var r = H_spacingPercent(p[1], n);
    if (!r) r = L_widthHeight[p[1]];
    if (p[0] == "w" && p[1] == "screen") r = "100vw";
    return {[prop]: r}
  };

  var U_minWidthHeight = (p, n) => {
    var prop = p[1] == "w" ? "min-width" : "min-height"; 
    var r = L_widthHeight[p[2]];
    if (!r) {
      r = H_spacingPercent(p[2], n);
      if (!r) r = L_widthHeight[p[2], n];
    }
    return {[prop]: r}
  };

  var U_fillStroke = (p) => ({[p[0]]: "currentColor"});  

  var U_strokeWidth = (p) => ({"stroke-width": p[1]}); 

  var U_screenReaders = (p) => {
    if (p[0] == "sr") return {"position": "absolute", "width": "1px", "height": "1px", "padding": "0",
    "margin": "-1px", "overflow": "hidden", "clip": "rect(0, 0, 0, 0)", "white-space": "nowrap", "border-width": "0"}
    return {"position": "static", "width": "auto", "height": "auto", "padding": "0", "margin": "0",
    "overflow": "visible", "clip": "auto", "white-space": "normal"}
  };

  var U_blur = (p) => {
    var t = "", s = 1;
    if (p[0] =="backdrop") {t = "-backdrop"; s = 2;}
    return H_filter(p[0], {["--tw" + t + "-blur"]: "blur(" + L_blur[p[s] ? p[s] : ""] + ")"})
  };

  var U_filterFloat = (p) => {
    var t = "", s = 1;
    if (p[0] =="backdrop") {t = "-backdrop"; s = 2;}
    return H_filter(p[0], {["--tw" + t + "-" + p[s-1]]: p[s-1] + "(" + H_float(p[s]) + ")"})
  };  

  var U_dropShadow = (p) => H_filter(p[0], {"--tw-drop-shadow": "drop-shadow" + L_dropShadow[p[2] ? p[2] : ""]});  

  var U_grayscaleInvertSepia = (p) => {
    var t = "", s = 1;
    if (p[0] =="backdrop") {t = "-backdrop"; s = 2;}
    return H_filter(p[0], {["--tw" + t + "-" + p[s-1]]: p[s-1] + "(" + (p[s] ? "0" : "1") + ")"})
  }; 

  var U_hueRotate = (p, n) => {
    var t = "", s = 2;
    if (p[0] =="backdrop") {t = "-backdrop"; s = 3;}
    return H_filter(p[0], {["--tw" + t + "-hue-rotate"]: "hue-rotate("+ n.minus + p[s] + "deg)"})
  };

  var U_placeHolderColor = (p, n) => {
    n.pelem = "placeholder";
    return H_colorUtil(H_args(p, 1), "color", "placeholder")
  };

  var U_placeHolderOpacity = (p, n) => {
    n.pelem = "placeholder";
    return U_colorOpacity(p, n)
  };

  var U_fontVariantNumeric = (p) => ({"font-variant-numeric": p[0] == "normal" ? "normal" : H_args(p,0)}); 

  var U_topRightBottomLeft = (p, n) => ({[p[0]]: H_spacingPercent(p[1], n)});

  var U_textDecoration = (p) => ({"text-decoration":  p[0] =="no" ? "none" : H_args(p, 0)});

  var U_textTransform = (p) => ({"text-transform":  p[0] =="normal" ? "none" : p[0]});

  var U_textOverFlow = (p) => {
    var prop = "text-overflow";
    if (p[0] == "truncate") return {"overflow": "hidden", [prop]: "ellipsis", "white-space": "nowrap"}
    if (p[1] == "clip") return {[prop]: "clip"}
    return {[prop]: "ellipsis"}
  };

  var U_verticalAlign = (p) => ({"vertical-align": H_args(p, 1)});

  var U_whitespace = (p) => ({"white-space": H_args(p, 1)});

  var U_wordBreak = (p) => {
    if (p[1] == "normal") return {"overflow-wrap": "normal", "word-break": "normal"}
    if (p[1] == "words") return {"overflow-wrap": "break-word"}
    return {"word-break": "break-all"}
  };

  var U_text = (p) => {
    if (H_isColor(p[1])) return H_colorUtil(H_args(p, 1), "color", "text")
    var v = L_fontSize[p[1]];
    if (v) return {"font-size": v[0]+"rem", "line-height": v[1]}
    return {"text-align": p[1]}
  };

  var U_listTypePosition = (p) => {
    if (p[1] =="inside" || p[1] == "outside") return {"list-style-position": p[1]}
    return {"list-style-type": p[1]}
  };

  var U_flexContent = (p, n) => {
    var prop = "align-content", s=1;
    if (p[0] == "justify") prop = "justify-content";
    else if (p[0] == "place") {
      prop = "place-content";
      if (p[2] == "start" || p[2] == "end") return {[prop]: p[2]} 
      s = 2;
    }
    return {[prop]: L_flexContent[p[s]]}
  };

  var U_justifyPlaceSelfItems = (p, n) => ({[p[0] + "-" + p[1]]: p[2]});

  var U_alignSelfItems = (p, n) => {
    var v = p[1];
    if (p[1] == "start") v = "flex-start";
    else if (p[1] == "end") v = "flex-end";
    return {["align-"+p[0]]: v}
  };

  var U_table = (p, n) => {
    if (p[1] == "auto" || p[1] == "fixed") return {"table-layout": p[1]}
    return {"display":H_args(p, 0)}
  };

  var U_gridStartEnd = (p, n) => {
    if (p[0] == "col") p[0] = "column";
    return {["grid-" + p[0] + "-" + p[1]]: p[2]}
  };

  var U_appearance = (p) => ({[p[0]]: p[1]});

  var U_cursor = (p) => ({[p[0]]: H_args(p, 1)});

  var U_outline = (p) => {
    var o = "2px solid transparent";
    if (p[1] == "white") o = "2px dotted white";
    if (p[1] == "black") o = "2px dotted black";
    return {"outline": o, "outline-offset": "2px"}
  };

  var U_pointerEvents = (p) => ({"pointer-events": p[2]});

  var U_resize = (p) => {
    if (p.length == 1) return {[p[0]]: "both"}
    return {[p[0]]: L_resize[p[1]]}
  };
  var U_userSelect = (p) => ({"user-select": p[1]});

  var U_transformGpu = (p) => ({"--tw-transform": "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"});



  var U_transformOrigin = (p) => ({"transform-origin": H_args(p, 1, ' ')});

  var U_scale = (p) => {
    var v;
    if (p[1] == "x") {
      v = H_float(p[2]);
      return H_transform({"--tw-scale-x": v})
    } 
    else if (p[1] == "y") {
      v = H_float(p[2]);
      return H_transform({"--tw-scale-y": v})
    }
    else {
      v = H_float(p[1]);
      return H_transform({"--tw-scale-x": v, "--tw-scale-y": v})
    }
  };

  var U_rotate = (p, n) => H_transform({"--tw-rotate": n.minus + p[1] + "deg"});

  var U_translate = (p, n) => H_transform({["--tw-translate-"+p[1]]: H_spacingPercent(p[2], n)});

  var U_skew = (p, n) => H_transform({["--tw-skew-"+p[1]]: n.minus + p[2] + "deg"});

  var U_transition = (p) => ({"transition-property": L_transition[p[1] ? p[1] : ""], 
  "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)","transition-duration": "150ms"});

  var U_delayDuration = (p) => ({["transition-" + p[0]]: p[1] + "ms"});

  var U_ease = (p) => ({"transition-timing-function": L_ease[H_args(p, 1)]});

  var U_borderCollapse = (p) => ({"border-collapse": p[1]});

  var U_blendMode = (p) => {
    if (p[0] == "bg") p[0] = "background"; 
    return {[p[0]+"-blend-mode"]: H_args(p, 2)}
  };

  var U_opacity = (p) =>  ({"opacity":H_float(p[1])});

  var U_boxShadow = (p) => ({"--tw-shadow": L_boxShadow[p[1] ? p[1] : ""], 
    "box-shadow": "var(--tw-ring-offset-shadow,0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)"});

  var U_ring = (p) => {
    if (p[1] == "inset") return {"--tw-ring-inset": "inset"}
    if (!H_isColor(p[1])) {
      var v = p[1] ? p[1] : "3";
      return {"--tw-ring-shadow": "var(--tw-ring-inset) 0 0 0 calc(" + v + "px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
      "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
      "box-shadow": "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)"}
    }
    return H_colorUtil(H_args(p, 1), "--tw-ring-color", "ring")
  };

  var U_ringOffset = (p) => {
    if (!H_isColor(p[2])) return {"--tw-ring-offset-width": p[2] + "px"}
    return {"--tw-ring-offset-color": H_color(H_args(p, 2), "", true)}
  };

  var U_borderRadius = (p) => {
    var v = L_borderRadius[p[1] ? p[1] : ""];
    if (v) return {"border-radius": v}
    v = L_borderRadius[p[2] ? p[2] : ""]; 
    var d = p[1], props = {};
    if (d == "t" || d == "l" || d == "tl") props["border-top-left-radius"] = v;
    if (d == "t" || d == "r" || d == "tr") props["border-top-right-radius"] = v;
    if (d == "r" || d == "b" || d == "br") props["border-bottom-right-radius"] = v;
    if (d == "b" || d == "l" || d == "bl") props["border-bottom-left-radius"] = v;  
    return props
  };

  var U_border = (p) => {
    if (H_isColor(p[1]))  return H_colorUtil(H_args(p, 1), "border-color", "border")
    if (!p[1] || !isNaN(p[1])) return {"border-width": (p[1] ? p[1] : "1") + "px"}
    return {"border-style": p[1]}
  };

  var U_borderWidth = (p) => {
    var s = L_borderWidth[p[1]];
    return {["border-" + s + "-width"]: (p[2] ? p[2] : "1") + "px" }
  };

  var U_animate = (p) => ({"animation": L_animation[p[1]]});

  var U_font =(p) => {
    var v = L_fontFamily[p[1]];
    if (v) return {"font-family": v}
    return {"font-weight": L_fontWeight[p[1]]}
  };

  var U_fontSmoothing = (p) => {
    var web = "antialiased", moz = "grayscale";
    if (p[1]) web = "auto", moz = "auto";
    return {"-webkit-font-smoothing": web, "-moz-osx-font-smoothing": moz}
  };

  var U_fontStyle = (p) => {
    var v = "italic";
    if (p[1]) v = "normal";
    return {"font-style": v}
  };

  var U_letterSpacing = (p) => ({"letter-spacing": L_letterSpacing[p[1]] + "em"}); 

  var U_lineHeight = (p) => ({"line-height": L_lineHeight[p[1]]});

  /*
   * word/utility lookup
   */ 
  const lookup = {
    absolute:               U_position,
    align:                  U_verticalAlign,
    "align-items":          U_alignSelfItems,
    "align-self":           U_alignSelfItems,
    animate:                U_animate,
    antialiased:            U_fontSmoothing,
    "appearance-none":      U_appearance,
    auto:                   U_gridAuto,
    "bg-blend":             U_blendMode,
    "backdrop-blur":        U_blur,
    "backdrop-brightness":  U_filterFloat,
    "backdrop-contrast":    U_filterFloat,
    "backdrop-grayscale":   U_grayscaleInvertSepia,
    "backdrop-hue-rotate":  U_hueRotate,
    "backdrop-opacity":     U_filterFloat,
    "backdrop-saturate":    U_filterFloat,
    "backdrop-sepia":       U_grayscaleInvertSepia,
    "backdrop-invert":      U_grayscaleInvertSepia,
    bg:                     U_background,
    "bg-gradient-to":       U_backgroundGradient,
    "bg-opacity":           U_colorOpacity,
    "bg-origin":            U_backgroundOrigin,
    "bg-clip":              U_backgroundClip,
    "bg-repeat":            U_backgroundRepeat,
    block:                  U_display,
    blur:                   U_blur,
    border:                 U_border,
    "border-opacity":       U_colorOpacity,
    "border-t":             U_borderWidth,
    "border-r":             U_borderWidth,
    "border-b":             U_borderWidth,
    "border-l":             U_borderWidth,
    "border-collapse":      U_borderCollapse,
    "border-separate":      U_borderCollapse,
    bottom:                 U_topRightBottomLeft,
    box:                    U_boxSizing,
    break:                  U_wordBreak,
    brightness:             U_filterFloat,
    capitalize:             U_textTransform, 
    clear:                  U_clearFloat,
    "col-span":             U_gridSpan,
    "col-auto":             U_gridSpan,
    "col-start":            U_gridStartEnd,
    "col-end":              U_gridStartEnd,
    content:                U_flexContent,
    contents:               U_display,
    contrast:               U_filterFloat,
    cursor:                 U_cursor,
    decoration:             U_boxDecorationBreak,
    duration:               U_delayDuration,
    delay:                  U_delayDuration,
    "diagonal-fractions":   U_fontVariantNumeric, 
    divide:                 U_divideColor,
    "divide-opacity":       U_colorOpacity, 
    "divide-x":             U_divideWidth,
    "divide-y":             U_divideWidth,
    "drop-shadow":          U_dropShadow,
     ease:                  U_ease,
    "fill-current":         U_fillStroke,
    fixed:                  U_position,
    flex:                   U_display,
    "flex-col":             U_flexDirection,
    "flex-row":             U_flexDirection,
    "flex-nowrap":          U_flexWrap,
    "flex-wrap":            U_flexWrap,
    "flex-1":               U_flex,
    "flex-auto":            U_flex,
    "flex-initial":         U_flex,
    "flex-none":            U_flex,
    "flex-grow":            U_flexGrowShrink,
    "flex-shrink":          U_flexGrowShrink,
    float:                  U_clearFloat,
    "flow-root":            U_display,
    from:                   U_from,
    font:                   U_font,
    gap:                    U_gap,
    grayscale:              U_grayscaleInvertSepia,
    grid:                   U_display,
    "grid-cols":            U_gridTemplate,
    "grid-rows":            U_gridTemplate,
    "grid-flow":            U_gridAutoFlow,
    h:                      U_widthHeight,
    hidden:                 U_display,
    "hue-rotate":           U_hueRotate,
    inline:                 U_inline,
    inset:                  U_inset,
    invert:                 U_grayscaleInvertSepia,
    invisible:              U_visibility,
    isolate:                U_isolation,
    isolation:              U_isolation,
    italic:                 U_fontStyle,
    items:                  U_alignSelfItems,
    justify:                U_flexContent,
    "justify-items":        U_justifyPlaceSelfItems,
    "justify-self":         U_justifyPlaceSelfItems,
    leading:                U_lineHeight,
    left:                   U_topRightBottomLeft,
    "lining-nums":          U_fontVariantNumeric,
    list:                   U_listTypePosition,
    "list-item":            U_display,
    "line-through":         U_textDecoration,
    lowercase:              U_textTransform,
    "max-w":                U_maxWidth,
    "max-h":                U_maxHeight,
    m:                      U_margin,
    mx:                     U_marginX,
    my:                     U_marginY,
    mt:                     U_marginT,
    mb:                     U_marginB,
    ml:                     U_marginL,
    mr:                     U_marginR,
    "min-w":                U_minWidthHeight,
    "min-h":                U_minWidthHeight,
    "mix-blend":            U_blendMode,
    "no-underline":         U_textDecoration,
    "not-sr-only":          U_screenReaders,
    "normal-nums":          U_fontVariantNumeric,
    "normal-case":          U_textTransform,
    "not-italic":           U_fontStyle,
    object:                 U_objectFitPosition,
    "oldstyle-nums":        U_fontVariantNumeric,
    opacity:                U_opacity,
    order:                  U_order,
    ordinal:                U_fontVariantNumeric,
    outline:                U_outline, 
    origin:                 U_transformOrigin,
    "overflow-ellipsis":    U_textOverFlow,
    "overflow-clip":        U_textOverFlow,
    "place-content":        U_flexContent,
    "place-self":           U_justifyPlaceSelfItems,
    "place-items":          U_justifyPlaceSelfItems,
    placeholder:            U_placeHolderColor,
    "placeholder-opacity":  U_placeHolderOpacity,
    "pointer-events":       U_pointerEvents,
    p:                      U_padding,
    px:                     U_paddingX,
    py:                     U_paddingY,
    pt:                     U_paddingT,
    pb:                     U_paddingB,
    pl:                     U_paddingL,
    pr:                     U_paddingR,
    "proportional-nums":    U_fontVariantNumeric,
    relative:               U_position,
    resize:                 U_resize,
    right:                  U_topRightBottomLeft,
    "ring-offset":          U_ringOffset,
    ring:                   U_ring,
    "ring-opacity":         U_colorOpacity,
    "row-span":             U_gridSpan,
    "row-auto":             U_gridSpan,
    "row-start":            U_gridStartEnd,
    "row-end":              U_gridStartEnd,
    rounded:                U_borderRadius, 
    saturate:               U_filterFloat,
    scale:                  U_scale,
    select:                 U_userSelect,
    self:                   U_alignSelfItems,
    sepia:                  U_grayscaleInvertSepia,
    shadow:                 U_boxShadow,
    skew:                   U_skew, 
    "slashed-zero":         U_fontVariantNumeric, 
    space:                  U_spaceBetween, 
    static:                 U_position,
    sticky:                 U_position,
    "stacked-fractions":    U_fontVariantNumeric,
    "sr-only":              U_screenReaders,
    "stroke-current":       U_fillStroke,
    stroke:                 U_strokeWidth,
    "subpixel-antialiased": U_fontSmoothing,
    table:                  U_table,
    "tabular-nums":         U_fontVariantNumeric, 
    "text-opacity":         U_colorOpacity,
    text:                   U_text,
    to:                     U_to,
    top:                    U_topRightBottomLeft,
     rotate:                U_rotate,
    tracking:               U_letterSpacing,
    transition:             U_transition,
    translate:              U_translate,
    "transform-gpu":        U_transformGpu,
    truncate:               U_textOverFlow,
    underline:              U_textDecoration,
    uppercase:              U_textTransform,
    overflow:               U_overScrollFlow,
    overscroll:             U_overScrollFlow,
    via:                    U_via,
    visible:                U_visibility,
    w:                      U_widthHeight,
    whitespace:             U_whitespace,
    z:                      U_zindex,  
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
    if (c.charAt(0) == ":") c = c.substring(1);
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

  function setScreen(s) {
    L_screens = s;
  }

  /*
   * Rule printing
   */

  var P_escape = (c) => {
    c = c.replace(/[^A-Za-z0-9_-]/g, "\\$&");
    if (/^[0-9]/.test(c)) {
      c = "\\" + c.charCodeAt(0).toString(16) + c.substring(1);
    }
    return "." + c
  };

  var P_Rule = (n) => {
    var s = [];
    if (n.psel) s.push(n.psel + " ");
    s.push(P_escape(n.class));
    for (var i=0; i<n.pseudo.length; i++) s.push(":" + n.pseudo[i]);
    if (n.pelem) s.push("::" + n.pelem);
    if (n.csel) s.push(" " + n.csel);  
    s.push("{");
    for (const [p, v] of Object.entries(n.props)) {
      s.push(p + ":" + v + " !important;");
    }
    s.push("}\n");
    return s.join("")
  };

  var P_sort = (rules) => {
     return rules.sort((e1, e2) => {
      if (!e1 && !e2) return 0
      if (!e1 && e2) return -1;
      if (e1 && !e2) return 1;
      if (e2.priority < e1.priority) return 1
      if (e2.priority > e1.priority) return -1
      return 0
    }) 
  };

  var P_media = (m) => {
    var s = [];
    for (var i=0; i<m.length; i++) {
      if (m[i] == "dark") s.push("(prefers-color-scheme: dark)");
      else s.push("(min-width: " + L_screens[m[i]] + ")");
    }
    return "@media " + s.join(" and ")
  };

  function printRules(rules) {
    rules = P_sort(rules);
    var s = [];
    var i=0, len = rules.length;
    while (i < len) {
      var n = rules[i];
      if (n) { 
        if (n.media.length > 0) s.push(P_media(n.media) + "{");
        s.push(P_Rule(n));
        if (n.media.length > 0) s.push("}");
      }
      i++;
    }
    return s.join("")
  }

  const StyleId = "fx-styles";
  const BaseStyleId = "fx-base";

  var Prefix = false;
  var Update = true;
  var Rules = {};
  var GetScreen;

  const MutationConfig = {
    attributes: true,
    attributeFilter: [ "class" ],
    childList: true,
    subtree: true,
  };
   
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
}`;

  var getStyle =(id) => {
    var style = document.getElementById(id);
    if (style === null) {
      style = document.createElement("style");
      style.id = id;
      document.head.append(style);
    }
    return style
  };

  var updateStyles = () => {
    if (Update) {
      getStyle(StyleId).textContent = printRules(Object.values(Rules));
      Update = false;
    }
    var b = document.body;
    if (b instanceof HTMLElement && b.hasAttribute("hidden")) b.removeAttribute("hidden");
  };

  var addClass = (c) => {
    if (!c) return
    if (!(c in Rules)) {
      if (Prefix && !c.includes(":")) {
        Rules[c] = false;
      }
      else {
        var node = compile(c);
        if (node) Update = true;
        Rules[c] = node;
      }
    }
  };

  var addElement = (el) => {
    var cl = el.classList;
    if (!cl) return
    var len = cl.length;
    for (var i=0; i < len; i++) { 
      addClass(cl[i]);
    }
  };

  var addNode = (node) => {
    addElement(node);   
    if (node.querySelectorAll) {
      var els = node.querySelectorAll('[class]');
      var i = 0, len = els.length;
      while (i < len) {
        addElement(els[i]);
        i++;
      }
    }
  };

  var start = () => {
    var body = document.body;
    if (body && body.hasAttribute) {
      if (body.hasAttribute("fx-prefix") || body.hasAttribute("data-fx-prefix")) Prefix = true;
    }
    setScreen(GetScreen());
    getStyle(BaseStyleId).textContent = BaseStyles; 
    addNode(document);
    updateStyles();

    const callback = function(mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for (var i=0; i<mutation.addedNodes.length; i++) {
            addNode(mutation.addedNodes[i]);
          }
        }
        else if (mutation.type === 'attributes') {
          if (mutation.target) addElement(mutation.target);
        }
      }
      updateStyles();
    };

    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, MutationConfig);
  };


  if (document.readyState === "loading") {
    window.addEventListener('DOMContentLoaded', start);
  }
  else {
    start();
  }

  function screen(fn) {
    GetScreen = fn;
  }

  screen(function() {
    return { "sm": "640px", "md": "769px", "lg": "1024px", "xl": "1216px", "2xl": "1408px" }
  });

}());
