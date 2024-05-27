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
    className?: string;
    dataTestid?: string;
}

export default function ArbeidslistekategoriVisning({kategori, className, dataTestid}: ArbeidslistekategoriProps) {
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
                    return <ArbeidslisteikonBla className={className} data-testid={dataTestid} width="1.2rem" />;
                case KategoriModell.GRONN:
                    return <ArbeidslisteikonGronn className={className} data-testid={dataTestid} width="1.2rem" />;
                case KategoriModell.GUL:
                    return <ArbeidslisteikonGul className={className} data-testid={dataTestid} width="1.2rem" />;
                case KategoriModell.LILLA:
                    return <ArbeidslisteikonLilla className={className} data-testid={dataTestid} width="1.2rem" />;
                default:
                    return <div className="tomt-arbeidslisteikon" />;
            }
        };
        return <>{velgArbeidslistekategori()}</>;
    }
}
