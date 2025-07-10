import {useEffect, useState} from 'react';
import {FiltervalgModell} from '../../../../typer/filtervalg-modell';
import {AktivitetFilterformForenklet} from './aktivitet-filterform-forenklet';
import {
    aktiviteter,
    AktiviteterAvtaltMedNav,
    AktiviteterValg,
    AktiviteterFilternokler
} from '../../../filter-konstanter';
import {AktivitetFilterformAvansert} from './aktivitet-filterform-avansert';
import {logEvent} from '../../../../utils/frontend-logger';
import {finnSideNavn} from '../../../../middleware/metrics-middleware';
import '../filterform.css';

interface AktivitetFilterformProps {
    filtervalg: FiltervalgModell;
    endreFiltervalg: (form: string, filterVerdi: any) => void;
}

const aktivitetInitialState: AktiviteterFilternokler = {
    [AktiviteterAvtaltMedNav.BEHANDLING]: AktiviteterValg.NA,
    [AktiviteterAvtaltMedNav.EGEN]: AktiviteterValg.NA,
    [AktiviteterAvtaltMedNav.GRUPPEAKTIVITET]: AktiviteterValg.NA,
    [AktiviteterAvtaltMedNav.IJOBB]: AktiviteterValg.NA,
    [AktiviteterAvtaltMedNav.MOTE]: AktiviteterValg.NA,
    [AktiviteterAvtaltMedNav.SOKEAVTALE]: AktiviteterValg.NA,
    [AktiviteterAvtaltMedNav.STILLING]: AktiviteterValg.NA,
    [AktiviteterAvtaltMedNav.TILTAK]: AktiviteterValg.NA,
    [AktiviteterAvtaltMedNav.UTDANNINGAKTIVITET]: AktiviteterValg.NA
};

export function AktivitetFilterformController({filtervalg, endreFiltervalg}: AktivitetFilterformProps) {
    const [valgteAvanserteAktiviteter, setValgteAvanserteAktiviteter] = useState<AktiviteterFilternokler>({
        ...aktivitetInitialState,
        ...filtervalg.aktiviteter
    });

    const harAvanserteAktiviteter =
        valgteAvanserteAktiviteter.BEHANDLING !== AktiviteterValg.NA ||
        valgteAvanserteAktiviteter.EGEN !== AktiviteterValg.NA ||
        valgteAvanserteAktiviteter.GRUPPEAKTIVITET !== AktiviteterValg.NA ||
        valgteAvanserteAktiviteter.IJOBB !== AktiviteterValg.NA ||
        valgteAvanserteAktiviteter.MOTE !== AktiviteterValg.NA ||
        valgteAvanserteAktiviteter.SOKEAVTALE !== AktiviteterValg.NA ||
        valgteAvanserteAktiviteter.STILLING !== AktiviteterValg.NA ||
        valgteAvanserteAktiviteter.TILTAK !== AktiviteterValg.NA ||
        valgteAvanserteAktiviteter.UTDANNINGAKTIVITET !== AktiviteterValg.NA;

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
