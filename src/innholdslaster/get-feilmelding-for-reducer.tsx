export function getFeilmeldingForReducer(feilendeReducer) {
    const status = feilendeReducer?.data?.response?.status;
    if (status >= 500) {
        return 'Vi har dessverre tekniske problemer. Gjerne meld sak i Porten om problemet varer lenge.';
    } else if (status === 403) {
        return 'Beklager, du har ikke tilgang.';
    }
    return null;
}
