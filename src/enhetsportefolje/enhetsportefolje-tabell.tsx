import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EnhetBrukerpanel from './enhet-brukerpanel';
import { settBrukerSomMarkert } from '../ducks/portefolje';
import { usePortefoljeSelector } from '../hooks/redux/use-portefolje-selector';
import { ListevisningType } from '../ducks/ui/listevisning';
import { useForrigeBruker } from '../hooks/portefolje/use-forrige-bruker';
import './ny_enhetsportefolje.less';
import './brukerliste.less';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { AppState } from '../reducer';
import { STATUS } from '../ducks/utils';

const finnBrukersVeileder = (veiledere, bruker) => (veiledere.find((veileder) => veileder.ident === bruker.veilederId));

interface EnhetTabellProps {
    classNameWrapper: string;
}

function EnhetTabell(props: EnhetTabellProps) {
    const forrigeBruker = useForrigeBruker();
    const {brukere, filtervalg, enhetId, listevisning, portefolje} = usePortefoljeSelector(ListevisningType.enhetensOversikt);
    const veiledere = useSelector(((state: AppState) => state.veiledere));

    const dispatch = useDispatch();

    const settMarkert = (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert));

    const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;

    return (
        <Innholdslaster avhengigheter={[portefolje, veiledere, {status: tilordningerStatus}]}>
            <div className={props.classNameWrapper}>
                <div className="typo-undertekst blokk-xs enhet-tabell">
                    <ul className="brukerliste">
                        {brukere.map((bruker) =>
                            <EnhetBrukerpanel
                                key={bruker.fnr || bruker.guid}
                                bruker={bruker}
                                enhetId={enhetId}
                                settMarkert={settMarkert}
                                filtervalg={filtervalg}
                                valgteKolonner={listevisning.valgte}
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
