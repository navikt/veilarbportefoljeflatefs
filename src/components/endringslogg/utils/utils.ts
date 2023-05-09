let backendUrl: string | undefined;
export const setBackendUrl = (url: string) => (backendUrl = url);

export const hentEndringsLoggEntries = async (
    userId: string,
    appId: string,
    dataset: string,
    maxEntries: number
): Promise<Response> =>
    fetch(`${backendUrl}/endringslogg`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, appId, dataset, maxEntries})
    });

export const trackSeenStatus = async (userId: string, appId: string, documentIds: string[]): Promise<Response> =>
    fetch(`${backendUrl}/analytics/sett-endringer`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, appId, documentIds})
    });

export const trackSeenForcedModal = async (userId: string, documentIds: string[]): Promise<Response> =>
    fetch(`${backendUrl}/analytics/seen-forced-modal`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, documentIds})
    });

export const trackSessionDuration = async (
    userId: string,
    appId: string,
    duration: number,
    unseenFields: number
): Promise<Response> =>
    fetch(`${backendUrl}/analytics/session-duration`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, appId, duration, unseenFields})
    });

export const trackLinkClick = async (documentId: string): Promise<Response> =>
    fetch(`${backendUrl}/analytics/link-click`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({documentId})
    });

export const trackModalOpen = async (documentId: string): Promise<Response> =>
    fetch(`${backendUrl}/analytics/modal-open`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({documentId})
    });
