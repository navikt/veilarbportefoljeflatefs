import React, {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {BrukerModell, HuskelappModell, VeilederModell} from '../../model-interfaces';
import {HuskelappModal} from './redigering/HuskelappModal';
import {ReactComponent as HuskelappIkon} from '../../components/ikoner/huskelapp/Huskelappikon_bakgrunnsfarge.svg';
import {ReactComponent as HuskelappIkonTomt} from '../../components/ikoner/huskelapp/Huskelappikon_stiplet.svg';
import {OrNothing} from '../../utils/types/types';
import './huskelapp-inngang.css';

interface Props {
    bruker: BrukerModell;
    innloggetVeileder: OrNothing<VeilederModell>;
}

export const HuskelappIkonInngang = ({bruker, innloggetVeileder}: Props) => {
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

    function lukkeHuskelappmodal() {
        setSkalViseHuskelappModal(false);
    }

    function apneHuskelappmodal() {
        setSkalViseHuskelappModal(true);
    }

    const titletekst = () => {
        if (bruker.huskelapp) {
            return 'Endre huskelapp';
        }
        return arbeidslisteAktiv ? 'Bytt fra arbeidsliste til huskelapp' : 'Opprett huskelapp';
    };

    return (
        <>
            <Button
                size="small"
                variant="tertiary"
                icon={harHuskelappEllerArbeidsliste ? <HuskelappIkon /> : <HuskelappIkonTomt />}
                title={titletekst()}
                onClick={apneHuskelappmodal}
            />
            {skalViseHuskelappModal && (
                <HuskelappModal
                    onModalClose={lukkeHuskelappmodal}
                    isModalOpen={skalViseHuskelappModal}
                    huskelapp={bruker.huskelapp as HuskelappModell}
                    arbeidsliste={bruker.arbeidsliste.arbeidslisteAktiv ? bruker.arbeidsliste : null}
                    bruker={bruker}
                />
            )}
        </>
    );
};
