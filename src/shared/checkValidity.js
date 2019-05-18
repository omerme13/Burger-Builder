const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        // isValid gets true/false depends if the value is empty or not(trim excludes white space)
        isValid = value.trim() !== '';
    }
    if (rules.minLen) {
        isValid = (value.length >= rules.minLen) && isValid;
    }
    if (rules.maxLength) {
        isValid = (value.length <= rules.maxLength) && isValid;
    }

    return isValid;
}

export default checkValidity;