import * as React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import './veileder-checkbox-liste.less';
import { Checkbox } from 'nav-frontend-skjema';
import { endreFiltervalg } from '../../ducks/filtrering';
import { VeiledereState } from '../../ducks/veiledere';
import { FiltervalgModell, VeilederModell } from '../../model-interfaces';

interface VeilederCheckboxListeProps {
    open?: boolean;
    onSubmit?: () => void;
    onClose?: () => void;
}

interface VeilederCheckboxListeState {
    valgteElementer: string[];
    open?: boolean;
}

interface StateProps {
    veiledere: VeiledereState;
    filtervalg: FiltervalgModell;
    veilederNavnQuery: string;
}

interface DispatchProps {
    sokEtterVeileder: (veiledere: string[]) => void;
}

interface KnappProps {
    onClick: (e) => void;
}

type AllProps = VeilederCheckboxListeProps & StateProps & DispatchProps;

const LukkeKnapp: React.SFC<KnappProps> = (props: KnappProps) => (
    <button className="knapp knapp--mini checkbox-liste__valg-knapp" type="button" onClick={props.onClick}>
        <FormattedMessage id="components.filterform.button.lukk"/>
    </button>
);

const SubmitKnapp: React.SFC<KnappProps> = (props: KnappProps) => (
    <button className="knapp knapp--mini knapp--hoved checkbox-liste__valg-knapp" type="button" onClick={props.onClick}>
        <FormattedMessage id="components.filterform.button.velg"/>
    </button>
);

class VeilederCheckboxListe extends React.Component<AllProps, VeilederCheckboxListeState> {

    constructor(props: AllProps) {
        super(props);

        const veiledere = props.filtervalg.veiledere;
        this.state = {
            open: props.open,
            valgteElementer: veiledere ? veiledere : []
        };

    }

    componentDidUpdate(prevProps: AllProps) {

        const prevOpen = prevProps.open;
        const open = this.props.open;

        if (prevOpen !== open) {
            this.setState({ open });
        }

    }

    erValgt = (value: string | undefined): boolean => {
        return !!value && this.state.valgteElementer.findIndex((valgtElement) => value === valgtElement ) >= 0;
    }

    getFiltrerteVeiledere = (): VeilederModell[] => {

        const { veilederNavnQuery, veiledere } = this.props;

        const query = veilederNavnQuery ? veilederNavnQuery.toLowerCase().trim() : '';

        return veiledere.data.veilederListe
            .filter((veileder) =>
                veileder.navn && veileder.navn.toLowerCase().indexOf(query) >= 0 ||
                veileder.ident && veileder.ident.toLowerCase().indexOf(query) >= 0);

    }

    handleCheckboxOnClick = (value: string | undefined) => {

        if (!value) {
            return;
        }

        const { valgteElementer } = this.state;
        const erValgt = this.erValgt(value);
        let valgteElem;

        if (!erValgt) {
            valgteElem = [...valgteElementer, value];
            this.setState({ valgteElementer: valgteElem });
        } else if(erValgt) {
            valgteElem = valgteElementer.filter((valgtElement) => value !== valgtElement);
            this.setState({ valgteElementer: valgteElem });
        }

    }

    handleSubmitKnappOnClick = (e) => {
        e.preventDefault();

        this.props.sokEtterVeileder(this.state.valgteElementer);

        if (this.props.onSubmit) {
            this.props.onSubmit();
        }
    }

    handleLukkeKnappOnClick = (e) => {
        e.preventDefault();

        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    mapVeiledereToCheckboxList = (veiledere?: VeilederModell[]): ReactNode[] | null => {

        if (!veiledere) {
            return null;
        }

        return veiledere.filter((vlg) => vlg.ident && vlg.navn).map((vlg) => {
            const erValgt =  this.erValgt(vlg.ident);
            return (
                <Checkbox
                    key={vlg.ident}
                    label={vlg.navn}
                    checked={erValgt}
                    onChange={() =>  this.handleCheckboxOnClick(vlg.ident)}
                />
            );
        });
    }

    render() {
        const { open, valgteElementer } = this.state;
        const valgCheckboxListe = this.mapVeiledereToCheckboxList(this.getFiltrerteVeiledere());
        const harValg = valgCheckboxListe && valgCheckboxListe.length > 0;
        const harValgteElementer = valgteElementer && valgteElementer.length > 0;

        if (!open) {
            return null;
        }

        if (harValg) {
            return (
                <form className="checkbox-liste">
                    <div className="checkbox-liste__valg">
                        {valgCheckboxListe}
                    </div>
                    <div className="checkbox-liste__valg-footer">
                        {harValgteElementer ?
                            <SubmitKnapp onClick={this.handleSubmitKnappOnClick} />
                            :
                            <LukkeKnapp onClick={this.handleLukkeKnappOnClick} />
                        }
                    </div>
                </form>
            );
        } else {
            return (
                <div className="checkbox-liste__valg-footer">
                    <AlertStripe type="info" className="checkbox-filterform__alertstripe">
                        <FormattedMessage id="components.filterform.ingen-treff" />
                    </AlertStripe>
                </div>
            );
        }

    }
}

const mapStateToProps = (state): StateProps => ({
    filtervalg: state.filtreringVeilederoversikt,
    veiledere: state.veiledere,
    veilederNavnQuery: state.filtreringVeilederoversikt.veilederNavnQuery
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    sokEtterVeileder(veiledere: string[]) {
        dispatch(endreFiltervalg('veiledere', veiledere, 'veiledere', ));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederCheckboxListe);
