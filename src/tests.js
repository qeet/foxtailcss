import {compile} from "./compiler/index.js";

var tests = [
  ["decoration-slice", {"box-decoration-break": "slice", "-webkit-box-decoration-break": "slice"}],
  ["decoration-clone", {"box-decoration-break": "clone", "-webkit-box-decoration-break": "clone"}],
  ["decoration-xxx", {"box-decoration-break": "xxx", "-webkit-box-decoration-break": "xxx"}],
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
  ["xxxx", false],
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
      console.log(got)
      continue;
    }
  }

  for (const [key, value] of Object.entries(expected)) {
    if (got[key] != value) {
      console.log("Test Failed!!! - " + t[0])
      console.log(got)
    }
  }
}

console.log(`Processed ${ntests} tests`);