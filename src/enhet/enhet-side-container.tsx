import React, { PropsWithChildren } from 'react';
import Lenker from '../lenker/lenker';
import Innholdslaster from '../innholdslaster/innholdslaster';
import DocumentTitle from 'react-document-title';

interface EnhetSideContainerProps<P> {
    avhengigheter: [];
}

export function EnhetSideContainer(props: PropsWithChildren<EnhetSideContainerProps>) {
    return (
        <DocumentTitle title="Enhetens oversikt">
            <div className="enhet-side blokk-xl">
                <Lenker />
                <Innholdslaster avhengigheter={props.avhengigheter}>
                    <div id="oversikt-sideinnhold" role="tabpanel">
                        <p className="typo-infotekst begrensetbredde blokk-l">
                            Her får du oversikt over alle brukere som er tilknyttet enheten du er logget inn på.
                            Du kan filtrere ytterligere, søke opp veiledere og flytte eller fordele brukere.
                        </p>
                        {props.children}
                    </div>
                </Innholdslaster>
            </div>
        </DocumentTitle>
    );
}
