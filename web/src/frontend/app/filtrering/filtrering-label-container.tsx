import * as React from 'react';
import {connect} from 'react-redux';
import FiltreringLabel from './filtrering-label';
import FilterKonstanter, {
    I_AVTALT_AKTIVITET, UTLOPTE_AKTIVITETER, VENTER_PA_SVAR_FRA_BRUKER,
    ytelse
} from './filter-konstanter';
import {slettEnkeltFilter, clearFiltervalg, AktiviteterValg} from '../ducks/filtrering';
import {filtervalgLabelShape, veilederShape} from '../proptype-shapes';
import {EnhetModell, FiltervalgModell} from '../model-interfaces';
import {Kolonne} from "../ducks/ui/listevisning";

interface FiltreringLabelContainerProps {
    enhettiltak: EnhetModell;
    actions: {
        slettAlle: () => void;
        slettEnkelt: (filterNavn: string, filterValue: boolean | string | null) => void;
    };
    filtervalg: FiltervalgModell;
    filtergruppe: string;
    listevisning: object;
}

function getKolonneFraLabel(label) {
    switch (label) {
        case VENTER_PA_SVAR_FRA_BRUKER: return Kolonne.VENTER_SVAR;
        case I_AVTALT_AKTIVITET: return Kolonne.AVTALT_AKTIVITET;
        case UTLOPTE_AKTIVITETER: return Kolonne.UTLOPTE_AKTIVITETER;
        case 'ytelse': return Kolonne.UTLOP_YTELSE;
        default: return null;
    }
}

function erMuligMenIkkeValgt(listevisning, kolonne) {
    if (listevisning.mulige.indexOf(kolonne) >= 0) {
        return listevisning.valgte.indexOf(kolonne) < 0;
    }
    return false;

}

function FiltreringLabelContainer({filtervalg, enhettiltak, listevisning, actions: {slettAlle, slettEnkelt}}: FiltreringLabelContainerProps) {
    let muligMenIkkeValgt;
    let kolonne;
    let labelNavn;
    const filterElementer = Object.entries(filtervalg)
        .map(([key, value]) => {
            if (value === true) {
                labelNavn = FilterKonstanter[key];
                kolonne = getKolonneFraLabel(key);
                muligMenIkkeValgt = erMuligMenIkkeValgt(listevisning, kolonne);
                return [
                    <FiltreringLabel
                        key={key}
                        label={FilterKonstanter[key]}
                        slettFilter={() => slettEnkelt(key, false)}
                        harMuligMenIkkeValgtKolonne={muligMenIkkeValgt}
                    />
                ];
            } else if (Array.isArray(value)) {
                const values = value.map(function(singleValue) {
                    labelNavn = key === 'tiltakstyper' ?
                        enhettiltak[singleValue] :
                        (singleValue.label || FilterKonstanter[key][singleValue]);
                    kolonne = getKolonneFraLabel(key);
                    muligMenIkkeValgt = erMuligMenIkkeValgt(listevisning, kolonne);
                    return (
                    <FiltreringLabel
                        key={`${key}--${singleValue.key || singleValue}`}
                        label={
                            key === 'tiltakstyper' ?
                                enhettiltak[singleValue] :
                                (singleValue.label || FilterKonstanter[key][singleValue])
                        }
                        slettFilter={() => slettEnkelt(key, singleValue.key || singleValue)}
                        harMuligMenIkkeValgtKolonne={muligMenIkkeValgt}
                    />);
                });
                return values;
            } else if (value && typeof value === 'object') { //value er aktiviteter
                muligMenIkkeValgt = erMuligMenIkkeValgt(listevisning, Kolonne.UTLOP_AKTIVITET);
                return Object.entries(value)
                    .filter(([_, aktivitetvalue]) => aktivitetvalue !== AktiviteterValg.NA)
                    .map(([aktivitetkey, aktivitetvalue]) => (
                        <FiltreringLabel
                            key={`aktivitet-${aktivitetkey}`}
                            label={`${FilterKonstanter[key][aktivitetkey]}: ${aktivitetvalue}`}
                            slettFilter={() => slettEnkelt(key, aktivitetkey)}
                            harMuligMenIkkeValgtKolonne={muligMenIkkeValgt}
                        />
                    ));
            } else if (value) {
                labelNavn = key === 'ytelse' ? 'ytelse' : value;
                kolonne = getKolonneFraLabel(labelNavn);
                muligMenIkkeValgt = erMuligMenIkkeValgt(listevisning, kolonne);
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
        }).reduce((acc, l) => [...acc, ...l], []);

    const fjernAlle = <FiltreringLabel key="slett-alle" label="Slett alle filtervalg" slettFilter={slettAlle} harMuligMenIkkeValgtKolonne={false}/>;

    return (
        <section className="filtrering-label-container blokk-s">
            {filterElementer}
            {filterElementer.length >= 3 ? fjernAlle : null}
        </section>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: {
        slettAlle: () => dispatch(clearFiltervalg(ownProps.filtergruppe, ownProps.veileder)),
        slettEnkelt: (filterKey: string, filterValue: boolean | string | null) => dispatch(slettEnkeltFilter(filterKey, filterValue, ownProps.filtergruppe, ownProps.veileder))
    }
});

export default connect(null, mapDispatchToProps)(FiltreringLabelContainer);
