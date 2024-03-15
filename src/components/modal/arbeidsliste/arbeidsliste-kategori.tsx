import * as React from 'react';
import './arbeidsliste-kategori.css';
import './arbeidsliste.css';
import {ReactComponent as ArbeidslisteikonBla} from '../../ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import {ReactComponent as ArbeidslisteikonGronn} from '../../ikoner/arbeidsliste/arbeidslisteikon_gronn.svg';
import {ReactComponent as ArbeidslisteikonLilla} from '../../ikoner/arbeidsliste/arbeidslisteikon_lilla.svg';
import {ReactComponent as ArbeidslisteikonGul} from '../../ikoner/arbeidsliste/arbeidslisteikon_gul.svg';
import Arbeidslistekategori from './arbeidslistekategori';
import {Field} from 'formik';
import {KategoriModell} from '../../../model-interfaces';
import {Label} from '@navikt/ds-react';

interface Props {
    name: string;
    index: string;
}

function ArbeidslisteKategori({name, index}: Props) {
    const indexId = index ? `_${index}` : '';

    return (
        <Field name={name}>
            {({field, form}) => {
                return (
                    <div className="arbeidslistekategori">
                        <Label className="skjemaelement__label" size="small">
                            Kategori
                        </Label>
                        <Arbeidslistekategori
                            value={KategoriModell.BLA}
                            arbeidslistekategori={<ArbeidslisteikonBla />}
                            name={name}
                            onChange={() => form.setFieldValue(field.name, KategoriModell.BLA)}
                            checked={field.value === KategoriModell.BLA}
                            index={index}
                            title="Arbeidslisteikon blå"
                            dataTestId={`modal_arbeidslistekategori_${KategoriModell.BLA}${indexId}`}
                        />
                        <Arbeidslistekategori
                            value={KategoriModell.GRONN}
                            arbeidslistekategori={<ArbeidslisteikonGronn />}
                            name={name}
                            onChange={() => form.setFieldValue(name, KategoriModell.GRONN)}
                            checked={field.value === KategoriModell.GRONN}
                            index={index}
                            title="Arbeidslisteikon grønn"
                            dataTestId={`modal_arbeidslistekategori_${KategoriModell.GRONN}${indexId}`}
                        />
                        <Arbeidslistekategori
                            value={KategoriModell.LILLA}
                            arbeidslistekategori={<ArbeidslisteikonLilla />}
                            name={name}
                            onChange={() => form.setFieldValue(name, KategoriModell.LILLA)}
                            checked={field.value === KategoriModell.LILLA}
                            index={index}
                            title="Arbeidslisteikon lilla"
                            dataTestId={`modal_arbeidslistekategori_${KategoriModell.LILLA}${indexId}`}
                        />
                        <Arbeidslistekategori
                            value={KategoriModell.GUL}
                            arbeidslistekategori={<ArbeidslisteikonGul />}
                            name={name}
                            onChange={() => form.setFieldValue(name, KategoriModell.GUL)}
                            checked={field.value === KategoriModell.GUL}
                            index={index}
                            title="Arbeidslisteikon gul"
                            dataTestId={`modal_arbeidslistekategori_${KategoriModell.GUL}${indexId}`}
                        />
                    </div>
                );
            }}
        </Field>
    );
}

export default ArbeidslisteKategori;
