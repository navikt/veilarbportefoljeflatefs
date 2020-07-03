import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducer';
import { Normaltekst } from 'nav-frontend-typografi';
import { useEnhetSelector } from '../../hooks/redux/use-enhet-selector';
import LagredeFilterInnhold from "./lagredefilter-innhold";


interface FilteringLagredeFilterProps {
    filtergruppe?: string;
}

function FilteringLagredeFilter({ filtergruppe } : FilteringLagredeFilterProps) {

    //const [visVeilederGruppeModal, setVeilederGruppeModal] = useState(false);

    const lagretFilterState = useSelector((state: AppState) => state.lagretFilter);
    const lagretFilter = lagretFilterState.data;

    const dispatch = useDispatch();
    const enhet = useEnhetSelector();

    // const submitEndringer = (gruppeNavn: string, filterValg: FiltervalgModell) => {
    //     enhet && dispatch(lageNyGruppe({
    //         filterNavn: gruppeNavn,
    //         filterValg
    //     }, enhet)).then(resp => dispatch(endreFiltervalg('veiledere', resp.data.filterValg.veiledere, filtergruppe)));
    // };

    const sortertLagredeFilter = lagretFilter.sort((forsteFilter, andreFilter) => forsteFilter.filterNavn.localeCompare(andreFilter.filterNavn));

    return (
        <div>
            {lagretFilter.length > 0
                ? <LagredeFilterInnhold
                    lagretFilter={sortertLagredeFilter}
                    filtergruppe={filtergruppe}
                />
                : <div className="lagredefilter-emptystate">
                    <Normaltekst className="lagredefilter-emptystate__tekst">
                        Ingen lagrede filter
                    </Normaltekst>
                </div>
            }
            {/*<LeggTilKnapp onClick={() => {
                setVeilederGruppeModal(true);
            }}/>
            <VeilederGruppeModal
                initialVerdi={{gruppeNavn: '', filterValg: initialState, filterId: -1}}
                isOpen={visVeilederGruppeModal}
                onSubmit={submitEndringer}
                modalTittel="Ny veiledergruppe"
                lagreKnappeTekst="Lagre"
                onRequestClose={() => setVeilederGruppeModal(false)}
            />*/}
        </div>
    );
}

export default FilteringLagredeFilter;
