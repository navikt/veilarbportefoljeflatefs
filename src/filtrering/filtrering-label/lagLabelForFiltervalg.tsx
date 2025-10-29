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
import {EnhetModell} from '../../typer/enhet-og-veiledere-modeller';
import {useFoedelandSelector} from '../../hooks/redux/use-foedeland-selector';
import {useTolkbehovSelector} from '../../hooks/redux/use-tolkbehovspraak-selector';
import {useGeografiskbostedSelector} from '../../hooks/redux/use-geografiskbosted-selector';
import {fargekategoriIkonMapper} from '../../components/fargekategori/fargekategori-ikon-mapper';

interface Props {
    filter: string;
    filteralternativer: any;
    slettEnkeltfilter: (filterNavn: string, filterValue: boolean | string | null) => void;
    enhettiltak: EnhetModell;
}

export const LagLabelForFiltervalg = ({filter, filteralternativer, slettEnkeltfilter, enhettiltak}: Props): any[] => {
    const foedelandListData = useFoedelandSelector();
    const tolkbehovSpraakListData = useTolkbehovSelector();
    const geografiskBostedListData = useGeografiskbostedSelector();

    if (filter === Filtervalg.utdanningBestatt) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`utdanningBestatt-${valgtAlternativ}`}
                    label={`Utdanning bestått: ${filterKonstanter[filter][valgtAlternativ]}`}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.utdanningGodkjent) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`utdanningGodkjent-${valgtAlternativ}`}
                    label={`Utdanning godkjent: ${filterKonstanter[filter][valgtAlternativ]}`}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.utdanning) {
        return filteralternativer.map(valgtAlternativ => {
            if (valgtAlternativ === 'INGEN_DATA') {
                return (
                    <FiltreringLabel
                        key={`utdanning-${valgtAlternativ}`}
                        label={`Utdanning: ${filterKonstanter[filter][valgtAlternativ].label}`}
                        slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                    />
                );
            }
            return (
                <FiltreringLabel
                    key={`utdanning-${valgtAlternativ}`}
                    label={filterKonstanter[filter][valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.registreringstype) {
        return filteralternativer.map(valgtAlternativ => {
            if (valgtAlternativ === 'INGEN_DATA') {
                return (
                    <FiltreringLabel
                        key={`situasjon-${valgtAlternativ}`}
                        label={`Situasjon: ${filterKonstanter[filter][valgtAlternativ].label}`}
                        slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                    />
                );
            }
            return (
                <FiltreringLabel
                    key={`situasjon-${valgtAlternativ}`}
                    label={filterKonstanter[filter][valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.sisteEndringKategori) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`hendelser-${valgtAlternativ}`}
                    label={hendelserEtikett[valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.fodselsdagIMnd) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`fodselsdagIMnd-${valgtAlternativ}`}
                    label={`Fødselsdato: ${valgtAlternativ}`}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.alder) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${filter}--${valgtAlternativ.key || valgtAlternativ}`}
                    label={filterKonstanter[filter][valgtAlternativ] || valgtAlternativ + ' år'}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ.key || valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.fargekategorier) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabelMedIkon
                    key={valgtAlternativ}
                    label={filterKonstanter.fargekategorier[valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                    ikon={fargekategoriIkonMapper(valgtAlternativ, 'fargekategoriikon')}
                    tittel={`Fjern filtervalg "Kategori ${filterKonstanter.fargekategorier[valgtAlternativ]}"`}
                />
            );
        });
    } else if (filter === Filtervalg.aktiviteterForenklet) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={valgtAlternativ}
                    label={aktiviteter[valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.ulesteEndringer && filteralternativer === 'ULESTE_ENDRINGER') {
        return [
            <FiltreringLabel
                key={filter}
                label={hendelserEtikett['ULESTE_ENDRINGER']}
                slettFilter={() => slettEnkeltfilter(filter, null)}
            />
        ];
    } else if (filter === Filtervalg.visGeografiskBosted && filteralternativer.length > 0) {
        return [
            <FiltreringLabel
                key={`visGeografiskBosted-1`}
                label={`Vis geografisk bosted`}
                slettFilter={() => slettEnkeltfilter(filter, '1')}
            />
        ];
    } else if (filter === Filtervalg.geografiskBosted && filteralternativer.length > 0) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${filter}--${valgtAlternativ}`}
                    label={
                        'Bosted: ' +
                        (geografiskBostedListData.has(valgtAlternativ)
                            ? geografiskBostedListData.get(valgtAlternativ)
                            : 'ugyldig')
                    }
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filteralternativer === true) {
        return [
            <FiltreringLabel
                key={filter}
                label={filterKonstanter[filter]}
                slettFilter={() => slettEnkeltfilter(filter, false)}
            />
        ];
    } else if (filter === Filtervalg.foedeland) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${filter}--${valgtAlternativ}`}
                    label={
                        'Fødeland: ' +
                        (foedelandListData.has(valgtAlternativ) ? foedelandListData.get(valgtAlternativ) : 'ugyldig')
                    }
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.tolkBehovSpraak) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${filter}--${valgtAlternativ}`}
                    label={
                        'Tolkebehov språk: ' +
                        (tolkbehovSpraakListData.has(valgtAlternativ)
                            ? tolkbehovSpraakListData.get(valgtAlternativ)
                            : 'ugyldig')
                    }
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.ytelseAapKelvin) {
        return filteralternativer.map((valgtAlternativ: AAPFilterKelvin) => {
            return (
                <FiltreringLabel
                    key={`${filter}--${valgtAlternativ}`}
                    label={aapIKelvinFilter[valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.ytelseTiltakspenger) {
        return filteralternativer.map((valgtAlternativ: TiltakspengerFilter) => {
            return (
                <FiltreringLabel
                    key={`${filter}--${valgtAlternativ}`}
                    label={tiltakspengerFilter[valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.avvik14aVedtak) {
        return filteralternativer.map(valgtAlternativ => {
            if (valgtAlternativ === HAR_AVVIK) {
                return null;
            }

            // Selv om hovedfilteret ("Har avvik") ikke vises som en filter-etikett
            // så må vi likevel fjerne filteret fra filtervalg når alle avhengige
            // filter-etiketter fjernes
            const fjernAvvik14aHovedFilter = filteralternativer.length <= 2;
            const slettAvvik14aVedtakFilter = () => {
                if (fjernAvvik14aHovedFilter) {
                    slettEnkeltfilter(filter, valgtAlternativ);
                    slettEnkeltfilter(filter, HAR_AVVIK);
                } else {
                    slettEnkeltfilter(filter, valgtAlternativ);
                }
            };

            return (
                <FiltreringLabel
                    key={`${filter}--${valgtAlternativ}`}
                    label={getLabel(valgtAlternativ, filter, enhettiltak)}
                    slettFilter={slettAvvik14aVedtakFilter}
                />
            );
        });
    } else if (filter === Filtervalg.barnUnder18Aar && filteralternativer.length > 0) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${filter}--${valgtAlternativ}`}
                    label={`${filterKonstanter[filter][valgtAlternativ]}`}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (filter === Filtervalg.barnUnder18AarAlder && filteralternativer.length > 0) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${filter}--${valgtAlternativ}`}
                    label={`Har barn under 18 år:  ${valgtAlternativ} år`}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ)}
                />
            );
        });
    } else if (Array.isArray(filteralternativer)) {
        return filteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${filter}--${valgtAlternativ.key || valgtAlternativ}`}
                    label={getLabel(valgtAlternativ, filter, enhettiltak)}
                    slettFilter={() => slettEnkeltfilter(filter, valgtAlternativ.key || valgtAlternativ)}
                />
            );
        });
    } else if (filteralternativer && typeof filteralternativer === 'object') {
        // key = aktiviteter
        return Object.entries(filteralternativer)
            .filter(([_, aktivitetvalue]) => aktivitetvalue !== AktiviteterValg.NA)
            .map(([aktivitetkey, aktivitetvalue]) => (
                <FiltreringLabel
                    key={`aktivitet-${aktivitetkey}`}
                    label={`${filterKonstanter[filter][aktivitetkey]}: ${aktivitetvalue}`}
                    slettFilter={() => slettEnkeltfilter(filter, aktivitetkey)}
                />
            ));
    } else if (filter === Filtervalg.navnEllerFnrQuery) {
        const trimmedQuery = filteralternativer.trim();
        if (trimmedQuery !== '') {
            const isFnr = !isNaN(parseInt(trimmedQuery, 10));
            const labelId = isFnr ? 'Søk på fødselsnummer' : 'Søk på navn';
            return [<FiltreringLabel key={filter} label={labelId} slettFilter={() => slettEnkeltfilter(filter, '')} />];
        }
    } else if (filteralternativer) {
        return [
            <FiltreringLabel
                key={`${filter}--${filteralternativer}`}
                label={filterKonstanter[filter][filteralternativer]}
                slettFilter={() => slettEnkeltfilter(filter, null)}
            />
        ];
    }
    return [];
};

function getLabel(filter: any, valgtAlternativ: any, enhettiltak: any): string {
    if (filter === Filtervalg.tiltakstyper) {
        return enhettiltak[valgtAlternativ];
    }
    if (valgtAlternativ?.label) {
        return valgtAlternativ.label;
    }
    if (filterKonstanter[filter]?.[valgtAlternativ]) {
        return filterKonstanter[filter][valgtAlternativ];
    }
    if (filterKonstanter[valgtAlternativ]) {
        return filterKonstanter[valgtAlternativ];
    }
    return valgtAlternativ;
}
