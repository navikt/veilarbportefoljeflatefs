import React from 'react';
import {Heading} from '@navikt/ds-react';
import {ReactComponent as HuskelappIkon} from './ikoner/huskelapp.svg';

export const HuskelappModalHeader = () => (
    <div className="huskelappModalHeader blokk-xs">
        <HuskelappIkon />
        <Heading size="medium" level="1">
            Huskelapp
        </Heading>
    </div>
);
