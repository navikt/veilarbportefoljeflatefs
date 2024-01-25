import React from 'react';
import {Button} from '@navikt/ds-react';

interface Props {
    onCancel: () => void;
    onSubmit: () => void;
}
export const HuskelappFormFooter = ({onCancel, onSubmit}: Props) => (
    <div className="huskelapp-handlingsknapper">
        <Button variant="primary" size="small" onClick={onSubmit}>
            Lagre og slett eksisterende
        </Button>
        <Button size="small" variant="secondary" type="button" onClick={onCancel}>
            Avbryt
        </Button>
    </div>
);
