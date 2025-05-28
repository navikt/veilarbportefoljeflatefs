import {VeilederModell} from '../typer/enhet-og-veiledere-modeller';

export const lagLablerTilVeiledereMedIdenter = (
    identer: string[],
    veiledere: VeilederModell[],
    doSlettFilter: (ident: string) => any
) => {
    // For kvar av identane det er filtrert på
    return identer
        .map(ident => {
            // Sjekk om identen finst i lista over veiledarar på enheten
            const veileder = veiledere.find(v => v.ident === ident);

            // Om den ikkje gjer det: Fjern identen frå filteret
            if (!veileder) {
                return doSlettFilter(ident);
            }

            // Elles: Returner data for filteretikett
            return {
                label: `${veileder.etternavn}, ${veileder.fornavn} (${ident})`,
                key: ident
            };
        })
        .filter(ident => ident);
};
