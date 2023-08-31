import * as React from 'react';
import {useRef, useState} from 'react';
import {BrukerModell} from '../../model-interfaces';
import {getVeilarbpersonflateUrl} from '../../utils/url-utils';
import '../../topp-meny/lenker.css';
import {Button, Popover} from '@navikt/ds-react';
import {TekstKolonne} from './kolonner/tekstkolonne';
import './brukernavn.css';
import PopoverContent from '@navikt/ds-react/esm/popover/PopoverContent';
import {useEventListener} from '../../hooks/use-event-listener';
import {ReactComponent as XMarkOctagonIcon} from '../ikoner/x_mark_octagon_icon.svg';
import {oppdaterBrukerIKontekstOgNavigerTilLenke, vedKlikkUtenfor} from '../../utils/utils';

interface BrukerNavnProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
}

const BrukerNavn = ({className, bruker, enhetId}: BrukerNavnProps) => {
    const [laster, setLaster] = useState(false);
    const [harFeil, setHarFeil] = useState(false);
    const [linkPopoverApen, setLinkPopoverApen] = useState(false);

    const feilmeldingKnappRef = useRef<HTMLButtonElement>(null);
    const popoverContainerRef = useRef<HTMLDivElement>(null);

    useEventListener('mousedown', e =>
        vedKlikkUtenfor([feilmeldingKnappRef, popoverContainerRef], e.target, () => {
            if (harFeil) {
                setHarFeil(false);
            }
        })
    );

    const handterKlikk = () => {
        setHarFeil(false);
        setLaster(true);

        oppdaterBrukerIKontekstOgNavigerTilLenke(
            bruker.fnr,
            getVeilarbpersonflateUrl(null, enhetId),
            () => {
                setHarFeil(false);
                setLaster(false);
            },
            () => {
                setHarFeil(true);
                setLaster(false);
            }
        );
    };

    const settSammenNavn = bruker => {
        if (bruker.etternavn === '' && bruker.fornavn === '') {
            return '';
        }
        return `${bruker.etternavn}, ${bruker.fornavn}`;
    };

    return (
        <div className={className}>
            <Button loading={laster} onClick={handterKlikk} size="xsmall" variant="tertiary">
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
