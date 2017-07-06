import React, { PropTypes as PT } from 'react';
import VelgalleCheckboks from './velgalle-checkboks';
import Tildelbruker from './tildel-bruker';
import LeggTilArbeidsliste from './legg-til-arbeidsliste';
import SokVeilder from './sok-veileder';
import DiagramTabellToggle from './diagram-tabell-toggle';
import Paginering from './paginering/paginering';

function Toolbar({ filtergruppe, onPaginering }) {
    return (
        <section className="toolbar blokk-xs">
            <div className="toolbar__element toolbar__venstre toolbar--skille-mellom-elementer">
                <VelgalleCheckboks />
                <Tildelbruker veileder={{}} filtergruppe={filtergruppe} />
                <LeggTilArbeidsliste visArbeidslisteModal={false} />
                <SokVeilder veileder={{}} filtergruppe={filtergruppe} />
            </div>
            <div className="toolbar__element toolbar__midten toolbar--skille-mellom-elementer">
                <DiagramTabellToggle filtergruppe={filtergruppe} />
            </div>
            <div className="toolbar__element toolbar__hoyre toolbar--skille-mellom-elementer">
                <Paginering className="toolbar--skille-mellom-elementer" onChange={onPaginering} />
            </div>
        </section>
    );
}

Toolbar.propTypes = {
    filtergruppe: PT.string.isRequired,
    onPaginering: PT.func.isRequired
};

Toolbar.defaultProps = {
    filtergruppe: 'enhet'
};

export default Toolbar;
