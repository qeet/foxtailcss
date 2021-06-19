import {compile} from "./compiler/index.js";

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



  ["xxxx", false],
  ["", false],
  ["-", false],
  ["!", false],
]

var ntests = tests.length;
for (var i=0; i<ntests;i++) {
  var t = tests[i]
  var n = compile(t[0])
  var expected = t[1]
  var got = n.props

  if (!expected) {
    if (expected !== n) {
      console.log("Test Failed!!! - " + t[0])
      console.log(n)
      continue;
    }
  }

  if (!n && expected) {
    console.log("Test Failed!!! - " + t[0])
    console.log(n)
    continue;
  }

  for (const [key, value] of Object.entries(expected)) {
    if (got[key] != value) {
      console.log("Test Failed!!! - " + t[0])
      console.log(got)
    }
  }
}

console.log(`Processed ${ntests} tests`);