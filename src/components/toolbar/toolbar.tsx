import * as React from 'react';
import TildelVeileder from './tildel-veileder';
import LeggTilArbeidsliste from './legg-til-arbeidsliste';
import SokVeileder from './sok-veileder';
import Paginering from './paginering/paginering';
import Listevisning from './listevisning/listevisning';
import { ListevisningType } from '../../ducks/ui/listevisning';
import { VeilederModell } from '../../model-interfaces';

interface ToolbarProps {
    filtergruppe: ListevisningType;
    onPaginering?: (fra?: number, antall?: number) => void;
    sokVeilederSkalVises?: boolean;
    visesAnnenVeiledersPortefolje?: boolean;
    children?: React.ReactNode;
    gjeldendeVeileder?: VeilederModell;
    visningsmodus?: string;
    antallTotalt: number;
}

const Toolbar = ({
                     filtergruppe,
                     onPaginering,
                     sokVeilederSkalVises,
                     visesAnnenVeiledersPortefolje,
                     gjeldendeVeileder,
                     visningsmodus,
                     antallTotalt,
                 }: ToolbarProps) => (
    <section className="toolbar blokk-xs">
        <div className="toolbar__element toolbar__venstre toolbar--skille-mellom-elementer">
            <TildelVeileder
                skalVises={filtergruppe in ListevisningType}
                filtergruppe={filtergruppe}
                gjeldendeVeileder={gjeldendeVeileder}
            />
            <LeggTilArbeidsliste
                visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje || false}
            />
            <SokVeileder
                veileder={{}}
                filtergruppe={filtergruppe === ListevisningType.enhetensOversikt ? 'enhet' : filtergruppe}
                skalVises={sokVeilederSkalVises}
            />
        </div>
        <div className="toolbar__element toolbar__hoyre toolbar--skille-mellom-elementer">
            <Listevisning filtergruppe={filtergruppe}/>
            <Paginering
                className="toolbar--skille-mellom-elementer"
                onChange={onPaginering}
                antallTotalt={antallTotalt}
            />
        </div>
    </section>
);

export default Toolbar;
