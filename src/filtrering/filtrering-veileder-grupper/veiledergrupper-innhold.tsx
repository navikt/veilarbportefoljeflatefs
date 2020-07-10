import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { endreFiltervalg } from '../../ducks/filtrering';
import { Radio } from 'nav-frontend-skjema';
import RedigerKnapp from '../../components/knapper/rediger-knapp';
import {
    lagreEndringer,
    Veiledergrupper_ActionReducers,
    slettGruppe
} from '../../ducks/veiledergrupper_action-reducers';
import { AppState } from '../../reducer';
import { harGjortEndringer, veilederlisterErLik } from '../../components/modal/veiledergruppe/veileder-gruppe-utils';
import { VeilederGruppeModal } from '../../components/modal/veiledergruppe/veileder-gruppe-modal';
import { FiltervalgModell } from '../../model-interfaces';
import { useEnhetSelector } from '../../hooks/redux/use-enhet-selector';
import { visIngenEndringerToast } from '../../store/toast/actions';
import { logEvent } from '../../utils/frontend-logger';
import { finnSideNavn } from '../../middleware/metrics-middleware';


interface VeilederGruppeInnholdProps {
    lagretFilter: Veiledergrupper_ActionReducers[]
    filterValg?: FiltervalgModell;
    filtergruppe?: string;
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function VeilederGruppeInnhold(props: VeilederGruppeInnholdProps) {
    const [valgtGruppe, setValgtGruppe] = useState<Veiledergrupper_ActionReducers>();
    const [visEndreGruppeModal, setVisEndreGruppeModal] = useState(false);

    const filtreringVeilederoversikt = (state: AppState) => state.filtreringVeilederoversikt.veiledere;
    const filtreringEnhetensoversikt = (state: AppState) => state.filtrering.veiledere;
    const selector = props.filtergruppe === 'enhet' ? filtreringEnhetensoversikt : filtreringVeilederoversikt;

    const veiledereFilter = useSelector(selector);

    useEffect(() => {
        const valgtFilter = props.lagretFilter.find(v => veilederlisterErLik(v.filterValg.veiledere, veiledereFilter));
        if (valgtFilter) {
            setValgtGruppe(valgtFilter);
        }
    }, [veiledereFilter, valgtGruppe, props.lagretFilter]);

    const outerDivRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();
    const enhet = useEnhetSelector();

    const velgGruppe = (gruppeId: string) => {
        logEvent('portefolje.metrikker.veiledergrupper.velg-gruppe',
                 {}, {filterId: gruppeId, sideNavn: finnSideNavn()});
        const filterVerdi = finnVeilederGruppe(gruppeId);
        setValgtGruppe(filterVerdi);
        filterVerdi && dispatch(endreFiltervalg('veiledere', filterVerdi.filterValg.veiledere, props.filtergruppe));
    };

    const finnVeilederGruppe = (vg) => props.lagretFilter.find((elem) => elem.filterId === parseInt(vg));

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
            .then(() => dispatch(endreFiltervalg('veiledere', [], 'enhet')));
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
                    hanterVelgGruppe={(e) => velgGruppe(e.target.value)}
                    veiledereFilter={veiledereFilter}
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

interface VeilederGruppeRad {
    hanterVelgGruppe: (e: React.ChangeEvent<HTMLInputElement>) => void;
    veilederGruppe: Veiledergrupper_ActionReducers;
    veiledereFilter: string[];
    onClickRedigerKnapp: () => void;
}

function VeilederGruppeRad({veilederGruppe, hanterVelgGruppe, onClickRedigerKnapp, veiledereFilter}: VeilederGruppeRad) {

    const lagretVeilederGruppe = veilederGruppe.filterValg.veiledere;

    const erValgt = veilederlisterErLik(lagretVeilederGruppe, veiledereFilter);

    return (
        <div className="veileder-gruppe__rad">
            <Radio
                className="veileder-gruppe__gruppenavn"
                key={veilederGruppe.filterId}
                name="veiledergruppe"
                label={veilederGruppe.filterNavn}
                value={veilederGruppe.filterId}
                onChange={hanterVelgGruppe}
                checked={erValgt}
            />
            <RedigerKnapp
                hidden={!erValgt}
                aria="Rediger veiledergruppe"
                onClick={onClickRedigerKnapp}
            />
        </div>
    );
}

export default VeilederGruppeInnhold;
