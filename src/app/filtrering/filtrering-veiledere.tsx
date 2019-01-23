import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { endreFiltervalg } from '../ducks/filtrering';
import SokFilter from '../components/toolbar/sok-filter';
import { VeiledereState } from '../ducks/veiledere';
import { FiltervalgModell, VeilederModell } from '../model-interfaces';
import CheckboxFilterform from '../components/checkbox-filterform/checkbox-filterform';
import { ListevisningType } from '../ducks/ui/listevisning';

interface FiltreringVeiledereState {
    veilederNavnQuery?: string;
    hasFocus: boolean;
}

interface FiltreringVeiledereProps {
    intl: any;
}

interface StateProps {
    veiledere: VeiledereState;
    filtervalg: FiltervalgModell;
    veilederNavnQuery: string;
    veileder?: VeilederModell;
}

interface DispatchProps {
    sokEtterVeileder: (filterId: string, filterverdi: string) => void;
    endreFiltervalg: (filterId: string, filterVerdi: string) => void;
}

type AllProps = FiltreringVeiledereProps & StateProps & DispatchProps;

class FiltreringVeiledere extends React.Component<AllProps, FiltreringVeiledereState> {

    private wrapperRef;

    constructor(props: AllProps) {
        super(props);
        this.state = {
            hasFocus: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleChange(event) {
        const nyQuery = event.target.value;
        this.setState({ veilederNavnQuery: nyQuery });
        this.props.endreFiltervalg('veilederNavnQuery', nyQuery);
    }

    setFocus = (focus: boolean) => {
        this.setState({ hasFocus: focus });
    }

    getFiltrerteVeiledere = (): VeilederModell[] => {

        const { veilederNavnQuery, veiledere } = this.props;

        const query = veilederNavnQuery ? veilederNavnQuery.toLowerCase().trim() : '';

        return veiledere.data.veilederListe
            .filter((veileder) =>
                veileder.navn && veileder.navn.toLowerCase().indexOf(query) >= 0 ||
                veileder.ident && veileder.ident.toLowerCase().indexOf(query) >= 0);

    }

    mapVeiledereTilValg = (veiledere: VeilederModell[]): {} => {
        const data: any[] = veiledere;
        return data.reduce((acc, element) => ({ ...acc, [element.ident]: { label: element.navn } }), {});
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setFocus(false);
        }
    }

    render() {

        const { intl, filtervalg } = this.props;
        const { hasFocus, veilederNavnQuery } = this.state;
        const valg = this.mapVeiledereTilValg(this.getFiltrerteVeiledere());

        return (
            <div className="row" ref={(ref) => { this.wrapperRef = ref; }}>
                <div className="col-md-12">
                    <Input
                        label=""
                        placeholder={intl.formatMessage({id: 'filtrering-navn-eller-ident'})}
                        onChange={this.handleChange}
                        value={veilederNavnQuery}
                        onFocus={() => this.setFocus(true)}
                    />
                    {hasFocus &&
                        <CheckboxFilterform
                            form="veiledere"
                            valg={valg}
                            filtervalg={filtervalg}
                            closeDropdown={() => this.setFocus(false)}
                            onSubmit={this.props.sokEtterVeileder}
                            justerVenstre={true}
                        />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state): StateProps => ({
    filtervalg: state.filtreringVeilederoversikt,
    veileder: state.veileder,
    veiledere: state.veiledere,
    veilederNavnQuery: state.filtreringVeilederoversikt.veilederNavnQuery
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    endreFiltervalg: (filterId: string, filterVerdi: string) => {
        dispatch(endreFiltervalg(filterId, filterVerdi, 'veiledere'));
    },
    sokEtterVeileder(filterId: string, valgteVeiledere: string[]) {
        dispatch(endreFiltervalg(filterId, valgteVeiledere, 'veiledere', {}));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringVeiledere);
