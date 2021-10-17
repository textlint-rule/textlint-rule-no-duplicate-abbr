# @textlint-rule/textlint-rule-no-duplicate-abbr

[textlint](https://github.com/textlint/textlint) rule that avoid adding duplicated suffix word for Acronyms and Abbreviations.

**OK**:

```
BGP is Border Gateway Protocol.
```

**NG**:

```
This is BGP protocol.
DAO object is Data Access Object.
これはBGPプロトコルです。
```

You can avoid using "DAO Object" - "Data Access Object Object".

## Supported Languages

- {Acronyms or Abbreviations} + English
- {Acronyms or Abbreviations} + Japanese

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textlint-rule/textlint-rule-no-duplicate-abbr

## Usage

Via `.textlintrc`(Recommended)

```json
{
  "rules": {
    "@textlint-rule/no-duplicate-abbr": true
  }
}
```

Via CLI

```
textlint --rule @textlint-rule/no-duplicate-abbr README.md
```

## Options

```ts
export type Options = {
    /**
     * A list for ignoring Acronyms or Abbreviations.
     * e.g. you can allow "NPO organization" by following setting.
     * "allowAbbrList": ["NPO"]
     */
    allowAbbrList: string[];
}
```

Example setting:

```json5
{
  "rules": {
    "@textlint-rule/no-duplicate-abbr": {
      "allowAbbrList": ["NPO"] // Allow to use "NPO organization"
    }
  }
}
```

## Changelog

See [Releases page](https://github.com/textlint-rule/textlint-rule-no-duplicate-abbr/releases).

## References

- Abbr dictionary: wikipedia
  based <https://docs.google.com/spreadsheets/d/1mtrE2wxlasDVZXcpLcLE26EUaX12aAOkbKed9oTcVNk/edit#gid=877500418>
- Synonyms: sudashi <https://github.com/azu/sudachi-synonyms-dictionary>

## Running tests

Install devDependencies and Run `yarn test`:

    yarn install
    yarn test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature
requests, [please create an issue](https://github.com/textlint-rule/textlint-rule-no-duplicate-abbr/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
