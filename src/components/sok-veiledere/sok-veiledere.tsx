import SokFilterNy from './sok-filter-ny';
import { Checkbox } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducer';
import '../checkbox-filterform/checkbox-filterform.less';
import '../../style.less';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { skjulModal } from '../../ducks/modal';
import { FiltervalgModell } from '../../model-interfaces';
import { nameToStateSliceMap } from '../../ducks/utils';
import { bindActionCreators } from 'redux';
import { endreFiltervalg, veilederSoktFraToolbar } from '../../ducks/filtrering';

interface SokVeiledereProps {
    filtervalg: FiltervalgModell;
    erValgt: (ident: string) => boolean;
    hanterVeilederValgt: (erValgt: boolean, veilederIdent: string) => void;
}

interface DispatchProps {
    sokEtterVeileder: (filterId: string, filterverdi: string[]) => void;
    veilederSokt: () => void;
}

type AllProps = SokVeiledereProps & DispatchProps;

function SokVeiledere(props: AllProps) {
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const sorterteVeilederePaEtterNavn = veilederePaEnheten.sort((a, b) => a.etternavn && b.etternavn ? a.etternavn.localeCompare(b.etternavn) : 1);
    const [valgteVeiledere, setValgteVeiledere] = useState<string[]>(props.filtervalg.veiledere || []);
    const dispatch = useDispatch();

    const createHandleOnSubmit = (filterverdi: string[]) => {
        if (harValg) {
            props.sokEtterVeileder('veiledere', filterverdi);
            props.veilederSokt();
            setValgteVeiledere([]);
        }
    };
    const harValg = valgteVeiledere.length > 0;

    return (
        <SokFilterNy
            label="Velg veiledere:"
            placeholder="Søk veileder"
            data={sorterteVeilederePaEtterNavn}
        >
            {liste =>
                <>
                    <div className="checkbox-filterform__valg">
                        {liste.map(elem =>
                            <Checkbox
                                key={elem.ident}
                                label={`${elem.etternavn}, ${elem.fornavn}`}
                                value={elem.ident}
                                checked={props.erValgt(elem.ident)}
                                onChange={e => props.hanterVeilederValgt(e.target.checked, e.target.value)}
                            />)}
                    </div>
                    <div className="modal-footer">
                        <Hovedknapp
                            className="modal-footer__hovedknapp"
                            htmlType="submit"
                            onClick={() => createHandleOnSubmit(valgteVeiledere)}
                        >
                            Velg
                        </Hovedknapp>
                        <Knapp
                            className="modal-footer__lukknapp"
                            htmlType="button"
                            onClick={() => dispatch(skjulModal())}
                        >
                            Lukk
                        </Knapp>
                    </div>
                </>
            }
        </SokFilterNy>
    );
}

const mapStateToProps = (state, ownProps) => {
    const stateSlice = nameToStateSliceMap[ownProps.filtergruppe] || 'filtrering';
    return ({
        veiledere: state.veiledere,
        filtervalg: state[stateSlice],
        veileder: ownProps.veileder || state.enheter.valgtVeileder
    });
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    sokEtterVeileder(filterId: string, filterverdi: string[]) {
        return endreFiltervalg(filterId, filterverdi, ownProps.filtergruppe);
    },
    veilederSokt() {
        return veilederSoktFraToolbar();
    }
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SokVeiledere);
