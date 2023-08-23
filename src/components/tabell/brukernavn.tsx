import * as React from 'react';
import {useRef, useState} from 'react';
import {BrukerModell} from '../../model-interfaces';
import {getPersonUrl} from '../../utils/url-utils';
import '../../topp-meny/lenker.css';
import {Button, Popover} from '@navikt/ds-react';
import {TekstKolonne} from './kolonner/tekstkolonne';
import {settBrukerIKontekst} from '../../middleware/api';
import './brukernavn.css';
import PopoverContent from '@navikt/ds-react/esm/popover/PopoverContent';
import {useEventListener} from '../../hooks/use-event-listener';
import {ReactComponent as XMarkOctagonIcon} from '../ikoner/x_mark_octagon_icon.svg';

interface BrukerNavnProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
}

const BrukerNavn = ({className, bruker, enhetId}: BrukerNavnProps) => {
    const [laster, setLaster] = useState(false);
    const [harFeil, setHarFeil] = useState(false);
    const [linkPopoverApen, setLinkPopoverApen] = useState(false);

    const url = getPersonUrl(null, enhetId);
    const feilmeldingKnappRef = useRef<HTMLButtonElement>(null);
    const popoverContainerRef = useRef<HTMLDivElement>(null);

    useEventListener('mousedown', fjernFeilmeldingDersomKlikketUtenfor);

    function fjernFeilmeldingDersomKlikketUtenfor(event) {
        // Klikk skjedde på selve feilmeldingen eller inne i popover-en - ikke fjern feilmelding
        if (
            feilmeldingKnappRef.current?.contains(event.target) ||
            popoverContainerRef.current?.contains(event.target)
        ) {
            return;
        }

        if (harFeil) {
            setHarFeil(false);
        }
    }

    const settSammenNavn = bruker => {
        if (bruker.etternavn === '' && bruker.fornavn === '') {
            return '';
        }
        return `${bruker.etternavn}, ${bruker.fornavn}`;
    };

    const oppdaterBrukerIKontekstOgNavigerTilLenke = async () => {
        setHarFeil(false);
        setLaster(true);

        try {
            await settBrukerIKontekst(bruker.fnr);
            window.location.href = url;
        } catch (e) {
            setHarFeil(true);
            console.error('Klarte ikke å sette bruker i kontekst. Konsekvens: kan ikke navigere til lenke.');
        } finally {
            setLaster(false);
        }
    };

    return (
        <div className={className}>
            <Button
                loading={laster}
                onClick={oppdaterBrukerIKontekstOgNavigerTilLenke}
                size="xsmall"
                variant="tertiary"
            >
                <TekstKolonne className="brukernavn__knapp__tekst" skalVises={true} tekst={settSammenNavn(bruker)} />
            </Button>
            {harFeil && (
                <>
                    <Button
                        className="juster-tekst-venstre"
                        variant="tertiary-neutral"
                        size="xsmall"
                        onClick={() => setLinkPopoverApen(true)}
                        ref={feilmeldingKnappRef}
                        icon={<XMarkOctagonIcon />}
                    >
                        Feil i baksystem
                    </Button>
                    <Popover
                        ref={popoverContainerRef}
                        anchorEl={feilmeldingKnappRef.current}
                        open={linkPopoverApen}
                        onClose={() => setLinkPopoverApen(false)}
                        placement="bottom"
                        strategy="fixed"
                    >
                        <PopoverContent>
                            Fikk ikke kontakt med baksystemet. <br /> Prøv å åpne aktivitetsplanen og søk opp personen.
                        </PopoverContent>
                    </Popover>
                </>
            )}
        </div>
    );
};

export default BrukerNavn;
