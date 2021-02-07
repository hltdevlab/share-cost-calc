export const toCssSelectorSafeString = (name) => {
    // invalid characters:
    // ~ ! @ $ % ^ & * ( ) + = , . / ‘ ; : ” ? > < [ ] \ { } | ` # <space>
    const regex = /[~ ! @ $ % ^ & * ( ) + = , . / ‘ ; : ” ? > < \\[ \\] \\\\ { } \\| ` #]/g;
    let result = '_';
    result += name
        .replaceAll(regex, '-')
        .replaceAll('--', '-');

    return result;
};

export const isArrayEmpty = (array) => {
    return (
        array === undefined
        || array === null
        || array.length === 0
    );
};

export const isObjectEmpty = (object) => {
    return (
        object === undefined
        || object === null
        || JSON.stringify({}) === JSON.stringify(object)
    );
};

export const to2Decimal = (floatValue) => {
    return Math.round(floatValue * 100) / 100;
};

export const to2DecimalStr = (floatValue) => {
    const resultFloat = to2Decimal(floatValue);
    const resultStr = String(resultFloat);

    const isIntegerRegex = new RegExp(
        '^-*\\d+$',
        'i'
    );
    if (resultStr.match(isIntegerRegex)) {
        return resultStr;
    }

    // if float value only has one decimal place, append a '0' behind.
    const isOneDecimalPlaceOnlyRegex = new RegExp(
        '^-*\\d+\\.\\d$',
        'i'
    );
    if (resultStr.match(isOneDecimalPlaceOnlyRegex)) {
        return `${resultStr}0`;
    }

    return resultStr;
};
