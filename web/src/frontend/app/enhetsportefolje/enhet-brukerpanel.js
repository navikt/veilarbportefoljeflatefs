import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import Brukerinformasjon from '../components/tabell/brukerinformasjon';
import EnhetDatokolonner from './enhet-datokolonner';
import Etiketter from '../components/tabell/etiketter';
import { filtervalgShape, veilederShape } from '../proptype-shapes';
import Etikett from '../components/tabell/etikett';

const fm = (id) => <FormattedMessage id={id} />;

function Veilederinfo({ veileder, bruker }) {
    const navn = veileder ? `${veileder.etternavn}, ${veileder.fornavn}` : '';
    const ident = bruker.veilederId || '';
    return (
        <div className="veilederinformasjon__wrapper">
            <div className="veilederinformasjon__navn">
                {
                    bruker.veilederId ?
                        <span>{navn}</span>
                        :
                        <Etikett
                            type="nybruker"
                            child={fm('enhet.portefolje.tabelletikett.ny.bruker')}
                            skalVises
                        />
                }
            </div>
            <span className="veilederinfo__ident">{ident}</span>
        </div>
    );
}

function EnhetBrukerpanel({ bruker, settMarkert, enhetId, filtervalg, brukersVeileder }) {
    const { ytelse } = filtervalg;

    return (
        <div className="panel_hode">
            <div className="brukerpanel">
                <Brukerinformasjon
                    bruker={bruker}
                    enhetId={enhetId}
                    settMarkert={settMarkert}
                />
                <EnhetDatokolonner bruker={bruker} ytelse={ytelse} filtervalg={filtervalg} />
                <Veilederinfo veileder={brukersVeileder} bruker={bruker} />
                <Etiketter bruker={bruker} />
            </div>
        </div>
    );
}

EnhetBrukerpanel.propTypes = {
    bruker: PT.object.isRequired,
    settMarkert: PT.func.isRequired,
    enhetId: PT.string.isRequired,
    filtervalg: filtervalgShape.isRequired,
    brukersVeileder: veilederShape.isRequired
};

EnhetBrukerpanel.defaultProps = {
    brukersVeileder: null
};

Veilederinfo.propTypes = {
    bruker: PT.object.isRequired,
    veileder: veilederShape.isRequired
};

Veilederinfo.defaultProps = {
    veileder: null
};

export default EnhetBrukerpanel;
