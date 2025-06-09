// @ts-check
function checkObject(o) {
    const allowed = [
        'boolean',
        'string',
        'number'
    ];
    if (!(
        o !== null
        && typeof o === 'object'
        && o instanceof Object
        && !Array.isArray(o)
    )) {
        return false;
    }
    return Object.values(o).every(
        (v) => v === null || allowed.includes(typeof v)
    );
}
function checkTable(value) {
    return (
        Array.isArray(value) && value.length > 0
        && value.every(checkObject)
    );
}

export default checkTable;
