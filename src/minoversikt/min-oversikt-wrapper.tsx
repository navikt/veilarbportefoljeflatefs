import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Redirect, useParams } from 'react-router';
import { useVeilederListeSelector } from '../hooks/redux/use-veilederliste-selector';
import { useIdentSelector } from '../hooks/redux/use-inlogget-ident';
import classNames from 'classnames';
import { useSidebarViewStore } from '../store/sidebar/sidebar-view-store';

interface MinOversiktWrapperProps {
    className: string;
}

export function MinOversiktWrapper(props: MinOversiktWrapperProps & PropsWithChildren<{}>) {
    const {ident} = useParams();
    const innloggetVeileder = useIdentSelector();
    const veiledere = useVeilederListeSelector();
    const visesAnnenVeiledersPortefolje = ident ? ident !== innloggetVeileder!.ident : false;
    const {isSidebarHidden} = useSidebarViewStore();

    if (ident && veiledere.findIndex(v => v.ident === ident) < 0) {
        return <Redirect to="/enhet"/>;
    }

    const veilederFraUrl = veiledere.find((veileder) => (veileder.ident === ident)) || {fornavn: '', etternavn: ''};

    console.log(isSidebarHidden);
    return (
        <div className={classNames(props.className,
            visesAnnenVeiledersPortefolje ? 'annen-veileder' : '')}
             id="oversikt-sideinnhold" role="tabpanel">
            {visesAnnenVeiledersPortefolje &&
            <Normaltekst tag="h1" className="blokk-s annen-veileder-varsel">
                {`Du er inne på ${veilederFraUrl.fornavn} ${veilederFraUrl.etternavn} sin oversikt`}
            </Normaltekst>}
            {props.children}
        </div>
    );
}
