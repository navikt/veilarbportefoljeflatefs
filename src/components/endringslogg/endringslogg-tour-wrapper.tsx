import Endringslogg from './endringslogg';
import TourModalLocalStorage from '../tour-modal/tour-modal-local-storage';
import { default as React, useState } from 'react';
import { getInnholdOgSett, settModalEndring } from './endringslogg-custom';
import { registrerHarLestEndringslogg } from './endringslogg-utils';
import { connect } from 'react-redux';
import { sjekkFeature } from '../../ducks/features';
import { ENDRINGSLOGG, VIS_MOTER_MED_NAV } from '../../konstanter';
import { ModalName } from '../tour-modal/tour-modal';

interface StateProps {
    harFeature: (feature: string) => boolean;
}

export function EndringsloggTourWrapper(props: StateProps) {
    const {harFeature} = props;
    const visCVInnlegg = harFeature(VIS_MOTER_MED_NAV);

    const [innholdsListe, setInnholdsliste] = useState(getInnholdOgSett());
    if (!visCVInnlegg) {
        if (innholdsListe.some((el) => el.id === ModalName.MOTE_FILTER)) {
            setInnholdsliste(innholdsListe.filter((el) => el.id !== ModalName.MOTE_FILTER));
        }
    }

    const oppdaterSettListe = ((name: string) => setInnholdsliste(settModalEndring(innholdsListe, name)));
    const oppdaterLocalstorageOgState = () => {
        innholdsListe.forEach((elem) => {
            oppdaterSettListe(elem.id);
            registrerHarLestEndringslogg(elem.id);
        });
    };

    const visEndringslogg = harFeature(ENDRINGSLOGG);
    return (
        <>
            {visEndringslogg &&
            <Endringslogg innhold={innholdsListe} oppdaterInnhold={oppdaterLocalstorageOgState}/>
            }
            <TourModalLocalStorage completed={oppdaterSettListe}/>
        </>
    );
}

const mapStateToProps = (state) => ({
    harFeature: (feature: string) => sjekkFeature(state, feature)
});

export default connect(mapStateToProps)(EndringsloggTourWrapper);
