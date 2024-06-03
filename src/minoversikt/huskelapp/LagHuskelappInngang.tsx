import React, {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {trackAmplitude} from '../../amplitude/amplitude';
import {RedigerHuskelappModal} from './redigering/RedigerHuskelappModal';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';

export const LagHuskelappInngang = ({bruker}: {bruker: BrukerModell}) => {
    const [skalViseRedigerHuskelappModal, setSkalViseRedigerHuskelappModal] = useState<boolean>(false);

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
