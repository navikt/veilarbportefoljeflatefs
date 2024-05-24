import * as React from 'react';
import {ReactComponent as FargekategoriIkonBlaHalvsirkel} from '../ikoner/fargekategorier/Fargekategoriikon_bla_halvsirkel.svg';
import {ReactComponent as FargekategoriIkonGronnTrekant} from '../ikoner/fargekategorier/Fargekategoriikon_gronn_trekant.svg';
import {ReactComponent as FargekategoriIkonGulSirkel} from '../ikoner/fargekategorier/Fargekategoriikon_gul_sirkel.svg';
import {ReactComponent as FargekategoriIkonLillaFirkant} from '../ikoner/fargekategorier/Fargekategoriikon_lilla_firkant.svg';
import {ReactComponent as ArbeidslisteikonBla} from '../ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import {ReactComponent as ArbeidslisteikonGronn} from '../ikoner/arbeidsliste/arbeidslisteikon_gronn.svg';
import {ReactComponent as ArbeidslisteikonGul} from '../ikoner/arbeidsliste/arbeidslisteikon_gul.svg';
import {ReactComponent as ArbeidslisteikonLilla} from '../ikoner/arbeidsliste/arbeidslisteikon_lilla.svg';
import {KategoriModell} from '../../model-interfaces';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {HUSKELAPP} from '../../konstanter';
import '../../minoversikt/minoversikt.css';

interface ArbeidslistekategoriProps {
    kategori: KategoriModell;
    dataTestid?: string;
}

export default function ArbeidslistekategoriVisning({kategori, dataTestid}: ArbeidslistekategoriProps) {
    const erFargekategoriFeatureTogglePa = useFeatureSelector()(HUSKELAPP);
    if (erFargekategoriFeatureTogglePa) {
        const velgArbeidslistekategori = () => {
            switch (kategori) {
                case KategoriModell.BLA:
                    return <FargekategoriIkonBlaHalvsirkel data-testid={dataTestid} />;
                case KategoriModell.GRONN:
                    return <FargekategoriIkonGronnTrekant data-testid={dataTestid} />;
                case KategoriModell.GUL:
                    return <FargekategoriIkonGulSirkel data-testid={dataTestid} />;
                case KategoriModell.LILLA:
                    return <FargekategoriIkonLillaFirkant data-testid={dataTestid} />;
                default:
                    return <div className="tomt-arbeidslisteikon" />;
            }
        };
        return <>{velgArbeidslistekategori()}</>;
    } else {
        const velgArbeidslistekategori = () => {
            switch (kategori) {
                case KategoriModell.BLA:
                    return <ArbeidslisteikonBla data-testid={dataTestid} />;
                case KategoriModell.GRONN:
                    return <ArbeidslisteikonGronn data-testid={dataTestid} />;
                case KategoriModell.GUL:
                    return <ArbeidslisteikonGul data-testid={dataTestid} />;
                case KategoriModell.LILLA:
                    return <ArbeidslisteikonLilla data-testid={dataTestid} />;
                default:
                    return <div className="tomt-arbeidslisteikon" />;
            }
        };
        return <>{velgArbeidslistekategori()}</>;
    }
}
