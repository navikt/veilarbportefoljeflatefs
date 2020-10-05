import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {LeggTilKnapp} from '../../components/knapper/legg-til-knapp';
import {Normaltekst} from 'nav-frontend-typografi';
import {VeilederGruppeModal} from '../../components/modal/veiledergruppe/veileder-gruppe-modal';
import {endreFiltervalg} from '../../ducks/filtrering';
import {FiltervalgModell} from '../../model-interfaces';
import {lageNyGruppe} from '../../ducks/veiledergrupper_filter';
import {useEnhetSelector} from '../../hooks/redux/use-enhet-selector';

import {ListevisningType} from "../../ducks/ui/listevisning";
import {STATUS} from "../../ducks/utils";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import NyVeilederGruppeInnhold from "./ny_veiledergrupper-innhold";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {apneVeilederGruppeModal, avmarkerValgtVeilederGruppe} from "../../ducks/lagret-filter-ui-state";

interface FilteringVeilederGrupperProps {
    filtergruppe: ListevisningType;
}

function NyFilteringVeilederGrupper({filtergruppe}: FilteringVeilederGrupperProps) {
    const lagretFilterState = useSelector((state: AppState) => state.veiledergrupper);
    const lagretFilter = lagretFilterState.data;

    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const enhet = useEnhetSelector();

    const submitEndringer = (gruppeNavn: string, filterValg: FiltervalgModell) => {
        enhet &&
            dispatch(
                lageNyGruppe(
                    {
                        filterNavn: gruppeNavn,
                        filterValg
                    },
                    enhet
                )
            ).then((resp) => dispatch(endreFiltervalg('veiledere', resp.data.filterValg.veiledere, filtergruppe)));
    };

    const sortertVeiledergruppe = lagretFilter.sort((a, b) =>
        a.filterNavn.toLowerCase().localeCompare(b.filterNavn.toLowerCase(), undefined, {numeric: true})
    );

    const veilederGrupperOK = () => {
        return lagretFilter.length > 0 ? (
            <NyVeilederGruppeInnhold lagretFilter={sortertVeiledergruppe} filtergruppe={filtergruppe} />
        ) : (
            <div className="veiledergruppe-emptystate">
                <Normaltekst className="veiledergruppe-emptystate__tekst">
                    Ingen lagrede veiledergrupper på enheten
                </Normaltekst>
            </div>
        );
    };
    const veilederGrupperError = () => {
        return (
            <AlertStripeFeil>
                Det oppsto en feil, og veiledergrupper kunne ikke hentes fram. Prøv igjen senere.
            </AlertStripeFeil>
        );
    };

    return (
        <>
            {
                lagretFilterState.status === STATUS.ERROR ? veilederGrupperError() : veilederGrupperOK()
            }
            <LeggTilKnapp onClick={() => {
                dispatch(avmarkerValgtVeilederGruppe(filtergruppe))
                dispatch(apneVeilederGruppeModal(filtergruppe))
            }}/>
            <VeilederGruppeModal
                onSubmit={submitEndringer}
                modalTittel="Ny veiledergruppe"
                lagreKnappeTekst="Lagre"
                filtergruppe={filtergruppe}
            />
        </>
    );
}

export default NyFilteringVeilederGrupper;
