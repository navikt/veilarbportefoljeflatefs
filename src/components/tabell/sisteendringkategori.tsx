import * as React from 'react';
import {useRef, useState} from 'react';
import classnames from 'classnames';
import {BrukerModell} from '../../model-interfaces';
import '../../topp-meny/lenker.css';
import {hendelserLabels} from '../../filtrering/filter-konstanter';
import {getVeilarbpersonflateUrl} from '../../utils/url-utils';
import {BodyShort, Button} from '@navikt/ds-react';
import {useEventListener} from '../../hooks/use-event-listener';
import {ReactComponent as XMarkOctagonIcon} from '../ikoner/x_mark_octagon_icon.svg';
import {oppdaterBrukerIKontekstOgNavigerTilLenke, vedKlikkUtenfor} from '../../utils/utils';
import {KnappOgPopover} from '../knapp-og-popover';

interface SisteEndringKategoriProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
    skalVises: boolean;
}

function SisteEndringKategori({className, bruker, enhetId, skalVises}: SisteEndringKategoriProps) {
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
            getVeilarbpersonflateUrl(`/aktivitet/vis/${bruker.sisteEndringAktivitetId}#visAktivitetsplanen`, enhetId),
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
                onClick={handterKlikk}
                size="xsmall"
                variant="tertiary"
            >
                <BodyShort size="small">{sisteEndringKategori}</BodyShort>
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
}

export default SisteEndringKategori;
