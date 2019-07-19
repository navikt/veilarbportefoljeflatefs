import LenkerMinoversikt from '../lenker/lenker-minoversikt';
import React from 'react';

export function MinOversiktContainer(props: {children: React.ReactNode, veilederFraUrl: {ident: string}}) {
    return (
        <div className="minoversikt-side blokk-xl">
            <section>
                <div className="portefolje-side">
                    <LenkerMinoversikt veilederident={props.veilederFraUrl ? props.veilederFraUrl.ident : null}/>
                    <div id="oversikt-sideinnhold" role="tabpanel">
                        <p className="typo-infotekst begrensetbredde blokk-l">
                            Her får du oversikt over alle brukere som er tildelt deg.
                            Du kan filtrere ytterligere eller flytte brukere til en annen veileder i din enhet.
                        </p>
                        {props.children}
                    </div>
                </div>
            </section>
        </div>

    );
}
