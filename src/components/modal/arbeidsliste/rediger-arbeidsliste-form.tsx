import * as React from 'react';
import {Form} from 'formik';
import {Button, Detail, Heading} from '@navikt/ds-react';
import {TrashIcon} from '@navikt/aksel-icons';
import FormikTekstArea from '../../formik/formik-tekstarea';
import FormikInput from '../../formik/formik-input';
import FormikDatoVelger from '../../formik/formik-datovelger/formik-datovelger';
import './arbeidsliste.css';
import ArbeidslisteKategori from './arbeidsliste-kategori';
import {BrukerModell} from '../../../model-interfaces';
import {logEvent} from '../../../utils/frontend-logger';
import ArbeidslisteInformasjonsmelding from './arbeidsliste-informasjonsmelding';
import {validerFristFelt} from '../../../utils/dato-utils';

interface RedigerArbeidslisteProps {
    sistEndretDato: Date;
    sistEndretAv?: string;
    lukkModal: () => void;
    bruker: BrukerModell;
    fjernModal?: any;
    settMarkert: (fnr: string, markert: boolean) => void;
}

function RedigerArbeidsliste({
    sistEndretDato,
    sistEndretAv,
    lukkModal,
    bruker,
    fjernModal,
    settMarkert
}: RedigerArbeidslisteProps) {
    const fjernBruker = () => {
        logEvent('portefolje.metrikker.fjern-arbeidsliste-modal');
        settMarkert(bruker.fnr, true);
        fjernModal();
    };

    return (
        <Form data-testid="modal_rediger-arbeidsliste_form">
            <div className="arbeidsliste__bruker">
                <div>
                    <ArbeidslisteInformasjonsmelding />
                    <Heading size="small" level="2">
                        {`${bruker.fornavn} ${bruker.etternavn}, ${bruker.fnr}`}
                    </Heading>
                    <FormikInput name="overskrift" />
                    <FormikTekstArea
                        name="kommentar"
                        label="Kommentar"
                        maxLengde={500}
                        testId="modal_arbeidsliste_kommentar"
                    />
                    <Detail size="small" className="arbeidsliste--modal-redigering">
                        {`Endret ${sistEndretDato.toLocaleDateString()} av ${sistEndretAv}`}
                    </Detail>
                </div>
                <div className="dato-kategori-wrapper">
                    <FormikDatoVelger
                        name="frist"
                        label="frist"
                        size="small"
                        validate={validerFristFelt}
                        ariaLabel="Frist for arbeidsliste"
                    />
                    <ArbeidslisteKategori name="kategori" index="" />
                </div>
            </div>
            <div className="modal-footer">
                <Button
                    size="small"
                    type="submit"
                    className="knapp knapp--hoved"
                    data-testid="modal_rediger-arbeidsliste_lagre-knapp"
                    onClick={() => {
                        logEvent('teamvoff.metrikker.arbeidslistekategori', {
                            kategori: bruker.arbeidsliste.kategori,
                            leggtil: false,
                            applikasjon: 'oversikt'
                        });
                    }}
                >
                    Lagre
                </Button>
                <Button
                    size="small"
                    variant="secondary"
                    className="knapp knapp--avbryt"
                    onClick={lukkModal}
                    data-testid="modal_rediger-arbeidsliste_avbryt-knapp"
                >
                    Avbryt
                </Button>
                <Button
                    size="small"
                    className="fjern--knapp"
                    variant="danger"
                    type="button"
                    onClick={fjernBruker}
                    icon={<TrashIcon aria-hidden={true} />}
                    data-testid="modal_rediger-arbeidsliste_fjern-knapp"
                >
                    Fjern
                </Button>
            </div>
        </Form>
    );
}

export default RedigerArbeidsliste;
