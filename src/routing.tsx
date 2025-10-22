import 'moment/locale/nb';
import {Route, Routes} from 'react-router-dom';
import {MinoversiktSide} from './minoversikt/MinoversiktSide';
import {EnhetSide} from './enhetensoversikt/EnhetSide';
import {VeilederoversiktSide} from './veilederoversikt/veilederoversikt-side';
import {useFetchPortefoljeData} from './hooks/portefolje/use-fetch-portefolje-data';
import {Innholdslaster} from './innholdslaster/innholdslaster';
import {TilToppenKnapp} from './components/til-toppen-knapp/til-toppen-knapp';
import './style.css';

export function Routing() {
    const {enhettiltak, veiledere, portefoljestorrelser} = useFetchPortefoljeData();

    return (
        <div className="portefolje">
            <div className="maincontent side-innhold">
                <Innholdslaster avhengigheter={[enhettiltak, veiledere, portefoljestorrelser]}>
                    <Routes>
                        <Route path="/enhet" element={<EnhetSide />} />
                        <Route path="/veiledere" element={<VeilederoversiktSide />} />
                        <Route path="/portefolje/:ident" element={<MinoversiktSide />} />
                        <Route path="/portefolje" element={<MinoversiktSide />} />
                    </Routes>
                    <TilToppenKnapp />
                </Innholdslaster>
            </div>
        </div>
    );
}
