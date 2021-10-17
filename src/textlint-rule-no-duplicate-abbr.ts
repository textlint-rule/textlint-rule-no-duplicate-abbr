import { TextlintRuleReporter } from "@textlint/types";
import dataset from "./dataset.json";

const reporter: TextlintRuleReporter = (context) => {
    const { Syntax, getSource, report, RuleError } = context;
    const abbrDataSet = new Map<string, { suffixes: string[]; definition: string }>(
        dataset as [string, { suffixes: string[]; definition: string }][]
    );
    return {
        [Syntax.Str](node) {
            const source = getSource(node);
            const words = source.split(/\b/);
            words.forEach((word, index) => {
                const hasSpace = /\s/.test(words[index + 1]);
                const nextWord = hasSpace ? words[index + 2] : words[index + 1];
                if (!nextWord) {
                    return;
                }
                const matchData = abbrDataSet.get(word);
                if (!matchData) {
                    return;
                }
                const useDuplicatedSuffixWord = matchData.suffixes.find((suffixWord) => {
                    return nextWord.startsWith(suffixWord);
                });
                if (useDuplicatedSuffixWord) {
                    const spacer = hasSpace ? words[index + 1] : "";
                    const startIndexOfWord = words.slice(0, index).reduce((total, word) => {
                        return total + word.length;
                    }, 0);
                    report(
                        node,
                        new RuleError(
                            `"${word}${spacer}${nextWord}" uses duplicated suffix word. "${word}" stands for "${matchData.definition}".`,
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
