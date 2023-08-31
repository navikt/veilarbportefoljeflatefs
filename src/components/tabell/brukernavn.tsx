import * as React from 'react';
import {useRef, useState} from 'react';
import {BrukerModell} from '../../model-interfaces';
import '../../topp-meny/lenker.css';
import {Button} from '@navikt/ds-react';
import {TekstKolonne} from './kolonner/tekstkolonne';
import './brukernavn.css';
import {useEventListener} from '../../hooks/use-event-listener';
import {ReactComponent as XMarkOctagonIcon} from '../ikoner/x_mark_octagon_icon.svg';
import {oppdaterBrukerIKontekstOgNavigerTilLenke, vedKlikkUtenfor} from '../../utils/utils';
import {KnappOgPopover} from '../knapp-og-popover';
import {getVeilarbpersonflateUrl} from '../../utils/url-utils';

interface BrukerNavnProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
}

const BrukerNavn = ({className, bruker, enhetId}: BrukerNavnProps) => {
    const [laster, setLaster] = useState(false);
    const [harFeil, setHarFeil] = useState(false);

    const knappOgPopoverRef = useRef<HTMLDivElement>(null);

    useEventListener('mousedown', e =>
        vedKlikkUtenfor([knappOgPopoverRef], e.target, () => {
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
                <KnappOgPopover
                    ikon={<XMarkOctagonIcon />}
                    knappTekst="Feil i baksystem"
                    popoverInnhold={
                        <>
                            Fikk ikke kontakt med baksystemet. <br /> Prøv å åpne aktivitetsplanen og søk opp personen.
                        </>
                    }
                    innerRef={knappOgPopoverRef}
                />
            )}
        </div>
    );
};

export default BrukerNavn;
