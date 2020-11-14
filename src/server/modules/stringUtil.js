module.exports.unleak = string => (" " + string).slice(1);

module.exports.unformat = (string, firstIndex = true) => {
    string = string.split(/\n/g) //split on newline
        .map(n => n.trim()) //remove whitespace
        .filter(n => n.length); //remove the empty elements

    if (string === undefined) return;
    return firstIndex ? module.exports.unleak(string[0]) : string;
}