async function getTable(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('fetch:failed');
    }
    const result = await response.json();
    return result;
}

export default getTable;
