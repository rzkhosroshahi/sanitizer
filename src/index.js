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
 * @param {Object} options
 * @param {Number} options.deep
 * @param {Boolean} options.convertArray
 * @param {Boolean} options.infinite
 * @returns Object | Array 
 */
export const sanitizer = (data, options = {
    deep: 0,
    convertArray: true,
    infinite: false,
}) => {
    const { deep, convertArray, infinite } = options;
    let level = 0;

    if (Array.isArray(data)) {
        return santitizeArray(data, level);
    }

    function santitizeObject(data, level, camelCase = true) {
        if (data) {
            return Object.keys(data).reduce((acc, key) => {
                const santitzedKey = camelCase ? toCamelCase(key) : key;
                // data is an array
                if (Array.isArray(data[key])) {
                    acc[santitzedKey] = santitizeArray(data[key], level, convertArray);
                    return acc;
                }
                // nested object
                if (typeof data[key] === 'object' && (deep > level || infinite)) {
                    level = level + 1;
                    acc[santitzedKey] = santitizeObject(data[key], level);
                    return acc;
                }
                acc[santitzedKey] = data[key];
                return acc;
            }, {});
        }
    };

    function santitizeArray(array, level, convertArray = true) {
        return array.map(data => santitizeObject(data, level, convertArray));
    }

    return santitizeObject(data, level);
}

export default sanitizer;