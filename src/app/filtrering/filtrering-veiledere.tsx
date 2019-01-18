import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { endreFiltervalg } from '../ducks/filtrering';

interface FiltreringVeiledereState {
    veilederNavnQuery?: string;
}

interface FiltreringVeiledereProps {
    intl: any;
    endreFiltervalg: (filterId: string, filterVerdi: string) => void;
}

class FiltreringVeiledere extends React.Component<FiltreringVeiledereProps, FiltreringVeiledereState> {
    private timerId: number = 0;

    constructor(props: FiltreringVeiledereProps) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const nyQuery = event.target.value;
        this.setState({ veilederNavnQuery: nyQuery });
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => this.props.endreFiltervalg('veilederNavnQuery', nyQuery), 250 );
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <Input
                        label=""
                        placeholder={this.props.intl.formatMessage({id: 'filtrering-navn'})}
                        onChange={this.handleChange}
                        value={this.state.veilederNavnQuery}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    endreFiltervalg: (filterId: string, filterVerdi: string) => {
        dispatch(endreFiltervalg(filterId, filterVerdi, 'veiledere'));
    }
});

export default connect(null, mapDispatchToProps)(FiltreringVeiledere);
