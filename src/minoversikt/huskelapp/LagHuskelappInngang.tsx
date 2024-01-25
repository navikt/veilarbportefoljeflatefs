import React, {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {trackAmplitude} from '../../amplitude/amplitude';
import {LagEllerEndreHuskelappModal} from './LagEllerEndreHuskelappModal';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import {LagHuskelappMedEksisterendeArbeidslisteModal} from './LagHuskelappMedEksisterendeArbeidslisteModal';

export const LagHuskelappInngang = ({bruker}: {bruker: BrukerModell}) => {
    const [modalLagEllerEndreHuskelappSkalVises, setModalLagEllerEndreHuskelappSkalVises] = useState<boolean>(false);
    const [
        modalLagHuskelappMedEksisterendeArbeidslisteSkalVises,
        setModalLagHuskelappMedEksisterendeArbeidslisteSkalVises
    ] = useState<boolean>(false);
    const onClick = () => {
        trackAmplitude({name: 'modal åpnet', data: {tekst: 'åpnet lag eller endre huskelappmodal'}});
        bruker?.arbeidsliste?.arbeidslisteAktiv
            ? setModalLagHuskelappMedEksisterendeArbeidslisteSkalVises(true)
            : setModalLagEllerEndreHuskelappSkalVises(true);
    };

    return (
        <div className="lagHuskelappInngang">
            <HuskelappInfoAlert />
            <Button size="xsmall" variant="primary-neutral" onClick={onClick}>
                Lag huskelapp
            </Button>
            {modalLagEllerEndreHuskelappSkalVises && (
                <LagEllerEndreHuskelappModal
                    onModalClose={() => {
                        setModalLagEllerEndreHuskelappSkalVises(false);
                    }}
                    isModalOpen={modalLagEllerEndreHuskelappSkalVises}
                    huskelapp={bruker?.huskelapp as HuskelappModell} /*TODO hente opp huskelappen og sende inn her */
                    bruker={bruker}
                />
            )}
            {modalLagHuskelappMedEksisterendeArbeidslisteSkalVises && (
                <LagHuskelappMedEksisterendeArbeidslisteModal
                    onModalClose={() => {
                        setModalLagHuskelappMedEksisterendeArbeidslisteSkalVises(false);
                    }}
                    isModalOpen={modalLagHuskelappMedEksisterendeArbeidslisteSkalVises}
                    arbeidsliste={bruker?.arbeidsliste}
                    huskelapp={bruker?.huskelapp as HuskelappModell} /*TODO hente opp huskelappen og sende inn her */
                />
            )}
        </div>
    );
};
