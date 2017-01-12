import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentPortefoljeForEnhet } from '../ducks/portefolje';


class PortefoljeSide extends Component {
    componentWillMount() {
        const { valgtEnhet, hentPortefolje } = this.props;
        hentPortefolje(valgtEnhet.enhetId, this.props.portefolje.ident);
    }

    render() {
        const { portefolje } = this.props;
        return (
            <Innholdslaster avhengigheter={[portefolje]}>
                <div className="portefolje-side panel">
                    <h1 className="typo-innholdstittel">Portefølje</h1>


                    <table className="tabell tabell-skillestrek">
                        <thead>
                            <tr>
                                <th>Etternavn, fornavn</th>
                                <th>Fødselnummer</th>
                                <th>Veileder</th>
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
                                    <div className="nav-input">
                                        <input className="nav-checkbox" id={`checkbox-${bruker.fnr}`} type="checkbox" />
                                        <label htmlFor={`checkbox-${bruker.fnr}`} />
                                    </div>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>

                </div>
            </Innholdslaster>
        );
    }
}

PortefoljeSide.propTypes = {
    valgtEnhet: PT.object,
    hentPortefolje: PT.object,
    portefolje: PT.object
};

const mapStateToProps = state => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet
});

const mapDispatchToProps = dispatch => ({
    hentPortefolje: (enhet, ident) => dispatch(hentPortefoljeForEnhet(enhet, ident))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortefoljeSide);
