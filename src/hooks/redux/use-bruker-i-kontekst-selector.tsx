import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';

const selectBrukerIKontekst = (state: AppState) => state.brukerIKontekst.data;

export const useBrukerIKontekstSelector = () => {
    return useSelector(selectBrukerIKontekst);
};
