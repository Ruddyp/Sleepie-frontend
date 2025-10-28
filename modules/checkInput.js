function checkInput(inputs) {
    let isValid = true;

    for (const field of inputs) {
        if (!field || field === '') {
            isValid = false;
        }
    }
    return isValid;
}

module.exports = { checkInput };
