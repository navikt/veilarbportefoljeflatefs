import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';
import '../../topp-meny/lenker.css';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../utils/utils';
import {getVeilarbpersonflateUrl} from '../../utils/url-utils';
import {AksjonKnappMedPopoverFeilmelding} from '../aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {VIS_KNAPP_FOR_APNE_BRUKER_NY_FANE} from '../../konstanter';

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
    const navn = settSammenNavn(bruker);

    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, getVeilarbpersonflateUrl(null, enhetId));

    const handterKlikkNyFane = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(bruker.fnr, getVeilarbpersonflateUrl(null, enhetId), true);

    const visKnappForApneBrukerNyFane = useFeatureSelector()(VIS_KNAPP_FOR_APNE_BRUKER_NY_FANE);

    return (
        <div className={className}>
            {navn && (
                <AksjonKnappMedPopoverFeilmelding
                    aksjon={handterKlikk}
                    aksjonNyFane={handterKlikkNyFane}
                    knappStil="juster-tekst-venstre"
                    knappTekst={navn}
                    inkluderKnappForApningINyFane={visKnappForApneBrukerNyFane}
                />
            )}
        </div>
    );
};

export default BrukerNavn;
