import * as React from 'react';
import Paginering from './paginering/paginering';
import Listevisning from './listevisning/listevisning';
import { ListevisningType } from '../../ducks/ui/listevisning';
import './toolbar.less';
import TildelVeilederKnapp from './tildel-veileder-knapp';
import { useSelector } from 'react-redux';
import LeggTilArbeidsliste from './legg-til-arbeidsliste-knapp';
import SokVeilederKnapp from './sok-veileder-knapp';
import { AppState } from '../../reducer';

interface ToolbarProps {
    filtergruppe: ListevisningType;
    onPaginering?: (fra?: number, antall?: number) => void;
    sokVeilederSkalVises?: boolean;
    visesAnnenVeiledersPortefolje?: boolean;
    children?: React.ReactNode;
    gjeldendeVeileder?: string;
    antallTotalt: number;
    id?: string;
}

function Toolbar(props: ToolbarProps) {
    const {id, filtergruppe, gjeldendeVeileder, visesAnnenVeiledersPortefolje, antallTotalt, onPaginering} = props;
    const brukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const valgteBrukere = brukere.filter((bruker) => bruker.markert === true);
    const aktiv = valgteBrukere.length > 0;

    return (
        <section className="toolbar blokk-xs" id={id}>
            <div className="toolbar__element toolbar__venstre toolbar--skille-mellom-elementer">
                <div className="tildel-veileder-wrapper">
                    <TildelVeilederKnapp
                        skalVises={filtergruppe in ListevisningType}
                        filtergruppe={filtergruppe}
                        gjeldendeVeileder={gjeldendeVeileder}
                        aktiv={aktiv}
                    />
                </div>
                <LeggTilArbeidsliste
                    visesAnnenVeiledersPortefolje={visesAnnenVeiledersPortefolje || false}
                />
                <div className="sok-veileder-wrapper">
                    <SokVeilederKnapp
                        skalVises={props.sokVeilederSkalVises}
                    />
                </div>
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
}

export default Toolbar;
