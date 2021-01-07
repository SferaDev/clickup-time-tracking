// Replaces inlined variables in {{foo}} with dictionary values
export function stringReplacer(string: string, dictionary: Record<string, unknown>): string {
    return string.replace(/\{\{(\w+)\}\}/g, (_, key) => formatValue(dictionary[key]) ?? key);
}

function formatValue(value: unknown): string {
    if (Array.isArray(value)) return value.map(formatValue).join(", ");
    return String(value);
}
