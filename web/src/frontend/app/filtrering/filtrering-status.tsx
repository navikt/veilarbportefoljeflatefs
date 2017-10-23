import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { endreFiltervalg } from '../ducks/filtrering';
import { statustallShape, veilederShape, filtervalgShape } from '../proptype-shapes';
import Barlabel from './barlabel';
import {
    FILTERGRUPPE_ENHET,
    I_AVTALT_AKTIVITET,
    IKKE_I_AVTALT_AKTIVITET,
    NYE_BRUKERE,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV,
    INAKTIVE_BRUKERE,
    MIN_ARBEIDSLISTE
} from './filter-konstanter';
import {FiltervalgModell, VeilederModell} from "../model-interfaces";
import {ChangeEvent} from "react";
import {StatustallState} from "../ducks/statustall";
import {AppState} from "../reducer";

interface BarInputProps {
    id: string;
    tekstId: string;
    antall: number;
    max: number;
    barClassname?: string;
    skalSkjules?: boolean;
    firstInGroup?: boolean;
    name?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
}

function BarInput({ skalSkjules = false, id, tekstId, antall, max, barClassname, firstInGroup = false, ...props }: BarInputProps) {
    if (skalSkjules) {
        return null;
    }
    return (
        <div className={`skjema__input ${firstInGroup ? 'forsteBarlabelIGruppe' : ''}`}>
            <input type="radio" id={id} className="radioknapp" {...props} />
            <Barlabel
                htmlFor={id}
                tekstId={tekstId}
                antall={antall}
                max={max}
                className={`${barClassname} skjemaelement__label`}
            />
        </div>
    );
}

interface ArbeidslisteTittelProps {
    skalSkjules: boolean;
}

function ArbeidslisteTittel({ skalSkjules }: ArbeidslisteTittelProps) {
    if (skalSkjules) {
        return null;
    }
    return (
        <div className="minArbeidsliste__tittel">
            <div className="typo-element">
                <Element className="blokk-xxs" tag="h3">
                    <FormattedMessage
                        id="filtrering.status.arbeidsliste"
                    />
                </Element>
            </div>
        </div>
    );
}

interface StateProps {
    statustall: StatustallState;
}

interface DispatchProps {
    doEndreFilter: (filterId: string, filtervalg: FiltervalgModell) => void;
}

interface OwnProps {
    filtergruppe: string;
    veileder: VeilederModell;
    filtervalg: FiltervalgModell;
}

type FiltreringStatusProps = StateProps & DispatchProps & OwnProps;

