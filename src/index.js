/**
 * Converts normal key to camelCase key
 * @param {String} key
 * @returns String
 */
export const toCamelCase = (key) => {
    return key.replace(/_(\w|\d)/g, needle => needle[1].toUpperCase());
};

/**
 * Converts Object with snake_case propty to camelCase proprty
 * @param {Object} data 
 * @param {Number} deep
 * @returns Object | Array 
 */
export const sanitizer = (data, deep = 0, convertArray = true) => {
    let level = deep > 0 ? 0 : deep;

    if (Array.isArray(data)) {
        return santitizeArray(data, level);
    }

    function santitizeObject (data, level, camelCase = true) {
        return Object.keys(data).reduce((acc, key) => {
            const santitzedKey = camelCase ? toCamelCase(key) : key;
            // data is an array
            if (Array.isArray(data[key])) {
                acc[santitzedKey] = santitizeArray(data[key], level, convertArray);
                return acc;
            }
            // nested object
            if (typeof data[key] === 'object' && deep > level) {
                level = level + 1;
                acc[santitzedKey] = santitizeObject(data[key], level);
                return acc;
            }
            acc[santitzedKey] = data[key];
            return acc;
        }, {});
    };

    function santitizeArray (array, level, convertArray = true) {
        return array.map(data => santitizeObject(data, level, convertArray));
    }

    return santitizeObject(data, level);
}

export default sanitizer;