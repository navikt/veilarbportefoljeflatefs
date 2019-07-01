import { default as React, useState } from 'react';
import Ekspanderbartpanel, { EkspanderbartpanelProps } from 'nav-frontend-ekspanderbartpanel';
import './endringslogg.less';

export function EndringsloggKnapp(props) {
    const [open, setOpen] = useState(false);
    return (
        <div className="endringslogg-dropDown endringslogg-container">
            <div className="endringslogg-info">
            </div>
            <Ekspanderbartpanel tittel="Oppdateringer" tittelProps="normaltekst" border>
                Panelet vil da ekspandere og vise innholdet.
            </Ekspanderbartpanel>
        </div>
    );
}

