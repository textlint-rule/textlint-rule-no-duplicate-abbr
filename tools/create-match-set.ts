import fs from "fs/promises";
import { fetchDictionary } from "sudachi-synonyms-dictionary";
import ABBR from "./abbr.json";
import * as path from "path";

const createDataSet = async () => {
    const dictionary = await fetchDictionary();
    const abbrMap = new Map<string, { suffixes: string[]; definition: string }>();
    ABBR.forEach((abbr) => {
        const definition = String(abbr.Definition); // force string. like 7
        const words = definition.split(/\s/);
        const lastWordOfAbbr = words[words.length - 1].toLowerCase();
        const matchedSynonymsWord = dictionary.find((dict) => {
            return dict.items.some((item) => {
                return item.midashi.toLowerCase() === lastWordOfAbbr;
            });
        });
        if (matchedSynonymsWord) {
            abbrMap.set(abbr.Acronyms, {
                suffixes: matchedSynonymsWord.items.map((item) => item.midashi),
                definition: definition
            });
        }
    });
    return abbrMap;
};

createDataSet().then((dataset) => {
    return fs.writeFile(
        path.join(__dirname, "../src/dataset.json"),
        JSON.stringify(Array.from(dataset.entries()), null, 4),
        "utf-8"
    );
});
