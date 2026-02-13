import {useSelector} from 'react-redux';
import {MinoversiktTableRow} from './MinoversiktTableRow';
import {settBrukerSomMarkert} from '../ducks/portefolje';
import {OversiktType} from '../ducks/ui/listevisning';
import {usePortefoljeSelector} from '../hooks/redux/use-portefolje-selector';
import {useOnUnmount} from '../hooks/use-on-unmount';
import {updateLastPath} from '../utils/url-utils';
import {Innholdslaster} from '../innholdslaster/innholdslaster';
import {STATUS} from '../ducks/utils';
import {AppState} from '../reducer';
import {useBrukerIKontekstSelector} from '../hooks/redux/use-bruker-i-kontekst-selector';
import './minoversikt.css';

import {useAppDispatch} from '../hooks/redux/use-app-dispatch';

interface Props {
    classNameWrapper: string;
}

export function MinoversiktTableBody({classNameWrapper}: Props) {
    const forrigeBruker = useBrukerIKontekstSelector();
    const {brukere, enhetId, filtervalg, listevisning} = usePortefoljeSelector(OversiktType.minOversikt);
    const portefolje = useSelector((state: AppState) => state.portefolje);
    const dispatch = useAppDispatch();
    const settMarkert = (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert));
    const tilordningerStatus = portefolje.tilordningerstatus !== STATUS.RELOADING ? STATUS.OK : STATUS.RELOADING;

    useOnUnmount(() => {
        updateLastPath();
    });

    return (
        <Innholdslaster avhengigheter={[portefolje, {status: tilordningerStatus}]}>
            <div className={classNameWrapper}>
                <div className="minoversikt-liste__wrapper">
                    <ul className="brukerliste" data-testid="brukerliste">
                        {enhetId &&
                            brukere.map(bruker => (
                                <MinoversiktTableRow
                                    key={bruker.fnr || bruker.guid}
                                    bruker={bruker}
                                    enhetId={enhetId}
                                    settMarkert={settMarkert}
                                    varForrigeBruker={forrigeBruker === bruker.fnr}
                                    filtervalg={filtervalg}
                                    valgteKolonner={listevisning.valgte}
                                />
                            ))}
                    </ul>
                </div>
            </div>
        </Innholdslaster>
    );
}
