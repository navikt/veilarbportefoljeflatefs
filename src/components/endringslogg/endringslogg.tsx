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
import {StilType} from './icons/endringslogg-icon';

const DEFAULT_MAX_ENTRIES = 50;

interface EndringsloggProps {
    userId: string;
    appId: string;
    backendUrl: string;
    stil?: StilType;
    appName?: string;
}

export const Endringslogg: FC<EndringsloggProps> = ({userId, appId, backendUrl, stil, appName}: EndringsloggProps) => {
    const {startTimer, stopTimer} = useTimer();
    const [loadData, setLoadData] = useState(true);
    const [endringsloggEntries, setEndringsloggEntries] = useState<EndringsloggEntryWithSeenStatus[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [forcedEndringsloggEntries, setForcedEndringsloggEntries] = useState<EndringsloggEntryWithSeenStatus[]>([]);

    const fetchData = useCallback(() => {
        if (loadData) {
            setLoadData(false);
            setErrorMessage('');
            setBackendUrl(backendUrl);
            hentEndringsLoggEntries(userId, appId, 'production', DEFAULT_MAX_ENTRIES).then(response =>
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
    }, [backendUrl, userId, appId, loadData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onClose = () => {
        const ulesteFelter = endringsloggEntries.filter(endringsloggEntry => !endringsloggEntry.seen);
        trackSessionDuration(userId, appId, stopTimer(), ulesteFelter.length);
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
                appId,
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
                onClose={onClose}
                onOpen={onOpen}
                stil={stil}
                appName={appName ?? appId}
                errorMessage={errorMessage}
            />
            {forcedEndringsloggEntries.length > 0 && (
                <TourModal
                    open={true}
                    modal={forcedEndringsloggEntries[forcedEndringsloggEntries.length - 1].modal!}
                    onClose={() => onCloseForcedModal()}
                />
            )}
        </>
    );
};
