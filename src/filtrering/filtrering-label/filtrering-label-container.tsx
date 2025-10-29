import {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {FiltreringLabel} from './filtrering-label';
import {
    AAPFilterKelvin,
    aapIKelvinFilter,
    aktiviteter,
    AktiviteterValg,
    alleFargekategoriFilterAlternativer,
    filterKonstanter,
    HAR_AVVIK,
    hendelserEtikett,
    MINE_FARGEKATEGORIER,
    TiltakspengerFilter,
    tiltakspengerFilter
} from '../filter-konstanter';
import {EnhetModell} from '../../typer/enhet-og-veiledere-modeller';
import {Filtervalg, FiltervalgModell} from '../../typer/filtervalg-modell';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import {hentMineFilterForVeileder} from '../../ducks/mine-filter';
import {useGeografiskbostedSelector} from '../../hooks/redux/use-geografiskbosted-selector';
import {clearFiltervalg, endreFiltervalg, fjern, initialState, slettEnkeltFilter} from '../../ducks/filtrering';
import {useFoedelandSelector} from '../../hooks/redux/use-foedeland-selector';
import {useTolkbehovSelector} from '../../hooks/redux/use-tolkbehovspraak-selector';
import {FiltreringLabelMedIkon} from './filtrering-label-med-ikon';
import {pagineringSetup} from '../../ducks/paginering';
import {avmarkerValgtMineFilter} from '../../ducks/lagret-filter-ui-state';
import {fargekategoriIkonMapper} from '../../components/fargekategori/fargekategori-ikon-mapper';

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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hentMineFilterForVeileder());
    }, [dispatch]);

    const foedelandListData = useFoedelandSelector();
    const tolkbehovSpraakListData = useTolkbehovSelector();
    const geografiskBostedListData = useGeografiskbostedSelector();

    const filterElementer = Object.entries(filtervalg)
        .map(([filter, filteralternativer]) => {
            if (filter === Filtervalg.utdanningBestatt) {
                return filteralternativer.map(valgtAlternativ => {
                    return (
                        <FiltreringLabel
                            key={`utdanningBestatt-${valgtAlternativ}`}
                            label={`Utdanning bestått: ${filterKonstanter[filter][valgtAlternativ]}`}
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
                        />
                    );
                });
            } else if (filter === Filtervalg.utdanningGodkjent) {
                return filteralternativer.map(valgtAlternativ => {
                    return (
                        <FiltreringLabel
                            key={`utdanningGodkjent-${valgtAlternativ}`}
                            label={`Utdanning godkjent: ${filterKonstanter[filter][valgtAlternativ]}`}
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
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
                                slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
                            />
                        );
                    }
                    return (
                        <FiltreringLabel
                            key={`utdanning-${valgtAlternativ}`}
                            label={filterKonstanter[filter][valgtAlternativ]}
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
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
                                slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
                            />
                        );
                    }
                    return (
                        <FiltreringLabel
                            key={`situasjon-${valgtAlternativ}`}
                            label={filterKonstanter[filter][valgtAlternativ]}
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
                        />
                    );
                });
            } else if (filter === Filtervalg.sisteEndringKategori) {
                return filteralternativer.map(valgtAlternativ => {
                    return (
                        <FiltreringLabel
                            key={`hendelser-${valgtAlternativ}`}
                            label={hendelserEtikett[valgtAlternativ]}
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
                        />
                    );
                });
            } else if (filter === Filtervalg.fodselsdagIMnd) {
                return filteralternativer.map(valgtAlternativ => {
                    return (
                        <FiltreringLabel
                            key={`fodselsdagIMnd-${valgtAlternativ}`}
                            label={`Fødselsdato: ${valgtAlternativ}`}
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
                        />
                    );
                });
            } else if (filter === Filtervalg.alder) {
                return filteralternativer.map(valgtAlternativ => {
                    return (
                        <FiltreringLabel
                            key={`${filter}--${valgtAlternativ.key || valgtAlternativ}`}
                            label={filterKonstanter[filter][valgtAlternativ] || valgtAlternativ + ' år'}
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ.key || valgtAlternativ)}
                        />
                    );
                });
            } else if (filter === Filtervalg.fargekategorier) {
                return filteralternativer.map(valgtAlternativ => {
                    return (
                        <FiltreringLabelMedIkon
                            key={valgtAlternativ}
                            label={filterKonstanter.fargekategorier[valgtAlternativ]}
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
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
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
                        />
                    );
                });
            } else if (filter === Filtervalg.ulesteEndringer && filteralternativer === 'ULESTE_ENDRINGER') {
                return [
                    <FiltreringLabel
                        key={filter}
                        label={hendelserEtikett['ULESTE_ENDRINGER']}
                        slettFilter={() => slettEnkelt(filter, null)}
                    />
                ];
            } else if (filter === Filtervalg.visGeografiskBosted && filteralternativer.length > 0) {
                return [
                    <FiltreringLabel
                        key={`visGeografiskBosted-1`}
                        label={`Vis geografisk bosted`}
                        slettFilter={() => slettEnkelt(filter, '1')}
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
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
                        />
                    );
                });
            } else if (filteralternativer === true) {
                return [
                    <FiltreringLabel
                        key={filter}
                        label={filterKonstanter[filter]}
                        slettFilter={() => slettEnkelt(filter, false)}
                    />
                ];
            } else if (filter === Filtervalg.foedeland) {
                return filteralternativer.map(valgtAlternativ => {
                    return (
                        <FiltreringLabel
                            key={`${filter}--${valgtAlternativ}`}
                            label={
                                'Fødeland: ' +
                                (foedelandListData.has(valgtAlternativ)
                                    ? foedelandListData.get(valgtAlternativ)
                                    : 'ugyldig')
                            }
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
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
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
                        />
                    );
                });
            } else if (filter === Filtervalg.ytelseAapKelvin) {
                return filteralternativer.map((valgtAlternativ: AAPFilterKelvin) => {
                    return (
                        <FiltreringLabel
                            key={`${filter}--${valgtAlternativ}`}
                            label={aapIKelvinFilter[valgtAlternativ]}
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
                        />
                    );
                });
            } else if (filter === Filtervalg.ytelseTiltakspenger) {
                return filteralternativer.map((valgtAlternativ: TiltakspengerFilter) => {
                    return (
                        <FiltreringLabel
                            key={`${filter}--${valgtAlternativ}`}
                            label={tiltakspengerFilter[valgtAlternativ]}
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
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
                            slettEnkelt(filter, valgtAlternativ);
                            slettEnkelt(filter, HAR_AVVIK);
                        } else {
                            slettEnkelt(filter, valgtAlternativ);
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
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
                        />
                    );
                });
            } else if (filter === Filtervalg.barnUnder18AarAlder && filteralternativer.length > 0) {
                return filteralternativer.map(valgtAlternativ => {
                    return (
                        <FiltreringLabel
                            key={`${filter}--${valgtAlternativ}`}
                            label={`Har barn under 18 år:  ${valgtAlternativ} år`}
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ)}
                        />
                    );
                });
            } else if (Array.isArray(filteralternativer)) {
                return filteralternativer.map(valgtAlternativ => {
                    return (
                        <FiltreringLabel
                            key={`${filter}--${valgtAlternativ.key || valgtAlternativ}`}
                            label={getLabel(valgtAlternativ, filter, enhettiltak)}
                            slettFilter={() => slettEnkelt(filter, valgtAlternativ.key || valgtAlternativ)}
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
                            slettFilter={() => slettEnkelt(filter, aktivitetkey)}
                        />
                    ));
            } else if (filter === Filtervalg.navnEllerFnrQuery) {
                const trimmedQuery = filteralternativer.trim();
                if (trimmedQuery !== '') {
                    const isFnr = !isNaN(parseInt(trimmedQuery, 10));
                    const labelId = isFnr ? 'Søk på fødselsnummer' : 'Søk på navn';
                    return [
                        <FiltreringLabel key={filter} label={labelId} slettFilter={() => slettEnkelt(filter, '')} />
                    ];
                }
            } else if (filteralternativer) {
                return [
                    <FiltreringLabel
                        key={`${filter}--${filteralternativer}`}
                        label={filterKonstanter[filter][filteralternativer]}
                        slettFilter={() => slettEnkelt(filter, null)}
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

            if (filterValue === MINE_FARGEKATEGORIER) {
                dispatch(endreFiltervalg(Filtervalg.fargekategorier, [], ownProps.oversiktType as OversiktType));
            }
            if (
                alleFargekategoriFilterAlternativer.some(f => f === filterValue) &&
                ownProps.filtervalg.fargekategorier.length === 1
            ) {
                dispatch(
                    endreFiltervalg(
                        Filtervalg.ferdigfilterListe,
                        ownProps.filtervalg.ferdigfilterListe.filter(f => f !== MINE_FARGEKATEGORIER),
                        ownProps.oversiktType as OversiktType
                    )
                );
            }

            const oppdatertFiltervalg = {
                ...ownProps.filtervalg,
                [filterKey]: fjern(filterKey, ownProps.filtervalg[filterKey], filterValue)
            };
            oppdaterKolonneAlternativer(dispatch, oppdatertFiltervalg, ownProps.oversiktType as OversiktType);
        }
    }
});

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

export default connect(null, mapDispatchToProps)(FiltreringLabelContainer);
