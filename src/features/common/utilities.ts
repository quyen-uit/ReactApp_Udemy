export function truncate(str?: string, strLength: number = 30) {
    if (str)
        return str.length > strLength ? str.substring(0, strLength - 3) + "..." : str;
}
