import * as React from 'react';
import ActiveLink from './active-link';
import Endringslogg from '../components/endringslogg/endringslogg';

function LenkerMinoversikt(props: { veilederident: string | null }) {
    const path = props.veilederident === null ? 'portefolje' : `portefolje/${props.veilederident}`;

    return (
        <div className="lenker blokk-m" role="tablist">
            <ActiveLink
                to={path}
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
            >
                Min oversikt
            </ActiveLink>
            <Endringslogg/>
        </div>
    );
}

export default LenkerMinoversikt;
