import TextLintTester from "textlint-tester";
import rule from "../src/textlint-rule-no-duplicate-abbr";
const tester = new TextLintTester();
tester.run("textlint-rule-no-duplicate-abbr", rule, {
    valid: ["BGP is Border Gateway Protocol."],
    invalid: [
        {
            text: "DAO object is Data Access Object",
            errors: [
                {
                    message: `"DAO object" uses duplicated suffix word. "DAO" stands for "Data Access Object".`,
                    index: 0
                }
            ]
        },
        {
            text: "This is BGP protocol",
            errors: [
                {
                    message: `"BGP protocol" uses duplicated suffix word. "BGP" stands for "Border Gateway Protocol".`,
                    index: 8
                }
            ]
        },
        {
            text: "This is BGP protocol",
            errors: [
                {
                    message: `"BGP protocol" uses duplicated suffix word. "BGP" stands for "Border Gateway Protocol".`,
                    index: 8
                }
            ]
        },
        {
            text: "これはBGPプロトコルです。",
            errors: [
                {
                    message: `"BGPプロトコルです。" uses duplicated suffix word. "BGP" stands for "Border Gateway Protocol".`,
                    index: 3
                }
            ]
        }
    ]
});
