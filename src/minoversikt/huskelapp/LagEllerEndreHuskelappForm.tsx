import React from 'react';
import {HuskelappInfoAlert} from './HuskelappInfoAlert';
import {Form, Formik} from 'formik';
import FormikTekstArea from '../../components/formik/formik-tekstarea';
import FormikDatoVelger from '../../components/formik/formik-datovelger/formik-datovelger';
import {Button} from '@navikt/ds-react';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import {lagreHuskelappAction} from '../../ducks/huskelapp';
import {usePortefoljeSelector} from '../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../ducks/ui/listevisning';
import {useDispatch} from 'react-redux';
import {leggTilStatustall} from '../../ducks/statustall-veileder';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../../reducer';
import {AnyAction} from 'redux';
import {hentHuskelappForBruker} from '../../ducks/portefolje';

interface Props {
    huskelapp: HuskelappModell;
    onModalClose: () => void;
    bruker: BrukerModell;
}
export const LagEllerEndreHuskelappForm = ({huskelapp, onModalClose, bruker}: Props) => {
    const {enhetId} = usePortefoljeSelector(OversiktType.minOversikt);
    const dispatch: ThunkDispatch<AppState, any, AnyAction> = useDispatch();
    return (
        <div>
            <HuskelappInfoAlert />
            <Formik
                initialValues={{
                    frist: huskelapp?.frist ?? '',
                    kommentar: huskelapp?.kommentar ?? ''
                }}
                onSubmit={values => {
                    dispatch(
                        lagreHuskelappAction({
                            brukerFnr: bruker.fnr,
                            enhetId: enhetId!!,
                            frist: values.frist?.toString(), //TODO fikse her
                            kommentar: values.kommentar
                        })
                    )
                        .then(dispatch(hentHuskelappForBruker(bruker.fnr, enhetId!!)))
                        .then(dispatch(leggTilStatustall('mineHuskelapper', 1)))
                        .then(onModalClose);
                }}
            >
                <Form>
                    <FormikTekstArea name="kommentar" maxLengde={100} className="blokk-xs" />
                    <FormikDatoVelger name="frist" />
                    <div className="huskelapp-handlingsknapper">
                        <Button variant="primary" size="small" onClick={() => {}}>
                            Lagre
                        </Button>
                        <Button size="small" variant="secondary" type="button" onClick={onModalClose}>
                            Avbryt
                        </Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};
