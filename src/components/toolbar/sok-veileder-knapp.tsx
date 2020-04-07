import * as React from 'react';
import './toolbar.less';
import { ReactComponent as SokVeilederIkon } from '../ikoner/person-view-1.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import SokVeilederInput from './sok-veileder-input';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

interface SokVeilederProps {
    // onClickHandler: () => void;
    skalVises?: boolean;
    filtergruppe?: string;
    veileder: any;
    apen?: boolean;

}

function SokVeilederKnapp(props: SokVeilederProps) {
    const [apen, setApen] = useState(props.apen || false);
    const dispatch = useDispatch();
    if (!props.skalVises) {
        return null;
    }

    function toggleInput() {
        if (!apen) {
            setApen(apen);
            dispatch(<SokVeilederInput/>);
        }
        setApen(!apen);

        console.log('åpen?', apen);
    }

    return (
        <div className="toolbar_btnwrapper">
            <button
                type="button"
                className='toolbar_btn'
                // onClick={props.onClickHandler}
                // onClick={() => dispatch(<SokVeilederInput/>)}
                onClick={toggleInput}
            >
                <SokVeilederIkon className="toolbar-knapp__ikon" id="sok-veileder-ikon"/>
                <Normaltekst className="toolbar-knapp__tekst">Søk veileder</Normaltekst>
            </button>
        </div>
    );
}

export default SokVeilederKnapp;
