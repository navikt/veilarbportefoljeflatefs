import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {endreFiltervalg} from '../../ducks/filtrering';
import {lagreEndringer, slettGruppe} from '../../ducks/veiledergrupper_filter';
import {AppState} from '../../reducer';
import {harGjortEndringer} from '../../components/modal/veiledergruppe/veileder-gruppe-utils';
import {VeiledergruppeModal} from '../../components/modal/veiledergruppe/veiledergruppe-modal';
import {FiltervalgModell} from '../../model-interfaces';
import {useEnhetSelector} from '../../hooks/redux/use-enhet-selector';
import {visIngenEndringerToast} from '../../store/toast/actions';
import '../../components/sidebar/sidebar.less';
import './veiledergruppe.less';
import './../../components/filterform/filterform.less';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {ListevisningType} from '../../ducks/ui/listevisning';
import {LagretFilter} from '../../ducks/lagret-filter';
import VeiledergruppeRad from './veiledergruppe_rad';
import {kebabCase} from '../../utils/utils';
import {hentMineFilterForVeileder} from '../../ducks/mine-filter';

interface VeiledergruppeInnholdProps {
    lagretFilter: LagretFilter[];
    filterValg?: FiltervalgModell;
    filtergruppe: ListevisningType;
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function VeiledergruppeInnhold(props: VeiledergruppeInnholdProps) {
    const [visEndreGruppeModal, setVisEndreGruppeModal] = useState(false);
    const valgtGruppeEnhetensOversikt = useSelector(
        (state: AppState) => state.mineFilterEnhetensOversikt.valgtVeiledergruppe
    );
    const valgtGruppeVeilederOversikt = useSelector(
        (state: AppState) => state.mineFilterVeilederOversikt.valgtVeiledergruppe
    );
    const valgtGruppe =
        props.filtergruppe === ListevisningType.veilederOversikt
            ? valgtGruppeVeilederOversikt
            : valgtGruppeEnhetensOversikt;

    const outerDivRef = useRef<HTMLDivElement>(null);

    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const enhet = useEnhetSelector();

    const modalTittel = 'Rediger veiledergruppe';

    const submitEndringer = (gruppeNavn: string, filterValg: FiltervalgModell) => {
        if (
            valgtGruppe &&
            enhet &&
            harGjortEndringer(
                filterValg.veiledere,
                valgtGruppe.filterValg.veiledere,
                valgtGruppe.filterNavn,
                gruppeNavn
            )
        ) {
            dispatch(
                lagreEndringer(
                    {
                        filterId: valgtGruppe.filterId,
                        filterNavn: gruppeNavn,
                        filterValg
                    },
                    enhet
                )
            ).then(resp => dispatch(endreFiltervalg('veiledere', resp.data.filterValg.veiledere, props.filtergruppe)));
        } else {
            dispatch(visIngenEndringerToast());
        }
    };

    const sletteKnapp = () => {
        valgtGruppe &&
            enhet &&
            dispatch(slettGruppe(enhet, valgtGruppe.filterId)).then(() => {
                dispatch(endreFiltervalg('veiledere', [], ListevisningType.enhetensOversikt));
                dispatch(hentMineFilterForVeileder());
            });
    };

    useEffect(() => {
        if (outerDivRef.current && isOverflown(outerDivRef.current)) {
            outerDivRef.current.style.borderTop = '1px solid #888888';
            outerDivRef.current.style.borderBottom = '1px solid #888888';
        }
    });

    return (
        <div className="veileder-gruppe__valgfelt" ref={outerDivRef}>
            {props.lagretFilter.map((veilederGruppe, index) => (
                <VeiledergruppeRad
                    key={index}
                    veilederGruppe={veilederGruppe}
                    onClickRedigerKnapp={() => setVisEndreGruppeModal(true)}
                    filtergruppe={props.filtergruppe}
                />
            ))}
            {valgtGruppe && (
                <VeiledergruppeModal
                    initialVerdi={{
                        gruppeNavn: valgtGruppe.filterNavn,
                        filterValg: valgtGruppe.filterValg,
                        filterId: valgtGruppe.filterId,
                        filterCleanup: valgtGruppe.filterCleanup
                    }}
                    isOpen={visEndreGruppeModal}
                    onSubmit={submitEndringer}
                    modalTittel={modalTittel}
                    lagreKnappeTekst="Lagre endringer"
                    onRequestClose={() => setVisEndreGruppeModal(false)}
                    onSlett={sletteKnapp}
                    className={`veiledergruppe_modal_${kebabCase(modalTittel)}`}
                />
            )}
        </div>
    );
}

export default VeiledergruppeInnhold;
