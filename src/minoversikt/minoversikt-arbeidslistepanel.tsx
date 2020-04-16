import * as React from 'react';
import ArbeidslisteModalRediger from '../components/modal/arbeidsliste/arbeidsliste-modal-rediger';
import { UndertekstBold } from 'nav-frontend-typografi';
import { BrukerModell } from '../model-interfaces';
import { OrNothing } from '../utils/types/types';
import './minoversikt.less';
import { useSelector } from 'react-redux';
import { AppState } from '../reducer';
import { VIS_FJERN_ARBEIDSLISTE_MODAL } from '../ducks/modal';

interface ArbeidslistePanelProps {
    bruker: BrukerModell;
    innloggetVeileder: OrNothing<string>;
    skalVises: boolean;
}

export default function ArbeidslistePanel({bruker, innloggetVeileder, skalVises}: ArbeidslistePanelProps) {
    const modalVises = useSelector((state: AppState) => state.modal.modal) === VIS_FJERN_ARBEIDSLISTE_MODAL;
    console.log(modalVises);

    const sistEndretDato = new Date(bruker.arbeidsliste.endringstidspunkt);
    const sistEndretAv = bruker.arbeidsliste.sistEndretAv.veilederId;
    const overskrift = !!bruker.arbeidsliste.overskrift ? bruker.arbeidsliste.overskrift : String.fromCharCode(8212);
    return (
        skalVises ?
            <article className="brukerliste__arbeidslistepanel">
            <span className="flex">
                <span className="brukerliste__gutter-left brukerliste--min-width-minside"/>
                <span className="brukerliste__arbeidslisteinnhold flex--grow">
                    <UndertekstBold>
                        {overskrift}
                    </UndertekstBold>
                    <p>{bruker.arbeidsliste.kommentar}</p>
                    <p className="brukerliste__arbeidslisteinnhold-footer typo-undertekst">
                        {`Oppdatert ${sistEndretDato.toLocaleDateString()} av ${sistEndretAv}`}
                        <ArbeidslisteModalRediger
                            bruker={bruker}
                            innloggetVeileder={innloggetVeileder}
                            sistEndretDato={sistEndretDato}
                            sistEndretAv={sistEndretAv}
                        />
                    </p>
                </span>
            </span>
            </article>
            : <></>
    );
}
