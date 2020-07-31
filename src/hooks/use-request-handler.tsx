import {useEffect, useState} from 'react';
import {STATUS} from "../ducks/utils";
import {AppState} from "../reducer";
import {useSelector} from "react-redux";

export function useRequestHandler(statusSelector:(state: AppState) => string, lukkModal:()=>void) {
    const [saveRequestSent, setSaveRequestSent] = useState(false)
    const [errorModalErApen, setErrorModalErApen] = useState<boolean>(false)
    const status = useSelector(statusSelector)

    useEffect(() => {
        if (saveRequestSent) {
            if (status === STATUS.PENDING) {
            } else if (status === STATUS.ERROR) {
                setErrorModalErApen(true)
                setSaveRequestSent(false)
            } else if (status === STATUS.OK) {
                setErrorModalErApen(false)
                setSaveRequestSent(false)
                lukkModal()
            }
        }
    }, [status, saveRequestSent, setErrorModalErApen, setSaveRequestSent, lukkModal]);

    return {errorModalErApen, setErrorModalErApen, setSaveRequestSent}
}
