import * as React from 'react';
import { MouseEvent, useState } from 'react';
import classNames from 'classnames';
import ArbeidslisteButton from '../components/tabell/arbeidslistebutton';
import ArbeidslisteIkon from '../components/tabell/arbeidslisteikon';
import Etiketter from '../components/tabell/etiketter';
import {BrukerModell, EtikettType, FiltervalgModell, VeilederModell} from '../model-interfaces';
import Collapse from 'react-collapse';
import MinOversiktKolonner from './minoversikt-kolonner';
import ArbeidslistePanel from './minoversikt-arbeidslistepanel';
import { Kolonne } from '../ducks/ui/listevisning';
import Etikett from '../components/tabell/etikett';
import { useLayoutEffect, useRef } from 'react';
import {OrNothing} from "../utils/types/types";
import './minoversikt.less';
import {Checkbox} from "nav-frontend-skjema";
import {useFeatureSelector} from "../hooks/redux/use-feature-selector";
import {VEDTAKSTOTTE} from "../konstanter";

interface MinOversiktBrukerPanelProps {
    bruker: BrukerModell;
    settMarkert: (fnr: string, markert: boolean) => void;
    enhetId: OrNothing<string>;
    filtervalg: FiltervalgModell;
    innloggetVeileder: OrNothing<VeilederModell>;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    valgteKolonner: Kolonne[];
    varForrigeBruker?: boolean;
}

function MinoversiktBrukerPanel(props: MinOversiktBrukerPanelProps) {
    const [apen, setOpen] = useState<boolean>(false);
    const liRef = useRef<HTMLLIElement>(null);

    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
    const erVedtakStotteFeaturePa = useFeatureSelector()(VEDTAKSTOTTE);

    useLayoutEffect(() => {
        if (props.varForrigeBruker) {
            scrollToRef(liRef);
        }
    }, [props.varForrigeBruker]);

    function handleArbeidslisteButtonClick(event) {
        event.preventDefault();
        setOpen(!apen);
        if (props.onClick) {
            props.onClick(event);
        }
    }

    const {bruker, enhetId, filtervalg, valgteKolonner, innloggetVeileder, settMarkert, varForrigeBruker} = props;
    const arbeidslisteAktiv = bruker.arbeidsliste.arbeidslisteAktiv;
    const classname = classNames({
        'brukerliste--forrigeBruker': varForrigeBruker,
    });

    return (
        <li className={classname} ref={liRef}>
            <div className="brukerliste__element">
                <div className="brukerliste__gutter-left brukerliste--min-width-minside">
                    <Checkbox
                        checked={bruker.markert}
                        disabled={bruker.fnr === ''}
                        onChange={()=> settMarkert(bruker.fnr, !bruker.markert)}
                        label=""
                        className="brukerliste__checkbox"
                    />
                    <ArbeidslisteIkon skalVises={arbeidslisteAktiv}/>
                </div>
                <MinOversiktKolonner
                    className="brukerliste__innhold flex flex--center"
                    bruker={bruker}
                    filtervalg={filtervalg}
                    valgteKolonner={valgteKolonner}
                    enhetId={enhetId}
                />
                <div className="brukerliste__gutter-right">
                    <div className="brukerliste__etiketter">
                        <Etiketter bruker={bruker} erVedtakStotteFeaturePa={erVedtakStotteFeaturePa}/>
                        <Etikett
                            type={EtikettType.NYBRUKER}
                            skalVises={bruker.nyForVeileder}
                        >
                            Ny bruker
                        </Etikett>
                    </div>
                    <ArbeidslisteButton
                        skalVises={arbeidslisteAktiv}
                        apen={apen}
                        onClick={handleArbeidslisteButtonClick}
                    />
                </div>
            </div>
            <Collapse isOpened={apen}>
                <ArbeidslistePanel
                    bruker={bruker}
                    innloggetVeileder={innloggetVeileder && innloggetVeileder.ident}
                />
            </Collapse>
        </li>
    );
}

export default MinoversiktBrukerPanel;
