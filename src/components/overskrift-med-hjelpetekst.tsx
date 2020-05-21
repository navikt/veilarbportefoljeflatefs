import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { logEvent } from '../utils/frontend-logger';
import { finnSideNavn } from '../middleware/metrics-middleware';
import '../filtrering/filtrering-skjema.less';

interface OverskriftMedHjelpeTekstProps {
    overskriftTekst: string;
    hjelpeTekst: string;
}

class OverskriftMedHjelpetekst extends React.Component<OverskriftMedHjelpeTekstProps> {

    private catchClickRef;

    componentDidMount() {
        this.catchClickRef.addEventListener('click', this.handleHjelpetekstClicked, {capture: true});
    }

    componentWillUnmount() {
        this.catchClickRef.removeEventListener('click', this.handleHjelpetekstClicked, {capture: true});
    }

    handleHjelpetekstClicked = () => {
        logEvent('portefolje.metrikker.aktivitet_hjelpetekst_trykket', {sideNavn: finnSideNavn()});
    };

    render() {
        const {overskriftTekst, hjelpeTekst} = this.props;
        return (
            <div className="blokk-xxs filtrering--overskrift-med-hjelpetekst">
                <Element tag="h3">
                    {overskriftTekst}
                </Element>
                <div ref={(ref) => {
                    this.catchClickRef = ref;
                }}>
                    <Hjelpetekst id={hjelpeTekst}>
                        {hjelpeTekst}
                    </Hjelpetekst>
                </div>
            </div>
        );
    }
}

export default OverskriftMedHjelpetekst;
