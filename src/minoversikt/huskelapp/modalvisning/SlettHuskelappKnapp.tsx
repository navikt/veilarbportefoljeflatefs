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
    lukkModal: () => void;
    variant?: 'secondary' | 'tertiary';
    bekreftelsesmeldingBredde?: string;
}

export const SlettHuskelappKnapp = ({
    bruker,
    lukkModal,
    variant = 'secondary',
    bekreftelsesmeldingBredde = '14rem'
}: SlettHuskelappKnappProps) => {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);

    const slettHuskelapp = () => {
        return handleSlettHuskelapp(dispatch, bruker.huskelapp!, bruker.fnr, enhetId!);
    };

    return (
        <>
            <KnappMedBekreftHandling
                handlingsknapptekst="Slett"
                variant={variant}
                ikon={<TrashIcon aria-hidden={true} />}
                bekreftelsesmelding={{
                    overskrift: 'Er du sikker på at du vil slette huskelappen?',
                    beskrivelse:
                        'Huskelappen slettes, men kan utleveres ved innsynsbegjæring innenfor oppfølgingsperioden.',
                    width: bekreftelsesmeldingBredde
                }}
                bekreftknapp={{
                    tekst: 'Ja, slett huskelapp',
                    onClick: slettHuskelapp,
                    onClickThen: lukkModal
                }}
                feilmelding="Kunne ikke slette huskelapp"
            />
        </>
    );
};
