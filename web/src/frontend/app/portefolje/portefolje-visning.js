import React, {Component, PropTypes as PT} from 'react';
import {connect} from 'react-redux';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {hentPortefoljeForEnhet} from '../ducks/portefolje';
import Pagination from '../utils/pagination';


class PortefoljeVisning extends Component {
    componentWillMount() {
        const {valgtEnhet, hentPortefolje} = this.props;
        if (valgtEnhet) {
            hentPortefolje(valgtEnhet.enhetId, this.props.ident);
        }
    }

    render() {
        const {portefolje, valgtEnhet, ident, hentPortefolje} = this.props;
        const {antallTotalt, antallReturnert, fraIndex} = portefolje.data;


        return (
            <Innholdslaster avhengigheter={[portefolje]}>
                <Pagination antallTotalt={antallTotalt}
                            fraIndex={fraIndex}
                            antallReturnert={antallReturnert}
                            hentPortefolje={(fra, totalt) => hentPortefolje(valgtEnhet.enhetId, ident, fra, totalt)}/>
                <table className="tabell tabell-skillestrek">
                    <thead>
                    <tr>
                        <th>Etternavn, fornavn</th>
                        <th>Fødselnummer</th>
                        <th>Veileder</th>
                        <th></th>
                        <th>
                            <div className="nav-input">
                                <input className="nav-checkbox" id="checkbox-alle-brukere" type="checkbox"/>
                                <label htmlFor="checkbox-alle-brukere"/>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {portefolje.data.portefolje.brukere.map(bruker => <tr key={bruker.fnr}>
                        <td>{`${bruker.etternavn}, ${bruker.fornavn}`} </td>
                        <td>{bruker.fnr}</td>
                        <td>{`${bruker.veileder.etternavn}, ${bruker.veileder.fornavn}`} </td>
                        <td>
                            {bruker.sikkerhetstiltak.length > 0 ? <span>Sikkerhetstiltak</span> : null}
                            {bruker.diskresjonskode != null ? <span>{`Kode ${bruker.diskresjonskode}`}</span> : null}
                            {bruker.egenAnsatt == true ? <span>Egen ansatt</span> : null}
                        </td>
                        <td>
                            <div className="nav-input">
                                <input className="nav-checkbox" id={`checkbox-${bruker.fnr}`} type="checkbox"/>
                                <label htmlFor={`checkbox-${bruker.fnr}`}/>
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
    ident: PT.string,
    hentPortefolje: PT.func
};

const mapStateToProps = state => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    ident: state.enheter.ident
});

const mapDispatchToProps = dispatch => ({
    hentPortefolje: (enhet, ident, fra=0, antall=20) => dispatch(hentPortefoljeForEnhet(enhet, ident, fra, antall))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortefoljeVisning);
