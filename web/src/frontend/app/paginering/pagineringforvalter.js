import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Paginering from './paginering';
import { settSubListeForPaginering, settListeSomSkalPagineres,
    klarerPagineringsliste } from '../ducks/paginering';
import { veilederShape } from '../proptype-shapes';

class PagineringForvalter extends Component {

    componentWillMount() {
        this.props.opprettPaginering(this.props.liste);
        this.props.settSubListe(this.props.fraIndeksForSubListe);
    }

    componentWillUnmount() {
        this.props.klarerPaginering();
    }

    render() {
        const { liste, fraIndeksForSubListe, sideStorrelse, settSubListe, pagineringTekstId, subListe } = this.props;

        const pagineringTekst = (
            <FormattedMessage
                id={pagineringTekstId}
                values={{
                    fraIndex: `${fraIndeksForSubListe}`,
                    tilIndex: fraIndeksForSubListe + subListe.length,
                    antallTotalt: liste.length
                }}
            />
        );

        return (
            <div>
                <Paginering
                    antallTotalt={liste.length}
                    fraIndex={fraIndeksForSubListe}
                    hentListe={(fra) => { settSubListe(fra); }}
                    tekst={pagineringTekst}
                    sideStorrelse={sideStorrelse}
                />
            </div>
        );
    }
}

PagineringForvalter.propTypes = {
    liste: PT.arrayOf(veilederShape),
    pagineringTekstId: PT.string.isRequired,
    fraIndeksForSubListe: PT.number.isRequired,
    sideStorrelse: PT.number.isRequired,
    opprettPaginering: PT.func.isRequired,
    klarerPaginering: PT.func.isRequired,
    settSubListe: PT.func.isRequired,
    subListe: PT.arrayOf(veilederShape)
};

const mapStateToProps = state => ({
    fraIndeksForSubListe: state.paginering.fraIndeksForSubListe,
    sideStorrelse: state.paginering.sideStorrelse,
    subListe: state.paginering.subListe
});

const mapDispatchToProps = dispatch => ({
    opprettPaginering: liste => dispatch(settListeSomSkalPagineres(liste)),
    klarerPaginering: () => dispatch(klarerPagineringsliste()),
    settSubListe: fra => dispatch(settSubListeForPaginering(fra))
});

export default connect(mapStateToProps, mapDispatchToProps)(PagineringForvalter);

