import React from 'react';
import ActiveLink from './active-link';
import EndringsloggTourWrapper from '../components/endringslogg/endringslogg-tour-wrapper';

function LenkerMinoversikt(props: { veilederident: string | null }) {
    const path = props.veilederident === null ? 'portefolje' : `portefolje/${props.veilederident}`;

    return (
        <div className="lenker overskrift-minoversikt" role="tablist">
            <h2 className="h2__lenke--minoversikt">
                <ActiveLink
                    to={path}
                    className="oversiktslenke typo-undertittel tekst-minoversikt"
                    activeClassName="oversiktslenke--valgt"
                    title="Her vises alle brukere som er tildelt deg eller veilederen du er inne på"
                >
                    Min oversikt
                </ActiveLink>
            </h2>
            <EndringsloggTourWrapper/>
        </div>
    );
}

export default LenkerMinoversikt;
