import * as React from 'react';
import { MouseEvent, useState } from 'react';
import classNames from 'classnames';
import ArbeidslisteButton from '../components/tabell/arbeidslistebutton';
import CheckBox from '../components/tabell/checkbox';
import ArbeidslisteIkon from '../components/tabell/arbeidslisteikon';
import Etiketter from '../components/tabell/etiketter';
import { BrukerModell, EtikettType, FiltervalgModell } from '../model-interfaces';
import Collapse from 'react-collapse';
import MinOversiktKolonner from './minoversikt-kolonner';
import ArbeidslistePanel from './minoversikt-arbeidslistepanel';
import { Kolonne } from '../ducks/ui/listevisning';
import Etikett from '../components/tabell/etikett';
import { useLayoutEffect, useRef } from 'react';

interface MinOversiktBrukerPanelProps {
    bruker: BrukerModell;
    settMarkert: (fnr: string, markert: boolean) => void;
    enhetId: string;
    filtervalg: FiltervalgModell;
    innloggetVeileder: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    valgteKolonner: Kolonne[];
    varForrigeBruker?: boolean;
}
function MinoversiktBrukerPanel(props: MinOversiktBrukerPanelProps) {
    const [apen, setOpen] = useState<boolean>(false);
    const liRef = useRef<HTMLLIElement>(null);

    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

    useLayoutEffect(() => {
        if (varForrigeBruker) {
            scrollToRef(liRef);
        }
    }, [liRef.current, props.varForrigeBruker]);

    function handleArbeidslisteButtonClick(event) {
        event.preventDefault();
        setOpen(!apen);
        if (props.onClick) {
            props.onClick(event);
        }
    }

    const { bruker, enhetId, filtervalg, valgteKolonner, innloggetVeileder, settMarkert, varForrigeBruker } = props;
    const arbeidslisteAktiv = bruker.arbeidsliste.arbeidslisteAktiv;
    const classname  = classNames('brukerliste--border-bottom-thin ', {
        'brukerliste--forrigeBruker': varForrigeBruker,
    });

    return (
        <li className={classname}>
            <div className="brukerliste__element">
                <div className="brukerliste__gutter-left brukerliste--min-width-minside">
                    <CheckBox bruker={bruker} settMarkert={settMarkert}/>
                    <ArbeidslisteIkon skalVises={arbeidslisteAktiv}/>
                </div>
                <MinOversiktKolonner
                    className="brukerliste__innhold flex flex--center"
                    bruker={bruker}
                    filtervalg={filtervalg}
                    valgteKolonner={valgteKolonner}
                    enhetId={enhetId}
                    skalJusteres={!arbeidslisteAktiv}
                />
                <div className="brukerliste__gutter-right">
                    <ArbeidslisteButton
                        skalVises={arbeidslisteAktiv}
                        apen={apen}
                        onClick={handleArbeidslisteButtonClick}
                    />
                    <div>
                        <Etiketter bruker={bruker}/>
                        <Etikett
                            type={EtikettType.NYBRUKER}
                            skalVises={bruker.nyForVeileder}
                        >
                            Ny Bruker
                        </Etikett>
                    </div>
                </div>
            </div>
            <Collapse isOpened={apen}>
                <ArbeidslistePanel
                    bruker={bruker}
                    innloggetVeileder={innloggetVeileder}
                />
            </Collapse>
        </li>
    );
}

export default MinoversiktBrukerPanel;
