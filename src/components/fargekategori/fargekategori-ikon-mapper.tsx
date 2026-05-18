import {FargekategoriModell} from '../../typer/bruker-modell';
import FargekategoriIkonBlaHalvsirkel from '../ikoner/fargekategorier/Fargekategoriikon_bla_halvsirkel.svg?react';
import FargekategoriIkonGronnTrekant from '../ikoner/fargekategorier/Fargekategoriikon_gronn_trekant.svg?react';
import FargekategoriIkonGulSirkel from '../ikoner/fargekategorier/Fargekategoriikon_gul_sirkel.svg?react';
import FargekategoriIkonLillaFirkant from '../ikoner/fargekategorier/Fargekategoriikon_lilla_firkant.svg?react';
import FargekategoriIkonTurkisFemkant from '../ikoner/fargekategorier/Fargekategoriikon_turkis_femkant.svg?react';
import FargekategoriIkonOransjeRombe from '../ikoner/fargekategorier/Fargekategoriikon_oransje_rombe.svg?react';
import FargekategoriIkonTomtBokmerke from '../ikoner/fargekategorier/Fargekategoriikon_bokmerke_stiplet.svg?react';

export const fargekategoriIkonMapper = (
    fargekategori: FargekategoriModell | null,
    ikonClassName: string = '',
    ikonTitle?: string
) => {
    switch (fargekategori) {
        case FargekategoriModell.FARGEKATEGORI_A:
            return <FargekategoriIkonBlaHalvsirkel className={ikonClassName} fontSize="1.5rem" title={ikonTitle} />;
        case FargekategoriModell.FARGEKATEGORI_B:
            return <FargekategoriIkonGronnTrekant className={ikonClassName} fontSize="1.5rem" title={ikonTitle} />;
        case FargekategoriModell.FARGEKATEGORI_C:
            return <FargekategoriIkonGulSirkel className={ikonClassName} fontSize="1.5rem" title={ikonTitle} />;
        case FargekategoriModell.FARGEKATEGORI_D:
            return <FargekategoriIkonLillaFirkant className={ikonClassName} fontSize="1.5rem" title={ikonTitle} />;
        case FargekategoriModell.FARGEKATEGORI_F:
            return <FargekategoriIkonOransjeRombe className={ikonClassName} fontSize="1.5rem" title={ikonTitle} />;
        case FargekategoriModell.FARGEKATEGORI_E:
            return <FargekategoriIkonTurkisFemkant className={ikonClassName} fontSize="1.5rem" title={ikonTitle} />;
        case FargekategoriModell.INGEN_KATEGORI:
        case null:
            return <FargekategoriIkonTomtBokmerke className={ikonClassName} fontSize="1.5rem" title={ikonTitle} />;
    }
};
