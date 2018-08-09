import * as React from 'react';
import { EtikettInfo } from 'nav-frontend-etiketter';
import * as classNames from 'classnames';
import { EtikettType } from '../../model-interfaces';

const cls = (className, type) => classNames('tabelletikett', className, {
    [`tabelletikett--${type}`]: !!type
});

interface TabelletiketterProps {
    className?: string;
    type?: EtikettType;
}

function Tabelletiketter({ className, type, ...props }: TabelletiketterProps) {
    return (<EtikettInfo className={cls(className, type)} {...props} typo="undertekst" />);
}

export default Tabelletiketter;
