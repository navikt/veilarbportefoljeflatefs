import * as React from 'react';
import { EtikettInfo } from 'nav-frontend-etiketter';
import classNames from 'classnames';
import { EtikettType } from '../../model-interfaces';

const cls = (className, type) => classNames('tabelletikett', className, {
    [`tabelletikett--${type}`]: !!type
});

interface TabelletiketterProps {
    className?: string;
    type?: EtikettType;
    children?: React.ReactChild;
}

function Tabelletiketter({ className, type, children, ...props }: TabelletiketterProps) {
    return (
        <EtikettInfo className={cls(className, type)} {...props} typo="undertekst">
            {children}
        </EtikettInfo>
    );
}

export default Tabelletiketter;
