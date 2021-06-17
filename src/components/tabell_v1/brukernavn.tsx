import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';
import '../../topp-meny/lenker.less';
import {OrNothing} from "../../utils/types/types";
import {setFraBrukerIUrl} from "../../utils/url-utils";
import classnames from "classnames";

const brukerNavn = (fornavn: string, etternavn: string) => {
    const manglerFornavn = fornavn === '';
    const manglerEtternavn = etternavn === '';

    if (manglerFornavn && manglerEtternavn) {
        return '';
    } else if (manglerFornavn || manglerEtternavn) {
        // Skal egentlig ikke skje, men hvis ett av navnene mangler så trenger vi ikke å separere med ","
        return fornavn + etternavn;
    }

    return fornavn + ', ' + etternavn;
};

interface BrukerNavnProps {
    role?: string;
    className?: string;
    bruker: BrukerModell;
    enhetId: OrNothing<string>;
}

function BrukerNavn({role, className, bruker, enhetId}: BrukerNavnProps) {
    return (
        <div role={role} className={className}>
            <a
                href={`${window.location.origin}/veilarbpersonflatefs/${bruker.fnr}?enhet=${enhetId}`}
                onClick={() => setFraBrukerIUrl(bruker.fnr)}
                className={classnames('lenke lenke--frittstaende')}
            >
                {brukerNavn(bruker.fornavn, bruker.etternavn)}
            </a>
        </div>
    )
}

export default BrukerNavn;
