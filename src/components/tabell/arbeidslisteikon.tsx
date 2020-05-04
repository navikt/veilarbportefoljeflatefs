import * as React from 'react';
import '../../minoversikt/minoversikt.less';
import { ReactComponent as ArbeidslisteikonBla } from '../ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import { ReactComponent as ArbeidslisteikonLilla } from '../ikoner/arbeidsliste/arbeidslisteikon_lilla.svg';
import { ReactComponent as ArbeidslisteikonGronn } from '../ikoner/arbeidsliste/arbeidslisteikon_gronn.svg';
import { ReactComponent as ArbeidslisteikonGul } from '../ikoner/arbeidsliste/arbeidslisteikon_gul.svg';
import { KategoriModell } from '../../model-interfaces';

interface ArbeidslistekategoriProps {
    skalVises: boolean;
    kategori: KategoriModell;
}

export default function ArbeidslistekategoriVisning({skalVises, kategori}: ArbeidslistekategoriProps) {
    const velgArbeidslistekategori = () => {
        switch (kategori) {
            case KategoriModell.BLA:
                return <ArbeidslisteikonBla/>;
            case KategoriModell.LILLA:
                return <ArbeidslisteikonLilla/>;
            case KategoriModell.GRONN:
                return <ArbeidslisteikonGronn/>;
            case KategoriModell.GUL:
                return <ArbeidslisteikonGul/>;
            default:
                return null;
        }
    };

    return <span className='arbeidsliste--ikon'>
        {skalVises && velgArbeidslistekategori()}
        </span>;
};
