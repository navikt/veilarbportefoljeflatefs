import React, {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import {LagEllerEndreHuskelappModal} from './redigering/LagEllerEndreHuskelappModal';
import {ReactComponent as HuskelappIkon} from '../../components/ikoner/huskelapp/huskelapp.svg';
import {ReactComponent as HuskelappIkonTomt} from '../../components/ikoner/huskelapp/huskelapp_stiplet.svg';
import {HuskelappModal} from './modalvisning/HuskelappModal';

export const HuskelappIkonInngang = ({bruker}: {bruker: BrukerModell}) => {
    const [skalLagEllerEndreHuskelappModalVises, setSkalLagEllerEndreHuskelappModalVises] = useState<boolean>(false);
    const [modalVisHuskelappSkalVises, setModalVisHuskelappSkalVises] = useState<boolean>(false);

    function visEllerRedigerHuskelapp() {
        bruker.huskelapp ? setModalVisHuskelappSkalVises(true) : setSkalLagEllerEndreHuskelappModalVises(true);
    }

    function lukkRedigeringsmodal() {
        setSkalLagEllerEndreHuskelappModalVises(false);
        if (bruker.huskelapp) {
            setModalVisHuskelappSkalVises(true);
        }
    }

    function apneRedigeringsmodal() {
        setModalVisHuskelappSkalVises(false);
        setSkalLagEllerEndreHuskelappModalVises(true);
    }

    return (
        <>
            <Button
                size="small"
                variant="tertiary"
                onClick={visEllerRedigerHuskelapp}
                icon={
                    bruker.huskelapp ? (
                        <HuskelappIkon className="huskelappikon" />
                    ) : (
                        <HuskelappIkonTomt className="huskelappikon" />
                    )
                }
            />
            {skalLagEllerEndreHuskelappModalVises && (
                <LagEllerEndreHuskelappModal
                    onModalClose={lukkRedigeringsmodal}
                    isModalOpen={skalLagEllerEndreHuskelappModalVises}
                    huskelapp={bruker.huskelapp as HuskelappModell}
                    arbeidsliste={bruker.arbeidsliste.arbeidslisteAktiv ? bruker.arbeidsliste : null}
                    bruker={bruker}
                />
            )}
            {modalVisHuskelappSkalVises && (
                <HuskelappModal
                    open={modalVisHuskelappSkalVises}
                    onClose={() => setModalVisHuskelappSkalVises(false)}
                    bruker={bruker}
                    redigerHuskelapp={apneRedigeringsmodal}
                    setModalVisHuskelappSkalVises={setModalVisHuskelappSkalVises}
                />
            )}
        </>
    );
};
