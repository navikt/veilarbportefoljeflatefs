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
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`utdanningBestatt-${valgtAlternativ}`}
                    label={`Utdanning bestått: ${filterKonstanter[valgtFilter][valgtAlternativ]}`}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.utdanningGodkjent) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`utdanningGodkjent-${valgtAlternativ}`}
                    label={`Utdanning godkjent: ${filterKonstanter[valgtFilter][valgtAlternativ]}`}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.utdanning) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            if (valgtAlternativ === 'INGEN_DATA') {
                return (
                    <FiltreringLabel
                        key={`utdanning-${valgtAlternativ}`}
                        label={`Utdanning: ${filterKonstanter[valgtFilter][valgtAlternativ].label}`}
                        slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                    />
                );
            }
            return (
                <FiltreringLabel
                    key={`utdanning-${valgtAlternativ}`}
                    label={filterKonstanter[valgtFilter][valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.registreringstype) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            if (valgtAlternativ === 'INGEN_DATA') {
                return (
                    <FiltreringLabel
                        key={`situasjon-${valgtAlternativ}`}
                        label={`Situasjon: ${filterKonstanter[valgtFilter][valgtAlternativ].label}`}
                        slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                    />
                );
            }
            return (
                <FiltreringLabel
                    key={`situasjon-${valgtAlternativ}`}
                    label={filterKonstanter[valgtFilter][valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.sisteEndringKategori) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`hendelser-${valgtAlternativ}`}
                    label={hendelserEtikett[valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.fodselsdagIMnd) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`fodselsdagIMnd-${valgtAlternativ}`}
                    label={`Fødselsdato: ${valgtAlternativ}`}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.alder) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${valgtAlternativ.key || valgtAlternativ}`}
                    label={filterKonstanter[valgtFilter][valgtAlternativ] || valgtAlternativ + ' år'}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ.key || valgtAlternativ)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.fargekategorier) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabelMedIkon
                    key={valgtAlternativ}
                    label={filterKonstanter.fargekategorier[valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                    ikon={fargekategoriIkonMapper(valgtAlternativ, 'fargekategoriikon')}
                    tittel={`Fjern filtervalg "Kategori ${filterKonstanter.fargekategorier[valgtAlternativ]}"`}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.aktiviteterForenklet) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={valgtAlternativ}
                    label={aktiviteter[valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
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
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${valgtAlternativ}`}
                    label={
                        'Bosted: ' +
                        (geografiskBostedListData.has(valgtAlternativ)
                            ? geografiskBostedListData.get(valgtAlternativ)
                            : 'ugyldig')
                    }
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
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
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${valgtAlternativ}`}
                    label={
                        'Fødeland: ' +
                        (foedelandListData.has(valgtAlternativ) ? foedelandListData.get(valgtAlternativ) : 'ugyldig')
                    }
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.tolkBehovSpraak) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${valgtAlternativ}`}
                    label={
                        'Tolkebehov språk: ' +
                        (tolkbehovSpraakListData.has(valgtAlternativ)
                            ? tolkbehovSpraakListData.get(valgtAlternativ)
                            : 'ugyldig')
                    }
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.ytelseAapKelvin) {
        return valgteFilteralternativer.map((valgtAlternativ: AAPFilterKelvin) => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${valgtAlternativ}`}
                    label={aapIKelvinFilter[valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.ytelseTiltakspenger) {
        return valgteFilteralternativer.map((valgtAlternativ: TiltakspengerFilter) => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${valgtAlternativ}`}
                    label={tiltakspengerFilter[valgtAlternativ]}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.avvik14aVedtak) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            if (valgtAlternativ === HAR_AVVIK) {
                return null;
            }

            // Selv om hovedfilteret ("Har avvik") ikke vises som en filter-etikett
            // så må vi likevel fjerne filteret fra filtervalg når alle avhengige
            // filter-etiketter fjernes
            const fjernAvvik14aHovedFilter = valgteFilteralternativer.length <= 2;
            const slettAvvik14aVedtakFilter = () => {
                if (fjernAvvik14aHovedFilter) {
                    slettEnkeltfilter(valgtFilter, valgtAlternativ);
                    slettEnkeltfilter(valgtFilter, HAR_AVVIK);
                } else {
                    slettEnkeltfilter(valgtFilter, valgtAlternativ);
                }
            };

            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${valgtAlternativ}`}
                    label={getLabel(valgtFilter, valgtAlternativ, enhettiltak)}
                    slettFilter={slettAvvik14aVedtakFilter}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.barnUnder18Aar && valgteFilteralternativer.length > 0) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${valgtAlternativ}`}
                    label={`${filterKonstanter[valgtFilter][valgtAlternativ]}`}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                />
            );
        });
    } else if (valgtFilter === Filtervalg.barnUnder18AarAlder && valgteFilteralternativer.length > 0) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${valgtAlternativ}`}
                    label={`Har barn under 18 år:  ${valgtAlternativ} år`}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ)}
                />
            );
        });
    } else if (Array.isArray(valgteFilteralternativer)) {
        return valgteFilteralternativer.map(valgtAlternativ => {
            return (
                <FiltreringLabel
                    key={`${valgtFilter}--${valgtAlternativ.key || valgtAlternativ}`}
                    label={getLabel(valgtFilter, valgtAlternativ, enhettiltak)}
                    slettFilter={() => slettEnkeltfilter(valgtFilter, valgtAlternativ.key || valgtAlternativ)}
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

function getLabel(valgtFilter: string, valgtAlternativ: any, enhettiltak: any): string {
    if (valgtFilter === Filtervalg.tiltakstyper) {
        return enhettiltak[valgtAlternativ];
    }
    if (valgtAlternativ?.label) {
        return valgtAlternativ.label;
    }
    if (filterKonstanter[valgtFilter]?.[valgtAlternativ]) {
        return filterKonstanter[valgtFilter][valgtAlternativ];
    }
    if (filterKonstanter[valgtAlternativ]) {
        return filterKonstanter[valgtAlternativ];
    }
    return valgtAlternativ;
}
