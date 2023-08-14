import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';
import {getPersonUrl} from '../../utils/url-utils';
import '../../topp-meny/lenker.css';
import {Alert, Button} from '@navikt/ds-react';
import {TekstKolonne} from './kolonner/tekstkolonne';
import {settBrukerIKontekst} from '../../middleware/api';
import {useState} from 'react';
import './brukernavn.css';

interface BrukerNavnProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
}

const BrukerNavn = ({className, bruker, enhetId}: BrukerNavnProps) => {
    const [laster, setLaster] = useState(false);
    const [harFeil, setHarFeil] = useState(false);

    const url = getPersonUrl(null, '', enhetId);

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
                <Alert inline variant="error">
                    Det skjedde en feil.
                </Alert>
            )}
        </div>
    );
};

export default BrukerNavn;
