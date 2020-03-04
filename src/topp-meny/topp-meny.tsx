import React, {PropsWithChildren} from 'react';
import EndringsloggTourWrapper from '../components/endringslogg/endringslogg-tour-wrapper';
import './lenker.less';
import Toasts from "../components/toast/toast";
import {Lenker} from "./lenker";
import {useVeilederHarPortefolje} from "../hooks/portefolje/use-dispatch-statustall-innloggetveileder";
import NavFrontendSpinner from "nav-frontend-spinner";

function ToppMeny(props: PropsWithChildren<{}>) {

    const {harPortefolje, laster} = useVeilederHarPortefolje();

    if(laster) {
        return <NavFrontendSpinner type="XL"/>;
    }

    return (
        <>
            <div className="topp-meny" role="tablist">
                <Lenker harPortefolje={harPortefolje}/>
                <Toasts/>
                <EndringsloggTourWrapper/>
            </div>
            {props.children}
        </>
    );
}

export default ToppMeny;
