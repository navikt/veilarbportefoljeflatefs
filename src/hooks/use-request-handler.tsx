import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {STATUS} from '../ducks/utils';
import {AppState} from '../reducer';

export function useRequestHandler(statusSelector: (state: AppState) => string, lukkModal: () => void) {
    const [saveRequestSent, setSaveRequestSent] = useState(false);
    const [errorModalErApen, setErrorModalErApen] = useState<boolean>(false);
    const status = useSelector(statusSelector);

    useEffect(() => {
        if (saveRequestSent) {
            if (status === STATUS.ERROR) {
                setErrorModalErApen(true);
                setSaveRequestSent(false);
            } else if (status === STATUS.OK) {
                setErrorModalErApen(false);
                setSaveRequestSent(false);
                lukkModal();
            }
        }
    }, [status, saveRequestSent, setErrorModalErApen, setSaveRequestSent, lukkModal]);

    return {errorModalErApen, setErrorModalErApen, setSaveRequestSent};
}
