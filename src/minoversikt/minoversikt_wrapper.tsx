import * as React from 'react';
import {PropsWithChildren} from 'react';
import {Redirect, useParams} from 'react-router';
import {useVeilederListeSelector} from '../hooks/redux/use-veilederliste-selector';
import {useIdentSelector} from '../hooks/redux/use-innlogget-ident';
import classNames from 'classnames';
import './minoversikt.css';
import {IdentParam} from '../model-interfaces';

interface MinOversiktWrapperProps {
    className: string;
    id: string;
}

export function MinOversiktWrapper({className, id, children}: PropsWithChildren<MinOversiktWrapperProps>) {
    const {ident} = useParams<IdentParam>();
    const innloggetVeileder = useIdentSelector();
    const veiledere = useVeilederListeSelector();
    const visesAnnenVeiledersPortefolje = ident ? ident !== innloggetVeileder!.ident : false;

    if (ident && veiledere.findIndex(v => v.ident === ident) < 0) {
        return <Redirect to="/enhet" />;
    }

    return (
        <div
            className={classNames(className, visesAnnenVeiledersPortefolje ? 'annen-veileder' : '')}
            role="tabpanel"
            aria-labelledby={id}
            id={id}
        >
            {children}
        </div>
    );
}
