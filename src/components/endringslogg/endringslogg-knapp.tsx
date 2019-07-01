import { default as React, useState } from 'react';
import Ekspanderbartpanel, { EkspanderbartpanelProps } from 'nav-frontend-ekspanderbartpanel';
import './endringslogg.less';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

export function EndringsloggKnapp(props) {
    const [open, setOpen] = useState(false);
    return (
        <div className="endringslogg-dropDown endringslogg-container">
            <div className="endringslogg-info">
            </div>
            <Ekspanderbartpanel tittel="Oppdateringer" tittelProps="normaltekst" border>
                <Innholdstittel tag="h2" className="blokk-s">
                    <FormattedMessage id="Min-CV er nå printbar" />
                </Innholdstittel>
                <Innholdstittel tag="h2" className="blokk-s">
                    <FormattedMessage id="Coachmarks er lansert!" />
                </Innholdstittel>
               <Innholdstittel tag="h1" className="blokk-s">
                    <FormattedMessage id="Nytt filter på 'har sykepenger'" />
                </Innholdstittel>
            </Ekspanderbartpanel>
        </div>
    );
}

