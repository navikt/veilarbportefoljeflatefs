import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import EnhetBrukerpanel from './enhet-brukerpanel';
import {hentPortefoljeForEnhet, settBrukerSomMarkert, settSortering} from '../ducks/portefolje';
import { usePortefoljeSelector } from '../hooks/redux/use-portefolje-selector';
import { ListevisningType } from '../ducks/ui/listevisning';
import { useForrigeBruker } from '../hooks/use-forrige-bruker';
import './enhetsportefolje.less';
import './brukerliste.less';
import Innholdslaster from "../innholdslaster/innholdslaster";
import {AppState} from "../reducer";
import {STATUS} from "../ducks/utils";
import {useOnMount} from "../hooks/use-on-mount";
import {getSorteringsFeltFromUrl, getSorteringsRekkefolgeFromUrl} from "../utils/url-utils";



const finnBrukersVeileder = (veiledere, bruker) => (veiledere.find((veileder) => veileder.ident === bruker.veilederId));

function EnhetTabell() {
    const forrigeBruker = useForrigeBruker();
    const {brukere, filtervalg, enhetId, valgteKolonner} = usePortefoljeSelector(ListevisningType.enhetensOversikt);

    const portefolje = useSelector(((state: AppState) => state.portefolje));
    const veiledere = useSelector(((state: AppState) => state.veiledere));

    const dispatch = useDispatch();

    useOnMount(()=> {
        const sorteringsFeltFromUrl = getSorteringsFeltFromUrl();
        const sorteringsRekkefolgeFromUrl = getSorteringsRekkefolgeFromUrl();
        dispatch(settSortering(sorteringsRekkefolgeFromUrl, sorteringsFeltFromUrl));
        dispatch(hentPortefoljeForEnhet(enhetId, sorteringsRekkefolgeFromUrl, sorteringsFeltFromUrl, filtervalg));
    });

    const settMarkert = (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert));

    const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;

    return (
        <Innholdslaster avhengigheter={[portefolje, veiledere, {status: tilordningerStatus}]}>
            <div className="portefolje__container">
                <div className="typo-undertekst blokk-xs enhet-tabell">
                    <ul className="brukerliste">
                        {brukere.map((bruker) =>
                            <EnhetBrukerpanel
                                key={bruker.fnr || bruker.guid}
                                bruker={bruker}
                                enhetId={enhetId}
                                settMarkert={settMarkert}
                                filtervalg={filtervalg}
                                valgteKolonner={valgteKolonner}
                                brukersVeileder={finnBrukersVeileder(veiledere.data.veilederListe, bruker)}
                                forrigeBruker={forrigeBruker}
                            />
                        )}
                    </ul>
                </div>
            </div>
        </Innholdslaster>
    );
}

export default EnhetTabell;
