import * as React from 'react';
import './toolbar.less';
import { ReactComponent as SokVeilederIkon } from '../ikoner/person-view-1.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import { useState } from 'react';
import SokVeileder from './sok-veileder';

interface SokVeilederProps {
    skalVises?: boolean;
    filtergruppe?: string;
}

function SokVeilederKnapp(props: SokVeilederProps) {
    const [inputApen, setApen] = useState(false);
    if (!props.skalVises) {
        return null;
    }

    if (inputApen) {
        return (
            <div className="sok-veileder-container">
                <SokVeileder
                    veileder={{}}
                    onClick={() => setApen(!inputApen)}
                    skalVises={inputApen}
                />
            </div>
        );
    }

    return (
        <div className="toolbar_btnwrapper">
            <button
                type="button"
                className='toolbar_btn'
                onClick={() => setApen(!inputApen)}
            >
                <SokVeilederIkon className="toolbar-knapp__ikon" id="sok-veileder-ikon"/>
                <Normaltekst className="toolbar-knapp__tekst">Søk veileder</Normaltekst>
            </button>
        </div>);
}

export default SokVeilederKnapp;
