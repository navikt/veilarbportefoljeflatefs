import React, {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import {RedigerHuskelappModal} from './redigering/RedigerHuskelappModal';
import {ReactComponent as HuskelappIkon} from '../../components/ikoner/huskelapp/huskelapp.svg';
import {ReactComponent as HuskelappIkonTomt} from '../../components/ikoner/huskelapp/huskelapp_stiplet.svg';
import {HuskelappModal} from './modalvisning/HuskelappModal';

export const HuskelappIkonInngang = ({bruker}: {bruker: BrukerModell}) => {
    const [skalViseRedigerHuskelappModal, setSkalViseRedigerHuskelappModal] = useState<boolean>(false);
    const [skalViseHuskelappModal, setSkalViseHuskelappModal] = useState<boolean>(false);

    const arbeidslisteAktiv = bruker.arbeidsliste?.arbeidslisteAktiv;
    const harHuskelappEllerArbeidsliste = !!bruker.huskelapp || arbeidslisteAktiv;

    function visEllerRedigerHuskelapp() {
        bruker.huskelapp ? setSkalViseHuskelappModal(true) : setSkalViseRedigerHuskelappModal(true);
    }

    function lukkRedigeringsmodal() {
        setSkalViseRedigerHuskelappModal(false);
        if (bruker.huskelapp) {
            setSkalViseHuskelappModal(true);
        }
    }

    function apneRedigeringsmodal() {
        setSkalViseHuskelappModal(false);
        setSkalViseRedigerHuskelappModal(true);
    }

    return (
        <>
            <Button
                size="small"
                variant="tertiary"
                onClick={visEllerRedigerHuskelapp}
                icon={
                    harHuskelappEllerArbeidsliste ? (
                        <HuskelappIkon className="huskelappikon" />
                    ) : (
                        <HuskelappIkonTomt className="huskelappikon" />
                    )
                }
            />
            {skalViseRedigerHuskelappModal && (
                <RedigerHuskelappModal
                    onModalClose={lukkRedigeringsmodal}
                    isModalOpen={skalViseRedigerHuskelappModal}
                    huskelapp={bruker.huskelapp as HuskelappModell}
                    arbeidsliste={bruker.arbeidsliste.arbeidslisteAktiv ? bruker.arbeidsliste : null}
                    bruker={bruker}
                />
            )}
            {skalViseHuskelappModal && (
                <HuskelappModal
                    open={skalViseHuskelappModal}
                    onClose={() => setSkalViseHuskelappModal(false)}
                    bruker={bruker}
                    redigerHuskelapp={apneRedigeringsmodal}
                    setModalVisHuskelappSkalVises={setSkalViseHuskelappModal}
                />
            )}
        </>
    );
};
