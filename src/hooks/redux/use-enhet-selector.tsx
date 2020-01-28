import { useSelector } from 'react-redux';
import { AppState } from '../../reducer';
import { OrNothing } from "../../utils/types/types";

const selectEnhetId = (state: AppState) => state.valgtEnhet.data.enhetId;

export function useEnhetSelector(): OrNothing<string>  {
    return useSelector(selectEnhetId);
}
