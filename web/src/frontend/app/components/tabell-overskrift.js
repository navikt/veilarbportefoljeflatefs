import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';

function TabellOverskrift({ fraIndex, antallIVisning, antallTotalt, visDiagram, tekst }) {
    const fixedFraIndex = antallTotalt === 0 ? 0 : 1;
    return (
        <Element tag="h1" className="blokk-xxs">
            <strong aria-live="polite" aria-atomic="true">
                <FormattedMessage
                    id={tekst} values={{
                        fraIndex: `${Math.max(fraIndex, fixedFraIndex)}`,
                        tilIndex: `${fraIndex + antallIVisning}`,
                        antallTotalt: `${antallTotalt}`,
                        visDiagram
                    }}
                />
            </strong>
        </Element>
    );
}

TabellOverskrift.propTypes = {
    fraIndex: PT.number.isRequired,
    antallIVisning: PT.number.isRequired,
    antallTotalt: PT.number.isRequired,
    visDiagram: PT.bool.isRequired,
    tekst: PT.string.isRequired
};

TabellOverskrift.defaultProps = {
    fraIndex: 0,
    antallIVisning: 0,
    antallTotalt: 0,
    visDiagram: false
};

export default TabellOverskrift;
