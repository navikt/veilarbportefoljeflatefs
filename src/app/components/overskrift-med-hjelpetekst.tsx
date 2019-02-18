import * as React from 'react';

import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { HjelpetekstAuto } from 'nav-frontend-hjelpetekst';
import { logEvent } from '../utils/frontend-logger';

interface OverskriftMedHjelpeTekstProps {
    overskriftId: string;
    hjelpetekstId: string;
}

class OverskriftMedHjelpetekst extends React.Component<OverskriftMedHjelpeTekstProps> {

    private catchClickRef;

    componentDidMount() {
        this.catchClickRef.addEventListener('click', this.handleHjelpetekstClicked, { capture: true });
    }

    componentWillUnmount() {
        this.catchClickRef.removeEventListener('click', this.handleHjelpetekstClicked, { capture: true });
    }

    handleHjelpetekstClicked = () => {
        logEvent('portefolje.metrikker.aktivitet_hjelpetekst_trykket');
    }

    render() {
        const { overskriftId, hjelpetekstId } = this.props;
        return (
            <div className="blokk-xxs filtrering--overskrift-med-hjelpetekst">
                <Element tag="h3">
                    <FormattedMessage id={overskriftId} />
                </Element>
                <div ref={(ref) => { this.catchClickRef = ref; }}>
                    <HjelpetekstAuto>
                        <FormattedMessage id={hjelpetekstId} />
                    </HjelpetekstAuto>
                </div>
            </div>
        );
    }
}

export default OverskriftMedHjelpetekst;
