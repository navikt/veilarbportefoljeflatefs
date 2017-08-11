import React, { PropTypes as PT } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';


function SorteringHeader({ sortering, onClick, rekkefolge, erValgt, tekstId, skalVises, className }) {
    if (!skalVises) {
        return null;
    }
    return (
        <span className={classNames(`sortering-header__${sortering}`, { [className]: className })}>
            <button
                onClick={() => onClick(sortering)}
                className={classNames('lenke lenke--frittstaende', { valgt: erValgt })}
                aria-pressed={erValgt}
                aria-label={erValgt && rekkefolge !== 'ikke_satt' ?
                rekkefolge : 'inaktiv'}
            >
                <FormattedMessage id={tekstId} />
            </button>
            {sortering === "etternavn" ?
                <FormattedMessage id="portefolje.tabell.fornavn"/> : null
            }
        </span>
    );
}

SorteringHeader.propTypes = {
    sortering: PT.string.isRequired,
    onClick: PT.func.isRequired,
    rekkefolge: PT.string.isRequired,
    erValgt: PT.bool.isRequired,
    tekstId: PT.string.isRequired,
    skalVises: PT.bool.isRequired,
    className: PT.string
};

SorteringHeader.defaultProps = {
    skalVises: true,
    className: ''
};

export default SorteringHeader;
