import * as React from 'react';
import VelgalleCheckboks from './velgalle-checkboks';
import TildelVeileder from './tildel-veileder';
import LeggTilArbeidsliste from './legg-til-arbeidsliste';
import SokVeilder from './sok-veileder';
import DiagramTabellToggle from './diagram-tabell-toggle';
import Paginering from './paginering/paginering';
import Listevisning from './listevisning/listevisning';
import { ListevisningType, Veilederpaginering } from '../../ducks/ui/listevisning';
import { VeilederModell } from '../../model-interfaces';

interface ToolbarProps {
    filtergruppe: ListevisningType;
    onPaginering: (fra: number, antall: number) => void;
    sokVeilederSkalVises?: boolean;
    visesAnnenVeiledersPortefolje?: boolean;
    children?: React.ReactNode;
    gjeldendeVeileder?: VeilederModell;
    visningsmodus: string;
    antallTotalt: number;
}

const Toolbar = ({filtergruppe,
                     onPaginering,
                     sokVeilederSkalVises,
                     visesAnnenVeiledersPortefolje,
                     gjeldendeVeileder,
                     visningsmodus,
                     antallTotalt}: ToolbarProps) => (
    <section className="toolbar blokk-xs">
        <div className="toolbar__element toolbar__venstre toolbar--skille-mellom-elementer">
            <VelgalleCheckboks skalVises={filtergruppe in ListevisningType}/>
            <TildelVeileder
                skalVises={filtergruppe in ListevisningType}
                gjeldendeVeileder={gjeldendeVeileder}/>
            <Listevisning filtergruppe={filtergruppe}/>
            <LeggTilArbeidsliste visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje === true}/>
            <SokVeilder veileder={{}}
                        filtergruppe={filtergruppe === ListevisningType.enhetensOversikt ? 'enhet' : filtergruppe}
                        skalVises={sokVeilederSkalVises}/>
        </div>
        <div className="toolbar__element toolbar__midten toolbar--skille-mellom-elementer">
            <DiagramTabellToggle filtergruppe={filtergruppe}/>
        </div>
        <div className="toolbar__element toolbar__hoyre toolbar--skille-mellom-elementer">
            <Paginering className="toolbar--skille-mellom-elementer"
                        onChange={onPaginering}
                        skjul={visningsmodus === Veilederpaginering.DIAGRAMVISNING}
                        antallTotalt={antallTotalt}
            />
        </div>
    </section>
);

export default Toolbar;
