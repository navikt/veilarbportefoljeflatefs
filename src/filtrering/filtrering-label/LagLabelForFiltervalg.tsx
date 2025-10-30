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
    valgtFilter: string;
    valgteFilteralternativer: any;
    slettEnkeltfilter: (filterNavn: string, filterValue: boolean | string | null) => void;
    enhettiltak: EnhetModell;
}

export const LagLabelForFiltervalg = ({
    valgtFilter,
    valgteFilteralternativer,
    slettEnkeltfilter,
    enhettiltak
}: Props) => {
    const foedelandListData = useFoedelandSelector();
    const tolkbehovSpraakListData = useTolkbehovSelector();
    const geografiskBostedListData = useGeografiskbostedSelector();

    if (valgtFilter === Filtervalg.utdanningBestatt) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`utdanningBestatt-${singleValue}`}
                    label={`Utdanning bestått: ${filterKonstanter[valgtFilter][singleValue]}`}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.utdanningGodkjent) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`utdanningGodkjent-${singleValue}`}
                    label={`Utdanning godkjent: ${filterKonstanter[valgtFilter][singleValue]}`}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.utdanning) {
        return valgteFilteralternativer.map(singleValue => {
            if (singleValue === 'INGEN_DATA') {
                return (
                    <FiltreringLabel
                        key={`utdanning-${singleValue}`}
                        label={`Utdanning: ${filterKonstanter[valgtFilter][singleValue].label}`}
                        slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                    />
                );
            }
            return (
                <FiltreringLabel
                    key={`utdanning-${singleValue}`}
                    label={filterKonstanter[valgtFilter][singleValue]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.registreringstype) {
        return valgteFilteralternativer.map(singleValue => {
            if (singleValue === 'INGEN_DATA') {
                return (
                    <FiltreringLabel
                        key={`situasjon-${singleValue}`}
                        label={`Situasjon: ${filterKonstanter[valgtFilter][singleValue].label}`}
                        slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                    />
                );
            }
            return (
                <FiltreringLabel
                    key={`situasjon-${singleValue}`}
                    label={filterKonstanter[valgtFilter][singleValue]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.sisteEndringKategori) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`hendelser-${singleValue}`}
                    label={hendelserEtikett[singleValue]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.fodselsdagIMnd) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`fodselsdagIMnd-${singleValue}`}
                    label={`Fødselsdato: ${singleValue}`}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.alder) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${singleValue.key || singleValue}`}
                    label={filterKonstanter[valgtFilter][singleValue] || singleValue + ' år'}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue.key || singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.fargekategorier) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabelMedIkon
                    key={singleValue}
                    label={filterKonstanter.fargekategorier[singleValue]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                    ikon={fargekategoriIkonMapper(singleValue, 'fargekategoriikon')}
                    tittel={`Fjern filtervalg "Kategori ${filterKonstanter.fargekategorier[singleValue]}"`}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.aktiviteterForenklet) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabel
                    key={singleValue}
                    label={aktiviteter[singleValue]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.ulesteEndringer && valgteFilteralternativer === 'ULESTE_ENDRINGER') {
        return [
            <FiltreringLabel
                key={valgtFilter}
                label={hendelserEtikett['ULESTE_ENDRINGER']}
                slettFilter={() => slettEnkeltfilter(valgtFilter, null)}
            />
        ];
    } else if (valgtFilter === Filtervalg.visGeografiskBosted && valgteFilteralternativer.length > 0) {
        return [
            <FiltreringLabel
                key={`visGeografiskBosted-1`}
                label={`Vis geografisk bosted`}
                slettFilter={() => slettEnkeltfilter(valgtFilter, '1')}
            />
        ];
    } else if (valgtFilter === Filtervalg.geografiskBosted && valgteFilteralternativer.length > 0) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${singleValue}`}
                    label={
                        'Bosted: ' +
                        (geografiskBostedListData.has(singleValue)
                            ? geografiskBostedListData.get(singleValue)
                            : 'ugyldig')
                    }
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgteFilteralternativer === true) {
        return [
            <FiltreringLabel
                key={valgtFilter}
                label={filterKonstanter[valgtFilter]}
                slettFilter={() => slettEnkeltfilter(valgtFilter, false)}
            />
        ];
    } else if (valgtFilter === Filtervalg.foedeland) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${singleValue}`}
                    label={
                        'Fødeland: ' +
                        (foedelandListData.has(singleValue) ? foedelandListData.get(singleValue) : 'ugyldig')
                    }
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.tolkBehovSpraak) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${singleValue}`}
                    label={
                        'Tolkebehov språk: ' +
                        (tolkbehovSpraakListData.has(singleValue)
                            ? tolkbehovSpraakListData.get(singleValue)
                            : 'ugyldig')
                    }
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.ytelseAapKelvin) {
        return valgteFilteralternativer.map((singleValue: AAPFilterKelvin) => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${singleValue}`}
                    label={aapIKelvinFilter[singleValue]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.ytelseTiltakspenger) {
        return valgteFilteralternativer.map((singleValue: TiltakspengerFilter) => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${singleValue}`}
                    label={tiltakspengerFilter[singleValue]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.avvik14aVedtak) {
        return valgteFilteralternativer.map(singleValue => {
            if (singleValue === HAR_AVVIK) {
                return null;
            }

            // Selv om hovedfilteret ("Har avvik") ikke vises som en filter-etikett
            // så må vi likevel fjerne filteret fra filtervalg når alle avhengige
            // filter-etiketter fjernes
            const fjernAvvik14aHovedFilter = valgteFilteralternativer.length <= 2;
            const slettAvvik14aVedtakFilter = () => {
                if (fjernAvvik14aHovedFilter) {
                    slettEnkeltfilter(valgtFilter, singleValue);
                    slettEnkeltfilter(valgtFilter, HAR_AVVIK);
                } else {
                    slettEnkeltfilter(valgtFilter, singleValue);
                }
            };

            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${singleValue}`}
                    label={getLabel(singleValue, valgtFilter, enhettiltak)}
                    slettFilter={slettAvvik14aVedtakFilter}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.barnUnder18Aar && valgteFilteralternativer.length > 0) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${singleValue}`}
                    label={`${filterKonstanter[valgtFilter][singleValue]}`}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.barnUnder18AarAlder && valgteFilteralternativer.length > 0) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${singleValue}`}
                    label={`Har barn under 18 år:  ${singleValue} år`}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue)}
                />
            );
        });
    } else if (Array.isArray(valgteFilteralternativer)) {
        return valgteFilteralternativer.map(singleValue => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${singleValue.key || singleValue}`}
                    label={getLabel(singleValue, valgtFilter, enhettiltak)}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, singleValue.key || singleValue)}
                />
            );
        });
    } else if (valgteFilteralternativer && typeof valgteFilteralternativer === 'object') {
        // key = aktiviteter
        return Object.entries(valgteFilteralternativer)
            .filter(([_, aktivitetvalue]) => aktivitetvalue !== AktiviteterValg.NA)
            .map(([aktivitetkey, aktivitetvalue]) => (
                <FiltreringLabel
                    key={`aktivitet-${aktivitetkey}`}
                    label={`${filterKonstanter[valgtFilter][aktivitetkey]}: ${aktivitetvalue}`}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, aktivitetkey)}
                />
            ));
    } else if (valgtFilter === Filtervalg.navnEllerFnrQuery) {
        const trimmedQuery = valgteFilteralternativer.trim();
        if (trimmedQuery !== '') {
            const isFnr = !isNaN(parseInt(trimmedQuery, 10));
            const labelId = isFnr ? 'Søk på fødselsnummer' : 'Søk på navn';
            return [
                <FiltreringLabel
                    key={valgtFilter}
                    label={labelId}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, '')}
                />
            ];
        }
    } else if (valgteFilteralternativer) {
        return [
            <FiltreringLabel
                key={`${valgtFilter}--${valgteFilteralternativer}`}
                label={filterKonstanter[valgtFilter][valgteFilteralternativer]}
                slettFilter={() => slettEnkeltfilter(valgtFilter, null)}
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
