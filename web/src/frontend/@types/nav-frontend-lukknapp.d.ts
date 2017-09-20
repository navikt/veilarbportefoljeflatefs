declare module "nav-frontend-lukknapp" {
    import * as React from "react";
    import {ButtonHTMLAttributes} from 'react';

    export function cls (bla: boolean, hvit: boolean, hjorne: boolean, className: string): string;

    export interface LukknappProps extends ButtonHTMLAttributes<HTMLButtonElement> {
        className?: string;
        children?: string;
        bla?: boolean;
        hvit?: boolean;
        overstHjorne?: boolean;
    }

    class knapp extends HTMLInputElement {

    }

    class Lukknapp extends React.PureComponent<LukknappProps, {}> {

    }

    export default Lukknapp;
}
