import {BrukerModell} from '../../../model-interfaces';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../../aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';
import {getVeilarbpersonflateUrl} from '../../../utils/url-utils';

interface LenkeKolonneProps {
    bruker: BrukerModell;
    skalVises: boolean;
    enhetId: string;
    className?: string;
}

export const TiltakshendelseLenkeKolonne = ({bruker, skalVises, enhetId, className}: LenkeKolonneProps) => {
    if (!skalVises || !bruker.tiltakshendelse) {
        return null;
    }

    const tiltakshendelse = bruker.tiltakshendelse;

    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, getVeilarbpersonflateUrl(tiltakshendelse.lenke, enhetId));

    const handterKlikkNyFane = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(
            bruker.fnr,
            getVeilarbpersonflateUrl(tiltakshendelse.lenke, enhetId),
            true
        );

    return (
        <div className={className}>
            {tiltakshendelse && (
                <AksjonKnappMedPopoverFeilmelding
                    klikkAksjon={handterKlikk}
                    ctrlklikkAksjon={handterKlikkNyFane}
                    knappStil="juster-tekst-venstre knapp-uten-padding"
                    knappTekst={tiltakshendelse.tekst}
                />
            )}
        </div>
    );
};
