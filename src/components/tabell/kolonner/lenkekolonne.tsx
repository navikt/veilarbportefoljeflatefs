import {BrukerModell} from '../../../model-interfaces';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../../aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';
import {getVeilarbpersonflateUrl} from '../../../utils/url-utils';
import {useDispatch} from 'react-redux';

interface LenkeKolonneProps {
    bruker: BrukerModell;
    lenke: string;
    lenketekst: string;
    enhetId: string;
    skalVises: boolean;
    className?: string;
}

export const LenkeKolonne = ({bruker, lenke, lenketekst, enhetId, skalVises, className}: LenkeKolonneProps) => {
    const dispatchForSidenavigeringMidlertidigFiks = useDispatch();

    if (!skalVises) {
        return null;
    }

    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(
            bruker.fnr,
            getVeilarbpersonflateUrl(lenke, enhetId),
            dispatchForSidenavigeringMidlertidigFiks
        );

    const handterKlikkNyFane = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(
            bruker.fnr,
            getVeilarbpersonflateUrl(lenke, enhetId),
            dispatchForSidenavigeringMidlertidigFiks,
            true
        );

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
