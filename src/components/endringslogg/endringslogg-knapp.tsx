import { default as React, useState } from 'react';
import Ekspanderbartpanel, { EkspanderbartpanelProps } from 'nav-frontend-ekspanderbartpanel';
import './endringslogg.less';

export function EndringsloggKnapp(props) {
    const [open, setOpen] = useState(false);
    return (
        <div className="endringslogg-container">

            <div className="endringslogg-info">
            </div>
            <Ekspanderbartpanel tittel="Klikk her for å åpne/lukke panelet" tittelProps="normaltekst" border>
                Panelet vil da ekspandere og vise innholdet.
            </Ekspanderbartpanel>

        </div>
    );
}
/*
function classnameOpen(open: boolean): string {
    if (open) {
        return 'h2__lenke oversiktslenke typo-undertittel oversiktslenke--valgt';
    }
    return 'h2__lenke oversiktslenke typo-undertittel';
}
*/
