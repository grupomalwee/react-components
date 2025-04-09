export const cleanString = (str) => str
    .toString()
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toLowerCase();
export function includes(input, query) {
    return cleanString(input).includes(cleanString(query));
}
