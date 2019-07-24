import React from 'react';
import ActiveLink from './active-link';
import EndringsloggTourWrapper from '../components/endringslogg/endringslogg-tour-wrapper';

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
            <EndringsloggTourWrapper/>
        </div>
    );
}

export default LenkerMinoversikt;
