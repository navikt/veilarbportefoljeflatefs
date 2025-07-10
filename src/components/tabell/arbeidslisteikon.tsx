import {ReactComponent as FargekategoriIkonBlaHalvsirkel} from '../ikoner/fargekategorier/Fargekategoriikon_bla_halvsirkel.svg';
import {ReactComponent as FargekategoriIkonGronnTrekant} from '../ikoner/fargekategorier/Fargekategoriikon_gronn_trekant.svg';
import {ReactComponent as FargekategoriIkonGulSirkel} from '../ikoner/fargekategorier/Fargekategoriikon_gul_sirkel.svg';
import {ReactComponent as FargekategoriIkonLillaFirkant} from '../ikoner/fargekategorier/Fargekategoriikon_lilla_firkant.svg';
import {KategoriModell} from '../../typer/arbeidsliste';
import '../../minoversikt/minoversikt.css';

interface ArbeidslistekategoriProps {
    kategori: KategoriModell;
}

export function ArbeidslistekategoriVisning({kategori}: Readonly<ArbeidslistekategoriProps>) {
    switch (kategori) {
        case KategoriModell.BLA:
            return <FargekategoriIkonBlaHalvsirkel fontSize="1.5rem" />;
        case KategoriModell.GRONN:
            return <FargekategoriIkonGronnTrekant fontSize="1.5rem" />;
        case KategoriModell.GUL:
            return <FargekategoriIkonGulSirkel fontSize="1.5rem" />;
        case KategoriModell.LILLA:
            return <FargekategoriIkonLillaFirkant fontSize="1.5rem" />;
        default:
            return <div className="tomt-arbeidslisteikon" />;
    }
}
