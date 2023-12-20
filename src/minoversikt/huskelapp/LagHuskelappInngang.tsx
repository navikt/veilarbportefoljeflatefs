import React, {useState} from 'react';
import {Button} from '@navikt/ds-react';
import './huskelapp.css';
import {trackAmplitude} from '../../amplitude/amplitude';
import {LagEllerEndreHuskelappModal} from './LagEllerEndreHuskelappModal';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';

export const LagHuskelappInngang = () => {
    const [modalLagEllerEndreHuskelappSkalVises, setModalLagEllerEndreHuskelappSkalVises] = useState<boolean>(false);
    const onClick = () => {
        trackAmplitude({name: 'modal åpnet', data: {tekst: 'åpnet lag eller endre huskelappmodal'}});
        setModalLagEllerEndreHuskelappSkalVises(true);
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
                    huskelapp={{frist: null, kommentar: null}}
                />
            )}
        </div>
    );
};
