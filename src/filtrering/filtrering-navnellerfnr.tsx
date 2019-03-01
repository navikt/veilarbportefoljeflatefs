import * as React from 'react';
import { Input } from 'nav-frontend-skjema';
import { injectIntl } from 'react-intl';
import { FiltervalgModell } from '../model-interfaces';
import './filtrering-navnellerfnr.less';

interface FiltreringNavnEllerFnrState {
    navnEllerFnrQuery: string;
}

interface FiltreringNavnEllerFnrProps {
    filtervalg: FiltervalgModell;
    intl: any;
    actions: {
        endreFiltervalg: (filterId: string, filterVerdi: string) => void;
    };
}

class FiltreringNavnellerfnr extends React.Component<FiltreringNavnEllerFnrProps, FiltreringNavnEllerFnrState> {
    private timerId: NodeJS.Timeout;

    constructor(props) {
        super(props);
        this.state = {
            navnEllerFnrQuery: this.props.filtervalg.navnEllerFnrQuery,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(prevProps: FiltreringNavnEllerFnrProps) {

        const prevQuery = prevProps.filtervalg.navnEllerFnrQuery;

        if (prevQuery === '') {
            this.setState({ navnEllerFnrQuery: '' });
        }

    }

    handleChange(event) {
        this.setState({navnEllerFnrQuery:event.target.value});
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => this.props.actions.endreFiltervalg('navnEllerFnrQuery', this.state.navnEllerFnrQuery), 500 );
    }

    render() {
        return (
            <div className="filtrering-navn-fnr">
                <Input
                    label=""
                    placeholder={this.props.intl.formatMessage({id: 'filtrering-navn-eller-fnr'})}
                    onChange={this.handleChange}
                    value={this.state.navnEllerFnrQuery}
                />
            </div>
        );
    }
}

export default injectIntl(FiltreringNavnellerfnr);
