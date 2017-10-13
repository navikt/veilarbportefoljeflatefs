import { range, lag2Sifret } from '../utils/utils';

export const NYE_BRUKERE = 'NYE_BRUKERE';
export const INAKTIVE_BRUKERE = 'INAKTIVE_BRUKERE';
export const VENTER_PA_SVAR_FRA_NAV = 'VENTER_PA_SVAR_FRA_NAV';
export const VENTER_PA_SVAR_FRA_BRUKER = 'VENTER_PA_SVAR_FRA_BRUKER';
export const UTLOPTE_AKTIVITETER = 'UTLOPTE_AKTIVITETER';
export const IKKE_I_AVTALT_AKTIVITET = 'IKKE_I_AVTALT_AKTIVITET';
export const I_AVTALT_AKTIVITET = 'I_AVTALT_AKTIVITET';
export const MIN_ARBEIDSLISTE = 'MIN_ARBEIDSLISTE';

export const FILTERGRUPPE_ENHET = 'enhet';

export function lagConfig(data: any): any {
    if (typeof data === 'string') {
        return { label: data };
    }
    return data;
}

export const brukerstatus = ()=> ({
    NYE_BRUKERE: 'Nye brukere',
    INAKTIVE_BRUKERE: 'Inaktive brukere',
    VENTER_PA_SVAR_FRA_NAV: 'Venter på svar fra NAV',
    VENTER_PA_SVAR_FRA_BRUKER: 'Venter på svar fra bruker',
    UTLOPTE_AKTIVITETER: 'Utløpte aktiviteter',
    IKKE_I_AVTALT_AKTIVITET: 'Ikke i avtalt aktivitet',
    I_AVTALT_AKTIVITET: 'I avtalt aktivitet',
    MIN_ARBEIDSLISTE: 'Min arbeidsliste'
});

export const alder = () => ({
    '19-og-under': '19 år og under',
    '20-24': '20-24 år',
    '25-29': '25-29 år',
    '30-39': '30-39 år',
    '40-49': '40-49 år',
    '50-59': '50-59 år',
    '60-66': '60-66 år',
    '67-70': '67-70 år'
});

export const fodselsdagIMnd = () => range(1, 31, true).reduce((acc, x) => ({
    ...acc,
    [x]: lag2Sifret(x)
}), {});

export const kjonn = ()=> ({
    K: 'Kvinne',
    M: 'Mann'
});

export const innsatsgruppe = () => ({
    IKVAL: 'Standardinnsats',
    BFORM: 'Situasjonsbestemt innsats',
    BATT: 'Spesielt tilpasset innsats',
    VARIG: 'Varig tilpasset'
});

export const formidlingsgruppe = () => ({
    ARBS: 'Arbeidssøker',
    IARBS: 'Ikke arbeidssøker',
    ISERV: 'Ikke servicebehov',
    PARBS: 'Pre arbeidssøker',
    RARBS: 'Pre reaktivert arbeidssøker'
});
export const servicegruppe = () => ({
    BKART: 'Behov for arbeidsevnevurdering',
    IVURD: 'Ikke vurdert',
    OPPFI: 'Helserelatert arbeidsrettet oppfølging i NAV',
    VURDI: 'Sykmeldt oppfølging på arbeidsplassen',
    VURDU: 'Sykmeldt uten arbeidsgiver'
});
export const ytelse = () => ({
    DAGPENGER: 'Dagpenger',
    ORDINARE_DAGPENGER: { label: 'Ordinære dagpenger', className: 'skjemaelement--innrykk' },
    DAGPENGER_MED_PERMITTERING: { label: 'Dagpenger med permittering', className: 'skjemaelement--innrykk' },
    AAP: 'AAP',
    AAP_MAXTID: { label: 'AAP maxtid', className: 'skjemaelement--innrykk' },
    AAP_UNNTAK: { label: 'AAP unntak', className: 'skjemaelement--innrykk' },
    TILTAKSPENGER: 'Tiltakspenger'
});

export const ytelsevalg: {[id: string]: string} = Object.keys(ytelse()).reduce((acc, val) => ({ ...acc, [val]: val }), {});

export const ytelseUtlopsSortering = () => ({
    [ytelsevalg.DAGPENGER]: 'dagputlopUke',
    [ytelsevalg.ORDINARE_DAGPENGER]: 'dagputlopUke',
    [ytelsevalg.DAGPENGER_MED_PERMITTERING]: 'permutlopUke',
    [ytelsevalg.AAP]: 'utlopsdato',
    [ytelsevalg.AAP_UNNTAK]: 'utlopsdato',
    [ytelsevalg.AAP_MAXTID]: 'aapmaxtidUke',
    [ytelsevalg.TILTAKSPENGER]: 'utlopsdato'
});

export const rettighetsgruppe = () => ({
    AAP: 'Arbeidsavklaringspenger',
    DAGP: 'Dagpenger',
    INDS: 'Tiltakspenger',
    IYT: 'Ingen livsoppholdsytelser Arena',
    VENT: 'Ventestønad',
    VLONN: 'Ventelønn'
});

export const aktiviteter = (intl) => ({
    SOKEAVTALE: intl.formatMessage({id:'filtrering.aktiviteter.sokeavtale'}),
    STILLING: intl.formatMessage({id:'filtrering.aktiviteter.stilling'}),
    BEHANDLING: intl.formatMessage({id:'filtrering.aktiviteter.medisinsk-behandling'}),
    TILTAK: intl.formatMessage({id:'filtrering.aktiviteter.tiltak'}),
    EGEN: intl.formatMessage({id:'filtrering.aktiviteter.egen'}),
    IJOBB: intl.formatMessage({id:'filtrering.aktiviteter.ijobb'}),
    MOTE: intl.formatMessage({id:'filtrering.aktiviteter.mote'}),
    GRUPPEAKTIVITET: intl.formatMessage({id:'filtrering.aktiviteter.gruppeaktivitet'}),
    UTDANNINGAKTIVITET: intl.formatMessage({id:'filtrering.aktiviteter.utdanningaktivitet'})
});

const veiledere = {
};

export default {
    ytelseUtlopsSortering,
    brukerstatus,
    alder,
    fodselsdagIMnd,
    kjonn,
    innsatsgruppe,
    formidlingsgruppe,
    servicegruppe,
    ytelse,
    ytelsevalg,
    rettighetsgruppe,
    veiledere,
    aktiviteter
};
