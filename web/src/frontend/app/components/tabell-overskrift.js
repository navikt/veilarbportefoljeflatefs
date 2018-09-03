import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';

function TabellOverskrift({ fraIndex, antallIVisning, antallTotalt, visDiagram, antallValgt }) {
    const fixedFraIndex = antallTotalt === 0 ? 0 : 1;
    return (
        <Element tag="h1" className="blokk-xxs">
            <strong aria-live="polite" aria-atomic="true">
                <FormattedMessage
                    id="enhet.portefolje.paginering.tekst"
                    values={{
                        fraIndex: `${Math.max(fraIndex, fixedFraIndex)}`,
                        tilIndex: `${fraIndex + antallIVisning}`,
                        antallTotalt: `${antallTotalt}`,
                        visDiagram
                    }}
                />

                <FormattedMessage
                    className="tabelloverskrift"
                    id="enhet.portefolje.antallbrukerevalgt"
                    values={{
                        antallValgt: `${antallValgt}`
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
    antallValgt: PT.number.isRequired
};

TabellOverskrift.defaultProps = {
    fraIndex: 0,
    antallIVisning: 0,
    antallTotalt: 0,
    visDiagram: false
};

export default TabellOverskrift;
