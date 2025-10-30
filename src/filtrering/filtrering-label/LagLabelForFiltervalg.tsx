import {Filtervalg} from '../../typer/filtervalg-modell';
import {FiltreringLabel} from './filtrering-label';
import {
    AAPFilterKelvin,
    aapIKelvinFilter,
    aktiviteter,
    AktiviteterValg,
    filterKonstanter,
    HAR_AVVIK,
    hendelserEtikett,
    tiltakspengerFilter,
    TiltakspengerFilter
} from '../filter-konstanter';
import {FiltreringLabelMedIkon} from './filtrering-label-med-ikon';
import {fargekategoriIkonMapper} from '../../components/fargekategori/fargekategori-ikon-mapper';
import {EnhetModell} from '../../typer/enhet-og-veiledere-modeller';
import {useFoedelandSelector} from '../../hooks/redux/use-foedeland-selector';
import {useTolkbehovSelector} from '../../hooks/redux/use-tolkbehovspraak-selector';
import {useGeografiskbostedSelector} from '../../hooks/redux/use-geografiskbosted-selector';

interface Props {
    key: string;
    value: any;
    slettEnkelt: (filterNavn: string, filterValue: boolean | string | null) => void;
    enhettiltak: EnhetModell;
}

export const LagLabelForFiltervalg = ({key, value, slettEnkelt, enhettiltak}: Props) => {
    const foedelandListData = useFoedelandSelector();
    const tolkbehovSpraakListData = useTolkbehovSelector();
    const geografiskBostedListData = useGeografiskbostedSelector();

    if (key === Filtervalg.utdanningBestatt) {
        return value.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`utdanningBestatt-${singleValue}`}
                    label={`Utdanning bestått: ${filterKonstanter[key][singleValue]}`}
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.utdanningGodkjent) {
        return value.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`utdanningGodkjent-${singleValue}`}
                    label={`Utdanning godkjent: ${filterKonstanter[key][singleValue]}`}
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.utdanning) {
        return value.map(singleValue => {
            if (singleValue === 'INGEN_DATA') {
                return (
                    <FiltreringLabel
                        key={`utdanning-${singleValue}`}
                        label={`Utdanning: ${filterKonstanter[key][singleValue].label}`}
                        slettFilter={() => slettEnkelt(key, singleValue)}
                    />
                );
            }
            return (
                <FiltreringLabel
                    key={`utdanning-${singleValue}`}
                    label={filterKonstanter[key][singleValue]}
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.registreringstype) {
        return value.map(singleValue => {
            if (singleValue === 'INGEN_DATA') {
                return (
                    <FiltreringLabel
                        key={`situasjon-${singleValue}`}
                        label={`Situasjon: ${filterKonstanter[key][singleValue].label}`}
                        slettFilter={() => slettEnkelt(key, singleValue)}
                    />
                );
            }
            return (
                <FiltreringLabel
                    key={`situasjon-${singleValue}`}
                    label={filterKonstanter[key][singleValue]}
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.sisteEndringKategori) {
        return value.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`hendelser-${singleValue}`}
                    label={hendelserEtikett[singleValue]}
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.fodselsdagIMnd) {
        return value.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`fodselsdagIMnd-${singleValue}`}
                    label={`Fødselsdato: ${singleValue}`}
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.alder) {
        return value.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${key}--${singleValue.key || singleValue}`}
                    label={filterKonstanter[key][singleValue] || singleValue + ' år'}
                    slettFilter={() => slettEnkelt(key, singleValue.key || singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.fargekategorier) {
        return value.map(singleValue => {
            return (
                <FiltreringLabelMedIkon
                    key={singleValue}
                    label={filterKonstanter.fargekategorier[singleValue]}
                    slettFilter={() => slettEnkelt(key, singleValue)}
                    ikon={fargekategoriIkonMapper(singleValue, 'fargekategoriikon')}
                    tittel={`Fjern filtervalg "Kategori ${filterKonstanter.fargekategorier[singleValue]}"`}
                />
            );
        });
    } else if (key === Filtervalg.aktiviteterForenklet) {
        return value.map(singleValue => {
            return (
                <FiltreringLabel
                    key={singleValue}
                    label={aktiviteter[singleValue]}
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.ulesteEndringer && value === 'ULESTE_ENDRINGER') {
        return [
            <FiltreringLabel
                key={key}
                label={hendelserEtikett['ULESTE_ENDRINGER']}
                slettFilter={() => slettEnkelt(key, null)}
            />
        ];
    } else if (key === Filtervalg.visGeografiskBosted && value.length > 0) {
        return [
            <FiltreringLabel
                key={`visGeografiskBosted-1`}
                label={`Vis geografisk bosted`}
                slettFilter={() => slettEnkelt(key, '1')}
            />
        ];
    } else if (key === Filtervalg.geografiskBosted && value.length > 0) {
        return value.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${key}--${singleValue}`}
                    label={
                        'Bosted: ' +
                        (geografiskBostedListData.has(singleValue)
                            ? geografiskBostedListData.get(singleValue)
                            : 'ugyldig')
                    }
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (value === true) {
        return [
            <FiltreringLabel key={key} label={filterKonstanter[key]} slettFilter={() => slettEnkelt(key, false)} />
        ];
    } else if (key === Filtervalg.foedeland) {
        return value.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${key}--${singleValue}`}
                    label={
                        'Fødeland: ' +
                        (foedelandListData.has(singleValue) ? foedelandListData.get(singleValue) : 'ugyldig')
                    }
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.tolkBehovSpraak) {
        return value.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${key}--${singleValue}`}
                    label={
                        'Tolkebehov språk: ' +
                        (tolkbehovSpraakListData.has(singleValue)
                            ? tolkbehovSpraakListData.get(singleValue)
                            : 'ugyldig')
                    }
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.ytelseAapKelvin) {
        return value.map((singleValue: AAPFilterKelvin) => {
            return (
                <FiltreringLabel
                    key={`${key}--${singleValue}`}
                    label={aapIKelvinFilter[singleValue]}
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.ytelseTiltakspenger) {
        return value.map((singleValue: TiltakspengerFilter) => {
            return (
                <FiltreringLabel
                    key={`${key}--${singleValue}`}
                    label={tiltakspengerFilter[singleValue]}
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.avvik14aVedtak) {
        return value.map(singleValue => {
            if (singleValue === HAR_AVVIK) {
                return null;
            }

            // Selv om hovedfilteret ("Har avvik") ikke vises som en filter-etikett
            // så må vi likevel fjerne filteret fra filtervalg når alle avhengige
            // filter-etiketter fjernes
            const fjernAvvik14aHovedFilter = value.length <= 2;
            const slettAvvik14aVedtakFilter = () => {
                if (fjernAvvik14aHovedFilter) {
                    slettEnkelt(key, singleValue);
                    slettEnkelt(key, HAR_AVVIK);
                } else {
                    slettEnkelt(key, singleValue);
                }
            };

            return (
                <FiltreringLabel
                    key={`${key}--${singleValue}`}
                    label={getLabel(singleValue, key, enhettiltak)}
                    slettFilter={slettAvvik14aVedtakFilter}
                />
            );
        });
    } else if (key === Filtervalg.barnUnder18Aar && value.length > 0) {
        return value.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${key}--${singleValue}`}
                    label={`${filterKonstanter[key][singleValue]}`}
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (key === Filtervalg.barnUnder18AarAlder && value.length > 0) {
        return value.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${key}--${singleValue}`}
                    label={`Har barn under 18 år:  ${singleValue} år`}
                    slettFilter={() => slettEnkelt(key, singleValue)}
                />
            );
        });
    } else if (Array.isArray(value)) {
        return value.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${key}--${singleValue.key || singleValue}`}
                    label={getLabel(singleValue, key, enhettiltak)}
                    slettFilter={() => slettEnkelt(key, singleValue.key || singleValue)}
                />
            );
        });
    } else if (value && typeof value === 'object') {
        // key = aktiviteter
        return Object.entries(value)
            .filter(([_, aktivitetvalue]) => aktivitetvalue !== AktiviteterValg.NA)
            .map(([aktivitetkey, aktivitetvalue]) => (
                <FiltreringLabel
                    key={`aktivitet-${aktivitetkey}`}
                    label={`${filterKonstanter[key][aktivitetkey]}: ${aktivitetvalue}`}
                    slettFilter={() => slettEnkelt(key, aktivitetkey)}
                />
            ));
    } else if (key === Filtervalg.navnEllerFnrQuery) {
        const trimmedQuery = value.trim();
        if (trimmedQuery !== '') {
            const isFnr = !isNaN(parseInt(trimmedQuery, 10));
            const labelId = isFnr ? 'Søk på fødselsnummer' : 'Søk på navn';
            return [<FiltreringLabel key={key} label={labelId} slettFilter={() => slettEnkelt(key, '')} />];
        }
    } else if (value) {
        return [
            <FiltreringLabel
                key={`${key}--${value}`}
                label={filterKonstanter[key][value]}
                slettFilter={() => slettEnkelt(key, null)}
            />
        ];
    }
    return [];
};

function getLabel(singleValue: any, key: any, enhettiltak: any): string {
    if (key === Filtervalg.tiltakstyper) {
        return enhettiltak[singleValue];
    }
    if (singleValue?.label) {
        return singleValue.label;
    }
    if (filterKonstanter[key]?.[singleValue]) {
        return filterKonstanter[key][singleValue];
    }
    if (filterKonstanter[singleValue]) {
        return filterKonstanter[singleValue];
    }
    return singleValue;
}
