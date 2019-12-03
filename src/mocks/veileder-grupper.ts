import { VeilederModell } from '../model-interfaces';
import { LagretFilter } from '../ducks/lagret-filter';
import { initialState } from '../ducks/filtrering';

export const veilederGrupper = (veiledere: VeilederModell []) => {
    const veilederGruppe1 = veiledere.slice(0, 4).map((v) => v.ident);
    const veilederGruppe2 = veiledere.slice(5, 10).map((v) => v.ident);
    const veilederGruppe3 = veiledere.slice(11, 15).map((v) => v.ident);
    const veilederGruppe4 = veiledere.slice(16, 22).map((v) => v.ident);
    const veilederGruppe5 = veiledere.slice(23, 27).map((v) => v.ident);
    const veilederGruppe6 = veiledere.slice(25, 28).map((v) => v.ident);
    const veilederGruppe7 = veiledere.slice(29, 31).map((v) => v.ident);
    const veilederGruppe8 = veiledere.slice(32, 33).map((v) => v.ident);
    const veilederGruppe9 = veiledere.slice(3, 12).map((v) => v.ident);
    const veilederGruppe10 = veiledere.slice(5, 9).map((v) => v.ident);
    const veilederGruppe11 = veiledere.slice(11, 15).map((v) => v.ident);
    const veilederGruppe12 = veiledere.slice(1, 6).map((v) => v.ident);
    const veilederGruppe13 = veiledere.slice(12, 16).map((v) => v.ident);
    return (
        [
            {filterNavn: 'Fantastic Four', filterId: 12, filterValg: {...initialState, veiledere: veilederGruppe1}},
            {filterNavn: 'Prinsess Gruppen', filterId: 13, filterValg: {...initialState, veiledere: veilederGruppe2}},
            {filterNavn: 'Hallo', filterId: 14, filterValg: {...initialState, veiledere: veilederGruppe3}},
            {filterNavn: 'På do', filterId: 15, filterValg: {...initialState, veiledere: veilederGruppe4}},
            {filterNavn: 'Et team som har et veldig, veldig, veldig', filterId: 16, filterValg: {...initialState, veiledere: veilederGruppe5}},
            {filterNavn: 'Prøver å finne maks an', filterId: 17, filterValg: {...initialState, veiledere: veilederGruppe6}},
            {filterNavn: 'BLABLABLA', filterId: 18, filterValg: {...initialState, veiledere: veilederGruppe7}},
            {filterNavn: 'Team VIBE', filterId: 19, filterValg: {...initialState, veiledere: veilederGruppe8}},
            {filterNavn: 'Spice Girls', filterId: 20, filterValg: {...initialState, veiledere: veilederGruppe9}},
            {filterNavn: 'Air Force One', filterId: 21, filterValg: {...initialState, veiledere: veilederGruppe10}},
            {filterNavn: 'Team Rocket', filterId: 22, filterValg: {...initialState, veiledere: veilederGruppe11}},
            {filterNavn: 'Team VOFF', filterId: 23, filterValg: {...initialState, veiledere: veilederGruppe12}},
            {filterNavn: 'Team DAB', filterId: 24, filterValg: {...initialState, veiledere: veilederGruppe13}}

        ] as LagretFilter []
    );
};
