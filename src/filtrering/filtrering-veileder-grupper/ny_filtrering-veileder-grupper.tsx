import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {LeggTilKnapp} from '../../components/knapper/legg-til-knapp';
import './veileder-gruppe.less';
import {Normaltekst} from 'nav-frontend-typografi';
import {VeilederGruppeModal} from '../../components/modal/veiledergruppe/veileder-gruppe-modal';
import {endreFiltervalg, initialState} from '../../ducks/filtrering';
import {FiltervalgModell} from '../../model-interfaces';
import {
    lageNyGruppe,
} from '../../ducks/veiledergrupper_filter';
import {useEnhetSelector} from '../../hooks/redux/use-enhet-selector';
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import NyVeilederGruppeInnhold from "./ny_veiledergrupper-innhold";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

interface FilteringVeilederGrupperProps {
    filtergruppe: string;
}

function NyFilteringVeilederGrupper({filtergruppe}: FilteringVeilederGrupperProps) {

    const [visVeilederGruppeModal, setVeilederGruppeModal] = useState(false);

    const lagretFilterState = useSelector((state: AppState) => state.veiledergrupperLagretFilter);
    const lagretFilter = lagretFilterState.data;

    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const enhet = useEnhetSelector();

    const submitEndringer = (gruppeNavn: string, filterValg: FiltervalgModell) => {
        enhet && dispatch(lageNyGruppe({
            filterNavn: gruppeNavn,
            filterValg
        }, enhet))
            .then(resp => dispatch(endreFiltervalg('veiledere', resp.data.filterValg.veiledere, filtergruppe)));
    };

    const sortertVeiledergruppe = lagretFilter.sort((a, b) => a.filterNavn.localeCompare(b.filterNavn));

    const veilederGrupperOK = () => {
        return lagretFilter.length > 0
            ? <NyVeilederGruppeInnhold
                lagretFilter={sortertVeiledergruppe}
                filtergruppe={filtergruppe}
            />
            : <div className="veiledergruppe-emptystate">
                <Normaltekst className="veiledergruppe-emptystate__tekst">
                    Ingen lagrede veiledergrupper på enheten
                </Normaltekst>
            </div>

    }
    const veilederGrupperError = () => {
        return (
            <AlertStripeFeil>
                Det oppsto en feil, og veiledergrupper kunne ikke hentes fram. Prøv igjen senere.
            </AlertStripeFeil>
        )
    }

    return (
        <>
            {
                lagretFilterState.error ? veilederGrupperError() : veilederGrupperOK()
            }
            <LeggTilKnapp onClick={() => {
                setVeilederGruppeModal(true);
            }}/>
            <VeilederGruppeModal
                initialVerdi={{gruppeNavn: '', filterValg: initialState, filterId: -1}}
                isOpen={visVeilederGruppeModal}
                onSubmit={submitEndringer}
                modalTittel="Ny veiledergruppe"
                lagreKnappeTekst="Lagre"
                onRequestClose={() => setVeilederGruppeModal(false)}
            />
        </>
    );
}

export default NyFilteringVeilederGrupper;
