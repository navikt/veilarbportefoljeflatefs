import React, {useEffect, useState} from 'react';
import '../filterform.less';
import {FiltervalgModell} from '../../../../model-interfaces';
import AktivitetFilterformForenklet from './aktivitet-filterform-forenklet';
import {aktiviteter} from '../../../filter-konstanter';
import AktivitetFilterformAvansert from './aktivitet-filterform-avansert';
import {AktiviteterValg, FiltreringAktiviteterValg} from '../../../../ducks/filtrering';
import {logEvent} from '../../../../utils/frontend-logger';

interface AktivitetFilterformProps {
    filtervalg: FiltervalgModell;
    endreFiltervalg: (form: string, filterVerdi: any) => void;
}

const aktivitetInitialState: FiltreringAktiviteterValg = {
    BEHANDLING: AktiviteterValg.NA,
    EGEN: AktiviteterValg.NA,
    GRUPPEAKTIVITET: AktiviteterValg.NA,
    IJOBB: AktiviteterValg.NA,
    MOTE: AktiviteterValg.NA,
    SOKEAVTALE: AktiviteterValg.NA,
    STILLING: AktiviteterValg.NA,
    TILTAK: AktiviteterValg.NA,
    UTDANNINGAKTIVITET: AktiviteterValg.NA
};

function AktivitetFilterformController({filtervalg, endreFiltervalg}: AktivitetFilterformProps) {
    const [erForenkletFilterSynlig, setErForenkletFilterSynlig] = useState(true);
    const [valgteAvanserteAktiviteter, setValgteAvanserteAktiviteter] = useState<FiltreringAktiviteterValg>(
        Object.assign({}, aktivitetInitialState, filtervalg.aktiviteter)
    );
    const [valgteForenkledeAktiviteter, setValgteForenkledeAktiviteter] = useState<string[]>(
        filtervalg['aktiviteterForenklet']
    );

    useEffect(() => {
        setValgteAvanserteAktiviteter(Object.assign({}, aktivitetInitialState, filtervalg.aktiviteter));
    }, [filtervalg.aktiviteter]);

    useEffect(() => {
        setValgteForenkledeAktiviteter(filtervalg.aktiviteterForenklet);
    }, [filtervalg.aktiviteterForenklet]);

    const nullstillAvanserteAktiviteter = () => {
        setValgteAvanserteAktiviteter(aktivitetInitialState);
        endreFiltervalg('aktiviteter', aktivitetInitialState);
    };

    const nullstillForenkledeAktiviteter = () => {
        setValgteForenkledeAktiviteter([]);
        endreFiltervalg('aktiviteterForenklet', []);
    };

    const klikkPaLenke = bool => {
        setErForenkletFilterSynlig(bool);
        logEvent('portefolje.metrikker.aktivitet-lenke', {erForenkletLenke: bool});
    };

    return (
        <>
            {erForenkletFilterSynlig ? (
                <AktivitetFilterformForenklet
                    valg={aktiviteter}
                    endreFiltervalg={endreFiltervalg}
                    klikkPaAvansertLenke={() => klikkPaLenke(false)}
                    nullstillAvanserteAktiviteter={nullstillAvanserteAktiviteter}
                    nullstillForenkledeAktiviteter={nullstillForenkledeAktiviteter}
                    valgteForenkledeAktiviteter={valgteForenkledeAktiviteter}
                />
            ) : (
                <AktivitetFilterformAvansert
                    valg={aktiviteter}
                    filtervalg={filtervalg}
                    endreFiltervalg={endreFiltervalg}
                    klikkPaForenkletLenke={() => klikkPaLenke(true)}
                    nullstillForenkledeAktiviteter={nullstillForenkledeAktiviteter}
                    nullstillAvanserteAktiviteter={nullstillAvanserteAktiviteter}
                    valgteAvanserteAktiviteter={valgteAvanserteAktiviteter}
                />
            )}
        </>
    );
}
export default AktivitetFilterformController;
