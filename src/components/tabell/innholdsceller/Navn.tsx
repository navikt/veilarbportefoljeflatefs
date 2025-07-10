import {BrukerModell} from '../../../typer/bruker-modell';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../../utils/utils';
import {getVeilarbpersonflateUrl} from '../../../utils/url-utils';
import {AksjonKnappMedPopoverFeilmelding} from '../../aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';

interface BrukerNavnProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
}

const settSammenNavn = (bruker: BrukerModell) => {
    if (bruker.fornavn === '' && bruker.etternavn === '') {
        return null;
    }

    if (bruker.fornavn === '') {
        return bruker.etternavn;
    }

    if (bruker.etternavn === '') {
        return bruker.fornavn;
    }

    return `${bruker.etternavn}, ${bruker.fornavn}`;
};

export const Navn = ({className, bruker, enhetId}: BrukerNavnProps) => {
    const navn = settSammenNavn(bruker);

    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, getVeilarbpersonflateUrl(null, enhetId));

    const handterKlikkNyFane = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, getVeilarbpersonflateUrl(null, enhetId), true);

    return (
        <div className={className}>
            {navn && (
                <AksjonKnappMedPopoverFeilmelding
                    klikkAksjon={handterKlikk}
                    ctrlklikkAksjon={handterKlikkNyFane}
                    knappStil="juster-tekst-venstre knapp-uten-padding"
                    knappTekst={navn}
                />
            )}
        </div>
    );
};
