import React from 'react';
import {Heading, Modal} from '@navikt/ds-react';
import {ReactComponent as HuskelappIkon} from './ikoner/huskelapp.svg';

export const HuskelappModalHeader = () => (
    <Modal.Header>
        <div className="huskelappModalHeader">
            <HuskelappIkon />
            <Heading size="medium" level="1">
                Huskelapp
            </Heading>
        </div>
    </Modal.Header>
);
