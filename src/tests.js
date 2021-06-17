import {compile} from "./compiler/index.js";

var tests = [
  ["decoration-slice", {"box-decoration-break": "slice"}],
  ["decoration-clone", {"box-decoration-break": "clone"}],
  ["decoration-xxx", {"box-decoration-break": "xxx"}],
]

var ntests = tests.length;
for (var i=0; i<ntests;i++) {
  var t = tests[i]
  var n = compile(t[0])
  var expected = t[1]
  var got = n.props

  for (const [key, value] of Object.entries(expected)) {
    if (got[key] != value) {
      console.log("Test Failed!!! - " + t[0])
    }
  }
}

console.log("Finished")