import React, {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {trackAmplitude} from '../../amplitude/amplitude';
import {HuskelappModal} from './redigering/HuskelappModal';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';

interface Props {
    bruker: BrukerModell;
    innloggetVeilederIdent?: OrNothing<string>;
}

export const LagHuskelappInngang = ({bruker, innloggetVeilederIdent}: Props) => {
    const [skalViseHuskelappModal, setSkalViseHuskelappModal] = useState<boolean>(false);

    if (bruker.veilederId !== innloggetVeilederIdent) {
        return null;
    }

    const onClick = () => {
        trackAmplitude({name: 'modal åpnet', data: {tekst: 'åpnet lag eller endre huskelappmodal'}});
        setSkalViseHuskelappModal(true);
    };

    return (
        <div className="lag-huskelapp-inngang">
            <Button size="xsmall" variant="tertiary" onClick={onClick} className="arbeidsliste--rediger-lenke">
                Rediger
            </Button>
            {skalViseHuskelappModal && (
                <HuskelappModal
                    onModalClose={() => {
                        setSkalViseHuskelappModal(false);
                    }}
                    isModalOpen={skalViseHuskelappModal}
                    huskelapp={bruker.huskelapp as HuskelappModell}
                    bruker={bruker}
                />
            )}
        </div>
    );
};
