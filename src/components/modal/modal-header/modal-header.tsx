import React from 'react';
import classNames from 'classnames';
import './modal-header.less';
import {Heading} from '@navikt/ds-react';

interface OwnProps {
    className?: string;
    tittel?: React.ReactNode;
}

function ModalHeader({className, tittel}: OwnProps) {
    return (
        <div className={classNames('modal-header', className)}>
            <Heading size="xlarge" level="1" className="modal-header__tittel">
                {tittel}
            </Heading>
        </div>
    );
}

export default ModalHeader;
