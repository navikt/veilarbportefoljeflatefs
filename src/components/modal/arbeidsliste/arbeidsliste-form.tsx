import * as React from 'react';
import FormikDatoVelger from '../../formik/formik-datovelger/formik-datovelger';
import { BrukerModell } from '../../../model-interfaces';
import { Undertittel } from 'nav-frontend-typografi';
import FormikInput from '../../formik/formik-input';
import FormikTekstArea from '../../formik/formik-tekstarea';
import './arbeidsliste.less';
import ArbeidslisteKategori from './arbeidsliste-kategori';

function label(bruker: BrukerModell): React.ReactNode {
    return (
        <Undertittel>
            {`${bruker.fornavn} ${bruker.etternavn}, ${bruker.fnr}`}
        </Undertittel>
    );
}

function ArbeidslisteForm({arbeidsliste, valgteBrukere}) {
    return (
        <>
            {arbeidsliste.map((bruker, index) => (
                <div className="arbeidsliste__bruker">
                    <div className="nav-input blokk-s" key={index}>
                        <legend>{label(valgteBrukere[index])}</legend>
                        <FormikInput name={`arbeidsliste[${index}].overskrift`}/>
                        <FormikTekstArea name={`arbeidsliste[${index}].kommentar`}/>
                    </div>
                    <div className="skjemaelement dato-kategori-wrapper">
                        <FormikDatoVelger name={`arbeidsliste[${index}].frist`}/>
                        <ArbeidslisteKategori name={`arbeidsliste[${index}].kategori`}/>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ArbeidslisteForm;
