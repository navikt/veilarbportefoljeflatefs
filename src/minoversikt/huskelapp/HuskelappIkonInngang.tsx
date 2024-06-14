import React, {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {BrukerModell, HuskelappModell, VeilederModell} from '../../model-interfaces';
import {RedigerHuskelappModal} from './redigering/RedigerHuskelappModal';
import {ReactComponent as HuskelappIkon} from '../../components/ikoner/huskelapp/Huskelappikon_bakgrunnsfarge.svg';
import {ReactComponent as HuskelappIkonTomt} from '../../components/ikoner/huskelapp/Huskelappikon_stiplet.svg';
import {HuskelappModal} from './modalvisning/HuskelappModal';
import {OrNothing} from '../../utils/types/types';
import './huskelapp-inngang.css';

interface Props {
    bruker: BrukerModell;
    innloggetVeileder: OrNothing<VeilederModell>;
}

export const HuskelappIkonInngang = ({bruker, innloggetVeileder}: Props) => {
    const [skalViseRedigerHuskelappModal, setSkalViseRedigerHuskelappModal] = useState<boolean>(false);
    const [skalViseHuskelappModal, setSkalViseHuskelappModal] = useState<boolean>(false);

    const arbeidslisteAktiv = bruker.arbeidsliste?.arbeidslisteAktiv;
    const harHuskelappEllerArbeidsliste = !!bruker.huskelapp || arbeidslisteAktiv;

    if (bruker.veilederId !== innloggetVeileder?.ident && !harHuskelappEllerArbeidsliste) {
        return (
            <div className="veileder-kan-ikke-opprette-huskelapp">
                <HuskelappIkonTomt fontSize="1.5rem" title="Ingen huskelapp" />
            </div>
        );
    }

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

    const titletekst = () => {
        if (bruker.huskelapp) {
            return 'Endre huskelapp';
        }
        return arbeidslisteAktiv ? 'Migrer arbeidsliste' : 'Opprett huskelapp';
    };

    return (
        <>
            <Button
                size="small"
                variant="tertiary"
                icon={harHuskelappEllerArbeidsliste ? <HuskelappIkon /> : <HuskelappIkonTomt />}
                title={titletekst()}
                onClick={visEllerRedigerHuskelapp}
            />
            {skalViseRedigerHuskelappModal && (
                <RedigerHuskelappModal
                    onModalClose={lukkRedigeringsmodal}
                    isModalOpen={skalViseRedigerHuskelappModal}
                    huskelapp={bruker.huskelapp as HuskelappModell}
                    arbeidsliste={bruker.arbeidsliste.arbeidslisteAktiv ? bruker.arbeidsliste : null}
                    bruker={bruker}
                    lukkVisHuskelappModal={() => setSkalViseHuskelappModal(false)}
                />
            )}
            {skalViseHuskelappModal && (
                <HuskelappModal
                    open={skalViseHuskelappModal}
                    onClose={() => setSkalViseHuskelappModal(false)}
                    bruker={bruker}
                    innloggetVeileder={innloggetVeileder}
                    redigerHuskelapp={apneRedigeringsmodal}
                    lukkHuskelappModal={() => setSkalViseHuskelappModal(false)}
                />
            )}
        </>
    );
};
