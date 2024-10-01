import {useDispatch} from 'react-redux';
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
}

export const LenkeKolonne = ({bruker, lenke, lenketekst, enhetId, skalVises, className}: LenkeKolonneProps) => {
    const dispatchForSidenavigeringMidlertidigFiks = useDispatch();
    const fullstendigLenke = getVeilarbpersonflateUrl(lenke, enhetId);

    if (!skalVises) {
        return null;
    }

    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(
            bruker.fnr,
            fullstendigLenke,
            dispatchForSidenavigeringMidlertidigFiks
        );

    const handterKlikkNyFane = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(
            bruker.fnr,
            fullstendigLenke,
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
