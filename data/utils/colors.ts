export function stringToColor(string: string): string {
    let hash = 0;
    for (var i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    return `hsl(${hash % 100}, 60%, 50%)`;
}
