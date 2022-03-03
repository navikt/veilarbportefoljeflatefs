import * as React from 'react';
import './arbeidsliste-kategori.less';
import './arbeidsliste.less';
import {ReactComponent as ArbeidslisteikonBla} from '../../ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import {ReactComponent as ArbeidslisteikonGronn} from '../../ikoner/arbeidsliste/arbeidslisteikon_gronn.svg';
import {ReactComponent as ArbeidslisteikonLilla} from '../../ikoner/arbeidsliste/arbeidslisteikon_lilla.svg';
import {ReactComponent as ArbeidslisteikonGul} from '../../ikoner/arbeidsliste/arbeidslisteikon_gul.svg';
import Arbeidslistekategori from './arbeidslistekategori';
import {Field} from 'formik';
import {KategoriModell} from '../../../model-interfaces';
import {Label} from '@navikt/ds-react';

function ArbeidslisteKategori(props: {name: string; index: string}) {
    const indexId = props.index ? `_${props.index}` : '';

    return (
        <Field name={props.name}>
            {({field, form}) => {
                return (
                    <div className="arbeidslistekategori">
                        <Label className="skjemaelement__label">Kategori</Label>
                        <Arbeidslistekategori
                            value={KategoriModell.BLA}
                            arbeidslistekategori={<ArbeidslisteikonBla />}
                            name={props.name}
                            onChange={() => form.setFieldValue(field.name, KategoriModell.BLA)}
                            checked={field.value === KategoriModell.BLA}
                            index={props.index}
                            title="Arbeidslisteikon blå"
                            dataTestId={`modal_arbeidslistekategori_${KategoriModell.BLA}${indexId}`}
                        />
                        <Arbeidslistekategori
                            value={KategoriModell.GRONN}
                            arbeidslistekategori={<ArbeidslisteikonGronn />}
                            name={props.name}
                            onChange={() => form.setFieldValue(props.name, KategoriModell.GRONN)}
                            checked={field.value === KategoriModell.GRONN}
                            index={props.index}
                            title="Arbeidslisteikon grønn"
                            dataTestId={`modal_arbeidslistekategori_${KategoriModell.GRONN}${indexId}`}
                        />
                        <Arbeidslistekategori
                            value={KategoriModell.LILLA}
                            arbeidslistekategori={<ArbeidslisteikonLilla />}
                            name={props.name}
                            onChange={() => form.setFieldValue(props.name, KategoriModell.LILLA)}
                            checked={field.value === KategoriModell.LILLA}
                            index={props.index}
                            title="Arbeidslisteikon lilla"
                            dataTestId={`modal_arbeidslistekategori_${KategoriModell.LILLA}${indexId}`}
                        />
                        <Arbeidslistekategori
                            value={KategoriModell.GUL}
                            arbeidslistekategori={<ArbeidslisteikonGul />}
                            name={props.name}
                            onChange={() => form.setFieldValue(props.name, KategoriModell.GUL)}
                            checked={field.value === KategoriModell.GUL}
                            index={props.index}
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
