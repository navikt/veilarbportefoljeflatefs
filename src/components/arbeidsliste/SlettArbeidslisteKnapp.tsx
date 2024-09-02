import * as React from 'react';
import {useDispatch} from 'react-redux';

import {BrukerModell} from '../../model-interfaces';
import {TrashIcon} from '@navikt/aksel-icons';
import {KnappMedBekreftHandling} from '../knapp-med-slettebekreftelse/KnappMedBekreftHandling';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';
import {slettArbeidslisteMenIkkeFargekategoriOgOppdaterRedux} from '../../minoversikt/huskelapp/redigering/slettEksisterendeArbeidsliste';

interface SlettArbeidslisteKnappProps {
    bruker: BrukerModell;
    lukkModal?: () => void;
    variant?: 'secondary' | 'tertiary';
    size?: 'small' | 'xsmall';
    bekreftelsesmelding?: {
        width?: string;
        overskriftsnivaa?: '1' | '2' | '3' | '4' | '5' | '6';
    };
}

export const SlettArbeidslisteKnapp = ({bruker, lukkModal}: SlettArbeidslisteKnappProps) => {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();

    const slettArbeidsliste = () => {
        return slettArbeidslisteMenIkkeFargekategoriOgOppdaterRedux(bruker, dispatch);
    };

    return (
        <KnappMedBekreftHandling
            handlingsknapptekst="Slett arbeidsliste"
            size="xsmall"
            variant="secondary"
            icon={<TrashIcon aria-hidden={true} />}
            bekreftelsesmelding={{
                overskrift: 'Er du sikker på at du vil slette arbeidslista?',
                beskrivelse:
                    'Arbeidslista slettes, men kan utleveres hvis personen ber om innsyn i løpet av denne oppfølgingsperioden.',
                width: '14rem',
                overskriftsnivaa: '4'
            }}
            bekreftknapp={{
                tekst: 'Ja, slett arbeidslista',
                onClick: slettArbeidsliste,
                onClickThen: lukkModal
            }}
            feilmelding="Kunne ikke slette arbeidslista"
        />
    );
};
