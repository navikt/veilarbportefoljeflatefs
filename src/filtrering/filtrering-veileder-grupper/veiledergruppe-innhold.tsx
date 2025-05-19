import {useEffect, useRef, useState} from 'react';
import {AnyAction} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {RadioGroup} from '@navikt/ds-react';
import {endreFiltervalg} from '../../ducks/filtrering';
import {lagreEndringer, slettGruppe} from '../../ducks/veiledergrupper_filter';
import {AppState} from '../../reducer';
import {harGjortEndringer} from '../../components/modal/veiledergruppe/veileder-gruppe-utils';
import {VeiledergruppeModal} from '../../components/modal/veiledergruppe/veiledergruppe-modal';
import {FiltervalgModell} from '../../typer/filtervalg-modell';
import {useEnhetSelector} from '../../hooks/redux/use-enhet-selector';
import {visIngenEndringerToast} from '../../store/toast/actions';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import {LagretFilter} from '../../ducks/lagret-filter';
import {VeiledergruppeRad} from './veiledergruppe_rad';
import {kebabCase} from '../../utils/utils';
import {hentMineFilterForVeileder} from '../../ducks/mine-filter';
import '../../components/sidebar/sidebar.css';
import './veiledergruppe.css';
import '../filtrering-filter/filterform/filterform.css';

interface VeiledergruppeInnholdProps {
    lagretFilter: LagretFilter[];
    oversiktType: OversiktType;
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

export function VeiledergruppeInnhold({lagretFilter, oversiktType}: VeiledergruppeInnholdProps) {
    const [visEndreGruppeModal, setVisEndreGruppeModal] = useState(false);
    const valgtGruppeEnhetensOversikt = useSelector(
        (state: AppState) => state.mineFilterEnhetensOversikt.valgtVeiledergruppe
    );
    const valgtGruppeVeilederOversikt = useSelector(
        (state: AppState) => state.mineFilterVeilederOversikt.valgtVeiledergruppe
    );
    const valgtGruppe =
        oversiktType === OversiktType.veilederOversikt ? valgtGruppeVeilederOversikt : valgtGruppeEnhetensOversikt;

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
            ).then(resp => {
                oppdaterKolonneAlternativer(
                    dispatch,
                    {...filterValg, veiledere: resp.data.filterValg.veiledere},
                    oversiktType
                );
                return dispatch(endreFiltervalg('veiledere', resp.data.filterValg.veiledere, oversiktType));
            });
        } else {
            dispatch(visIngenEndringerToast());
        }
    };

    const sletteKnapp = () => {
        valgtGruppe &&
            enhet &&
            dispatch(slettGruppe(enhet, valgtGruppe.filterId)).then(() => {
                dispatch(endreFiltervalg('veiledere', [], OversiktType.enhetensOversikt));
                dispatch(hentMineFilterForVeileder());
                oppdaterKolonneAlternativer(
                    dispatch,
                    {...valgtGruppe.filterValg, veiledere: []},
                    OversiktType.enhetensOversikt
                );
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
            <RadioGroup
                hideLegend
                legend=""
                value={valgtGruppe?.filterId}
                defaultValue={valgtGruppe?.filterId}
                size="small"
            >
                {lagretFilter.map(veilederGruppe => {
                    return (
                        <VeiledergruppeRad
                            key={veilederGruppe.filterId}
                            veilederGruppe={veilederGruppe}
                            onClickRedigerKnapp={() => setVisEndreGruppeModal(true)}
                            oversiktType={oversiktType}
                            erValgt={veilederGruppe.filterId === valgtGruppe?.filterId}
                        />
                    );
                })}
            </RadioGroup>
            {valgtGruppe && (
                <VeiledergruppeModal
                    initialVerdi={{
                        gruppeNavn: valgtGruppe.filterNavn,
                        filterValg: valgtGruppe.filterValg,
                        filterId: valgtGruppe.filterId,
                        filterCleanup: valgtGruppe.filterCleanup
                    }}
                    onSubmit={submitEndringer}
                    onSlett={sletteKnapp}
                    onRequestClose={() => setVisEndreGruppeModal(false)}
                    isOpen={visEndreGruppeModal}
                    modalTittel={modalTittel}
                    lagreKnappeTekst="Lagre endringer"
                    className={`veiledergruppe_modal_${kebabCase(modalTittel)}`}
                />
            )}
        </div>
    );
}
