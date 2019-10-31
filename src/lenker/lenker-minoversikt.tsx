import React from 'react';
import ActiveLink from './active-link';
import EndringsloggTourWrapper from '../components/endringslogg/endringslogg-tour-wrapper';

function LenkerMinoversikt(props: { veilederident: string | null }) {
    const path = props.veilederident === null ? 'portefolje' : `portefolje/${props.veilederident}`;

    return (
        <div className="lenker" role="tablist">
            <ActiveLink
                to={path}
                className="oversiktslenke typo-undertittel"
                activeClassName="oversiktslenke--valgt"
                title="Her vises alle brukere som er tildelt deg eller veilederen du er inne på"
            >
                Min oversikt
            </ActiveLink>
            <EndringsloggTourWrapper/>
        </div>
    );
}

export default LenkerMinoversikt;
