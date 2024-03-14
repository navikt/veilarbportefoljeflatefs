import React from 'react';
import {Heading} from '@navikt/ds-react';
import {ReactComponent as HuskelappIkon} from '../../components/ikoner/huskelapp/huskelapp.svg';

export const HuskelappModalHeader = () => (
    <Heading size="medium" level="1" spacing className="huskelapp-modal__header">
        <HuskelappIkon />
        Huskelapp
    </Heading>
);
