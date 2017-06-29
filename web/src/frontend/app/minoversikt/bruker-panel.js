import React, { PropTypes as PT } from 'react';
import Hybridpanel from './hybridpanel/hybridpanel';
import Brukerinformasjon from './brukerinformasjon';
import Datokolonner from './datokolonner';
import Etiketter from './etiketter';
import { filtervalgShape } from './../proptype-shapes';


function BrukerPanel({ bruker, settMarkert, enhetId, filtervalg }) {
    const { ytelse } = filtervalg;
    const childrenHead =
        (<div className="brukerpanel">
            <Brukerinformasjon
                bruker={bruker}
                enhetId={enhetId}
                settMarkert={settMarkert}
            />
            <Datokolonner bruker={bruker} ytelse={ytelse} />
            <Etiketter bruker={bruker} />
        </div>);

    const childrenBody =
        (<div className="brukerpanel__body">
            {bruker.arbeidslisteKommentar}
        </div>

        );

    return (
        bruker.erIArbeidsliste ?
            <Hybridpanel childrenHead={childrenHead} childrenBody={childrenBody} />
            :
            <div className="panel_hode">{childrenHead}</div>
    );
}

BrukerPanel.propTypes = {
    bruker: PT.object.isRequired,
    settMarkert: PT.func.isRequired,
    enhetId: PT.string.isRequired,
    filtervalg: filtervalgShape.isRequired
};

export default BrukerPanel;
