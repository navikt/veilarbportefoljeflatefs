import * as React from 'react';
import * as classnames from 'classnames';
import { BrukerModell } from '../../model-interfaces';

const settSammenNavn = (bruker) => {
    if (bruker.etternavn === '' && bruker.fornavn === '') {
        return '';
    }
    return `${bruker.etternavn}, ${bruker.fornavn}`;
};

const brukerFnr = (bruker) => <span className="brukerinformasjon__fnr">{bruker.fnr}</span>;

const brukerNavn = (bruker, enhetId) => (
    <a
        href={`https://${window.location.hostname}` +
                `/veilarbpersonflatefs/${bruker.fnr}?enhet=${enhetId}`}
        className={classnames('lenke lenke--frittstaende brukerinformasjon__navn',
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

interface BrukerinformasjonProps {
    bruker: BrukerModell;
    settMarkert: (fnr: string, markert: boolean) => void;
    enhetId: string;
}

function Brukerinformasjon({ bruker, enhetId, settMarkert }: BrukerinformasjonProps) {
    return (
        <div className="brukerinformasjon__wrapper">
            {checkBox(bruker, settMarkert)}
            {brukerNavn(bruker, enhetId)}
            {brukerFnr(bruker)}
        </div>
    );
}

export default Brukerinformasjon;
