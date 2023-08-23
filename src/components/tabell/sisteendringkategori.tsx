import * as React from 'react';
import {useRef, useState} from 'react';
import classnames from 'classnames';
import {BrukerModell} from '../../model-interfaces';
import '../../topp-meny/lenker.css';
import {hendelserLabels} from '../../filtrering/filter-konstanter';
import {getPersonUrl} from '../../utils/url-utils';
import {BodyShort, Button, Popover} from '@navikt/ds-react';
import {settBrukerIKontekst} from '../../middleware/api';
import {useEventListener} from '../../hooks/use-event-listener';
import PopoverContent from '@navikt/ds-react/esm/popover/PopoverContent';
import {ReactComponent as XMarkOctagonIcon} from '../ikoner/x_mark_octagon_icon.svg';

interface SisteEndringKategoriProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
    skalVises: boolean;
}

function SisteEndringKategori({className, bruker, enhetId, skalVises}: SisteEndringKategoriProps) {
    const [laster, setLaster] = useState(false);
    const [harFeil, setHarFeil] = useState(false);
    const [linkPopoverApen, setLinkPopoverApen] = useState(false);

    const feilmeldingKnappRef = useRef<HTMLButtonElement>(null);
    const popoverContainerRef = useRef<HTMLDivElement>(null);

    const url = getPersonUrl(`/aktivitet/vis/${bruker.sisteEndringAktivitetId}#visAktivitetsplanen`, enhetId);

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

    const sisteEndringKategori = !!bruker.sisteEndringKategori ? hendelserLabels[bruker.sisteEndringKategori] : ' ';

    if (!skalVises) {
        return null;
    }

    if (bruker.sisteEndringAktivitetId === undefined || bruker.sisteEndringAktivitetId === null) {
        return (
            <BodyShort size="small" className={className}>
                {sisteEndringKategori}
            </BodyShort>
        );
    }

    return (
        <div className={className}>
            <Button
                className={classnames('lenke lenke--frittstaende')}
                loading={laster}
                onClick={oppdaterBrukerIKontekstOgNavigerTilLenke}
                size="xsmall"
                variant="tertiary"
            >
                <BodyShort size="small">{sisteEndringKategori}</BodyShort>
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
}

export default SisteEndringKategori;
