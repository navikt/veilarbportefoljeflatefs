import * as React from 'react';
import LeggTilArbeidsliste from './legg-til-arbeidsliste';
import SokVeileder from './sok-veileder';
import Paginering from './paginering/paginering';
import Listevisning from './listevisning/listevisning';
import { ListevisningType } from '../../ducks/ui/listevisning';
import './toolbar.less';
import TildelVeilederKnapp from './tildel-veileder-knapp';
import { visTildelVeilederModal } from '../../ducks/modal';
import { useDispatch } from 'react-redux';

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
    const {id, filtergruppe, gjeldendeVeileder, visesAnnenVeiledersPortefolje, sokVeilederSkalVises, antallTotalt, onPaginering} = props;
    const dispatch = useDispatch();

    return (
        <section className="toolbar blokk-xs" id={id}>
            <div className="toolbar__element toolbar__venstre toolbar--skille-mellom-elementer">
                <TildelVeilederKnapp
                    onClickHandler={() => dispatch(visTildelVeilederModal())}
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
}

export default Toolbar;
