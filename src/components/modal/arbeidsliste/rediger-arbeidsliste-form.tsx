import * as React from 'react';
import { Form, } from 'formik';
import { Hovedknapp } from 'nav-frontend-knapper';
import FormikTekstArea from '../../formik/formik-tekstarea';
import FormikInput from '../../formik/formik-input';
import FormikDatoVelger from '../../formik/formik-datovelger/formik-datovelger';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import './arbeidsliste.less';
import ArbeidslisteKategori from './arbeidsliste-kategori';
import { BrukerModell } from '../../../model-interfaces';
import { logEvent } from '../../../utils/frontend-logger';
import ModalHeader from '../modal-header';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface RedigerArbeidslisteProps {
    sistEndretDato: Date;
    sistEndretAv?: string;
    laster: boolean;
    lukkModal: () => void;
    bruker: BrukerModell;
}

function RedigerArbeidsliste(props: RedigerArbeidslisteProps) {
    return (
            <Form>
                <ModalHeader tittel='Rediger arbeidsliste'/>
                <div className="arbeidsliste__bruker">
                    <div className="nav-input blokk-s">
                        <Undertittel>
                            {`${props.bruker.fornavn} ${props.bruker.etternavn}, ${props.bruker.fnr}`}
                        </Undertittel>
                        <FormikInput name="overskrift"/>
                        <FormikTekstArea name="kommentar"/>
                        <Undertekst className="arbeidsliste--modal-redigering">
                            {`Oppdatert ${props.sistEndretDato.toLocaleDateString()} av ${props.sistEndretAv}`}
                        </Undertekst>
                    </div>
                    <div className="skjemaelement dato-kategori-wrapper">
                        <FormikDatoVelger name="frist"/>
                        <ArbeidslisteKategori name="kategori" index=""/>
                    </div>
                </div>
                <div className="modal-footer">
                    <Hovedknapp
                        htmlType="submit"
                        className="knapp knapp--hoved"
                        onClick={() => {
                            logEvent('teamvoff.metrikker.arbeidslistekategori', {
                                kategori: props.bruker.arbeidsliste.kategori,
                                leggtil: false,
                                applikasjon: 'oversikt'
                            });
                        }}
                    >
                        Lagre
                    </Hovedknapp>
                    <button type="button" className="knapp" onClick={props.lukkModal}>
                        Avbryt
                    </button>
                </div>
            </Form>
    );
}

export default RedigerArbeidsliste;
