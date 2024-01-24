import {FargekategoriModell} from '../../model-interfaces';
import {ReactComponent as FargekategoriIkonBlattBokmerke} from '../ikoner/fargekategorier/blaatt-bokmerke.svg';
import {ReactComponent as FargekategoriIkonGronnTrekant} from '../ikoner/fargekategorier/groenn-trekant.svg';
import {ReactComponent as FargekategoriIkonGulSirkel} from '../ikoner/fargekategorier/gul-sirkel.svg';
import {ReactComponent as FargekategoriIkonLillaFirkant} from '../ikoner/fargekategorier/lilla-firkant.svg';
import {ReactComponent as FargekategoriIkonLimeHalvsirkel} from '../ikoner/fargekategorier/lime-halvsirkel.svg';
import {ReactComponent as FargekategoriIkonOransjeFemkant} from '../ikoner/fargekategorier/oransje-femkant.svg';
import {ReactComponent as FargekategoriIkonTomtBokmerke} from '../ikoner/fargekategorier/tomt-bokmerke.svg';
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
            return <FargekategoriIkonLimeHalvsirkel />;
        case FargekategoriModell.FARGEKATEGORI_F:
            return <FargekategoriIkonOransjeFemkant />;
        case null:
            return <FargekategoriIkonTomtBokmerke />;
        default:
            return undefined;
    }
};

export default fargekategoriIkonMapper;