class FiltreringStatus extends React.Component<FiltreringStatusProps> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.doEndreFilter('brukerstatus', e.target.value);
    }

    render() {
        const { brukerstatus } = this.props.filtervalg;

        const nyeBrukereCheckbox = (
            <BarInput
                id="nyeBrukere"
                name="brukerstatus"
                value="NYE_BRUKERE"
                onChange={this.handleChange}
                checked={brukerstatus === NYE_BRUKERE}
                tekstId="enhet.filtrering.filtrering.oversikt.nye.brukere.checkbox"
                antall={this.props.statustall.data.nyeBrukere}
                max={this.props.statustall.data.totalt}
            />
        );

        return (
            <div className="filtrering-oversikt panel">
                <div className="typo-element blokk-m">
                    <Element className="blokk-xxs" tag="h3">
                        <FormattedMessage
                            id="filtrering.status.totalt-antall-brukere"
                            values={{ antall: this.props.statustall.data.totalt }}
                        />
                    </Element>
                </div>
                { this.props.filtergruppe === 'enhet' ? nyeBrukereCheckbox : null }
                <BarInput
                    id="venterPaSvarFraNAV"
                    name="brukerstatus"
                    value="VENTER_PA_SVAR_FRA_NAV"
                    onChange={this.handleChange}
                    checked={brukerstatus === VENTER_PA_SVAR_FRA_NAV}
                    tekstId="enhet.filtrering.filtrering.oversikt.venterpasvarfranav.brukere.checkbox"
                    antall={this.props.statustall.data.venterPaSvarFraNAV}
                    max={this.props.statustall.data.totalt}
                    barClassname="venterPaSvarFraNAV"
                    firstInGroup={this.props.filtergruppe === 'enhet'}
                />
                <BarInput
                    id="venterPaSvarFraBruker"
                    name="brukerstatus"
                    value="VENTER_PA_SVAR_FRA_BRUKER"
                    onChange={this.handleChange}
                    checked={brukerstatus === VENTER_PA_SVAR_FRA_BRUKER}
                    tekstId="enhet.filtrering.filtrering.oversikt.venterpasvarfrabruker.brukere.checkbox"
                    antall={this.props.statustall.data.venterPaSvarFraBruker}
                    max={this.props.statustall.data.totalt}
                    barClassname="venterPaSvarFraBruker"
                />
                <BarInput
                    id="utlopteAktiviteter"
                    name="brukerstatus"
                    value="UTLOPTE_AKTIVITETER"
                    onChange={this.handleChange}
                    checked={brukerstatus === UTLOPTE_AKTIVITETER}
                    tekstId="enhet.filtrering.filtrering.oversikt.utlopteaktiviteter.brukere.checkbox"
                    antall={this.props.statustall.data.utlopteAktiviteter}
                    max={this.props.statustall.data.totalt}
                    barClassname="utlopteAktiviteter"
                    firstInGroup
                />
                <BarInput
                    id="ikkeIavtaltAktivitet"
                    name="brukerstatus"
                    value="IKKE_I_AVTALT_AKTIVITET"
                    onChange={this.handleChange}
                    checked={brukerstatus === IKKE_I_AVTALT_AKTIVITET}
                    tekstId="enhet.filtrering.filtrering.oversikt.ikkeiavtaltaktivitet.brukere.checkbox"
                    antall={this.props.statustall.data.ikkeIavtaltAktivitet}
                    max={this.props.statustall.data.totalt}
                    barClassname="ikkeIAvtaltAktivitet"
                />
                <BarInput
                    id="iavtaltAktivitet"
                    name="brukerstatus"
                    value="I_AVTALT_AKTIVITET"
                    onChange={this.handleChange}
                    checked={brukerstatus === I_AVTALT_AKTIVITET}
                    tekstId="enhet.filtrering.filtrering.oversikt.iavtaltaktivitet.brukere.checkbox"
                    antall={this.props.statustall.data.iavtaltAktivitet}
                    max={this.props.statustall.data.totalt}
                    barClassname="iAvtaltAktivitet"
                />
                <BarInput
                    id="inaktiveBrukere"
                    name="brukerstatus"
                    value="INAKTIVE_BRUKERE"
                    onChange={this.handleChange}
                    checked={brukerstatus === INAKTIVE_BRUKERE}
                    tekstId="enhet.filtrering.filtrering.oversikt.inaktive.brukere.checkbox"
                    antall={this.props.statustall.data.inaktiveBrukere}
                    max={this.props.statustall.data.totalt}
                    barClassname="inaktiveBrukere"
                    firstInGroup
                />
                <ArbeidslisteTittel skalSkjules={this.props.filtergruppe === FILTERGRUPPE_ENHET} />
                <BarInput
                    id="minArbeidsliste"
                    name="brukerstatus"
                    value="MIN_ARBEIDSLISTE"
                    onChange={this.handleChange}
                    checked={brukerstatus === MIN_ARBEIDSLISTE}
                    tekstId="enhet.filtrering.filtrering.oversikt.min.arbeidsliste.checkbox"
                    antall={this.props.statustall.data.minArbeidsliste}
                    max={this.props.statustall.data.totalt}
                    barClassname="minArbeidsliste"
                    skalSkjules={this.props.filtergruppe === FILTERGRUPPE_ENHET}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    statustall: state.statustall
});

const mapDispatchToProps = (dispatch, ownProps): DispatchProps => ({
    doEndreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(
        filterId, filtervalg, ownProps.filtergruppe, ownProps.veileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringStatus);
