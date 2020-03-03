import * as React from 'react';
import '../../minoversikt/minoversikt.less';
import { ReactComponent as ArbeidslisteikonBla } from '../modal/arbeidsliste/arbeidslisteikon/arbeidslisteikon_bla.svg';
import { ReactComponent as ArbeidslisteikonLilla } from '../modal/arbeidsliste/arbeidslisteikon/arbeidslisteikon_lilla.svg';
import { ReactComponent as ArbeidslisteikonGronn } from '../modal/arbeidsliste/arbeidslisteikon/arbeidslisteikon_gronn.svg';
import { ReactComponent as ArbeidslisteikonGul } from '../modal/arbeidsliste/arbeidslisteikon/arbeidslisteikon_gul.svg';
import { KategoriModell } from '../../model-interfaces';
import { logEvent } from '../../utils/frontend-logger';

interface ArbeidslisteikonProps {
    skalVises: boolean;
    kategori: KategoriModell;
}

export default function ArbeidslisteIkonVisning({skalVises, kategori}: ArbeidslisteikonProps) {
    const velgArbeidslisteIkon = () => {
        switch (kategori) {
            case KategoriModell.BLA:
                logEvent('portefolje.metrikker.arbeidslisteikon-bla');
                return <ArbeidslisteikonBla/>;
            case KategoriModell.LILLA:
                logEvent('portefolje.metrikker.arbeidslisteikon-lilla');
                return <ArbeidslisteikonLilla/>;
            case KategoriModell.GRONN:
                logEvent('portefolje.metrikker.arbeidslisteikon-gronn');
                return <ArbeidslisteikonGronn/>;
            case KategoriModell.GUL:
                logEvent('portefolje.metrikker.arbeidslisteikon-gul');
                return <ArbeidslisteikonGul/>;
            default:
                return null;
        }
    };

    return <span className='arbeidsliste--ikon'>
        {skalVises && velgArbeidslisteIkon()}
        </span>;
};
