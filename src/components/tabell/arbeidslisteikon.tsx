import * as React from 'react';
import classNames from 'classnames';
import '../../minoversikt/minoversikt.less';
import { ReactComponent as ArbeidslisteikonBla } from '../modal/arbeidsliste/arbeidslisteikon/arbeidslisteikon_bla.svg';
import { ReactComponent as ArbeidslisteikonRod } from '../modal/arbeidsliste/arbeidslisteikon/arbeidslisteikon_rod.svg';
import { ReactComponent as ArbeidslisteikonGronn } from '../modal/arbeidsliste/arbeidslisteikon/arbeidslisteikon_gronn.svg';
import { ReactComponent as ArbeidslisteikonGul } from '../modal/arbeidsliste/arbeidslisteikon/arbeidslisteikon_gul.svg';
import { KategoriModell } from '../../model-interfaces';

interface ArbeidslisteikonProps {
    className?: string;
    skalVises: boolean;
    kategori: KategoriModell;
}

const cls = (className?: string) => className ? classNames('arbeidsliste--ikon', className) : 'arbeidsliste--ikon';

export default function ArbeidslisteIkonVisning({className, skalVises, kategori}: ArbeidslisteikonProps) {
    const velgArbeidslisteIkon = () => {
        switch (kategori) {
            case KategoriModell.BLA:
                return <ArbeidslisteikonBla/>;
            case KategoriModell.ROD:
                return <ArbeidslisteikonRod/>;
            case KategoriModell.GRONN:
                return <ArbeidslisteikonGronn/>;
            case KategoriModell.GUL:
                return <ArbeidslisteikonGul/>;
            default:
                return null;
        }
    };

    return <span className={skalVises ? cls(className) : className}>
        {skalVises && velgArbeidslisteIkon()}
        </span>;
};
