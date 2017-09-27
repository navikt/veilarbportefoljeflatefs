import * as React from 'react';
import * as classnames from 'classnames';
import {BrukerModell} from '../../model-interfaces';

interface BrukerinformasjonProps {
    bruker: BrukerModell;
    settMarkert: (fnr: string, markert: boolean) => void;
    enhetId?: string;
}

const settSammenNavn = (bruker) => {
    if (bruker.etternavn === '' && bruker.fornavn === '') {
        return '';
    }
    return `${bruker.etternavn}, ${bruker.fornavn}`;
};

const brukerFnr = (bruker) => <span className="brukerinformasjon__fnr col col-xs-2">{bruker.fnr}</span>;

const brukerNavn = (bruker, enhetId) => (
    <a
        href={`https://${window.location.hostname}` +
                `/veilarbpersonflatefs/${bruker.fnr}?enhet=${enhetId}`}
        className={classnames('lenke lenke--frittstaende brukerinformasjon__navn col col-xs-2',
                { arbeidslistebruker: bruker.arbeidsliste.arbeidslisteAktiv })}
    >
        {settSammenNavn(bruker)}
    </a>
);

const checkBox = (bruker, settMarkert) => (<div className="skjema__input">
    <input
        className="checkboks"
        id={`checkbox-${bruker.fnr}`}
        type="checkbox"
        checked={!!bruker.markert}
        onClick={() => settMarkert(bruker.fnr, !bruker.markert)}
    />
    <label className="skjemaelement__label" htmlFor={`checkbox-${bruker.fnr}`} />
</div>);

function Brukerinformasjon({ bruker, enhetId, settMarkert }: BrukerinformasjonProps) {
    return (
        <span>
            {checkBox(bruker, settMarkert)}
            {brukerNavn(bruker, enhetId)}
            {brukerFnr(bruker)}
        </span>
    );
}

export default Brukerinformasjon;
