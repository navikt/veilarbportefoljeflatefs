import * as React from 'react';
import { EtikettInfo } from 'nav-frontend-etiketter';
import * as classNames from 'classnames';

const cls = (className, type) => classNames('tabelletikett', className, {
    [`tabelletikett--${type}`]: !!type
});

export type TabelletiketterTypes =
    | 'nybruker'
    | 'egen-ansatt'
    | 'diskresjonskode'
    | 'sikkerhetstiltak'
    | 'doed';

interface TabelletiketterProps {
    className?: string;
    type?: TabelletiketterTypes;
}

function Tabelletiketter({ className, type, ...props }: TabelletiketterProps) {
    return (<EtikettInfo className={cls(className, type)} {...props} typo="undertekst" />);
}

export default Tabelletiketter;
