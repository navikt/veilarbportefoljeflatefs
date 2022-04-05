import * as React from 'react';
import FormikDatoVelger from '../../formik/formik-datovelger/formik-datovelger';
import {BrukerModell} from '../../../model-interfaces';
import FormikInput from '../../formik/formik-input';
import FormikTekstArea from '../../formik/formik-tekstarea';
import './arbeidsliste.less';
import ArbeidslisteKategori from './arbeidsliste-kategori';
import {Heading} from '@navikt/ds-react';

function label(bruker: BrukerModell): React.ReactNode {
    return <Heading size="small" level="2">{`${bruker.fornavn} ${bruker.etternavn}, ${bruker.fnr}`}</Heading>;
}

function ArbeidslisteForm({arbeidsliste, valgteBrukere}) {
    console.log(arbeidsliste);
    return (
        <>
            {arbeidsliste.map((bruker, index) => (
                <div className="arbeidsliste__bruker" key={index}>
                    <div className="nav-input">
                        <legend data-testid="modal_legg-i-arbeidsliste_navn">{label(valgteBrukere[index])}</legend>
                        <FormikInput name={`arbeidsliste[${index}].overskrift`} index={index} />
                        <FormikTekstArea name={`arbeidsliste[${index}].kommentar`} index={index} />
                    </div>
                    <div className="skjemaelement dato-kategori-wrapper">
                        <FormikDatoVelger name={`arbeidsliste[${index}].frist`} />
                        <ArbeidslisteKategori name={`arbeidsliste[${index}].kategori`} index={index} />
                    </div>
                </div>
            ))}
        </>
    );
}

export default ArbeidslisteForm;
