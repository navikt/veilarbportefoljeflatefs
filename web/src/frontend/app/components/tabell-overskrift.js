import React, { PropTypes as PT } from 'react';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';

function TabellOverskrift({ fraIndex, antallIVisning, antallTotalt, visDiagram, tekst}) {
    return (
        <Element tag="h1" className="blokk-xxs">
            <strong aria-live="polite" aria-atomic="true">
                <FormattedMessage id={tekst} values={{
                    fraIndex,
                    tilIndex: fraIndex + antallIVisning,
                    antallTotalt,
                    visDiagram
                }}/>
            </strong>
        </Element>
    );
}

TabellOverskrift.defaultProps = {
    fraIndex: 0,
    antallIVisning: 0,
    antallTotalt: 0,
    visDiagram: false
};

export default TabellOverskrift;
