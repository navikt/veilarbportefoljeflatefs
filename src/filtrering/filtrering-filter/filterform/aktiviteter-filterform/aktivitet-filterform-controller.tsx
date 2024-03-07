import React, {useEffect, useState} from 'react';
import '../filterform.css';
import {FiltervalgModell} from '../../../../model-interfaces';
import AktivitetFilterformForenklet from './aktivitet-filterform-forenklet';
import {aktiviteter} from '../../../filter-konstanter';
import AktivitetFilterformAvansert from './aktivitet-filterform-avansert';
import {AktiviteterValg, FiltreringAktiviteterValg} from '../../../../ducks/filtrering';
import {logEvent} from '../../../../utils/frontend-logger';
import {finnSideNavn} from '../../../../middleware/metrics-middleware';

interface AktivitetFilterformProps {
    filtervalg: FiltervalgModell;
    endreFiltervalg: (filterId: string, filterVerdi: any) => void;
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
    const [valgteAvanserteAktiviteter, setValgteAvanserteAktiviteter] = useState<FiltreringAktiviteterValg>({
        ...aktivitetInitialState,
        ...filtervalg.aktiviteter
    });

    const harAvanserteAktiviteter =
        valgteAvanserteAktiviteter.BEHANDLING !== 'NA' ||
        valgteAvanserteAktiviteter.EGEN !== 'NA' ||
        valgteAvanserteAktiviteter.GRUPPEAKTIVITET !== 'NA' ||
        valgteAvanserteAktiviteter.IJOBB !== 'NA' ||
        valgteAvanserteAktiviteter.MOTE !== 'NA' ||
        valgteAvanserteAktiviteter.SOKEAVTALE !== 'NA' ||
        valgteAvanserteAktiviteter.STILLING !== 'NA' ||
        valgteAvanserteAktiviteter.TILTAK !== 'NA' ||
        valgteAvanserteAktiviteter.UTDANNINGAKTIVITET !== 'NA';

    const [erForenkletFilterSynlig, setErForenkletFilterSynlig] = useState(!harAvanserteAktiviteter);
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

    const klikkPaLenke = erForenkletLenke => {
        setErForenkletFilterSynlig(erForenkletLenke);
        logEvent('portefolje.metrikker.aktivitet-lenke', {
            erForenkletLenke: erForenkletLenke,
            sideNavn: finnSideNavn()
        });
    };

    return (
        <>
            {erForenkletFilterSynlig ? (
                <AktivitetFilterformForenklet
                    valg={aktiviteter}
                    endreFiltervalg={endreFiltervalg}
                    klikkPaAvansertLenke={e => {
                        e.stopPropagation();
                        klikkPaLenke(false);
                    }}
                    nullstillAvanserteAktiviteter={nullstillAvanserteAktiviteter}
                    nullstillForenkledeAktiviteter={nullstillForenkledeAktiviteter}
                    valgteForenkledeAktiviteter={valgteForenkledeAktiviteter}
                    harAvanserteAktiviteter={harAvanserteAktiviteter}
                />
            ) : (
                <AktivitetFilterformAvansert
                    valg={aktiviteter}
                    filtervalg={filtervalg}
                    endreFiltervalg={endreFiltervalg}
                    klikkPaForenkletLenke={e => {
                        e.stopPropagation();
                        klikkPaLenke(true);
                    }}
                    nullstillForenkledeAktiviteter={nullstillForenkledeAktiviteter}
                    nullstillAvanserteAktiviteter={nullstillAvanserteAktiviteter}
                    valgteAvanserteAktiviteter={valgteAvanserteAktiviteter}
                    harAvanserteAktiviteter={harAvanserteAktiviteter}
                />
            )}
        </>
    );
}
export default AktivitetFilterformController;
