import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

function Lenker({ routes }) {
    const valgtSide = routes[1] ? routes[1].path : '';
    function erValgt(lenke) {
        return lenke === valgtSide;
    }
function Lenker() {
    return (
        <div className="lenker blokk-m">
            <Link
                to="enhet"
                className={classNames({ 'typo-undertittel': true, valgt: erValgt('enhet') })}
                aria-selected={erValgt('enhet')}
            >
            <Link to="enhet" className="oversiktslenke typo-undertittel" activeClassName="oversiktslenke--valgt">
                <FormattedMessage id="lenker.enhet.oversikt" />
            </Link>
            <Link
                to="veiledere"
                className={classNames({ 'typo-undertittel': true, valgt: erValgt('veiledere') })}
                aria-selected={erValgt('veiledere')}
            >
            <Link to="veiledere" className="oversiktslenke typo-undertittel" activeClassName="oversiktslenke--valgt">
                <FormattedMessage id="lenker.veiledere.oversikt" />
            </Link>
        </div>
    );
}

export default Lenker;
