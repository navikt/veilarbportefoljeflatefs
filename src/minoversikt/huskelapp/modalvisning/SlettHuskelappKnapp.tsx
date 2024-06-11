import React from 'react';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {TrashIcon} from '@navikt/aksel-icons';
import {AppState} from '../../../reducer';
import {usePortefoljeSelector} from '../../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {handleSlettHuskelapp} from '../redigering/slettHuskelapp';
import {BrukerModell} from '../../../model-interfaces';
import {KnappMedBekreftHandling} from '../../../components/knapp-med-slettebekreftelse/KnappMedBekreftHandling';

interface SlettHuskelappKnappProps {
    bruker: BrukerModell;
    lukkModal?: () => void;
    variant?: 'secondary' | 'tertiary';
    size?: 'small' | 'xsmall';
    bekreftelsesmelding?: {
        width?: string;
        overskriftsnivaa?: '1' | '2' | '3' | '4' | '5' | '6';
    };
}

export const SlettHuskelappKnapp = ({
    bruker,
    lukkModal,
    variant = 'secondary',
    size,
    bekreftelsesmelding
}: SlettHuskelappKnappProps) => {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);

    const slettHuskelapp = () => {
        return handleSlettHuskelapp(dispatch, bruker.huskelapp!, bruker.fnr, enhetId!);
    };

    return (
        <KnappMedBekreftHandling
            handlingsknapptekst="Slett"
            variant={variant}
            size={size}
            ikon={<TrashIcon aria-hidden={true} />}
            bekreftelsesmelding={{
                overskrift: 'Er du sikker på at du vil slette huskelappen?',
                beskrivelse:
                    'Huskelappen slettes, men kan utleveres ved innsynsbegjæring innenfor oppfølgingsperioden.',
                width: bekreftelsesmelding?.width || '14rem',
                overskriftsnivaa: bekreftelsesmelding?.overskriftsnivaa
            }}
            bekreftknapp={{
                tekst: 'Ja, slett huskelapp',
                onClick: slettHuskelapp,
                onClickThen: lukkModal
            }}
            feilmelding="Kunne ikke slette huskelapp"
        />
    );
};
