import {FargekategoriModell} from '../../model-interfaces';
import {ReactComponent as FargekategoriIkonBlattBokmerke} from '../ikoner/fargekategorier/Fargekategoriikon_blatt_bokmerke.svg';
import {ReactComponent as FargekategoriIkonGronnTrekant} from '../ikoner/fargekategorier/Fargekategoriikon_gronn_trekant.svg';
import {ReactComponent as FargekategoriIkonGulSirkel} from '../ikoner/fargekategorier/Fargekategoriikon_gul_sirkel.svg';
import {ReactComponent as FargekategoriIkonLillaFirkant} from '../ikoner/fargekategorier/Fargekategoriikon_lilla_firkant.svg';
import {ReactComponent as FargekategoriIkonLyseblaFemkant} from '../ikoner/fargekategorier/Fargekategoriikon_lysebla_femkant.svg';
import {ReactComponent as FargekategoriIkonOransjeDiamant} from '../ikoner/fargekategorier/Fargekategoriikon_oransje_diamant_v2.svg';
import {ReactComponent as FargekategoriIkonTomtBokmerke} from '../ikoner/fargekategorier/Fargekategoriikon_ingen_kategori.svg';
import React from 'react';

const fargekategoriIkonMapper = fargekategori => {
    switch (fargekategori) {
        case FargekategoriModell.FARGEKATEGORI_A:
            return <FargekategoriIkonBlattBokmerke />;
        case FargekategoriModell.FARGEKATEGORI_B:
            return <FargekategoriIkonGronnTrekant />;
        case FargekategoriModell.FARGEKATEGORI_C:
            return <FargekategoriIkonGulSirkel />;
        case FargekategoriModell.FARGEKATEGORI_D:
            return <FargekategoriIkonLillaFirkant />;
        case FargekategoriModell.FARGEKATEGORI_E:
            return <FargekategoriIkonLyseblaFemkant />;
        case FargekategoriModell.FARGEKATEGORI_F:
            return <FargekategoriIkonOransjeDiamant />;
        case FargekategoriModell.INGEN_KATEGORI:
        case null:
            return <FargekategoriIkonTomtBokmerke />;
        default:
            return undefined;
    }
};

export default fargekategoriIkonMapper;
