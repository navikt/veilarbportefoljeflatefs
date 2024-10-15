import {BrukerModell} from '../../../model-interfaces';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../../aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';
import {getVeilarbpersonflateUrl} from '../../../utils/url-utils';

interface LenkeKolonneProps {
    bruker: BrukerModell;
    lenke: string;
    lenketekst: string;
    enhetId: string;
    skalVises: boolean;
    className?: string;
    onClick?: () => void;
}

export const LenkeKolonne = ({
    bruker,
    lenke,
    lenketekst,
    enhetId,
    skalVises,
    onClick,
    className
}: LenkeKolonneProps) => {
    if (!skalVises) {
        return null;
    }

    const handterKlikk = () => {
        onClick?.();
        return oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, getVeilarbpersonflateUrl(lenke, enhetId));
    };

    const handterKlikkNyFane = () => {
        onClick?.();
        return oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, getVeilarbpersonflateUrl(lenke, enhetId), true);
    };

    return (
        <div className={className}>
            <AksjonKnappMedPopoverFeilmelding
                klikkAksjon={handterKlikk}
                ctrlklikkAksjon={handterKlikkNyFane}
                knappStil="juster-tekst-venstre knapp-uten-padding"
                knappTekst={!!lenketekst ? lenketekst : lenke.substring(0, 20) + '...'}
            />
        </div>
    );
};
