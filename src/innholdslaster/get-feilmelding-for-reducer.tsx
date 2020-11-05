function getFeilmeldingForReducer(feilendeReducer) {
    const status = feilendeReducer.data.response.status;
    if (status >= 500) {
        return 'Vi har dessverre tekniske problemer. Vi jobber med å løse disse.';
    } else if (status === 403) {
        return 'Beklager, du har ikke tilgang.';
    }
    return null;
}

export default getFeilmeldingForReducer;
