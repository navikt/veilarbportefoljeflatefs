import * as React from 'react';
import classNames from 'classnames';
import '../../minoversikt/minoversikt.less';
import { ReactComponent as ArbeidslisteikonBla } from '../modal/arbeidsliste/arbeidslisteikon/arbeidslisteikon_bla.svg';
// import { ReactComponent as ArbeidslisteikonRod } from '../modal/arbeidsliste/arbeidslisteikon/arbeidslisteikon_rod.svg';
// import { ReactComponent as ArbeidslisteikonGronn } from '../modal/arbeidsliste/arbeidslisteikon/arbeidslisteikon_gronn.svg';
// import { ReactComponent as ArbeidslisteikonGul } from '../modal/arbeidsliste/arbeidslisteikon/arbeidslisteikon_gul.svg';

interface ArbeidslisteikonProps {
    className?: string;
    skalVises: boolean;
}

const cls = (className?: string) => className ? classNames('arbeidsliste--ikon', className) : 'arbeidsliste--ikon';

export default ({className, skalVises}: ArbeidslisteikonProps) => {

    //hvis value fra radiobutton er det samme som value her, så skal de forskjellige ikonene vises.
    // const value =
    // const velgArbeidslisteIkon = () => {
    //     if (skalVises) {
    //         switch (value) {
    //             case 'BLA':
    //                 return <ArbeidslisteikonBla/>;
    //             case 'ROD':
    //                 return <ArbeidslisteikonRod/>;
    //             case 'GRONN':
    //                 return <ArbeidslisteikonGronn/>;
    //             case 'GUL':
    //                 return <ArbeidslisteikonGul/>;
    //         }
    //     }
    // };

    const visIkon = skalVises ? <ArbeidslisteikonBla/> : null;

    return <span className={skalVises ? cls(className) : className}>

        {visIkon}
        {/*{velgArbeidslisteIkon}*/}

        </span>;
};
