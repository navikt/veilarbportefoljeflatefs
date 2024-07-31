import * as React from 'react';
import FormikDatoVelger from '../../formik/formik-datovelger/formik-datovelger';
import {BrukerModell} from '../../../model-interfaces';
import FormikInput from '../../formik/formik-input';
import FormikTekstArea from '../../formik/formik-tekstarea';
import './arbeidsliste.css';
import ArbeidslisteKategori from './arbeidsliste-kategori';
import {Heading} from '@navikt/ds-react';
import {validerFristFelt} from '../../../utils/dato-utils';

function label(bruker: BrukerModell): React.ReactNode {
    return <Heading size="small" level="2">{`${bruker.fornavn} ${bruker.etternavn}, ${bruker.fnr}`}</Heading>;
}

function ArbeidslisteForm({arbeidsliste, valgteBrukere}) {
    return (
        <>
            {arbeidsliste.map((bruker, index) => (
                <div className="arbeidsliste__bruker" key={index}>
                    <div>
                        <legend data-testid="modal_legg-i-arbeidsliste_navn">{label(valgteBrukere[index])}</legend>
                        <FormikInput name={`arbeidsliste[${index}].overskrift`} index={index} />
                        <FormikTekstArea
                            name={`arbeidsliste[${index}].kommentar`}
                            index={index}
                            label="Kommentar"
                            maxLengde={500}
                            testId="modal_arbeidsliste_kommentar"
                        />
                    </div>
                    <div className="skjemaelement dato-kategori-wrapper">
                        <FormikDatoVelger
                            name={`arbeidsliste[${index}].frist`}
                            label={`arbeidsliste[${index}].frist`}
                            size="small"
                            validate={validerFristFelt}
                            ariaLabel="Frist for arbeidsliste"
                        />
                        <ArbeidslisteKategori name={`arbeidsliste[${index}].kategori`} index={index} />
                    </div>
                </div>
            ))}
        </>
    );
}

export default ArbeidslisteForm;
