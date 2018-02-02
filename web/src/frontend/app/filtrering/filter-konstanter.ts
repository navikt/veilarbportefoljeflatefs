import { range, lag2Sifret } from '../utils/utils';
import { Sorteringsfelt } from '../model-interfaces';

export const NYE_BRUKERE = 'NYE_BRUKERE';
export const NYE_BRUKERE_FOR_VEILEDER = 'NYE_BRUKERE_FOR_VEILEDER';
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
    NYE_BRUKERE_FOR_VEILEDER: 'Nye brukere',
    INAKTIVE_BRUKERE: 'Inaktive brukere',
    VENTER_PA_SVAR_FRA_NAV: 'Venter på svar fra NAV',
    VENTER_PA_SVAR_FRA_BRUKER: 'Venter på svar fra bruker',
    UTLOPTE_AKTIVITETER: 'Utløpte aktiviteter',
    IKKE_I_AVTALT_AKTIVITET: 'Ikke i avtalt aktivitet',
    I_AVTALT_AKTIVITET: 'I avtalt aktivitet',
    MIN_ARBEIDSLISTE: 'Min arbeidsliste'
});

export const alder = (intl) => ({
    '19-og-under': intl.formatMessage({id: 'filter.alder.under19'}),
    '20-24': intl.formatMessage({id: 'filter.alder.20-24'}),
    '25-29': intl.formatMessage({id: 'filter.alder.25-29'}),
    '30-39': intl.formatMessage({id: 'filter.alder.30-39'}),
    '40-49': intl.formatMessage({id: 'filter.alder.40-49'}),
    '50-59': intl.formatMessage({id: 'filter.alder.50-59'}),
    '60-66': intl.formatMessage({id: 'filter.alder.60-66'}),
    '67-70': intl.formatMessage({id: 'filter.alder.67-70'})
});

export const fodselsdagIMnd = () => range(1, 31, true).reduce((acc, x) => ({
    ...acc,
    [x]: lag2Sifret(x)
}), {});

export const kjonn = ()=> ({
    K: 'Kvinne',
    M: 'Mann'
});

export const innsatsgruppe = (intl) => ({
    IKVAL: intl.formatMessage({id: 'filter.innsatsgruppe.ikval'}),
    BFORM: intl.formatMessage({id: 'filter.innsatsgruppe.bform'}),
    BATT: intl.formatMessage({id: 'filter.innsatsgruppe.batt'}),
    VARIG: intl.formatMessage({id: 'filter.innsatsgruppe.varig'})
});

export const formidlingsgruppe = (intl) => ({
    ARBS: intl.formatMessage({id: 'filter.formidlingsgruppe.arbs'}),
    IARBS: intl.formatMessage({id: 'filter.formidlingsgruppe.iarbs'}),
    ISERV: intl.formatMessage({id: 'filter.formidlingsgruppe.iserv'}),
    PARBS: intl.formatMessage({id: 'filter.formidlingsgruppe.parbs'}),
    RARBS: intl.formatMessage({id: 'filter.formidlingsgruppe.rarbs'})
});
export const servicegruppe = (intl) => ({
    BKART: intl.formatMessage({id: 'filter.servicegruppe.bkart'}),
    IVURD: intl.formatMessage({id: 'filter.servicegruppe.ivurd'}),
    OPPFI: intl.formatMessage({id: 'filter.servicegruppe.oppfi'}),
    VURDI: intl.formatMessage({id: 'filter.servicegruppe.vurdi'}),
    VURDU: intl.formatMessage({id: 'filter.servicegruppe.vurdu'})
});
export const ytelse = (intl) => ({
    DAGPENGER: intl.formatMessage({id: 'filter.ytelse.dagpenger'}),
    ORDINARE_DAGPENGER: { label: intl.formatMessage({id: 'filter.ytelse.ord-dagpenger'}), className: 'skjemaelement--innrykk' },
    DAGPENGER_MED_PERMITTERING: { label: intl.formatMessage({id: 'filter.ytelse.dagpenger-permitering'}), className: 'skjemaelement--innrykk' },
    AAP: intl.formatMessage({id: 'filter.ytelse.aap'}),
    AAP_MAXTID: { label: intl.formatMessage({id: 'filter.ytelse.aap-maxtid'}), className: 'skjemaelement--innrykk' },
    AAP_UNNTAK: { label: intl.formatMessage({id: 'filter.ytelse.aap-unntak'}), className: 'skjemaelement--innrykk' },
    TILTAKSPENGER: intl.formatMessage({id: 'filter.ytelse.tiltakspenger'})
});

export const ytelsevalg: (intl?: any) => {[id: string]: string} = (intl) => Object.keys(ytelse(intl)).reduce((acc, val) => ({ ...acc, [val]: val }), {});

export const ytelseUtlopsSortering = (intl) => ({
    [ytelsevalg(intl).DAGPENGER]: Sorteringsfelt.DAGPENGER_UTLOP_UKE,
    [ytelsevalg(intl).ORDINARE_DAGPENGER]: Sorteringsfelt.DAGPENGER_UTLOP_UKE,
    [ytelsevalg(intl).DAGPENGER_MED_PERMITTERING]: Sorteringsfelt.DAGPENGER_PERM_UTLOP_UKE,
    [ytelsevalg(intl).AAP]: Sorteringsfelt.UTLOPSDATO,
    [ytelsevalg(intl).AAP_UNNTAK]: Sorteringsfelt.AAP_UNNTAK_UKE,
    [ytelsevalg(intl).AAP_MAXTID]: Sorteringsfelt.AAP_MAXTID_UKE,
    [ytelsevalg(intl).TILTAKSPENGER]: Sorteringsfelt.UTLOPSDATO
});

export const rettighetsgruppe = (intl) => ({
    AAP: intl.formatMessage({id: 'filter.rettighetsgruppe.aap'}),
    DAGP: intl.formatMessage({id: 'filter.rettighetsgruppe.dagp'}),
    INDS: intl.formatMessage({id: 'filter.rettighetsgruppe.inds'}),
    IYT: intl.formatMessage({id: 'filter.rettighetsgruppe.iyt'}),
    VENT: intl.formatMessage({id: 'filter.rettighetsgruppe.vent'}),
    VLONN: intl.formatMessage({id: 'filter.rettighetsgruppe.vlonn'})
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
