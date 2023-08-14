import * as React from 'react';
import {useState} from 'react';
import classnames from 'classnames';
import {BrukerModell} from '../../model-interfaces';
import '../../topp-meny/lenker.css';
import {hendelserLabels} from '../../filtrering/filter-konstanter';
import {getPersonUrl} from '../../utils/url-utils';
import {Alert, BodyShort, Button} from '@navikt/ds-react';
import {settBrukerIKontekst} from '../../middleware/api';

interface SisteEndringKategoriProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
    skalVises: boolean;
}

function SisteEndringKategori({className, bruker, enhetId, skalVises}: SisteEndringKategoriProps) {
    const [laster, setLaster] = useState(false);
    const [harFeil, setHarFeil] = useState(false);
    const url = getPersonUrl(null, `/aktivitet/vis/${bruker.sisteEndringAktivitetId}#visAktivitetsplanen`, enhetId);

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

    if (!skalVises) {
        return null;
    }
    const sisteEndringKategori = !!bruker.sisteEndringKategori ? hendelserLabels[bruker.sisteEndringKategori] : ' ';
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
                <Alert inline variant="error">
                    Det skjedde en feil.
                </Alert>
            )}
        </div>
    );
}

export default SisteEndringKategori;
