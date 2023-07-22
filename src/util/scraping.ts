// https://bugs.chromium.org/p/v8/issues/detail?id=2869
export const unleak = (str: string | undefined): string => (" " + str).slice(1);

export const unformat = (str: string) => {
    const newStr = str.split(/\n/g) //split on newline
        .map(n => n.trim()) //remove whitespace
        .filter(Boolean)
        .join(""); //remove the empty elements

    if (newStr === undefined) { return; }
    return newStr;
};

export const select = (root: cheerio.Root, selector: string | cheerio.Element) => {
    return unleak(unformat(root(selector).text()));
};