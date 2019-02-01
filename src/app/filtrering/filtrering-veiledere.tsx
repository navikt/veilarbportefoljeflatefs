import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { endreFiltervalg } from '../ducks/filtrering';
import VeilederCheckboxListe from '../components/veileder-checkbox-liste/veileder-checkbox-liste';

interface FiltreringVeiledereState {
    veilederNavnQuery?: string;
    hasFocus: boolean;
}

interface FiltreringVeiledereProps {
    intl: any;
}

interface StateProps {
    veilederNavnQuery: string;
}

interface DispatchProps {
    endreFiltervalg: (filterId: string, filterVerdi: string) => void;
}

type AllProps = FiltreringVeiledereProps & StateProps & DispatchProps;

class FiltreringVeiledere extends React.Component<AllProps, FiltreringVeiledereState> {

    private wrapperRef;

    constructor(props: AllProps) {
        super(props);
        this.state = {
            hasFocus: false,
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

    handleVeiledereSubmitted = () => {
        this.setFocus(false);
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setFocus(false);
        }
    }

    render() {

        const { intl } = this.props;
        const { hasFocus, veilederNavnQuery } = this.state;

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
                        <VeilederCheckboxListe
                            open={hasFocus}
                            onSubmit={this.handleVeiledereSubmitted}
                            onClose={() => this.setFocus(false)}
                        />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state): StateProps => ({
    veilederNavnQuery: state.filtreringVeilederoversikt.veilederNavnQuery
});

const mapDispatchToProps = (dispatch) => ({
    endreFiltervalg: (filterId: string, filterVerdi: string) => {
        dispatch(endreFiltervalg(filterId, filterVerdi, 'veiledere'));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringVeiledere);
