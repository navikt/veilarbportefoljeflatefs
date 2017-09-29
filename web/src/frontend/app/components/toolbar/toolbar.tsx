import * as React from 'react';
import { FormEvent } from 'react';
import VelgalleCheckboks from './velgalle-checkboks';
import Tildelbruker from './tildel-bruker';
import LeggTilArbeidsliste from './legg-til-arbeidsliste';
import SokVeilder from './sok-veileder';
import DiagramTabellToggle from './diagram-tabell-toggle';
import Paginering from './paginering/paginering';
import Listevisning from './listevisning/listevisning';
import {ListevisningType} from '../../ducks/ui/listevisning';

interface ToolbarProps {
    filtergruppe: ListevisningType;
    onPaginering: (fra: number, antall: number) => void;
    sokVeilederSkalVises?: boolean;
    visesAnnenVeiledersPortefolje?: boolean;
    children?: React.ReactNode;
}

const Toolbar = ({ filtergruppe, onPaginering, sokVeilederSkalVises, visesAnnenVeiledersPortefolje }: ToolbarProps) => (
    <section className="toolbar blokk-xs">
        <div className="toolbar__element toolbar__venstre toolbar--skille-mellom-elementer">
            <VelgalleCheckboks />
            <Tildelbruker veileder={{}} filtergruppe={filtergruppe} />
            <Listevisning filtergruppe={filtergruppe} skalVises={filtergruppe === ListevisningType.enhetensOversikt}/>
            <LeggTilArbeidsliste
                visArbeidslisteModal={false}
                visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje}
            />
            <SokVeilder veileder={{}} filtergruppe={filtergruppe === ListevisningType.enhetensOversikt ? 'enhet' : filtergruppe} skalVises={sokVeilederSkalVises} />
        </div>
        <div className="toolbar__element toolbar__midten toolbar--skille-mellom-elementer">
            <DiagramTabellToggle filtergruppe={filtergruppe} />
        </div>
        <div className="toolbar__element toolbar__hoyre toolbar--skille-mellom-elementer">
            <Paginering className="toolbar--skille-mellom-elementer" onChange={onPaginering} />
        </div>
    </section>
);

export default Toolbar;
