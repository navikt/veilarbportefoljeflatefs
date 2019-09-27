import React from "react";
import Lenker from "../lenker/lenker";
import Innholdslaster from "../innholdslaster/innholdslaster";
import DocumentTitle from 'react-document-title';

interface EnhetSideWrapperProps {
    avhengigheter: {status?: string}[]
}


export function EnhetSideWrapper(props: React.PropsWithChildren<EnhetSideWrapperProps>) {
    return (
        <DocumentTitle title="Enhetens oversikt">
            <div className="blokk-xl">
                <Lenker />
                <Innholdslaster avhengigheter={props.avhengigheter}>
                    <div className="enhet-side">
                        {props.children}
                    </div>
                </Innholdslaster>
            </div>
        </DocumentTitle>
    );
}
