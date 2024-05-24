import React from 'react';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Button} from '@navikt/ds-react';
import {TrashIcon} from '@navikt/aksel-icons';
import {AppState} from '../../../reducer';
import {usePortefoljeSelector} from '../../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {handleSlettHuskelapp} from '../redigering/slettHuskelapp';
import {BrukerModell} from '../../../model-interfaces';

interface SlettHuskelappKnappProps {
    bruker: BrukerModell;
    lukkModal: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
}

export const SlettHuskelappKnapp = ({bruker, lukkModal, variant = 'secondary'}: SlettHuskelappKnappProps) => {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);

    function slettHuskelapp() {
        //todo varsel modal på at det kommer til å slettes
        handleSlettHuskelapp(dispatch, bruker.huskelapp!!, bruker.fnr, enhetId!!).then(() => lukkModal());
    }

    return (
        <Button
            type="button"
            size="small"
            variant={variant}
            onClick={slettHuskelapp}
            icon={<TrashIcon aria-hidden={true} />}
        >
            Slett
        </Button>
    );
};
