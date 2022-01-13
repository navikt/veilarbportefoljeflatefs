import * as React from 'react';
import {Form} from 'formik';
import FormikTekstArea from '../../formik/formik-tekstarea';
import FormikInput from '../../formik/formik-input';
import FormikDatoVelger from '../../formik/formik-datovelger/formik-datovelger';
import {Undertekst, Undertittel} from 'nav-frontend-typografi';
import './arbeidsliste.less';
import ArbeidslisteKategori from './arbeidsliste-kategori';
import {BrukerModell} from '../../../model-interfaces';
import {logEvent} from '../../../utils/frontend-logger';
import {Button} from '@navikt/ds-react';
import {Delete} from '@navikt/ds-icons';

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
                <div className="nav-input blokk-s">
                    <Undertittel>
                        {`${props.bruker.fornavn} ${props.bruker.etternavn}, ${props.bruker.fnr}`}
                    </Undertittel>
                    <FormikInput name="overskrift" />
                    <FormikTekstArea name="kommentar" />
                    <Undertekst className="arbeidsliste--modal-redigering">
                        {`Oppdatert ${props.sistEndretDato.toLocaleDateString()} av ${props.sistEndretAv}`}
                    </Undertekst>
                </div>
                <div className="skjemaelement dato-kategori-wrapper">
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
                    }}
                >
                    Lagre
                </Button>
                <Button
                    variant="tertiary"
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
                    <span>Fjern</span>
                </Button>
            </div>
        </Form>
    );
}

export default RedigerArbeidsliste;
