import {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {BrukerModell} from '../../typer/bruker-modell';
import {HuskelappModal} from './redigering/HuskelappModal';
import {ReactComponent as HuskelappIkon} from '../../components/ikoner/huskelapp/Huskelappikon_bakgrunnsfarge.svg';
import {ReactComponent as HuskelappIkonTomt} from '../../components/ikoner/huskelapp/Huskelappikon_stiplet.svg';

export const HuskelappIkonInngang = ({bruker}: {bruker: BrukerModell}) => {
    const [skalViseHuskelappModal, setSkalViseHuskelappModal] = useState<boolean>(false);
    const harHuskelapp = !!bruker.huskelapp;

    return (
        <>
            <Button
                size="small"
                variant="tertiary"
                icon={harHuskelapp ? <HuskelappIkon /> : <HuskelappIkonTomt />}
                title={harHuskelapp ? 'Endre huskelapp' : 'Opprett huskelapp'}
                onClick={() => setSkalViseHuskelappModal(true)}
            />
            {skalViseHuskelappModal && (
                <HuskelappModal
                    onModalClose={() => setSkalViseHuskelappModal(false)}
                    isModalOpen={skalViseHuskelappModal}
                    huskelapp={bruker.huskelapp}
                    bruker={bruker}
                />
            )}
        </>
    );
};
