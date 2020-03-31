import React from 'react';
import classNames from 'classnames';
import { Innholdstittel } from 'nav-frontend-typografi';
import './modal-header.less';

interface OwnProps {
    className?: string;
    tittel?: React.ReactNode
}

function ModalHeader({className, tittel}: OwnProps) {
    return (
        <div className={classNames('modal-header-wrapper', className)}>
            <header className="modal-header"/>
            <Innholdstittel tag="h1" className="modal-header__tittel">
                {tittel}
            </Innholdstittel>
            {/*TODO wrap header rundt innholdstittel*/}
        </div>
    );
}

export default ModalHeader;
