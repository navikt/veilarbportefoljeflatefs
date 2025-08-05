import {BrukerModell} from '../../../typer/bruker-modell';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../../aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';
import {getVeilarbpersonflateUrl} from '../../../utils/url-utils';

interface LenkeKolonneProps {
    bruker: BrukerModell;
    lenke: string;
    lenketekst: string;
    erAbsoluttLenke?: boolean;
    enhetId: string;
    skalVises: boolean;
    className?: string;
}

export const LenkeKolonne = ({
    bruker,
    lenke,
    lenketekst,
    erAbsoluttLenke = false,
    enhetId,
    skalVises,
    className
}: LenkeKolonneProps) => {
    if (!skalVises) {
        return null;
    }

    const lenkeDetSkalNavigeresTil = erAbsoluttLenke ? lenke : getVeilarbpersonflateUrl(lenke, enhetId);

    const handterKlikk = () => oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, lenkeDetSkalNavigeresTil);

    const handterKlikkNyFane = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, lenkeDetSkalNavigeresTil, true);

    return (
        <div className={className}>
            <AksjonKnappMedPopoverFeilmelding
                klikkAksjon={handterKlikk}
                ctrlklikkAksjon={handterKlikkNyFane}
                knappStil="juster-tekst-venstre knapp-uten-padding"
                knappTekst={lenketekst || lenke.substring(0, 20) + '...'}
            />
        </div>
    );
};
