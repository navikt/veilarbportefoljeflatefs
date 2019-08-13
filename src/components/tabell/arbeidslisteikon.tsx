import React from 'react';
import {BrukerModell} from "../../model-interfaces";
import { ReactComponent as ArbeidslisteIkon } from './flagg-filled.svg';

interface ArbeidslisteikonProps {
    className?: string;
    bruker: BrukerModell;
}


export function Arbeidslisteikon (props: ArbeidslisteikonProps) {
    if(props.bruker.arbeidsliste.arbeidslisteAktiv) {
        return <ArbeidslisteIkon/>
    }
    return null;
}
