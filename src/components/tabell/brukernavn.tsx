import * as React from 'react';
import {useDispatch} from 'react-redux';
import {BrukerModell} from '../../model-interfaces';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../utils/utils';
import {getVeilarbpersonflateUrl} from '../../utils/url-utils';
import {AksjonKnappMedPopoverFeilmelding} from '../aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';

interface BrukerNavnProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
}

const settSammenNavn = (bruker: BrukerModell) => {
    if (bruker.fornavn === '' && bruker.etternavn === '') {
        return null;
    }

    if (bruker.fornavn === '') {
        return bruker.etternavn;
    }

    if (bruker.etternavn === '') {
        return bruker.fornavn;
    }

    return `${bruker.etternavn}, ${bruker.fornavn}`;
};

const BrukerNavn = ({className, bruker, enhetId}: BrukerNavnProps) => {
    const dispatchForSidenavigeringMidlertidigFiks = useDispatch();
    const lenke = getVeilarbpersonflateUrl(null, enhetId);

    const navn = settSammenNavn(bruker);

    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, lenke, dispatchForSidenavigeringMidlertidigFiks);

    const handterKlikkNyFane = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, lenke, dispatchForSidenavigeringMidlertidigFiks, true);

    return (
        <div className={className}>
            {navn && (
                <AksjonKnappMedPopoverFeilmelding
                    klikkAksjon={handterKlikk}
                    ctrlklikkAksjon={handterKlikkNyFane}
                    knappStil="juster-tekst-venstre knapp-uten-padding"
                    knappTekst={navn}
                />
            )}
        </div>
    );
};

export default BrukerNavn;
