import { default as React, useState } from 'react';
import Ekspanderbartpanel, { EkspanderbartpanelProps } from 'nav-frontend-ekspanderbartpanel';
import './endringslogg.less';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import NavFrontendChevron from 'nav-frontend-chevron';

export function EndringsloggKnapp(props) {
    const [open, setOpen] = useState(false);
    return (
        <div className="endringslogg-dropDown endringslogg-container">
            <div className="endringslogg-info">
            </div>
            <Ekspanderbartpanel tittel="Oppdateringer" tittelProps="normaltekst" border>
                <h4>
                    <NavFrontendChevron type={'ned'}/>Min-CV er nå printbar
                </h4>
                <h4>
                    <NavFrontendChevron type={'ned'}/>Coachmarks er lansert!
                </h4>
                <h4>
                    <NavFrontendChevron type={'ned'}/>Nytt filter på 'har sykepenger'
                </h4>
            </Ekspanderbartpanel>
        </div>
    );
}

