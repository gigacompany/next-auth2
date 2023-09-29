const LocalStorage = (variableName, type, value) => {
    let item;
    if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
        if (type === 'get') {
            item = localStorage.getItem(variableName);
        }
        if (type === 'remove') {
            localStorage.removeItem(variableName);
        }
        if (type === 'set') {
            localStorage.setItem(variableName, value);
        }
        if (type === 'clear') {
            localStorage.clear();
        }
    }
    return item;
};

export default LocalStorage;