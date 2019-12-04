import { useSelector } from 'react-redux';
import { AppState } from '../../reducer';
import { EnhetModell} from "../../model-interfaces";
import { OrNothing } from "../../utils/types/types";

const selectEnhetId = (state: AppState) => state.enheter.valgtEnhet.enhet;

export function useEnhetSelector(): OrNothing<EnhetModell>  {
    return useSelector(selectEnhetId);
}
