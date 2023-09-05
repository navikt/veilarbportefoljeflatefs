import {AppState} from '../../reducer';
import {useSelector} from 'react-redux';

const selectBrukerIKontekst = (state: AppState) => state.brukerIKontekst.data;

export const useBrukerIKontekstSelector = () => {
    return useSelector(selectBrukerIKontekst);
};
