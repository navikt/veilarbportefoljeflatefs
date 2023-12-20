import React, {useState} from 'react';
import {BodyShort, Button} from '@navikt/ds-react';
import {HuskelappModell} from '../../model-interfaces';
import {TrashIcon} from '@navikt/aksel-icons';
import {LagEllerEndreHuskelappModal} from './LagEllerEndreHuskelappModal';

interface Props {
    huskelapp: HuskelappModell;
}
export const HuskelappVisning = ({huskelapp}: Props) => {
    const [modalLagEllerEndreHuskelappSkalVises, setModalLagEllerEndreHuskelappSkalVises] = useState<boolean>(false);

    return (
        <>
            <div className="HuskelappVisning">
                {huskelapp.frist && <BodyShort className="frist">Frist: {huskelapp.frist}</BodyShort>}
                <BodyShort>{huskelapp.kommentar}</BodyShort>
                <BodyShort>
                    <i>Endret 03.01.2023 av Z945654</i>
                </BodyShort>
                <div className="handlingsknapper">
                    <Button
                        type="button"
                        size="xsmall"
                        variant="secondary-neutral"
                        onClick={() => {}}
                        icon={<TrashIcon />}
                    >
                        Slett
                    </Button>
                    <Button
                        type="button"
                        size="xsmall"
                        variant="primary-neutral"
                        onClick={() => setModalLagEllerEndreHuskelappSkalVises(true)}
                    >
                        Endre
                    </Button>
                </div>
            </div>
            {modalLagEllerEndreHuskelappSkalVises && (
                <LagEllerEndreHuskelappModal
                    onModalClose={() => {
                        setModalLagEllerEndreHuskelappSkalVises(false);
                    }}
                    isModalOpen={modalLagEllerEndreHuskelappSkalVises}
                    huskelapp={huskelapp}
                />
            )}
        </>
    );
};
