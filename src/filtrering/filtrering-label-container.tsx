import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntl, injectIntl } from 'react-intl';
import FiltreringLabel from './filtrering-label';
import FilterKonstanter, {
    I_AVTALT_AKTIVITET, UTLOPTE_AKTIVITETER, VENTER_PA_SVAR_FRA_BRUKER,
    ytelse
} from './filter-konstanter';
import { slettEnkeltFilter, clearFiltervalg, AktiviteterValg } from '../ducks/filtrering';
import { EnhetModell, FiltervalgModell } from '../model-interfaces';
import { Kolonne, ListevisningState } from '../ducks/ui/listevisning';

interface FiltreringLabelContainerProps {
    enhettiltak: EnhetModell;
    actions: {
        slettAlle: () => void;
        slettEnkelt: (filterNavn: string, filterValue: boolean | string | null) => void;
    };
    filtervalg: FiltervalgModell;
    filtergruppe: string;
    listevisning?: ListevisningState;
    intl: InjectedIntl;
}

function getKolonneFraLabel(label) {
    switch (label) {
        case VENTER_PA_SVAR_FRA_BRUKER: return Kolonne.VENTER_SVAR;
        case I_AVTALT_AKTIVITET: return Kolonne.AVTALT_AKTIVITET;
        case UTLOPTE_AKTIVITETER: return Kolonne.UTLOPTE_AKTIVITETER;
        default: return null;
    }
}

function harMuligMenIkkeValgtKolonne(listevisning, kolonne) {
    if (listevisning && listevisning.mulige.indexOf(kolonne) >= 0) {
        return listevisning.valgte.indexOf(kolonne) < 0;
    }
    return false;
}

function FiltreringLabelContainer({filtervalg, enhettiltak, listevisning, actions: {slettAlle, slettEnkelt}, filtergruppe, intl}: FiltreringLabelContainerProps) {
    let muligMenIkkeValgt: boolean;
    let kolonne: Kolonne | null;
    const filterElementer = Object.entries(filtervalg)
        .map(([key, value]) => {
            if (value === true) {
                return [
                    <FiltreringLabel
                        key={key}
                        label={FilterKonstanter[key]}
                        slettFilter={() => slettEnkelt(key, false)}
                        intl={intl}
                    />
                ];
            } else if (Array.isArray(value)) {
                    return value.map((singleValue) => (
                    <FiltreringLabel
                        key={`${key}--${singleValue.key || singleValue}`}
                        label={
                            key === 'tiltakstyper' ?
                                enhettiltak[singleValue] :
                                (singleValue.label || FilterKonstanter[key][singleValue])
                        }
                        slettFilter={() => slettEnkelt(key, singleValue.key || singleValue)}
                        intl={intl}
                    />)
                );
            } else if (value && typeof value === 'object') { // value er aktiviteter
                muligMenIkkeValgt = harMuligMenIkkeValgtKolonne(listevisning, Kolonne.UTLOP_AKTIVITET);
                return Object.entries(value)
                    .filter(([_, aktivitetvalue]) => aktivitetvalue !== AktiviteterValg.NA)
                    .map(([aktivitetkey, aktivitetvalue]) => (
                        <FiltreringLabel
                            key={`aktivitet-${aktivitetkey}`}
                            label={`${FilterKonstanter[key][aktivitetkey]}: ${aktivitetvalue}`}
                            slettFilter={() => slettEnkelt(key, aktivitetkey)}
                            harMuligMenIkkeValgtKolonne={muligMenIkkeValgt && aktivitetvalue === AktiviteterValg.JA}
                            intl={intl}
                        />
                    ));
            } else if (key === 'navnEllerFnrQuery') {

                const trimmedQuery = value.trim();

                if (trimmedQuery !== '') {

                    const isFnr = !isNaN(parseInt(trimmedQuery, 10));
                    const labelId = `enhet.portefolje.tabelletikett.sok_${isFnr ? 'fnr' : 'navn'}`;

                    return [
                        <FiltreringLabel
                            key={key}
                            label={intl.formatMessage({ id: labelId })}
                            slettFilter={() => slettEnkelt(key, '')}
                            intl={intl}
                        />
                    ];

                }

            } else if (value) {
                kolonne = key === 'ytelse' ? Kolonne.UTLOP_YTELSE : getKolonneFraLabel(value);
                muligMenIkkeValgt = kolonne === Kolonne.AVTALT_AKTIVITET && filtergruppe === 'veileder' ? true :
                    harMuligMenIkkeValgtKolonne(listevisning, kolonne);
                return [
                    <FiltreringLabel
                        key={`${key}--${value}`}
                        label={FilterKonstanter[key][value]}
                        slettFilter={() => slettEnkelt(key, null)}
                        harMuligMenIkkeValgtKolonne={muligMenIkkeValgt}
                        intl={intl}
                    />
                ];
            }

            return [];
        }).reduce((acc, l) => [...acc, ...l], []);

    const fjernAlle = <FiltreringLabel key="slett-alle" label="Slett alle filtervalg" slettFilter={slettAlle} harMuligMenIkkeValgtKolonne={false} skalHaKryssIkon={false} intl={intl}/>;

    return (
        <section className="filtrering-label-container">
            {filterElementer}
            {filterElementer.length >= 3 ? fjernAlle : null}
        </section>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: {
        slettAlle: () => dispatch(clearFiltervalg(ownProps.filtergruppe, ownProps.veileder && ownProps.veileder.ident)),
        slettEnkelt: (filterKey: string, filterValue: boolean | string | null) => dispatch(
            slettEnkeltFilter(filterKey, filterValue, ownProps.filtergruppe, ownProps.veileder && ownProps.veileder.ident))
    }
});

export default connect(null, mapDispatchToProps)(
    injectIntl(FiltreringLabelContainer)
);
