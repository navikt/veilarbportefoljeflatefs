import React from 'react';
import EndringsloggTourWrapper from '../components/endringslogg/endringslogg-tour-wrapper';
import './lenker.less';
import Toasts from "../components/toast/toast";
import { Lenker } from "./lenker";

function ToppMeny(props : {harPortefolje : boolean}) {

    return (
        <div className="topp-meny" role="tablist">
            <Lenker harPortefolje={props.harPortefolje}/>
            <Toasts/>
            <EndringsloggTourWrapper/>
        </div>
    );
}

export default ToppMeny;
