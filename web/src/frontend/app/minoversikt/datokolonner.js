import React, { PropTypes as PT } from 'react';
import DatoKolonne from './datokolonne';
import { ytelseFilterErAktiv } from '../utils/utils';
import { ytelsevalg } from './../filtrering/filter-konstanter';

function Datokolonner({ bruker, ytelse }) {
    return (
        <div className="datokolonner__wrapper">
            <DatoKolonne
                dato={bruker.arbeidsliste.frist}
                skalVises={bruker.arbeidsliste.arbeidslisteAktiv}
            />
            <DatoKolonne
                dato={ytelse === ytelsevalg.AAP_MAXTID ? bruker.aapMaxtid : bruker.utlopsdato}
                skalVises={ytelseFilterErAktiv(ytelse)}
            />
        </div>
    );
}

Datokolonner.propTypes = {
    bruker: PT.object.isRequired,
    ytelse: PT.string
};

export default Datokolonner;
