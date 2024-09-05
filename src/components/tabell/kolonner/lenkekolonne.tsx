import {BrukerModell} from '../../../model-interfaces';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../../aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';
import {getVeilarbpersonflateUrl} from '../../../utils/url-utils';

interface LenkeKolonneProps {
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
    enhetId: string;
}

const LenkeKolonne = ({className, bruker, skalVises, enhetId}: LenkeKolonneProps) => {
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
                    knappStil="juster-tekst-venstre"
                    knappTekst={tiltakshendelse.tekst}
                />
            )}
        </div>
    );
};

export default LenkeKolonne;
