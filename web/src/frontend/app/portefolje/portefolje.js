import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentPortefoljeForEnhet } from '../ducks/portefolje';


class PortefoljeVisning extends Component {
    componentWillMount() {
        const { valgtEnhet, hentPortefolje } = this.props;
        if (valgtEnhet) {
            hentPortefolje(valgtEnhet.enhetId, this.props.portefolje.ident);
        }
    }

    render() {
        const { portefolje} = this.props;
        const spaceStyle = {
            padding: '20px 5px'
        };


        return (
            <Innholdslaster avhengigheter={[portefolje]}>
                <h3 style={spaceStyle}>{`${portefolje.data.portefolje.brukere.length} brukere`}</h3>
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
                        <td>{`${bruker.veileder.etternavn}, ${bruker.veileder.fornavn}`} </td>
                        <td>
                            {bruker.sikkerhetstiltak.map(tiltak =>
                                <span>{tiltak}</span>)
                            }
                            {bruker.diskresjonskode == null ? null : <span>{`Kode ${bruker.diskresjonskode}`}</span>}

                            {bruker.egenAnsatt == true ? <span>Egen ansatt</span> : null}

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
        );
    }
}

PortefoljeVisning.propTypes = {
    valgtEnhet: PT.object,
    portefolje: PT.object,
    hentPortefolje: PT.func
};

const mapStateToProps = state => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet
});

const mapDispatchToProps = dispatch => ({
    hentPortefolje: (enhet, ident) => dispatch(hentPortefoljeForEnhet(enhet, ident))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortefoljeVisning);
