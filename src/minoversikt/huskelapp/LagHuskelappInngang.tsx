import React, {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {trackAmplitude} from '../../amplitude/amplitude';
import {RedigerHuskelappModal} from './redigering/RedigerHuskelappModal';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';

interface Props {
    bruker: BrukerModell;
    innloggetVeileder?: OrNothing<string>;
}

export const LagHuskelappInngang = ({bruker, innloggetVeileder}: Props) => {
    const [skalViseRedigerHuskelappModal, setSkalViseRedigerHuskelappModal] = useState<boolean>(false);

    if (bruker.veilederId !== innloggetVeileder) {
        return null;
    }

    const onClick = () => {
        trackAmplitude({name: 'modal åpnet', data: {tekst: 'åpnet lag eller endre huskelappmodal'}});
        setSkalViseRedigerHuskelappModal(true);
    };

    return (
        <div className="lag-huskelapp-inngang">
            <Button size="xsmall" variant="tertiary" onClick={onClick} className="arbeidsliste--rediger-lenke">
                Rediger
            </Button>
            {skalViseRedigerHuskelappModal && (
                <RedigerHuskelappModal
                    onModalClose={() => {
                        setSkalViseRedigerHuskelappModal(false);
                    }}
                    isModalOpen={skalViseRedigerHuskelappModal}
                    huskelapp={bruker.huskelapp as HuskelappModell}
                    arbeidsliste={bruker.arbeidsliste.arbeidslisteAktiv ? bruker.arbeidsliste : null}
                    bruker={bruker}
                />
            )}
        </div>
    );
};
