const capitalize = (text: string, allWords?: boolean) => {
    allWords ??= false;

    if (!allWords) {
        return `${text.at(0)?.toUpperCase()}${text.substring(1).toLowerCase()}`;
    }

    const listOfWords = text.split(" ");
    const capitalizedWords = listOfWords.map(word => `${word.at(0)?.toUpperCase()}${word.substring(1).toLowerCase()}`);
    return capitalizedWords.reduce((prev, current) => `${prev} ${current}`, "");
}

export { capitalize }