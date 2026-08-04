import {veiledere} from './veiledere';
import {LagretVeiledergruppePortefolje} from '../../ducks/lagret-filter';

export const veiledergrupperPortefolje = (): LagretVeiledergruppePortefolje[] => {
    const veilederGruppe1 = veiledere.slice(0, 4).map(v => v.ident);
    const veilederGruppe2 = veiledere.slice(5, 10).map(v => v.ident);
    const veilederGruppe3 = veiledere.slice(11, 15).map(v => v.ident);
    const veilederGruppe4 = veiledere.slice(16, 22).map(v => v.ident);
    const veilederGruppe5 = veiledere.slice(23, 27).map(v => v.ident);

    return [
        {
            filterNavn: 'Fantastic 4',
            filterId: 12,
            veiledere: veilederGruppe1
        },
        {
            filterNavn: 'Prinsessegruppen',
            filterId: 13,
            veiledere: veilederGruppe2
        },
        {
            filterNavn: 'Team Awesome',
            filterId: 14,
            veiledere: veilederGruppe3
        },
        {
            filterNavn: 'Team VOFF',
            filterId: 15,
            veiledere: veilederGruppe4
        },
        {
            filterNavn: 'Ungdomsavdelingen',
            filterId: 16,
            veiledere: veilederGruppe5
        },
        {
            filterNavn: 'Gruppen brukes til test la stå',
            filterId: 17,
            veiledere: veilederGruppe5
        }
    ];
};
