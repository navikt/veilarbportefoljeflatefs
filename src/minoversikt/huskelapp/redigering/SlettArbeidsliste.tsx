import React, {useState} from 'react';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Alert, BodyShort, Button, Heading} from '@navikt/ds-react';
import {TrashIcon} from '@navikt/aksel-icons';
import {slettArbeidslisteMenIkkeFargekategoriOgOppdaterRedux} from './slettEksisterendeArbeidsliste';
import {BrukerModell} from '../../../model-interfaces';
import {AppState} from '../../../reducer';

interface SlettArbeidslisteProps {
    bruker: BrukerModell;
}

export const SlettArbeidsliste = ({bruker}: SlettArbeidslisteProps) => {
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const [visSlettebekreftelse, setVisSlettebekreftelse] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const slettArbeidsliste = () => {
        setLoading(true);

        slettArbeidslisteMenIkkeFargekategoriOgOppdaterRedux(bruker, dispatch)
            .then(() => setLoading(false))
            .catch(() => setError(true))
            .then(() => setVisSlettebekreftelse(false));
    };

    return (
        <>
            {error && (
                <Alert variant="error" size="small" className="sletting-av-arbeidsliste-feilet">
                    Noe gikk galt ved sletting av arbeidslista.
                </Alert>
            )}
            {!visSlettebekreftelse && (
                <Button
                    onClick={() => {
                        setVisSlettebekreftelse(true);
                        setError(false);
                    }}
                    size="small"
                    variant="tertiary"
                    icon={<TrashIcon aria-hidden />}
                >
                    Slett gammel arbeidsliste uten å lage ny huskelapp
                </Button>
            )}
            {visSlettebekreftelse && (
                <div>
                    <Heading size="xsmall" level="3">
                        Er du sikker på at du vil slette eksisterende innhold?
                    </Heading>
                    <BodyShort size="small">Dette vil slette tittel, kommentar og frist for denne brukeren.</BodyShort>
                    <div id="slett-arbeidsliste__knappevalg">
                        <Button
                            variant="tertiary"
                            size="small"
                            type="button"
                            onClick={() => setVisSlettebekreftelse(false)}
                        >
                            Avbryt
                        </Button>
                        <Button
                            loading={loading}
                            variant="secondary"
                            size="small"
                            type="button"
                            onClick={slettArbeidsliste}
                        >
                            Ja, slett arbeidslista
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
