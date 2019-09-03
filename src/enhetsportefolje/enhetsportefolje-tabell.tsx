import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import EnhetBrukerpanel from './enhet-brukerpanel';
import { settBrukerSomMarkert } from '../ducks/portefolje';
import EnhetListehode from './enhet-listehode';
import { VeilederModell } from '../model-interfaces';
import { useEnhetsPortefoljeSelector } from '../hooks/redux/use-enhetsportefolje-selector';
import { getFraBrukerFraUrl } from '../utils/url-utils';

interface EnhetTabellProps {
    settSorteringOgHentPortefolje: (sortering: string) => void;
    veiledere: VeilederModell;
}

const finnBrukersVeileder = (veiledere, bruker) => (veiledere.find((veileder) => veileder.ident === bruker.veilederId));

function EnhetTabell(props: EnhetTabellProps) {
    const [forrigeBruker, setForrigeBruker]= useState<string | undefined>(undefined);

    useEffect(() => {
        const forrigeBrukerFraUrl = getFraBrukerFraUrl();
        if(forrigeBrukerFraUrl) {
            setForrigeBruker(forrigeBrukerFraUrl);
        }
    },[forrigeBruker]);

    const { brukere, filtervalg, sorteringsrekkefolge, valgtEnhet, valgteKolonner, sorteringsfelt } = useEnhetsPortefoljeSelector();

    const dispatch = useDispatch();

    const settMarkert = (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert));

    return (
        <div className="typo-undertekst blokk-xs">
            <EnhetListehode
                sorteringsrekkefolge={sorteringsrekkefolge}
                sorteringOnClick={props.settSorteringOgHentPortefolje}
                filtervalg={filtervalg}
                sorteringsfelt={sorteringsfelt}
                valgteKolonner={valgteKolonner}
            />
            <ul className="brukerliste">
                {brukere.map((bruker) =>
                    <EnhetBrukerpanel
                        key={bruker.fnr || bruker.guid}
                        bruker={bruker}
                        enhetId={valgtEnhet}
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
