import React, {useState} from 'react';
import {BodyShort, Button} from '@navikt/ds-react';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import {TrashIcon} from '@navikt/aksel-icons';
import {LagEllerEndreHuskelappModal} from './LagEllerEndreHuskelappModal';
import {toDatePrettyPrint} from '../../utils/dato-utils';
import {slettHuskelappAction} from '../../ducks/huskelapp';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {leggTilStatustall} from '../../ducks/statustall-veileder';
import {hentHuskelappForBruker} from '../../ducks/portefolje';
import {usePortefoljeSelector} from '../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../ducks/ui/listevisning';

interface Props {
    huskelapp: HuskelappModell;
    bruker: BrukerModell;
}

export const HuskelappVisning = ({bruker, huskelapp}: Props) => {
    const [modalLagEllerEndreHuskelappSkalVises, setModalLagEllerEndreHuskelappSkalVises] = useState<boolean>(false);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);

    const handleSlettHuskelapp = () => {
        dispatch(slettHuskelappAction(huskelapp.huskelappId!!))
            .then(dispatch(hentHuskelappForBruker(bruker.fnr, enhetId!!)))
            .then(dispatch(leggTilStatustall('mineHuskelapper', -1)));
    };

    return (
        <>
            <div className="HuskelappVisning">
                <BodyShort as="div" size="small">
                    <b>{huskelapp?.frist ? `Frist: ${toDatePrettyPrint(huskelapp.frist)}` : 'Ingen frist satt'}</b>
                </BodyShort>
                <BodyShort>{huskelapp?.kommentar}</BodyShort>
                <BodyShort as="div" size="small">
                    <i>
                        Endret {toDatePrettyPrint(huskelapp?.endretDato)} av {huskelapp?.endretAv}
                    </i>
                </BodyShort>
                <div className="huskelapp-handlingsknapper">
                    <Button
                        type="button"
                        size="xsmall"
                        variant="secondary"
                        onClick={handleSlettHuskelapp}
                        icon={<TrashIcon />}
                    >
                        Slett
                    </Button>
                    <Button
                        type="button"
                        size="xsmall"
                        variant="primary"
                        onClick={() => setModalLagEllerEndreHuskelappSkalVises(true)}
                    >
                        Endre
                    </Button>
                </div>
            </div>
            {modalLagEllerEndreHuskelappSkalVises && (
                <LagEllerEndreHuskelappModal
                    onModalClose={() => {
                        setModalLagEllerEndreHuskelappSkalVises(false);
                    }}
                    isModalOpen={modalLagEllerEndreHuskelappSkalVises}
                    huskelapp={huskelapp}
                    bruker={bruker}
                />
            )}
        </>
    );
};
