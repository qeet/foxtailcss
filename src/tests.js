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

  ["placeholder-transparent", {"color": "transparent"}],
  ["placeholder-current", {"color": "currentColor"}],
  ["placeholder-red-100", {"--tw-placeholder-opacity": "1", "color": "rgba(254,226,226,var(--tw-placeholder-opacity))"}],

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