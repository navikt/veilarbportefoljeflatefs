import React, { PropTypes as PT } from 'react';
import DatoKolonne from '../components/tabell/datokolonne';
import { ytelseFilterErAktiv } from '../utils/utils';
import { ytelsevalg } from '../filtrering/filter-konstanter';

function MinoversiktDatokolonner({ bruker, ytelse }) {
    return (
        <div className="datokolonner__wrapper">
            <DatoKolonne
                dato={bruker.arbeidsliste.frist || ''}
                skalVises={bruker.arbeidsliste.arbeidslisteAktiv || false}
            />
            <DatoKolonne
                dato={(ytelse === ytelsevalg.AAP_MAXTID ? bruker.aapMaxtid : bruker.utlopsdato) || ''}
                skalVises={ytelseFilterErAktiv(ytelse)}
            />
        </div>
    );
}

MinoversiktDatokolonner.propTypes = {
    bruker: PT.object.isRequired,
    ytelse: PT.string
};

export default MinoversiktDatokolonner;
