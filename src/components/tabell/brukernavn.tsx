import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';
import '../../topp-meny/lenker.css';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../utils/utils';
import {getVeilarbpersonflateUrl} from '../../utils/url-utils';
import {AksjonKnappMedPopoverFeilmelding} from '../aksjon-knapp-med-popover-feilmelding';

interface BrukerNavnProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
}

const BrukerNavn = ({className, bruker, enhetId}: BrukerNavnProps) => {
    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, getVeilarbpersonflateUrl(null, enhetId));

    const settSammenNavn = bruker => {
        if (bruker.etternavn === '' && bruker.fornavn === '') {
            return '';
        }
        return `${bruker.etternavn}, ${bruker.fornavn}`;
    };

    return (
        <div className={className}>
            <AksjonKnappMedPopoverFeilmelding
                aksjon={handterKlikk}
                knappStil="juster-tekst-venstre"
                knappTekst={`${settSammenNavn(bruker)}`}
            />
        </div>
    );
};

export default BrukerNavn;
