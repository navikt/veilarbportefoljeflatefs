import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, FieldArray } from "redux-form";
import { validForm, rules } from 'react-redux-form-validation';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Datovelger from '../components/datovelger/datovelger';
import Textarea from '../components/textarea/textarea';
import { lagreArbeidsliste } from '../ducks/arbeidsliste';


const KOMMENTAR_MAKS_LENGDE = 2000;

const begrensetKommentarLengde = rules.maxLength(
    KOMMENTAR_MAKS_LENGDE,
    <FormattedMessage
        id="legg-til-arbeidsliste-form.feilmelding.kommentar-lengde"
        values={{ KOMMENTAR_MAKS_LENGDE }}
    />
);

function LeggTilArbeidslisteForm ({  valgteBrukere, lukkModal, handleSubmit }) {

    const kommentarer = () => (
        <div>
            {valgteBrukere.map((bruker, index) =>
                <div key={index}>
                    <Undertittel className="blokk-s">
                        <FormattedMessage
                            id="modal.legg.til.arbeidsliste.brukerinfo"
                            values={{
                                etternavn: bruker.etternavn,
                                fornavn: bruker.fornavn,
                                fnr: bruker.fnr
                            }}
                        />
                    </Undertittel>
                    < div className="nav-input blokk-s">
                            <Textarea
                                feltNavn={`${index}.kommentar`}
                                placeholder=""
                                maxLength={2000}
                                disabled={false}
                                visTellerFra={1}
                            />
                    </div>
                    <Datovelger
                        feltNavn={`${index}.frist`}
                        labelId="arbeidsliste-form.label.dato"
                        tidligsteFom={new Date()}
                    />
                </div>)}
        </div>);

        return(
            < form onSubmit={handleSubmit}>
                <FieldArray name="arbeidsliste" component={kommentarer}/>
                <div>
                    <button type="submit" className="knapp knapp--hoved" onClick={handleSubmit}>
                        <FormattedMessage id="modal.legg.til.arbeidsliste.knapp.lagre"/>
                    </button>
                    <button type="button" className="knapp" onClick={lukkModal}>
                        <FormattedMessage id="modal.legg.til.arbeidsliste.knapp.avbryt"/>
                    </button>
                </div>
            </form>
    );
}

LeggTilArbeidslisteForm.propTypes = {
    handleSubmit: PT.func.isRequired,
    lukkModal: PT.func.isRequired,
    valgteBrukere: PT.arrayOf(PT.object).isRequired
};

LeggTilArbeidslisteForm.defaultProps = {
    handleSubmit: undefined
};

export const formNavn = 'arbeidsliste_kommentar_skjema';
const LeggTilArbeidslisteReduxForm = validForm({
    form: formNavn,
    validate: {
        kommentar: [begrensetKommentarLengde]
    }
})(LeggTilArbeidslisteForm);

const selector = formValueSelector(formNavn);
const mapStateToProps = (state, props) => {
    const arbeidsliste = props.arbeidsliste || [];
    const valgteBrukere = props.valgteBrukere;
    // props.valgteBrukere.every( function(bruker)
    // {
    //     const kommentar = {};
    //     kommentar.veilederId = state.enheter.ident;
    //     kommentar.brukerFnr = bruker.fnr;
    //     // kommentar.kommentar = selector(state, `kommentar arbeidslistkommentar_${bruker.fnr}`);
    //     kommentar.kommentar = selector(state,'kommentar');
    //     // kommentar.frist = selector(state, `datoFelt datoFelt_${bruker.fnr}`);
    //     kommentar.frist = selector(state,'datofelt');
    //     arbeidsliste.push(kommentar);
    // });
    return {
        initialValues: {
            ...arbeidsliste,
            valgteBrukere
        },
    }
};

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (arbeidsliste, valgteBrukere, state) => {
        console.log(valgteBrukere);
        valgteBrukere.forEach( function(bruker, index) {
            arbeidsliste[index].brukerFnr = bruker.fnr;
            arbeidsliste[index].veilederId = state.enheter.ident;
        });
        console.log('arbeidsliste', arbeidsliste);
        lagreArbeidsliste(arbeidsliste)(dispatch);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilArbeidslisteReduxForm);



