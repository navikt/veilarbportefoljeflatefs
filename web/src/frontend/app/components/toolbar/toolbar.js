import React from 'react';
import VelgalleCheckboks from './velgalle-checkboks';
import Tildelbruker from "./tildel-bruker";
import LeggTilArbeidsliste from "./legg-til-arbeidsliste";
import SokVeilder from "./sok-veileder";
import DiagramTabellToggle from "./diagram-tabell-toggle";
import Paginering from "./paginering/paginering";

function Toolbar({ filtergruppe, onPaginering }) {
    console.log('filtergruppe', filtergruppe);

    return (
        <section className="toolbar blokk-xs">
            <div className="toolbar__element toolbar__venstre toolbar--skille-mellom-elementer">
                <VelgalleCheckboks />
                <Tildelbruker veileder={{}} filtergruppe={filtergruppe} />
                <LeggTilArbeidsliste />
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

Toolbar.defaultProps = {
    filtergruppe: 'enhet'
};

export default Toolbar;
