import 'moment/locale/nb';
import {Route, Switch} from 'react-router-dom';
import {MinoversiktSide} from './minoversikt/minoversikt-side';
import {EnhetSide} from './enhetsportefolje/enhet-side';
import {VeilederoversiktSide} from './veilederoversikt/veilederoversikt-side';
import {useFetchPortefoljeData} from './hooks/portefolje/use-fetch-portefolje-data';
import {Innholdslaster} from './innholdslaster/innholdslaster';
import {TilToppenKnapp} from './components/til-toppen-knapp/til-toppen-knapp';
import './style.css';

export function Routes() {
    const {enhettiltak, veiledere, portefoljestorrelser} = useFetchPortefoljeData();

    return (
        <div className="portefolje">
            <div className="maincontent side-innhold">
                <Innholdslaster avhengigheter={[enhettiltak, veiledere, portefoljestorrelser]}>
                    <Switch>
                        <Route path="/enhet">
                            <EnhetSide />
                        </Route>
                        <Route path="/veiledere">
                            <VeilederoversiktSide />
                        </Route>
                        <Route path="/portefolje/:ident">
                            <MinoversiktSide />
                        </Route>
                        <Route path="/portefolje">
                            <MinoversiktSide />
                        </Route>
                    </Switch>
                    <TilToppenKnapp />
                </Innholdslaster>
            </div>
        </div>
    );
}
