import type { TextlintRuleReporter } from "@textlint/types";
import dataset from "./dataset.json";

export type Options = {
    /**
     * A list for ignoring Acronyms or Abbreviations.
     * e.g. you can allow "NPO organization" by following setting.
     * "allowAbbrList": ["NPO"]
     */
    allowAbbrList: string[];
};
const reporter: TextlintRuleReporter<Options> = (context, options) => {
    const { Syntax, getSource, report, RuleError } = context;
    const abbrDataSet = new Map<string, { suffixes: string[]; definition: string }>(
        dataset as [string, { suffixes: string[]; definition: string }][]
    );
    const allowAbbrList = options?.allowAbbrList ?? [];
    return {
        [Syntax.Str](node) {
            const source = getSource(node);
            const words = source.split(/\b/);
            words.forEach((word, index) => {
                const noSuffix = words[index + 1] == undefined;
                if (noSuffix) {
                    return;
                }
                // Skip the word
                if (allowAbbrList.includes(word)) {
                    return;
                }
                const hasSpace = /^\s+$/.test(words[index + 1]);
                const nextWord = hasSpace ? words[index + 2] : words[index + 1];
                if (!nextWord) {
                    return;
                }
                const matchData = abbrDataSet.get(word);
                if (!matchData) {
                    return;
                }
                // ABC  プロトコル
                // ^^^|^^^^^^^^^
                // [0] [1]
                // [1] to be " プロトコル"
                const normalizedNextWord = nextWord.trimStart();
                const useDuplicatedSuffixWord = matchData.suffixes.find((suffixWord) => {
                    return normalizedNextWord.startsWith(suffixWord);
                });
                if (useDuplicatedSuffixWord) {
                    const spacer = hasSpace ? words[index + 1] : "";
                    const startIndexOfWord = words.slice(0, index).reduce((total, word) => {
                        return total + word.length;
                    }, 0);
                    report(
                        node,
                        new RuleError(
                            `"${word}${spacer}${nextWord}" has duplicated suffix word. "${word}" stands for "${matchData.definition}".`,
                            {
                                index: startIndexOfWord
                            }
                        )
                    );
                }
            });
        }
    };
};
export default reporter;
