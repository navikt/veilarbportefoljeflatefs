import React, { PropTypes as PT, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { velgEnhetForSaksbehandler } from './../ducks/enheter';
import { leggEnhetIUrl } from '../utils/utils';
import EnhetVelger from './enhet-velger';
import { enhetShape } from './../proptype-shapes';
import { hentPortefoljeForEnhet } from '../ducks/portefolje';
import Innholdslaster from '../innholdslaster/innholdslaster';


class EnhetSide extends Component {

    componentWillMount() {
        if (!this.props.valgtEnhet) {
            this.props.velgEnhet(this.props.enheter[0]);
            this.props.hentPortefolje(this.props.enheter[0], this.props.portefolje.ident);
        } else {
            leggEnhetIUrl(this.props.valgtEnhet);
            this.props.hentPortefolje(this.props.valgtEnhet, this.props.portefolje.ident);
        }

    }

    render() {
        const { enheter, valgtEnhet, velgEnhet, portefolje, hentPortefolje } = this.props;


        if (!valgtEnhet) {
            return <noscript />;
        }


        const enhetVelger = enheter.length === 1 ?
            <p>{valgtEnhet.enhetId}</p> :
            <EnhetVelger enheter={enheter} valgtEnhet={valgtEnhet} velgEnhet={enhet => {
                velgEnhet(enhet);
                hentPortefolje(enhet, portefolje.ident);
            }} />;

        return (
            <div className="enhet-side panel">
                <h1 className="typo-innholdstittel">{`Enhet : ${valgtEnhet.enhetId} (${valgtEnhet.navn})`}</h1>
                <p className="typo-infotekst">
                    <FormattedMessage
                        id="enhet.valgt.infotekst"
                        values={{ enhetId: valgtEnhet.enhetId, enhetnavn: valgtEnhet.navn }}
                    />
                </p>
                {enhetVelger}
                <Innholdslaster avhengigheter={[portefolje]}>
                    <table className="tabell tabell-skillestrek">
                        <thead>
                        <tr>
                            <th>Etternavn, fornavn</th>
                            <th>Fødselnummer</th>
                            <th>Veileder</th>
                            <th></th>
                            <th>
                                <div className="nav-input">
                                    <input className="nav-checkbox" id="checkbox-alle-brukere" type="checkbox" />
                                    <label htmlFor="checkbox-alle-brukere" />
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {portefolje.data.portefolje.brukere.map(bruker => <tr>
                            <td>{`${bruker.etternavn}, ${bruker.fornavn}`} </td>
                            <td>{bruker.fnr}</td>
                            <td> - </td>
                            <td>
                                {bruker.sikkerhetstiltak.map(tiltak =>
                                    <span>{tiltak}</span>)
                                }
                                {bruker.diskresjonskode == null ? <p/> : <span>{`Kode ${bruker.diskresjonskode}`}</span>}

                                {bruker.egenAnsatt == true ? <span>Egen ansatt</span> : <p/>}

                            </td>
                            <td>
                                <div className="nav-input">
                                    <input className="nav-checkbox" id={`checkbox-${bruker.fnr}`} type="checkbox" />
                                    <label htmlFor={`checkbox-${bruker.fnr}`} />
                                </div>
                            </td>
                        </tr>)}
                        </tbody>
                    </table>
                </Innholdslaster>
            </div>
        );
    }
}

EnhetSide.propTypes = {
    enheter: PT.arrayOf(enhetShape),
    valgtEnhet: PT.object,
    velgEnhet: PT.func.isRequired,
    hentPortefolje: PT.object,
    portefolje: PT.object
};

const mapStateToProps = state => ({
    enheter: state.enheter.data,
    valgtEnhet: state.enheter.valgtEnhet,
    portefolje: state.portefolje,
});

const mapDispatchToProps = dispatch => ({
    velgEnhet: enhet => dispatch(velgEnhetForSaksbehandler(enhet)),
    hentPortefolje: (enhet, ident) => dispatch(hentPortefoljeForEnhet(enhet, ident))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetSide);
