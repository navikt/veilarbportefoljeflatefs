import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import ActiveLink from './active-link';
import { EndringsloggKnapp } from "../components/endringslogg/endringslogg-knapp";

function LenkerMinoversikt({ veilederident }) {
    const LenkeInnhold = <FormattedMessage id="lenker.min.oversikt" />;
    const path = veilederident === null ? 'portefolje' : `portefolje/${veilederident}`;

    return (
        <div className="min_oversikt_rad blokk-m" role="tablist">
            <ActiveLink
                to={path}
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
            >
                {LenkeInnhold}
            </ActiveLink>
            <div style={{flexGrow: "1", position: "relative"}}>
            <EndringsloggKnapp/>
            </div>
        </div>
    );
}
/*
LenkerMinoversikt.defaultProps = {
    veilederident: undefined
};

LenkerMinoversikt.propTypes = {
    veilederident: PT.string
};

LenkerMinoversikt.defaultProps = {
    veilederident: null
};
*/
export default LenkerMinoversikt;
