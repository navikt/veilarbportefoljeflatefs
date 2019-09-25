import { VeilederGruppe, VeilederModell } from '../model-interfaces';

export const veilederGrupper = (veiledere: VeilederModell [] ) => {
    const veilederGruppe1 = veiledere.slice(0,4).map((v) => v.ident);
    const veilederGruppe2 = veiledere.slice(5,10).map((v) => v.ident);
    return (
        [
            {gruppeNavn: 'Fantastic Four', gruppeId: '12', veileder: veilederGruppe1},
            {gruppeNavn: 'Prinsess Gruppen', gruppeId: '13', veileder: veilederGruppe2}
        ] as VeilederGruppe []
    );
};
