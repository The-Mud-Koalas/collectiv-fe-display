const exactLengthValidator = (length: number) => {
    return (v: string) => v.length === length || `Your passcode should have a length of ${length}.`
};

export { exactLengthValidator }