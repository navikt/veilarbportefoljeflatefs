import {FC, useCallback, useEffect, useState} from 'react';
import {EndringsloggContainer} from './endringslogg-container';
import {EndringsloggEntryWithSeenStatus, mapRemoteToState, setAllEntriesSeen} from './utils/endringslogg-custom';
import {
    hentEndringsLoggEntries,
    setBackendUrl,
    trackSeenForcedModal,
    trackSeenStatus,
    trackSessionDuration
} from './utils/utils';
import {useTimer} from './hooks/use-timer';
import {TourModal} from './tour-modal/tour-modal';
import {getEndringsloggUrl} from '../../utils/url-utils';

const MAX_ENTRIES = 60;
const APP_ID_FOR_ENDRINGSLOGG = 'afolg';

interface EndringsloggProps {
    userId: string;
}

export const Endringslogg: FC<EndringsloggProps> = ({userId}: EndringsloggProps) => {
    const {startTimer, stopTimer} = useTimer();
    const [loadData, setLoadData] = useState(true);
    const [endringsloggEntries, setEndringsloggEntries] = useState<EndringsloggEntryWithSeenStatus[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [forcedEndringsloggEntries, setForcedEndringsloggEntries] = useState<EndringsloggEntryWithSeenStatus[]>([]);

    const backendUrl = getEndringsloggUrl();
    const finnSisteForcedEndringsloggEntry = () =>
        forcedEndringsloggEntries[forcedEndringsloggEntries.length - 1].modal!; // Vi bruker "!" fordi det alltid vil finnast element i lista der funksjonen blir kalla.

    const fetchData = useCallback(() => {
        if (loadData) {
            setLoadData(false);
            setErrorMessage('');
            setBackendUrl(backendUrl);
            hentEndringsLoggEntries(userId, APP_ID_FOR_ENDRINGSLOGG, 'production', MAX_ENTRIES).then(response =>
                response
                    .json()
                    .then((jsonResponse: any) => {
                        const entries = mapRemoteToState(jsonResponse);
                        setEndringsloggEntries(entries);
                        setForcedEndringsloggEntries(entries.filter(entry => entry.forced && !entry.seenForced));
                    })
                    .catch(() => {
                        setErrorMessage('Kunne ikke hente data for endringslogg');
                    })
            );
        }
    }, [backendUrl, userId, loadData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onClose = () => {
        const ulesteFelter = endringsloggEntries.filter(endringsloggEntry => !endringsloggEntry.seen);
        trackSessionDuration(userId, APP_ID_FOR_ENDRINGSLOGG, stopTimer(), ulesteFelter.length);
        if (ulesteFelter.length > 0) {
            const newList = setAllEntriesSeen(endringsloggEntries);
            setEndringsloggEntries(newList);
        }
    };

    const onOpen = () => {
        startTimer();
        const ulesteFelter = endringsloggEntries.filter(endringsloggEntry => !endringsloggEntry.seen);
        if (ulesteFelter.length > 0) {
            trackSeenStatus(
                userId,
                APP_ID_FOR_ENDRINGSLOGG,
                ulesteFelter.map(entry => entry._id)
            );
        }
    };

    const onCloseForcedModal = () => {
        trackSeenForcedModal(userId, [forcedEndringsloggEntries[forcedEndringsloggEntries.length - 1]._id]);
        setForcedEndringsloggEntries(forcedEndringsloggEntries.slice(0, -1));
    };

    return (
        <>
            <EndringsloggContainer
                content={endringsloggEntries}
                onClosePopover={onClose}
                onOpenPopover={onOpen}
                errorMessage={errorMessage}
            />
            {forcedEndringsloggEntries.length > 0 && (
                <TourModal
                    open={true}
                    modal={finnSisteForcedEndringsloggEntry()}
                    onClose={() => onCloseForcedModal()}
                />
            )}
        </>
    );
};
