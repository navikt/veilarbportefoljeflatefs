import * as React from 'react';
import {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import FiltreringLabel from './filtrering-label';
import FilterKonstanter, {
    aktiviteter,
    alleFargekategoriFilterAlternativer,
    hendelserEtikett,
    mapFilternavnTilFilterValue,
    MINE_FARGEKATEGORIER
} from './filter-konstanter';
import {EnhetModell, FiltervalgModell} from '../model-interfaces';
import {oppdaterKolonneAlternativer, OversiktType} from '../ducks/ui/listevisning';
import {hentMineFilterForVeileder} from '../ducks/mine-filter';
import {useGeografiskbostedSelector} from '../hooks/redux/use-geografiskbosted-selector';
import {
    AktiviteterValg,
    clearFiltervalg,
    endreFiltervalg,
    fjern,
    initialState,
    slettEnkeltFilter
} from '../ducks/filtrering';
import {useFoedelandSelector} from '../hooks/redux/use-foedeland-selector';
import {useTolkbehovSelector} from '../hooks/redux/use-tolkbehovspraak-selector';
import FiltreringLabelMedIkon from './filtrering-label-med-ikon';
import {pagineringSetup} from '../ducks/paginering';
import {avmarkerValgtMineFilter} from '../ducks/lagret-filter-ui-state';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {HUSKELAPP} from '../konstanter';
import ArbeidslistekategoriVisning from '../components/tabell/arbeidslisteikon';
import fargekategoriIkonMapper from '../components/fargekategori/fargekategori-ikon-mapper';

interface FiltreringLabelContainerProps {
    enhettiltak: EnhetModell;
    actions: {
        slettAlle: () => void;
        slettEnkelt: (filterNavn: string, filterValue: boolean | string | null) => void;
    };
    filtervalg: FiltervalgModell;
    className: string;
}

function FiltreringLabelContainer({
    filtervalg,
    enhettiltak,
    actions: {slettAlle, slettEnkelt},
    className
}: FiltreringLabelContainerProps) {
    const erFargekategoriFeatureTogglePa = useFeatureSelector()(HUSKELAPP);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hentMineFilterForVeileder());
    }, [dispatch]);

    const foedelandListData = useFoedelandSelector();
    const tolkbehovSpraakListData = useTolkbehovSelector();
    const geografiskBostedListData = useGeografiskbostedSelector();

    const filterElementer = Object.entries(filtervalg)
        .map(([key, value]) => {
            if (key === 'utdanningBestatt') {
                return value.map(singleValue => {
                    return (
                        <FiltreringLabel
                            key={`utdanningBestatt-${singleValue}`}
                            label={`Utdanning bestått: ${FilterKonstanter[key][singleValue]}`}
                            slettFilter={() => slettEnkelt(key, singleValue)}
                        />
                    );
                });
            } else if (key === 'utdanningGodkjent') {
                return value.map(singleValue => {
                    return (
                        <FiltreringLabel
                            key={`utdanningGodkjent-${singleValue}`}
                            label={`Utdanning godkjent: ${FilterKonstanter[key][singleValue]}`}
                            slettFilter={() => slettEnkelt(key, singleValue)}
                        />
                    );
                });
            } else if (key === 'utdanning') {
                return value.map(singleValue => {
                    if (singleValue === 'INGEN_DATA') {
                        return (
                            <FiltreringLabel
                                key={`utdanning-${singleValue}`}
                                label={`Utdanning: ${FilterKonstanter[key][singleValue].label}`}
                                slettFilter={() => slettEnkelt(key, singleValue)}
                            />
                        );
                    }
                    return (
                        <FiltreringLabel
                            key={`utdanning-${singleValue}`}
                            label={FilterKonstanter[key][singleValue]}
                            slettFilter={() => slettEnkelt(key, singleValue)}
                        />
                    );
                });
            } else if (key === 'registreringstype') {
                return value.map(singleValue => {
                    if (singleValue === 'INGEN_DATA') {
                        return (
                            <FiltreringLabel
                                key={`situasjon-${singleValue}`}
                                label={`Situasjon: ${FilterKonstanter[key][singleValue].label}`}
                                slettFilter={() => slettEnkelt(key, singleValue)}
                            />
                        );
                    }
                    return (
                        <FiltreringLabel
                            key={`situasjon-${singleValue}`}
                            label={FilterKonstanter[key][singleValue]}
                            slettFilter={() => slettEnkelt(key, singleValue)}
                        />
                    );
                });
            } else if (key === 'sisteEndringKategori') {
                return value.map(singleValue => {
                    return (
                        <FiltreringLabel
                            key={`hendelser-${singleValue}`}
                            label={hendelserEtikett[singleValue]}
                            slettFilter={() => slettEnkelt(key, singleValue)}
                        />
                    );
                });
            } else if (key === 'fodselsdagIMnd') {
                return value.map(singleValue => {
                    return (
                        <FiltreringLabel
                            key={`fodselsdagIMnd-${singleValue}`}
                            label={`Fødselsdato: ${singleValue}`}
                            slettFilter={() => slettEnkelt(key, singleValue)}
                        />
                    );
                });
            } else if (key === 'alder') {
                return value.map(singleValue => {
                    return (
                        <FiltreringLabel
                            key={`${key}--${singleValue.key || singleValue}`}
                            label={FilterKonstanter[key][singleValue] || singleValue + ' år'}
                            slettFilter={() => slettEnkelt(key, singleValue.key || singleValue)}
                        />
                    );
                });
            } else if (key === 'arbeidslisteKategori') {
                return value.map(singleValue => {
                    return (
                        <FiltreringLabelMedIkon
                            key={singleValue}
                            label={
                                erFargekategoriFeatureTogglePa
                                    ? FilterKonstanter.arbeidslisteKategoriGammel[singleValue]
                                    : FilterKonstanter.arbeidslisteKategori[singleValue]
                            }
                            slettFilter={() => slettEnkelt(key, singleValue)}
                            ikon={<ArbeidslistekategoriVisning kategori={singleValue} />}
                            tittel={
                                `Fjern filtervalg "Arbeidslistekategori ${FilterKonstanter.arbeidslisteKategori[singleValue]}"` +
                                (erFargekategoriFeatureTogglePa ? ' (gammel)' : '')
                            }
                        />
                    );
                });
            } else if (key === 'fargekategorier') {
                return value.map(singleValue => {
                    return (
                        <FiltreringLabelMedIkon
                            key={singleValue}
                            label={FilterKonstanter.fargekategorier[singleValue]}
                            slettFilter={() => slettEnkelt(key, singleValue)}
                            ikon={fargekategoriIkonMapper(singleValue, 'fargekategoriikon')}
                            tittel={`Fjern filtervalg "Kategori ${FilterKonstanter.fargekategorier[singleValue]}"`}
                        />
                    );
                });
            } else if (key === 'aktiviteterForenklet') {
                return value.map(singleValue => {
                    return (
                        <FiltreringLabel
                            key={singleValue}
                            label={aktiviteter[singleValue]}
                            slettFilter={() => slettEnkelt(key, singleValue)}
                        />
                    );
                });
            } else if (key === 'ulesteEndringer' && value === 'ULESTE_ENDRINGER') {
                return [
                    <FiltreringLabel
                        key={key}
                        label={hendelserEtikett['ULESTE_ENDRINGER']}
                        slettFilter={() => slettEnkelt(key, null)}
                    />
                ];
            } else if (key === 'visGeografiskBosted' && value.length > 0) {
                return [
                    <FiltreringLabel
                        key={`visGeografiskBosted-1`}
                        label={`Vis geografisk bosted`}
                        slettFilter={() => slettEnkelt(key, '1')}
                    />
                ];
            } else if (key === 'geografiskBosted' && value.length > 0) {
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
                    <FiltreringLabel
                        key={key}
                        label={FilterKonstanter[key]}
                        slettFilter={() => slettEnkelt(key, false)}
                    />
                ];
            } else if (key === 'foedeland') {
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
            } else if (key === 'tolkBehovSpraak') {
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
            } else if (key === 'avvik14aVedtak') {
                return value.map(singleValue => {
                    if (singleValue === mapFilternavnTilFilterValue.harAvvik) {
                        return null;
                    }

                    // Selv om hovedfilteret ("Har avvik") ikke vises som en filter-etikett
                    // så må vi likevel fjerne filteret fra filtervalg når alle avhengige
                    // filter-etiketter fjernes
                    const fjernAvvik14aHovedFilter = value.length <= 2;
                    const slettAvvik14aVedtakFilter = () => {
                        if (fjernAvvik14aHovedFilter) {
                            slettEnkelt(key, singleValue);
                            slettEnkelt(key, mapFilternavnTilFilterValue.harAvvik);
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
            } else if (key === 'barnUnder18Aar' && value.length > 0) {
                return value.map(singleValue => {
                    return (
                        <FiltreringLabel
                            key={`${key}--${singleValue}`}
                            label={`${FilterKonstanter[key][singleValue]}`}
                            slettFilter={() => slettEnkelt(key, singleValue)}
                        />
                    );
                });
            } else if (key === 'barnUnder18AarAlder' && value.length > 0) {
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
                            label={`${FilterKonstanter[key][aktivitetkey]}: ${aktivitetvalue}`}
                            slettFilter={() => slettEnkelt(key, aktivitetkey)}
                        />
                    ));
            } else if (key === 'navnEllerFnrQuery') {
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
                        label={FilterKonstanter[key][value]}
                        slettFilter={() => slettEnkelt(key, null)}
                    />
                ];
            }
            return [];
        })
        .reduce((acc, l) => [...acc, ...l], []);

    return (
        <div className={className} data-testid="filtrering_label-container">
            {filterElementer}
            {filterElementer.length > 0 && (
                <FiltreringLabel
                    key="slett-alle"
                    label="Nullstill filtervalg"
                    slettFilter={slettAlle}
                    skalHaKryssIkon={false}
                />
            )}
        </div>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: {
        slettAlle: () => {
            dispatch(pagineringSetup({side: 1}));
            dispatch(clearFiltervalg(ownProps.oversiktType as OversiktType));
            oppdaterKolonneAlternativer(dispatch, initialState, ownProps.oversiktType as OversiktType);
        },
        slettEnkelt: (filterKey: string, filterValue: boolean | string | null) => {
            dispatch(pagineringSetup({side: 1}));
            dispatch(slettEnkeltFilter(filterKey, filterValue, ownProps.oversiktType as OversiktType));
            dispatch(avmarkerValgtMineFilter(ownProps.oversiktType));

            if (filterValue === 'MIN_ARBEIDSLISTE') {
                dispatch(endreFiltervalg('arbeidslisteKategori', [], ownProps.oversiktType as OversiktType));
            }
            if (filterValue === MINE_FARGEKATEGORIER) {
                dispatch(endreFiltervalg('fargekategorier', [], ownProps.oversiktType as OversiktType));
            }
            if (
                alleFargekategoriFilterAlternativer.some(f => f === filterValue) &&
                ownProps.filtervalg.fargekategorier.length === 1
            ) {
                dispatch(
                    endreFiltervalg(
                        'ferdigfilterListe',
                        ownProps.filtervalg.ferdigfilterListe.filter(f => f !== MINE_FARGEKATEGORIER),
                        ownProps.oversiktType as OversiktType
                    )
                );
            }

            const oppdatertFiltervalg = {
                ...ownProps.filtervalg,
                [filterKey]: fjern(filterKey, ownProps.filtervalg[filterKey], filterValue),
                arbeidslisteKategori:
                    filterValue === 'MIN_ARBEIDSLISTE' ? [] : ownProps.filtervalg['arbeidslisteKategori']
            };
            oppdaterKolonneAlternativer(dispatch, oppdatertFiltervalg, ownProps.oversiktType as OversiktType);
        }
    }
});

function getLabel(singleValue: any, key: any, enhettiltak: any): string {
    if (key === 'tiltakstyper') {
        return enhettiltak[singleValue];
    }
    if (singleValue?.label) {
        return singleValue.label;
    }
    if (FilterKonstanter[key]?.[singleValue]) {
        return FilterKonstanter[key][singleValue];
    }
    if (FilterKonstanter[singleValue]) {
        return FilterKonstanter[singleValue];
    }
    return singleValue;
}

export default connect(null, mapDispatchToProps)(FiltreringLabelContainer);
