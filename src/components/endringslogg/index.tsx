import React, {useCallback, useEffect, useState} from 'react';
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
import TourModal from './tour-modal/tour-modal';
import {StilType} from './icons/endringslogg-icon';

const DEFAULT_MAX_ENTRIES = 50;

export interface EndringsloggProps {
    userId: string;
    appId: string;
    backendUrl: string;
    stil?: StilType;
    dataset?: string;
    maxEntries?: number;
    dataFetchingIntervalSeconds?: number;
    appName?: string;
    alignLeft?: boolean;
    localData?: EndringsloggEntryWithSeenStatus[];
}

export const Endringslogg: React.FC<EndringsloggProps> = (props: EndringsloggProps) => {
    const {startTimer, stopTimer} = useTimer();
    const [loadData, setLoadData] = useState(true);
    const [endringsloggEntries, setEndringsloggEntries] = useState<EndringsloggEntryWithSeenStatus[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [forcedEndringsloggEntries, setForcedEndringsloggEntries] = useState<EndringsloggEntryWithSeenStatus[]>([]);

    const fetchData = useCallback(() => {
        if (loadData) {
            setLoadData(false);
            setErrorMessage('');
            if (!props.localData) {
                setBackendUrl(props.backendUrl);
                hentEndringsLoggEntries(
                    props.userId,
                    props.appId,
                    props.dataset ?? 'production',
                    props.maxEntries ?? DEFAULT_MAX_ENTRIES
                ).then(response =>
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
            } else {
                setEndringsloggEntries(props.localData);
                setForcedEndringsloggEntries(endringsloggEntries.filter(entry => entry.forced && !entry.seenForced));
            }
        }
    }, [props, loadData, endringsloggEntries]);

    useEffect(() => {
        fetchData();
        if (props.dataFetchingIntervalSeconds) {
            const interval = setInterval(() => {
                setLoadData(true);
            }, 1000 * props.dataFetchingIntervalSeconds);
            return () => clearInterval(interval);
        }
    }, [props.appId, props.dataFetchingIntervalSeconds, fetchData]);

    const onClose = () => {
        const ulesteFelter = endringsloggEntries.filter(endringsloggEntry => !endringsloggEntry.seen);
        trackSessionDuration(props.userId, props.appId, stopTimer(), ulesteFelter.length);
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
                props.userId,
                props.appId,
                ulesteFelter.map(entry => entry._id)
            );
        }
    };

    const onCloseForcedModal = () => {
        trackSeenForcedModal(props.userId, [forcedEndringsloggEntries[forcedEndringsloggEntries.length - 1]._id]);
        setForcedEndringsloggEntries(forcedEndringsloggEntries.slice(0, -1));
    };

    return (
        <>
            <EndringsloggContainer
                content={endringsloggEntries}
                onClose={onClose}
                onOpen={onOpen}
                stil={props.stil}
                appName={props.appName ?? props.appId}
                alignLeft={props.alignLeft}
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

export default Endringslogg;
