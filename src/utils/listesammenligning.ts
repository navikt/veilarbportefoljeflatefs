export function inneholderMinstEtAvElementeneViSerEtter<T>(listeViHar: T[], detViVilFinne: T[]): boolean {
    return listeViHar.some(elementViHar => detViVilFinne.includes(elementViHar));
}

export function inneholderBareElementerViSerEtter<T>(listeViHar: T[], detViVilFinne: T[]): boolean {
    return listeViHar.every(elementViHar => detViVilFinne.includes(elementViHar));
}
