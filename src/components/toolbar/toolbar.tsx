import * as React from 'react';
import VelgalleCheckboks from './velgalle-checkboks';
import TildelVeileder from './tildel-veileder';
import LeggTilArbeidsliste from './legg-til-arbeidsliste';
import SokVeileder from './sok-veileder';
import Paginering from './paginering/paginering';
import Listevisning from './listevisning/listevisning';
import { ListevisningType } from '../../ducks/ui/listevisning';

export enum ToolbarPosisjon {
    OVER = 'OVER',
    UNDER = 'UNDER'
}

interface ToolbarProps {
    filtergruppe: ListevisningType;
    onPaginering?: (fra?: number, antall?: number) => void;
    sokVeilederSkalVises?: boolean;
    visesAnnenVeiledersPortefolje?: boolean;
    children?: React.ReactNode;
    gjeldendeVeileder?: string;
    visningsmodus?: string;
    antallTotalt: number;
    posisjon?: ToolbarPosisjon;
}

const Toolbar = ({filtergruppe,
                     onPaginering,
                     sokVeilederSkalVises,
                     visesAnnenVeiledersPortefolje,
                     gjeldendeVeileder,
                     antallTotalt,
                     posisjon}: ToolbarProps) => (
    <section className="toolbar blokk-xs">
        <div className="toolbar__element toolbar__venstre toolbar--skille-mellom-elementer">
            <VelgalleCheckboks skalVises={filtergruppe in ListevisningType} toolbarPosisjon={posisjon}/>
            <TildelVeileder
                skalVises={filtergruppe in ListevisningType}
                filtergruppe={filtergruppe}
                gjeldendeVeileder={gjeldendeVeileder}
                toolbarPosisjon={posisjon}
            />
            <Listevisning filtergruppe={filtergruppe} toolbarPosisjon={posisjon}/>
            <LeggTilArbeidsliste
                visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje || false}
                toolbarPosisjon={posisjon}
            />
            <SokVeileder
                veileder={{}}
                filtergruppe={filtergruppe === ListevisningType.enhetensOversikt ? 'enhet' : filtergruppe}
                skalVises={sokVeilederSkalVises}
                toolbarPosisjon={posisjon}
            />
        </div>
        <div className="toolbar__element toolbar__hoyre toolbar--skille-mellom-elementer">
            <Paginering
                className="toolbar--skille-mellom-elementer"
                onChange={onPaginering}
                antallTotalt={antallTotalt}
                toolbarPosisjon={posisjon}
            />
        </div>
    </section>
);

export default Toolbar;
