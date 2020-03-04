import { useSelector } from 'react-redux';
import { AppState } from '../../reducer';
import {OrNothing} from "../../utils/types/types";
import {VeilederModell} from "../../model-interfaces";

const selectIdent = (state: AppState) => state.inloggetVeileder.data;

export function useIdentSelector(): OrNothing<VeilederModell> {
    return useSelector(selectIdent);
}
