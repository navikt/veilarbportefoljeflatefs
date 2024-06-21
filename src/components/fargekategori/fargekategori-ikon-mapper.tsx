import React from 'react';
import {FargekategoriModell} from '../../model-interfaces';
import {ReactComponent as FargekategoriIkonBlaHalvsirkel} from '../ikoner/fargekategorier/Fargekategoriikon_bla_halvsirkel.svg';
import {ReactComponent as FargekategoriIkonGronnTrekant} from '../ikoner/fargekategorier/Fargekategoriikon_gronn_trekant.svg';
import {ReactComponent as FargekategoriIkonGulSirkel} from '../ikoner/fargekategorier/Fargekategoriikon_gul_sirkel.svg';
import {ReactComponent as FargekategoriIkonLillaFirkant} from '../ikoner/fargekategorier/Fargekategoriikon_lilla_firkant.svg';
import {ReactComponent as FargekategoriIkonLyseblaFemkant} from '../ikoner/fargekategorier/Fargekategoriikon_lysebla_femkant.svg';
import {ReactComponent as FargekategoriIkonOransjeDiamant} from '../ikoner/fargekategorier/Fargekategoriikon_oransje_diamant.svg';
import {ReactComponent as FargekategoriIkonTomtBokmerke} from '../ikoner/fargekategorier/Fargekategoriikon_bokmerke_stiplet.svg';

const fargekategoriIkonMapper = (
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
        case FargekategoriModell.FARGEKATEGORI_E:
            return <FargekategoriIkonLyseblaFemkant className={ikonClassName} fontSize="1.5rem" title={ikonTitle} />;
        case FargekategoriModell.FARGEKATEGORI_F:
            return <FargekategoriIkonOransjeDiamant className={ikonClassName} fontSize="1.5rem" title={ikonTitle} />;
        case FargekategoriModell.INGEN_KATEGORI:
        case null:
            return <FargekategoriIkonTomtBokmerke className={ikonClassName} fontSize="1.5rem" title={ikonTitle} />;
    }
};

export default fargekategoriIkonMapper;
