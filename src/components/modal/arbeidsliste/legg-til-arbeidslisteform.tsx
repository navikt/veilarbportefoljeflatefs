import * as React from 'react';
import {
    ArbeidslisteDataModell,
    BrukerModell,
    KategoriModell,
    Status,
    VeilederModell
} from '../../../model-interfaces';
import { postArbeidsliste } from '../../../ducks/arbeidsliste';
import { markerAlleBrukere, oppdaterArbeidslisteForBruker } from '../../../ducks/portefolje';
import { visServerfeilModal } from '../../../ducks/modal-serverfeil';
import { LEGG_TIL_ARBEIDSLISTE_FEILET, visFeiletModal } from '../../../ducks/modal-feilmelding-brukere';
import { leggTilStatustall } from '../../../ducks/statustall';
import { AppState } from '../../../reducer';
import { Form, Formik } from 'formik';
import ArbeidslisteForm from './arbeidsliste-form';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { skjulModal } from '../../../ducks/modal';
import { dateToISODate } from '../../../utils/dato-utils';
import './arbeidsliste.less';
import { logEvent } from '../../../utils/frontend-logger';
import ModalHeader from '../modal-header/modal-header';
import { Normaltekst } from 'nav-frontend-typografi';

interface OwnProps {
    valgteBrukere: BrukerModell[];
    lukkModal: () => void;
    innloggetVeileder: VeilederModell;
    setFormIsDirty: (formIsDirty: boolean) => void;
}

interface StateProps {
    arbeidslisteStatus?: Status;
}

interface DispatchProps {
    onSubmit: (formData) => void;
    lukkModal: () => void;
    fjernMarkerteBrukere: () => void;
}

interface FormValues {
    kommentar: string;
    overskrift: string;
    frist?: string;
    kategori: KategoriModell;
}

type LeggTilArbeidslisteFormProps = OwnProps & StateProps & DispatchProps;

function LeggTilArbeidslisteForm({
                                     lukkModal,
                                     valgteBrukere,
                                     onSubmit,
                                     setFormIsDirty,
                                     fjernMarkerteBrukere
                                 }: LeggTilArbeidslisteFormProps) {

    const initialValues = valgteBrukere.map((bruker) => ({kommentar: '', frist: '', overskrift: '', kategori: 'BLA'}));

    return (
        <Formik
            initialValues={{arbeidsliste: initialValues}}
            onSubmit={(values) => {
                values.arbeidsliste.map(value => logEvent('teamvoff.metrikker.arbeidslistekategori', {
                    kategori: value.kategori,
                    leggtil: true,
                    applikasjon: 'oversikt'
                }));

                onSubmit(values.arbeidsliste);
            }}
            render={(formikProps) => {
                setFormIsDirty(formikProps.dirty);
                return (
                    <Form>
                        <ModalHeader tittel='Legg i arbeidsliste'/>
                        <Normaltekst className="arbeidsliste__info-tekst">
                            {`${valgteBrukere.length} ${valgteBrukere.length === 1 ? ' bruker' : 'brukere'} valgt.`}
                        </Normaltekst>
                        <ArbeidslisteForm
                            valgteBrukere={valgteBrukere}
                            arbeidsliste={formikProps.values.arbeidsliste}
                        />
                        <div>
                            <div className="modal-footer">
                                <Hovedknapp className="knapp knapp--hoved">
                                    Lagre
                                </Hovedknapp>
                                <button type="button" className="knapp" onClick={() => {
                                    formikProps.resetForm();
                                    fjernMarkerteBrukere();
                                    lukkModal();
                                }}>
                                    Avbryt
                                </button>
                            </div>
                        </div>
                    </Form>
                );
            }}/>
    );
}

export function oppdaterState(res, liste: ArbeidslisteDataModell[], props: { innloggetVeileder: VeilederModell, bruker: BrukerModell }, dispatch) {
    if (!res) {
        return visServerfeilModal()(dispatch);
    }

    const brukereOK = res.data.data;
    const brukereError = res.data.error;

    const arbeidslisteToDispatch = liste
        .map((a) => ({
            ...a,
            sistEndretAv: {veilederId: props.innloggetVeileder},
            endringstidspunkt: new Date().toISOString(),
            arbeidslisteAktiv: true
        }))
        .filter((bruker) => brukereOK.includes(bruker.fnr));

    if (brukereError.length > 0) {
        visFeiletModal({
            aarsak: LEGG_TIL_ARBEIDSLISTE_FEILET,
            brukereError
        })(dispatch);
    }

    leggTilStatustall('minArbeidsliste', brukereOK.length)(dispatch);
    return oppdaterArbeidslisteForBruker(arbeidslisteToDispatch)(dispatch);
}

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidslisteStatus: state.arbeidsliste.status
});

const mapDispatchToProps = (dispatch, props) => ({
    onSubmit: (arbeidsliste: FormValues[]) => {
        const {valgteBrukere} = props;
        const liste = arbeidsliste.map((elem, index) => ({
            fnr: valgteBrukere[index].fnr,
            overskrift: elem.overskrift,
            kommentar: elem.kommentar,
            frist: elem.frist ? dateToISODate(elem.frist) : null,
            kategori: elem.kategori
        }));
        return postArbeidsliste(liste)(dispatch)
            .then((data) => {
                oppdaterState(data, liste, props, dispatch);
            })
            .then(() => {
                    dispatch(skjulModal());
                    dispatch(markerAlleBrukere(false));
                }
            );
    },
    lukkModal: () => dispatch(skjulModal()),
    fjernMarkerteBrukere: () => dispatch(markerAlleBrukere(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidslisteForm);
