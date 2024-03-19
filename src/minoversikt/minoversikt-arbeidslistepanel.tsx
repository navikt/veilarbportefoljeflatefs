import * as React from 'react';
import ArbeidslisteModalRediger from '../components/modal/arbeidsliste/arbeidsliste-modal-rediger';
import {BrukerModell} from '../model-interfaces';
import {OrNothing} from '../utils/types/types';
import './minoversikt.css';
import {BodyShort, Detail, Label, Loader} from '@navikt/ds-react';

interface ArbeidslistePanelProps {
    bruker: BrukerModell;
    innloggetVeileder: OrNothing<string>;
    skalVises: boolean;
    settMarkert: (fnr: string, markert: boolean) => void;
    apen: boolean;
}

export default function ArbeidslistePanel({
    bruker,
    innloggetVeileder,
    skalVises,
    settMarkert,
    apen
}: ArbeidslistePanelProps) {
    const sistEndretDato = new Date(bruker.arbeidsliste.endringstidspunkt);
    const sistEndretAv =
        bruker.arbeidsliste.sistEndretAv && bruker.arbeidsliste.sistEndretAv.veilederId
            ? bruker.arbeidsliste.sistEndretAv.veilederId
            : String.fromCharCode(8212);
    const overskrift = !!bruker.arbeidsliste.overskrift ? bruker.arbeidsliste.overskrift : 'Ingen tekst i tittel';
    const kommentar = !!bruker.arbeidsliste.kommentar ? bruker.arbeidsliste.kommentar : 'Ingen tekst i kommentar';

    let arbeidslisteFristTekst;
    if (bruker.arbeidsliste.frist != null) {
        arbeidslisteFristTekst = new Date(bruker.arbeidsliste.frist).toLocaleDateString();
    } else {
        arbeidslisteFristTekst = 'Ingen valgt frist.';
    }

    return skalVises ? (
        <div className="brukerliste__arbeidslistepanel">
            <span className="brukerliste__gutter-left brukerliste--min-width-minside" />
            {apen && (
                <span className={'brukerliste__arbeidslisteinnhold flex--grow'}>
                    <Label data-testid="arbeidslistepanel_arbeidslisteinnhold_tittel">{overskrift}</Label>
                    <Detail className="brukerliste__arbeidslisteinnhold_frist">
                        Arbeidsliste frist: {arbeidslisteFristTekst}
                    </Detail>
                    <BodyShort size="small" data-testid="arbeidslistepanel_arbeidslisteinnhold_kommentar">
                        {kommentar}
                    </BodyShort>
                    {!bruker.arbeidsliste.hentetKommentarOgTittel && (
                        <Loader variant="neutral" size="xsmall" title="Henter arbeidsliste for bruker..." />
                    )}
                    <Detail className="brukerliste__arbeidslisteinnhold_footer">
                        {`Oppdatert ${sistEndretDato.toLocaleDateString()} av ${sistEndretAv}`}
                        <ArbeidslisteModalRediger
                            bruker={bruker}
                            innloggetVeileder={innloggetVeileder}
                            sistEndretDato={sistEndretDato}
                            sistEndretAv={sistEndretAv}
                            settMarkert={() => settMarkert(bruker.fnr, !bruker.markert)}
                        />
                    </Detail>
                </span>
            )}
        </div>
    ) : (
        <></>
    );
}
