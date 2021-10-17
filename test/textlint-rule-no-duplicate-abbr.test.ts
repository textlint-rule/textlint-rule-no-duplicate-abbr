import TextLintTester from "textlint-tester";
import rule from "../src/textlint-rule-no-duplicate-abbr";

const tester = new TextLintTester();
tester.run("textlint-rule-no-duplicate-abbr", rule, {
    valid: ["BGP is Border Gateway Protocol.", "npm module is installed by Node package manager"],
    invalid: [
        {
            text: "NPO organization is duplicated",
            errors: [
                {
                    message: `"NPO organization" has duplicated suffix word. "NPO" stands for "Non-Profit Organization".`,
                    index: 0
                }
            ]
        },
        {
            text: "DAO object is Data Access Object",
            errors: [
                {
                    message: `"DAO object" has duplicated suffix word. "DAO" stands for "Data Access Object".`,
                    index: 0
                }
            ]
        },
        {
            text: "This is BGP protocol",
            errors: [
                {
                    message: `"BGP protocol" has duplicated suffix word. "BGP" stands for "Border Gateway Protocol".`,
                    index: 8
                }
            ]
        },
        {
            text: "This is BGP protocol",
            errors: [
                {
                    message: `"BGP protocol" has duplicated suffix word. "BGP" stands for "Border Gateway Protocol".`,
                    index: 8
                }
            ]
        },
        {
            text: "これはBGPプロトコルです。",
            errors: [
                {
                    message: `"BGPプロトコルです。" has duplicated suffix word. "BGP" stands for "Border Gateway Protocol".`,
                    index: 3
                }
            ]
        }
    ]
});
