import * as React from 'react';
import { Form, } from 'formik';
import { Hovedknapp } from 'nav-frontend-knapper';
import FormikTekstArea from '../../formik/formik-tekstarea';
import FormikInput from '../../formik/formik-input';
import FormikDatoVelger from '../../formik/formik-datovelger/formik-datovelger';
import { Undertekst } from 'nav-frontend-typografi';
import './arbeidsliste.less';
import ArbeidslisteKategori from './arbeidsliste-kategori';

interface RedigerArbeidslisteProps {
    sistEndretDato: Date;
    sistEndretAv?: string;
    laster: boolean;
    lukkModal: () => void;
}

function RedigerArbeidsliste(props: RedigerArbeidslisteProps) {
    let index = 0;
    return (
        <Form>
            <div className="input-fields">
                <FormikInput name="overskrift"/>
                <FormikTekstArea name="kommentar"/>
                <Undertekst className="arbeidsliste--modal-redigering">
                    {`Oppdatert ${props.sistEndretDato.toLocaleDateString()} av ${props.sistEndretAv}`}
                </Undertekst>
                <div className="dato-kategori-wrapper">
                    <FormikDatoVelger name={`arbeidsliste[${index++}].frist`}/>
                    <ArbeidslisteKategori name={`arbeidsliste[${index++}].radio`}/>
                </div>
                <div>
                    <div className="modal-footer">
                        <Hovedknapp htmlType="submit" className="knapp knapp--hoved" spinner={props.laster}>
                            Lagre
                        </Hovedknapp>
                        <button type="button" className="knapp" onClick={props.lukkModal}>
                            Avbryt
                        </button>
                    </div>
                </div>
            </div>
        </Form>
    );
}

export default RedigerArbeidsliste;
