import React from 'react';
import { useDispatch } from 'react-redux';
import MinoversiktBrukerPanel from './minoversikt-bruker-panel';
import { settBrukerSomMarkert } from '../ducks/portefolje';
import { ListevisningType } from '../ducks/ui/listevisning';
import { usePortefoljeSelector } from '../hooks/redux/use-portefolje-selector';
import { useForrigeBruker } from '../hooks/use-forrige-bruker';

interface MinOversiktTabellProps {
    innloggetVeileder: string;
    visesAnnenVeiledersPortefolje?: boolean;
    settSorteringOgHentPortefolje: (sortering: string) => void;
}

function MinoversiktTabell(props: MinOversiktTabellProps) {
    const forrigeBruker = useForrigeBruker();
    const {brukere, filtervalg, enhetId, valgteKolonner} = usePortefoljeSelector(ListevisningType.minOversikt);

    const dispatch = useDispatch();
    const settMarkert = (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert));

    return (
        <div className="minoversikt-liste__wrapper typo-undertekst blokk-xs">
            <ul className="brukerliste">
                {brukere.map((bruker) =>
                    <MinoversiktBrukerPanel
                        key={bruker.fnr || bruker.guid}
                        bruker={bruker}
                        enhetId={enhetId}
                        settMarkert={settMarkert}
                        varForrigeBruker={forrigeBruker === bruker.fnr}
                        filtervalg={filtervalg}
                        valgteKolonner={valgteKolonner}
                        innloggetVeileder={props.innloggetVeileder}
                    />
                )}
            </ul>
        </div>
    );
}

export default MinoversiktTabell;
