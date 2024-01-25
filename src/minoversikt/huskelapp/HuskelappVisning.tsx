import React, {useState} from 'react';
import {BodyShort, Button} from '@navikt/ds-react';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import {TrashIcon} from '@navikt/aksel-icons';
import {LagEllerEndreHuskelappModal} from './LagEllerEndreHuskelappModal';
import {toDatePrettyPrint} from '../../utils/dato-utils';

interface Props {
    huskelapp: HuskelappModell;
    bruker: BrukerModell;
}
export const HuskelappVisning = ({bruker, huskelapp}: Props) => {
    const [modalLagEllerEndreHuskelappSkalVises, setModalLagEllerEndreHuskelappSkalVises] = useState<boolean>(false);

    return (
        <>
            <div className="HuskelappVisning">
                <BodyShort as="div" size="small">
                    <b>{huskelapp?.frist ? `Frist: ${toDatePrettyPrint(huskelapp.frist)}` : 'Ingen frist satt'}</b>
                </BodyShort>
                <BodyShort>{huskelapp?.kommentar}</BodyShort>
                <BodyShort as="div" size="small">
                    <i>
                        Endret {toDatePrettyPrint(huskelapp?.endretDato)} av {huskelapp?.endretAv}
                    </i>
                </BodyShort>
                <div className="huskelapp-handlingsknapper">
                    <Button type="button" size="xsmall" variant="secondary" onClick={() => {}} icon={<TrashIcon />}>
                        Slett
                    </Button>
                    <Button
                        type="button"
                        size="xsmall"
                        variant="primary"
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
                    bruker={bruker}
                />
            )}
        </>
    );
};
