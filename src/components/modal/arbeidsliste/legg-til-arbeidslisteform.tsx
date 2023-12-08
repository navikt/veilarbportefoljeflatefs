import * as React from 'react';
import {ArbeidslisteDataModell, BrukerModell, KategoriModell, Status, VeilederModell} from '../../../model-interfaces';
import {lagreArbeidslisteAction} from '../../../ducks/arbeidsliste';
import {markerAlleBrukere, oppdaterArbeidslisteForBruker} from '../../../ducks/portefolje';
import {visServerfeilModal} from '../../../ducks/modal-serverfeil';
import {LEGG_TIL_ARBEIDSLISTE_FEILET, visFeiletModal} from '../../../ducks/modal-feilmelding-brukere';
import {leggTilStatustall} from '../../../ducks/statustall-veileder';
import {AppState} from '../../../reducer';
import {Form, Formik} from 'formik';
import ArbeidslisteForm from './arbeidsliste-form';
import {connect} from 'react-redux';
import {skjulModal} from '../../../ducks/modal';
import {dateToISODate} from '../../../utils/dato-utils';
import './arbeidsliste.css';
import {logEvent} from '../../../utils/frontend-logger';
import {BodyShort, Button} from '@navikt/ds-react';
import ArbeidslisteInformasjonsmelding from './arbeidsliste-informasjonsmelding';
import {trackAmplitude} from '../../../amplitude/amplitude';

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
    const initialValues = valgteBrukere.map(bruker => ({
        kommentar: '',
        frist: '',
        overskrift: '',
        kategori: 'BLA'
    }));

    return (
        <Formik
            initialValues={{arbeidsliste: initialValues}}
            onSubmit={values => {
                trackAmplitude(
                    {
                        name: 'knapp klikket',
                        data: {knapptekst: 'Legg til i arbeidsliste', effekt: 'Legger personer inn i arbeidsliste'}
                    },
                    {antallValgteBrukere: values.arbeidsliste?.length}
                );
                values.arbeidsliste.forEach(value => {
                    logEvent('teamvoff.metrikker.arbeidslistekategori', {
                        kategori: value.kategori,
                        applikasjon: 'oversikt'
                    });
                    trackAmplitude(
                        {
                            name: 'skjema fullført',
                            data: {
                                skjemanavn: 'Legg til arbeidsliste',
                                skjemaId: 'veilarbportefoljeflatefs-arbeidsliste'
                            }
                        },
                        {
                            kategori: value.kategori,
                            overskriftslengde: value.overskrift.length,
                            kommentarlengde: value.kommentar.length,
                            fristSatt: !!value.frist.length
                        }
                    );
                });

                onSubmit(values.arbeidsliste);
            }}
        >
            {formikProps => {
                setFormIsDirty(formikProps.dirty);
                return (
                    <Form data-testid="modal_arbeidsliste_form">
                        <ArbeidslisteInformasjonsmelding />
                        <BodyShort size="small" className="arbeidsliste__info-tekst">
                            {`${valgteBrukere.length} ${valgteBrukere.length === 1 ? ' bruker' : ' brukere'} valgt.`}
                        </BodyShort>
                        <ArbeidslisteForm
                            valgteBrukere={valgteBrukere}
                            arbeidsliste={formikProps.values.arbeidsliste}
                        />
                        <div>
                            <div className="modal-footer">
                                <Button
                                    className="knapp knapp--hoved"
                                    data-testid="modal_arbeidsliste_lagre-knapp"
                                    size="small"
                                >
                                    Lagre
                                </Button>
                                <Button
                                    size="small"
                                    variant="secondary"
                                    className="knapp"
                                    data-testid="modal_arbeidsliste_avbryt-knapp"
                                    onClick={() => {
                                        formikProps.resetForm();
                                        fjernMarkerteBrukere();
                                        lukkModal();
                                    }}
                                >
                                    Avbryt
                                </Button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export function oppdaterState(
    res,
    liste: ArbeidslisteDataModell[],
    props: {innloggetVeileder: VeilederModell; bruker: BrukerModell; kategori: KategoriModell},
    dispatch
) {
    if (!res) {
        return visServerfeilModal()(dispatch);
    }

    const brukereOK = res.data.data;
    const brukereError = res.data.error;

    const arbeidslisteToDispatch = liste
        .map(a => ({
            ...a,
            sistEndretAv: {veilederId: props.innloggetVeileder},
            endringstidspunkt: new Date().toISOString(),
            arbeidslisteAktiv: true
        }))
        .filter(bruker => brukereOK.includes(bruker.fnr));

    if (brukereError.length > 0) {
        visFeiletModal({
            aarsak: LEGG_TIL_ARBEIDSLISTE_FEILET,
            brukereError
        })(dispatch);
    }

    leggTilStatustall('minArbeidsliste', brukereOK.length)(dispatch);

    function oppdaterArbeidslisteKategoriTall(data: ArbeidslisteDataModell) {
        switch (data.kategori) {
            case KategoriModell.BLA: {
                leggTilStatustall('minArbeidslisteBla', 1)(dispatch);
                break;
            }
            case KategoriModell.GRONN: {
                leggTilStatustall('minArbeidslisteGronn', 1)(dispatch);
                break;
            }
            case KategoriModell.GUL: {
                leggTilStatustall('minArbeidslisteGul', 1)(dispatch);
                break;
            }
            case KategoriModell.LILLA:
                leggTilStatustall('minArbeidslisteLilla', 1)(dispatch);
        }
    }

    arbeidslisteToDispatch.forEach(oppdaterArbeidslisteKategoriTall);

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
            overskrift: elem.overskrift.length > 0 ? elem.overskrift : null,
            kommentar: elem.kommentar.length > 0 ? elem.kommentar : null,
            frist: elem.frist ? dateToISODate(elem.frist) : null,
            kategori: elem.kategori
        }));
        return lagreArbeidslisteAction(liste)(dispatch)
            .then(data => {
                oppdaterState(data, liste, props, dispatch);
            })
            .then(() => {
                dispatch(skjulModal());
                dispatch(markerAlleBrukere(false));
            });
    },
    lukkModal: () => dispatch(skjulModal()),
    fjernMarkerteBrukere: () => dispatch(markerAlleBrukere(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidslisteForm);
