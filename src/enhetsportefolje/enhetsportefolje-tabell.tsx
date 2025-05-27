import {useDispatch, useSelector} from 'react-redux';
import {EnhetBrukerpanel} from './enhet-brukerpanel';
import {settBrukerSomMarkert} from '../ducks/portefolje';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../ducks/ui/listevisning';
import {Innholdslaster} from '../innholdslaster/innholdslaster';
import {AppState} from '../reducer';
import {STATUS} from '../ducks/utils';
import {useBrukerIKontekstSelector} from '../hooks/redux/use-bruker-i-kontekst-selector';
import './enhetsportefolje.css';
import './brukerliste.css';

interface EnhetTabellProps {
    classNameWrapper: string;
}

export function EnhetTabell({classNameWrapper}: EnhetTabellProps) {
    const forrigeBruker = useBrukerIKontekstSelector();
    const {brukere, filtervalg, enhetId, listevisning, portefolje} = usePortefoljeSelector(
        OversiktType.enhetensOversikt
    );
    const veiledere = useSelector((state: AppState) => state.veiledere);

    const dispatch = useDispatch();

    const settMarkert = (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert));

    const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;

    return (
        <Innholdslaster avhengigheter={[portefolje, veiledere, {status: tilordningerStatus}]}>
            <div className={classNameWrapper}>
                <div className="enhet-tabell">
                    <ul className="brukerliste">
                        {enhetId &&
                            brukere.map(bruker => (
                                <EnhetBrukerpanel
                                    key={bruker.fnr || bruker.guid}
                                    bruker={bruker}
                                    enhetId={enhetId}
                                    settMarkert={settMarkert}
                                    filtervalg={filtervalg}
                                    valgteKolonner={listevisning.valgte}
                                    forrigeBruker={forrigeBruker}
                                />
                            ))}
                    </ul>
                </div>
            </div>
        </Innholdslaster>
    );
}
