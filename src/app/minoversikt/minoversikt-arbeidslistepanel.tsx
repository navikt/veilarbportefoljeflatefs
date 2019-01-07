import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import ArbeidslisteModalRediger from '../modal/arbeidsliste-modal-rediger';
import { UndertekstBold } from 'nav-frontend-typografi';
import { BrukerModell } from '../model-interfaces';

interface ArbeidslistePanelProps {
    bruker: BrukerModell;
    innloggetVeileder: string;
    redigerArbeidslisteModalIsOpen: boolean;
    lukkRedigerArbeidslisteModal: () => void;
    redigerOnClickHandler: () => void;
}

export default function ArbeidslistePanel({bruker, innloggetVeileder, redigerArbeidslisteModalIsOpen, lukkRedigerArbeidslisteModal, redigerOnClickHandler}: ArbeidslistePanelProps) {
    const sistEndretDato = new Date(bruker.arbeidsliste.endringstidspunkt);
    const sistEndretAv = bruker.arbeidsliste.sistEndretAv.veilederId;
    const overskrift = !!bruker.arbeidsliste.overskrift ? bruker.arbeidsliste.overskrift : String.fromCharCode(8212);
    return (
        <article className="brukerliste__arbeidslistepanel">
            <span className="flex">
                <span className="brukerliste__gutter-left brukerliste--min-width-minside"/>
                <span className="brukerliste__innhold brukerliste__arbeidslisteinnhold flex--grow">
                    <UndertekstBold>
                        {overskrift}
                    </UndertekstBold>
                    <p>{bruker.arbeidsliste.kommentar}</p>
                    <p className="brukerliste__arbeidslisteinnhold-footer typo-undertekst">
                        <FormattedMessage
                            id="arbeidsliste.kommentar.footer"
                            values={{
                                dato: sistEndretDato.toLocaleDateString(),
                                veileder: sistEndretAv
                            }}
                        />
                        <button
                            className="lenke lenke--frittstående arbeidsliste--rediger-lenke"
                            onClick={redigerOnClickHandler}
                        >
                            <FormattedMessage id="arbeidsliste.kommentar.footer.knapp"/>
                        </button>
                        <ArbeidslisteModalRediger
                            bruker={bruker}
                            isOpen={redigerArbeidslisteModalIsOpen}
                            lukkModal={lukkRedigerArbeidslisteModal}
                            innloggetVeileder={innloggetVeileder}
                            sistEndretDato={sistEndretDato}
                            sistEndretAv={sistEndretAv}
                        />
                    </p>
                </span>
            </span>
        </article>
    );
}
