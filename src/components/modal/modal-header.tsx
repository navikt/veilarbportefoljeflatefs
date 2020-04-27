import React from 'react';
import classNames from 'classnames';
import { Innholdstittel } from 'nav-frontend-typografi';

interface OwnProps {
    className?: string;
    tittel?: React.ReactNode;
}

function ModalHeader({ className, tittel }: OwnProps) {
    return (
        <div className={classNames('modal-header-wrapper', className)}>
            <header className="modal-header">
                <Innholdstittel tag="h1" className="modal-info-tekst__overskrift">
                    {tittel}
                </Innholdstittel>
            </header>
        </div>
    );
}

export default ModalHeader;
