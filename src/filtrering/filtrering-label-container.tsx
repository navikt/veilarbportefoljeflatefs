import * as React from 'react';
import {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import FiltreringLabel from './filtrering-label';
import FilterKonstanter, {
    aktiviteter,
    hendelserEtikett,
    I_AVTALT_AKTIVITET,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER
} from './filter-konstanter';
import {AktiviteterValg, clearFiltervalg, endreFiltervalg, slettEnkeltFilter} from '../ducks/filtrering';
import {EnhetModell, FiltervalgModell} from '../model-interfaces';
import {Kolonne, ListevisningState, OversiktType} from '../ducks/ui/listevisning';
import {pagineringSetup} from '../ducks/paginering';
import FiltreringLabelArbeidsliste from './filtrering-label-arbeidsliste';
import {hentMineFilterForVeileder} from '../ducks/mine-filter';

interface FiltreringLabelContainerProps {
    enhettiltak: EnhetModell;
    actions: {
        slettAlle: () => void;
        slettEnkelt: (filterNavn: string, filterValue: boolean | string | null) => void;
    };
    filtervalg: FiltervalgModell;
    oversiktType: string;
    listevisning?: ListevisningState;
    className: string;
}

function getKolonneFraLabel(label) {
    switch (label) {
        case VENTER_PA_SVAR_FRA_BRUKER:
            return Kolonne.VENTER_SVAR;
        case I_AVTALT_AKTIVITET:
            return Kolonne.AVTALT_AKTIVITET;
        case UTLOPTE_AKTIVITETER:
            return Kolonne.UTLOPTE_AKTIVITETER;
        default:
            return null;
    }
}

function harMuligMenIkkeValgtKolonne(listevisning, kolonne) {
    if (listevisning && listevisning.mulige.indexOf(kolonne) >= 0) {
        return listevisning.valgte.indexOf(kolonne) < 0;
    }
    return false;
}

function FiltreringLabelContainer({
    filtervalg,
    enhettiltak,
    listevisning,
    actions: {slettAlle, slettEnkelt},
    oversiktType,
    className
}: FiltreringLabelContainerProps) {
    let muligMenIkkeValgt: boolean;
    let kolonne: Kolonne | null;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hentMineFilterForVeileder());
    }, [dispatch]);

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
                    return (
                        <FiltreringLabel
                            key={`utdanning-${singleValue}`}
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
                        <FiltreringLabelArbeidsliste
                            key={singleValue}
                            label={FilterKonstanter[key][singleValue]}
                            slettFilter={() => slettEnkelt(key, singleValue)}
                            kategori={singleValue}
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
            } else if (value === true) {
                return [
                    <FiltreringLabel
                        key={key}
                        label={FilterKonstanter[key]}
                        slettFilter={() => slettEnkelt(key, false)}
                    />
                ];
            } else if (Array.isArray(value)) {
                return value.map(singleValue => {
                    return (
                        <FiltreringLabel
                            key={`${key}--${singleValue.key || singleValue}`}
                            label={
                                key === 'tiltakstyper'
                                    ? enhettiltak[singleValue]
                                    : singleValue.label || FilterKonstanter[key][singleValue] || singleValue
                            }
                            slettFilter={() => slettEnkelt(key, singleValue.key || singleValue)}
                        />
                    );
                });
            } else if (value && typeof value === 'object') {
                // value er aktiviteter
                muligMenIkkeValgt = harMuligMenIkkeValgtKolonne(listevisning, Kolonne.UTLOP_AKTIVITET);
                return Object.entries(value)
                    .filter(([_, aktivitetvalue]) => aktivitetvalue !== AktiviteterValg.NA)
                    .map(([aktivitetkey, aktivitetvalue]) => (
                        <FiltreringLabel
                            key={`aktivitet-${aktivitetkey}`}
                            label={`${FilterKonstanter[key][aktivitetkey]}: ${aktivitetvalue}`}
                            slettFilter={() => slettEnkelt(key, aktivitetkey)}
                            harMuligMenIkkeValgtKolonne={muligMenIkkeValgt && aktivitetvalue === AktiviteterValg.JA}
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
                kolonne = key === 'ytelse' ? Kolonne.UTLOP_YTELSE : getKolonneFraLabel(value);
                muligMenIkkeValgt =
                    kolonne === Kolonne.AVTALT_AKTIVITET && oversiktType === OversiktType.minOversikt
                        ? true
                        : harMuligMenIkkeValgtKolonne(listevisning, kolonne);
                return [
                    <FiltreringLabel
                        key={`${key}--${value}`}
                        label={FilterKonstanter[key][value]}
                        slettFilter={() => slettEnkelt(key, null)}
                        harMuligMenIkkeValgtKolonne={muligMenIkkeValgt}
                    />
                ];
            }
            return [];
        })
        .reduce((acc, l) => [...acc, ...l], []);

    const fjernAlle = (
        <FiltreringLabel
            key="slett-alle"
            label="Slett alle filtervalg"
            slettFilter={slettAlle}
            harMuligMenIkkeValgtKolonne={false}
            skalHaKryssIkon={false}
        />
    );

    return (
        <div className={className} data-testid="filtrering_label-container">
            {filterElementer}
            {filterElementer.length >= 3 ? fjernAlle : null}
        </div>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: {
        slettAlle: () => {
            dispatch(pagineringSetup({side: 1}));
            dispatch(clearFiltervalg(ownProps.oversiktType));
        },
        slettEnkelt: (filterKey: string, filterValue: boolean | string | null) => {
            dispatch(pagineringSetup({side: 1}));
            dispatch(slettEnkeltFilter(filterKey, filterValue, ownProps.oversiktType));
            if (filterValue === 'MIN_ARBEIDSLISTE') {
                dispatch(endreFiltervalg('arbeidslisteKategori', [], ownProps.oversiktType));
            }
        }
    }
});

export default connect(null, mapDispatchToProps)(FiltreringLabelContainer);
