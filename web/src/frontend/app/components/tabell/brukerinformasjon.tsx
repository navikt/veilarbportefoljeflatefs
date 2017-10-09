import * as React from 'react';
import * as classnames from 'classnames';
import {BrukerModell} from '../../model-interfaces';

const settSammenNavn = (bruker) => {
    if (bruker.etternavn === '' && bruker.fornavn === '') {
        return '';
    }
    return `${bruker.etternavn}, ${bruker.fornavn}`;
};

const brukerFnr = (bruker) => <span className="brukerinformasjon__fnr col col-xs-2">{bruker.fnr}</span>;

const brukerNavn = (bruker, enhetId) => (
    <div className="col col-xs-3">
        <a
            href={`https://${window.location.hostname}` +
                    `/veilarbpersonflatefs/${bruker.fnr}?enhet=${enhetId}`}
            className={classnames('lenke lenke--frittstaende',
                    { arbeidslistebruker: bruker.arbeidsliste.arbeidslisteAktiv })}
        >
            {settSammenNavn(bruker)}
        </a>
    </div>
);

interface BrukerinformasjonProps {
    bruker: BrukerModell;
    settMarkert: (fnr: string, markert: boolean) => void;
    enhetId: string;
}

function Brukerinformasjon({ bruker, enhetId, settMarkert }: BrukerinformasjonProps) {
    return (
        <span>
            {brukerNavn(bruker, enhetId)}
            {brukerFnr(bruker)}
        </span>
    );
}

export default Brukerinformasjon;
