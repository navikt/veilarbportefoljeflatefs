import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {endreFiltervalg} from '../../ducks/filtrering';
import {lagreEndringer, slettGruppe} from '../../ducks/veiledergrupper_filter';
import {AppState} from '../../reducer';
import {harGjortEndringer} from '../../components/modal/veiledergruppe/veileder-gruppe-utils';
import {VeilederGruppeModal} from '../../components/modal/veiledergruppe/veileder-gruppe-modal';
import {FiltervalgModell} from '../../model-interfaces';
import {useEnhetSelector} from '../../hooks/redux/use-enhet-selector';
import {visIngenEndringerToast} from '../../store/toast/actions';
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {ListevisningType} from "../../ducks/ui/listevisning";
import './veileder-gruppe.less'
import {LagretFilter} from "../../ducks/lagretFilter";
import VeilederGruppeRad from "./ny_veileder_gruppe_rad";

interface VeilederGruppeInnholdProps {
    lagretFilter: LagretFilter[]
    filterValg?: FiltervalgModell;
    filtergruppe: ListevisningType;
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function VeilederGruppeInnhold(props: VeilederGruppeInnholdProps) {
    const [visEndreGruppeModal, setVisEndreGruppeModal] = useState(false);
    const outerDivRef = useRef<HTMLDivElement>(null);

    const valgtGruppeEngetensOversikt = useSelector((state: AppState) => state.mineFilterEnhetensOversikt.valgtVeilederGruppe);
    const valgtGruppeVeilederOversikt = useSelector((state: AppState) => state.mineFilterVeilederOversikt.valgtVeilederGruppe);
    const valgtGruppe = (props.filtergruppe === ListevisningType.veilederOversikt ? valgtGruppeVeilederOversikt : valgtGruppeEngetensOversikt)

    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const enhet = useEnhetSelector();

    const submitEndringer = (gruppeNavn: string, filterValg: FiltervalgModell) => {
        if (valgtGruppe && enhet && harGjortEndringer(filterValg.veiledere, valgtGruppe.filterValg.veiledere, valgtGruppe.filterNavn, gruppeNavn)) {
            dispatch(lagreEndringer({
                filterId: valgtGruppe.filterId,
                filterNavn: gruppeNavn,
                filterValg
            }, enhet)).then(resp => dispatch(endreFiltervalg('veiledere', resp.data.filterValg.veiledere, props.filtergruppe)));
        } else {
            dispatch(visIngenEndringerToast());
        }
    };

    const sletteKnapp = () => {
        valgtGruppe && enhet && dispatch(slettGruppe(enhet, valgtGruppe.filterId))
            .then(() => dispatch(endreFiltervalg('veiledere', [], ListevisningType.enhetensOversikt)));
    };

    useEffect(() => {
        if (outerDivRef.current && isOverflown(outerDivRef.current)) {
            outerDivRef.current.style.borderTop = '1px solid #888888';
            outerDivRef.current.style.borderBottom = '1px solid #888888';
        }
    });

    return (
        <div className="veileder-gruppe__valgfelt" ref={outerDivRef}>
            {props.lagretFilter.map((veilederGruppe, idx) =>
                <VeilederGruppeRad
                    key={idx}
                    veilederGruppe={veilederGruppe}
                    onClickRedigerKnapp={() => setVisEndreGruppeModal(true)}
                    filtergruppe={props.filtergruppe}
                />
            )}
            {valgtGruppe &&
            <VeilederGruppeModal
                initialVerdi={{
                    gruppeNavn: valgtGruppe.filterNavn,
                    filterValg: valgtGruppe.filterValg,
                    filterId: valgtGruppe.filterId
                }}
                isOpen={visEndreGruppeModal}
                onSubmit={submitEndringer}
                modalTittel="Rediger veiledergruppe"
                lagreKnappeTekst="Lagre endringer"
                onRequestClose={() => setVisEndreGruppeModal(false)}
                onSlett={sletteKnapp}
            />}
        </div>
    );
}

export default VeilederGruppeInnhold;
