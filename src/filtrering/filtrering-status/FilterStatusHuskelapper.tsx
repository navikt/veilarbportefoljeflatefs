import React from 'react';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {HUSKELAPP} from '../../konstanter';
import {HUSKELAPP as HUSKELAPPFILTER} from '../filter-konstanter';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {usePortefoljeSelector} from '../../hooks/redux/use-portefolje-selector';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import {pagineringSetup} from '../../ducks/paginering';
import {endreFiltervalg} from '../../ducks/filtrering';
import {useDispatch} from 'react-redux';
import {useStatustallVeilederSelector} from '../../hooks/redux/use-statustall';
import {fjernFerdigfilter, leggTilFerdigFilter} from './filter-utils';

interface Props {
    oversiktType: OversiktType;
}
export const FilterStatusHuskelapper = ({oversiktType}: Props) => {
    const huskelappFeature = useFeatureSelector()(HUSKELAPP);
    const {filtervalg} = usePortefoljeSelector(OversiktType.minOversikt);
    const skalViseHuskelapp = huskelappFeature && oversiktType === OversiktType.minOversikt;
    const statusTall = useStatustallVeilederSelector();
    const dispatch = useDispatch();

    if (!skalViseHuskelapp) {
        return null;
    }

    const handleChange = e => {
        e.preventDefault();
        const harValgtHuskelappFilter = e.target.checked;
        const nyeFerdigfilterListe = harValgtHuskelappFilter
            ? leggTilFerdigFilter(filtervalg.ferdigfilterListe, HUSKELAPPFILTER)
            : fjernFerdigfilter(filtervalg.ferdigfilterListe, HUSKELAPPFILTER);
        dispatch(pagineringSetup({side: 1}));
        dispatch(endreFiltervalg('ferdigfilterListe', nyeFerdigfilterListe, oversiktType));
        oppdaterKolonneAlternativer(dispatch, {...filtervalg, ferdigfilterListe: nyeFerdigfilterListe}, oversiktType);
    };

    return (
        <BarInputCheckbox
            filterNavn="huskelapp"
            antall={statusTall?.mineHuskelapper}
            handleChange={handleChange}
            checked={filtervalg.ferdigfilterListe.includes(HUSKELAPPFILTER)}
            labelTekst="Huskelapper"
        />
    );
};
