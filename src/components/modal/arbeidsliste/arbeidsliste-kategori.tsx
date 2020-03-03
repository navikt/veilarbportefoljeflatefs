import * as React from 'react';
import './arbeidsliste-kategori.less';
import { ReactComponent as ArbeidslisteikonBla } from './arbeidslisteikon/arbeidslisteikon_bla.svg';
import { ReactComponent as ArbeidslisteikonLilla } from './arbeidslisteikon/arbeidslisteikon_lilla.svg';
import { ReactComponent as ArbeidslisteikonGronn } from './arbeidslisteikon/arbeidslisteikon_gronn.svg';
import { ReactComponent as ArbeidslisteikonGul } from './arbeidslisteikon/arbeidslisteikon_gul.svg';
import ArbeidslisteIkon from './arbeidslisteikon/arbeidslisteikon';
import { Field } from 'formik';
import { KategoriModell } from '../../../model-interfaces';

function ArbeidslisteKategori(props: { name: string, index: string }) {
    return (
        <Field name={props.name}>
            {({field, form}) => {
                return (
                    <div className="arbeidslisteikon">
                        <span className="skjemaelement__label">Kategori</span>
                        <ArbeidslisteIkon
                            value={KategoriModell.BLA}
                            arbeidslisteikon={<ArbeidslisteikonBla/>}
                            name={props.name}
                            onChange={() => form.setFieldValue(field.name, KategoriModell.BLA)}
                            checked={field.value === KategoriModell.BLA}
                            index={props.index}
                        />
                        <ArbeidslisteIkon
                            value={KategoriModell.LILLA}
                            arbeidslisteikon={<ArbeidslisteikonLilla/>}
                            name={props.name}
                            onChange={() => form.setFieldValue(props.name, KategoriModell.LILLA)}
                            checked={field.value === KategoriModell.LILLA}
                            index={props.index}
                        />
                        <ArbeidslisteIkon
                            value={KategoriModell.GRONN}
                            arbeidslisteikon={<ArbeidslisteikonGronn/>}
                            name={props.name}
                            onChange={() => form.setFieldValue(props.name, KategoriModell.GRONN)}
                            checked={field.value === KategoriModell.GRONN}
                            index={props.index}
                        />
                        <ArbeidslisteIkon
                            value={KategoriModell.GUL}
                            arbeidslisteikon={<ArbeidslisteikonGul/>}
                            name={props.name}
                            onChange={() => form.setFieldValue(props.name, KategoriModell.GUL)}
                            checked={field.value === KategoriModell.GUL}
                            index={props.index}
                        />
                    </div>
                );
            }}
        </Field>
    );
}

export default ArbeidslisteKategori;
