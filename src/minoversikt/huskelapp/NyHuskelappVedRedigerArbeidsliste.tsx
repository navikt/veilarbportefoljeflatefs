import React, {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {trackAmplitude} from '../../amplitude/amplitude';
import {LagEllerEndreHuskelappModal} from './redigering/LagEllerEndreHuskelappModal';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';

export const NyHuskelappVedRedigerArbeidsliste = ({bruker}: {bruker: BrukerModell}) => {
    const [skalLagEllerEndreHuskelappModalVises, setSkalLagEllerEndreHuskelappModalVises] = useState<boolean>(false);

    const onClick = () => {
        trackAmplitude({name: 'modal åpnet', data: {tekst: 'åpnet lag eller endre huskelappmodal'}});
        setSkalLagEllerEndreHuskelappModalVises(true);
    };

    return (
        <div className="lag-huskelapp-inngang">
            <Button size="xsmall" variant="tertiary" onClick={onClick} className="arbeidsliste--rediger-lenke">
                Rediger
            </Button>
            {skalLagEllerEndreHuskelappModalVises && (
                <LagEllerEndreHuskelappModal
                    onModalClose={() => {
                        setSkalLagEllerEndreHuskelappModalVises(false);
                    }}
                    isModalOpen={skalLagEllerEndreHuskelappModalVises}
                    huskelapp={bruker.huskelapp as HuskelappModell}
                    arbeidsliste={bruker.arbeidsliste.arbeidslisteAktiv ? bruker.arbeidsliste : null}
                    bruker={bruker}
                />
            )}
        </div>
    );
};
