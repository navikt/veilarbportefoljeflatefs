import * as React from 'react';
import {connect} from 'react-redux';
import {slettArbeidslisteAction} from '../../../ducks/arbeidsliste';
import {oppdaterArbeidslisteForBruker} from '../../../ducks/portefolje';
import {leggTilStatustall} from '../../../ducks/statustall-veileder';
import {FJERN_FRA_ARBEIDSLISTE_FEILET, visFeiletModal} from '../../../ducks/modal-feilmelding-brukere';
import {visServerfeilModal} from '../../../ducks/modal-serverfeil';
import {ArbeidslisteDataModell, BrukerModell, KategoriModell} from '../../../model-interfaces';
import './arbeidsliste.css';
import {logEvent} from '../../../utils/frontend-logger';
import {Button, Label} from '@navikt/ds-react';
import {trackAmplitude} from '../../../amplitude/amplitude';

function brukerLabel(bruker) {
    return (
        <li key={bruker.fnr}>
            <Label size="small">{`${bruker.fornavn} ${bruker.etternavn}, ${bruker.fnr}`}</Label>
        </li>
    );
}

interface FjernFraArbeidslisteFormProps {
    lukkModal: () => void;
    valgteBrukere: BrukerModell[];
    onSubmit: (valgteBrukere: BrukerModell[], props) => void;
    visBrukerLabel?: boolean;
}

function FjernFraArbeidslisteForm({lukkModal, valgteBrukere, onSubmit, visBrukerLabel}: FjernFraArbeidslisteFormProps) {
    const className = valgteBrukere.length >= 22 ? 'arbeidsliste-listetekst__lang' : 'arbeidsliste-listetekst';

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                logEvent('portefolje.metrikker.fjern_arbeidsliste');
                trackAmplitude({
                    name: 'knapp klikket',
                    data: {knapptekst: 'Fjern arbeidsliste', effekt: 'Fjern bruker fra arbeidslista'}
                });
                onSubmit(valgteBrukere, lukkModal);
            }}
        >
            <div className={className}>
                {visBrukerLabel && <ul>{valgteBrukere.map(bruker => brukerLabel(bruker))}</ul>}
            </div>
            <div className="knapper">
                <Button
                    className="knapp knapp--hoved"
                    type="submit"
                    data-testid="modal_varsel_fjern-fra-arbeidsliste_bekreft-knapp"
                    size="small"
                >
                    Bekreft
                </Button>
                <Button variant="secondary" className="knapp" onClick={lukkModal} size="small">
                    Avbryt
                </Button>
            </div>
        </form>
    );
}

function oppdaterState(res, lukkModal: () => void, arbeidsliste: ArbeidslisteDataModell[], dispatch) {
    lukkModal();
    if (!res) {
        return visServerfeilModal()(dispatch);
    }
    const brukereOK = res.data.data;
    const brukereError = res.data.error;

    const arbeidslisteToDispatch = arbeidsliste
        .map(a => ({
            ...a,
            arbeidslisteAktiv: false
        }))
        .filter(bruker => brukereOK.includes(bruker.fnr));

    if (brukereError.length > 0) {
        visFeiletModal({
            aarsak: FJERN_FRA_ARBEIDSLISTE_FEILET,
            brukereError
        })(dispatch);
    }

    leggTilStatustall('minArbeidsliste', -brukereOK.length)(dispatch);

    function oppdaterArbeidslisteKategoriTall(data: ArbeidslisteDataModell) {
        switch (data.kategori) {
            case KategoriModell.BLA: {
                leggTilStatustall('minArbeidslisteBla', -1)(dispatch);
                break;
            }
            case KategoriModell.GRONN: {
                leggTilStatustall('minArbeidslisteGronn', -1)(dispatch);
                break;
            }
            case KategoriModell.GUL: {
                leggTilStatustall('minArbeidslisteGul', -1)(dispatch);
                break;
            }
            case KategoriModell.LILLA:
                leggTilStatustall('minArbeidslisteLilla', -1)(dispatch);
        }
    }

    arbeidslisteToDispatch.forEach(oppdaterArbeidslisteKategoriTall);

    return oppdaterArbeidslisteForBruker(arbeidslisteToDispatch)(dispatch);
}

const mapStateToProps = state => ({
    slettFraArbeidslisteStatus: state.arbeidsliste.status
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (valgteBrukere, lukkModal) => {
        const arbeidsliste: ArbeidslisteDataModell[] = valgteBrukere.map(bruker => ({
            fnr: bruker.fnr,
            kommentar: bruker.arbeidsliste.kommentar,
            frist: bruker.arbeidsliste.frist,
            kategori: bruker.arbeidsliste.kategori
        }));
        slettArbeidslisteAction(arbeidsliste)(dispatch).then(res =>
            oppdaterState(res, lukkModal, arbeidsliste, dispatch)
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FjernFraArbeidslisteForm);
