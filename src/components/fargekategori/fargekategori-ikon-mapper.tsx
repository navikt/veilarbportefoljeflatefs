import {FargekategoriModell} from '../../model-interfaces';
import {ReactComponent as FargekategoriIkonBlaHalvsirkel} from '../ikoner/fargekategorier/Fargekategoriikon_bla_halvsirkel.svg';
import {ReactComponent as FargekategoriIkonGronnTrekant} from '../ikoner/fargekategorier/Fargekategoriikon_gronn_trekant.svg';
import {ReactComponent as FargekategoriIkonGulSirkel} from '../ikoner/fargekategorier/Fargekategoriikon_gul_sirkel.svg';
import {ReactComponent as FargekategoriIkonLillaFirkant} from '../ikoner/fargekategorier/Fargekategoriikon_lilla_firkant.svg';
import {ReactComponent as FargekategoriIkonLyseblaFemkant} from '../ikoner/fargekategorier/Fargekategoriikon_lysebla_femkant.svg';
import {ReactComponent as FargekategoriIkonOransjeDiamant} from '../ikoner/fargekategorier/Fargekategoriikon_oransje_diamant.svg';
import {ReactComponent as FargekategoriIkonTomtBokmerke} from '../ikoner/fargekategorier/Fargekategoriikon_bokmerke_stiplet.svg';
import React from 'react';

const fargekategoriIkonMapper = (fargekategori: FargekategoriModell | null, ikonClassName: string = '') => {
    switch (fargekategori) {
        case FargekategoriModell.FARGEKATEGORI_A:
            return <FargekategoriIkonBlaHalvsirkel className={ikonClassName} />;
        case FargekategoriModell.FARGEKATEGORI_B:
            return <FargekategoriIkonGronnTrekant className={ikonClassName} />;
        case FargekategoriModell.FARGEKATEGORI_C:
            return <FargekategoriIkonGulSirkel className={ikonClassName} />;
        case FargekategoriModell.FARGEKATEGORI_D:
            return <FargekategoriIkonLillaFirkant className={ikonClassName} />;
        case FargekategoriModell.FARGEKATEGORI_E:
            return <FargekategoriIkonLyseblaFemkant className={ikonClassName} />;
        case FargekategoriModell.FARGEKATEGORI_F:
            return <FargekategoriIkonOransjeDiamant className={ikonClassName} />;
        case FargekategoriModell.INGEN_KATEGORI:
        case null:
            return <FargekategoriIkonTomtBokmerke className={ikonClassName} />;
    }
};

export default fargekategoriIkonMapper;
