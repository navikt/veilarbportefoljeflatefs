import { useSelector } from 'react-redux';
import {AppState} from "../../reducer";
import { Statustall } from "../../ducks/statustall";

const selectStatusTallData = (state: AppState) => state.statustall.data;

export function useStatusTallSelector() {
    const statusTall: Statustall = useSelector<AppState, Statustall>((state) =>
        selectStatusTallData(state));

    return statusTall;
}
