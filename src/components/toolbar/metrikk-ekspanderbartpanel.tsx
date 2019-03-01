import * as React from 'react';
import Ekspanderbartpanel, { EkspanderbartpanelProps } from 'nav-frontend-ekspanderbartpanel';
import { logEvent } from '../../utils/frontend-logger';
import { finnSideNavn } from '../../middleware/metrics-middleware';

interface MetrikkEkspanderbartpanelProps {
    lamellNavn: string;
}

interface MetrikkEkspanderbartpanelState {
    isApen: boolean;
}

type AllProps = MetrikkEkspanderbartpanelProps & EkspanderbartpanelProps;

class MetrikkEkspanderbartpanel extends React.Component<AllProps, MetrikkEkspanderbartpanelState> {

    constructor(props: AllProps) {
        super(props);
        this.state = { isApen: props.apen || false };
    }

    handleOnClick = () => {
        const isApen = !this.state.isApen;
        this.setState({ isApen });
        logEvent('portefolje.metrikker.lamell', { navn: this.props.lamellNavn, apen: isApen, sideNavn: finnSideNavn() });
    }

    render() {
        // onClick og lamellNavn er plukket ut slik at de ikke blir sendt videre
        const { children, onClick, lamellNavn, ...rest } = this.props;
        return (
            <div className="blokk-xxs">
                <Ekspanderbartpanel
                    onClick={this.handleOnClick}
                    {...rest}
                >
                    {children}
                </Ekspanderbartpanel>
            </div>
        );
    }
}

export default MetrikkEkspanderbartpanel;
