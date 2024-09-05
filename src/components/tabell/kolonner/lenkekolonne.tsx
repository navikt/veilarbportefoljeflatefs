import {BrukerModell} from '../../../model-interfaces';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../../aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';

interface LenkeKolonneProps {
    className?: string;
    bruker: BrukerModell;
    skalVises: boolean;
}

const LenkeKolonne = ({className, bruker, skalVises}: LenkeKolonneProps) => {
    if (!skalVises || !bruker.tiltakshendelse) {
        return null;
    }
    const tiltakshendelse = bruker.tiltakshendelse;

    const handterKlikk = () => oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, tiltakshendelse.lenke);

    const handterKlikkNyFane = () => oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, tiltakshendelse.lenke, true);

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
