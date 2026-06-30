function splitWords(text) {
    return text.match(/\S+/g) || [];
}

module.exports = splitWords;
