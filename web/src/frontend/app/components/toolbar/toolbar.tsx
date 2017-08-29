import * as React from 'react';
import { FormEvent, PropTypes as PT, StatelessComponent } from 'react';
import VelgalleCheckboks from './velgalle-checkboks';
import Tildelbruker from './tildel-bruker';
import LeggTilArbeidsliste from './legg-til-arbeidsliste';
import SokVeilder from './sok-veileder';
import DiagramTabellToggle from './diagram-tabell-toggle';
import Paginering from './paginering/paginering';
import Listevisning from "./listevisning";

interface ToolbarProps {
    filtergruppe: string;
    onPaginering: (Event: FormEvent<HTMLButtonElement>) => void;
    sokVeilederSkalVises?: boolean;
    visesAnnenVeiledersPortefolje?: boolean;
    children?: React.ReactNode;
}

const Toolbar: StatelessComponent = ({ filtergruppe, onPaginering, sokVeilederSkalVises, visesAnnenVeiledersPortefolje }: ToolbarProps) => (
    <section className="toolbar blokk-xs">
        <div className="toolbar__element toolbar__venstre toolbar--skille-mellom-elementer">
            <VelgalleCheckboks />
            <Tildelbruker veileder={{}} filtergruppe={filtergruppe} />
            <Listevisning />
            <LeggTilArbeidsliste
                visArbeidslisteModal={false}
                visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
            />
            <SokVeilder veileder={{}} filtergruppe={filtergruppe} skalVises={sokVeilederSkalVises} />
        </div>
        <div className="toolbar__element toolbar__midten toolbar--skille-mellom-elementer">
            <DiagramTabellToggle filtergruppe={filtergruppe} />
        </div>
        <div className="toolbar__element toolbar__hoyre toolbar--skille-mellom-elementer">
            <Paginering className="toolbar--skille-mellom-elementer" onChange={onPaginering} />
        </div>
    </section>
);

Toolbar.propTypes = {
    filtergruppe: PT.string.isRequired,
    onPaginering: PT.func.isRequired,
    sokVeilederSkalVises: PT.bool,
    visesAnnenVeiledersPortefolje: PT.bool
};

Toolbar.defaultProps = {
    filtergruppe: 'veileder',
    visesAnnenVeiledersPortefolje: false
};

export default Toolbar;
