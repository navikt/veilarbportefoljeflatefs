import * as React from 'react';
import {Form} from 'formik';
import FormikTekstArea from '../../formik/formik-tekstarea';
import FormikInput from '../../formik/formik-input';
import FormikDatoVelger from '../../formik/formik-datovelger/formik-datovelger';
import './arbeidsliste.css';
import ArbeidslisteKategori from './arbeidsliste-kategori';
import {BrukerModell} from '../../../model-interfaces';
import {logEvent} from '../../../utils/frontend-logger';
import {BodyShort, Button, Detail, Heading} from '@navikt/ds-react';
import {Delete} from '@navikt/ds-icons';
import ArbeidslisteInformasjonsmelding from './arbeidsliste-informasjonsmelding';

interface RedigerArbeidslisteProps {
    sistEndretDato: Date;
    sistEndretAv?: string;
    laster: boolean;
    lukkModal: () => void;
    bruker: BrukerModell;
    fjernModal?: any;
    settMarkert: (fnr: string, markert: boolean) => void;
}

function RedigerArbeidsliste(props: RedigerArbeidslisteProps) {
    const fjernBruker = () => {
        logEvent('portefolje.metrikker.fjern-arbeidsliste-modal');
        props.settMarkert(props.bruker.fnr, true);
        props.fjernModal();
    };

    return (
        <Form data-testid="modal_rediger-arbeidsliste_form">
            <div className="arbeidsliste__bruker">
                <div className="nav-input">
                    <ArbeidslisteInformasjonsmelding />
                    <Heading size="small" level="2">
                        {`${props.bruker.fornavn} ${props.bruker.etternavn}, ${props.bruker.fnr}`}
                    </Heading>
                    <FormikInput name="overskrift" />
                    <FormikTekstArea name="kommentar" />
                    <Detail size="small" className="arbeidsliste--modal-redigering">
                        {`Oppdatert ${props.sistEndretDato.toLocaleDateString()} av ${props.sistEndretAv}`}
                    </Detail>
                </div>
                <div className="dato-kategori-wrapper">
                    <FormikDatoVelger name="frist" />
                    <ArbeidslisteKategori name="kategori" index="" />
                </div>
            </div>
            <div className="modal-footer">
                <Button
                    type="submit"
                    className="knapp knapp--hoved"
                    data-testid="modal_rediger-arbeidsliste_lagre-knapp"
                    onClick={() => {
                        logEvent('teamvoff.metrikker.arbeidslistekategori', {
                            kategori: props.bruker.arbeidsliste.kategori,
                            leggtil: false,
                            applikasjon: 'oversikt'
                        });
                        window.location.reload();
                    }}
                >
                    Lagre
                </Button>
                <Button
                    variant="secondary"
                    className="knapp knapp--avbryt"
                    onClick={props.lukkModal}
                    data-testid="modal_rediger-arbeidsliste_avbryt-knapp"
                >
                    Avbryt
                </Button>
                <Button
                    variant="danger"
                    type="button"
                    onClick={fjernBruker}
                    className="fjern--knapp"
                    data-testid="modal_rediger-arbeidsliste_fjern-knapp"
                >
                    <Delete />
                    <BodyShort size="small">Fjern</BodyShort>
                </Button>
            </div>
        </Form>
    );
}

export default RedigerArbeidsliste;
