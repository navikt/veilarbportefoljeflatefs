import React from 'react';
import { useDispatch } from 'react-redux';
import EnhetBrukerpanel from './enhet-brukerpanel';
import { settBrukerSomMarkert } from '../ducks/portefolje';
import { VeilederModell } from '../model-interfaces';
import { usePortefoljeSelector } from '../hooks/redux/use-portefolje-selector';
import { ListevisningType } from '../ducks/ui/listevisning';
import { useForrigeBruker } from '../hooks/use-forrige-bruker';
import './enhetsportefolje.less';
import './brukerliste.less';

interface EnhetTabellProps {
    veiledere: VeilederModell;
}

const finnBrukersVeileder = (veiledere, bruker) => (veiledere.find((veileder) => veileder.ident === bruker.veilederId));

function EnhetTabell(props: EnhetTabellProps) {
    const forrigeBruker = useForrigeBruker();
    const {brukere, filtervalg, enhetId, valgteKolonner} = usePortefoljeSelector(ListevisningType.enhetensOversikt);
    const dispatch = useDispatch();

    const settMarkert = (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert));

    return (
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
                        brukersVeileder={finnBrukersVeileder(props.veiledere, bruker)}
                        forrigeBruker={forrigeBruker}
                    />
                )}
            </ul>
        </div>
    );
}

export default EnhetTabell;
