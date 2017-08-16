import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

function reset(change, alleValg) {
    return () => {
        const valgKoder = Object.keys(alleValg);
        valgKoder.forEach((kode) => change(kode, 'NA'));
    };
}

function prepSubmit(name, fn, alleValg, close) {
    const valgKoder = Object.keys(alleValg);
    return (values) => {
        const data = valgKoder
            .reduce((acc, key) => ({ ...acc, [key]: values[key] ? values[key] : 'NA' }), {});
        fn(name, data);
        close();
    };
}

function AktivitetFilterform(props) {
    const fields = Object.entries(props.valg)
        .map(([kode, verdi]) => [
            <div key={`skjemaelement skjemaelement--horisontal aktivitet-${kode}`} className="aktivitetvalg blokk-xxs">
                <Field
                    id={`aktivitet-${kode}-ja`}
                    name={kode}
                    value="JA"
                    type="radio"
                    className="skjemaelement__input radioknapp"
                    component="input"
                />
                <label htmlFor={`aktivitet-${kode}-ja`}><span className="sr-only">{verdi}</span></label>
                <Field
                    id={`aktivitet-${kode}-nei`}
                    name={kode}
                    value="NEI"
                    type="radio"
                    className="skjemaelement__input radioknapp"
                    component="input"
                />
                <label htmlFor={`aktivitet-${kode}-nei`}><span className="sr-only">{verdi}</span></label>
                <span>{verdi}</span>
            </div>
        ]);

    const submithandler = props.handleSubmit(prepSubmit(props.form, props.onSubmit, props.valg, props.closeDropdown));

    return (
        <form className="skjema aktivitetfilterform" onSubmit={submithandler}>
            <div className="aktivitetvalg__header blokk-xxs">
                <span className="aktivitetvalg__header--first">Ja</span>
                <span>Nei</span>
            </div>
            {fields}

            <button type="submit" className="knapp knapp--hoved knapp--mini">
                Lagre
            </button>
            <button
                type="button"
                className="knapp knapp--standard knapp--mini"
                onClick={reset(props.change, props.valg)}
            >
                Fjern valg
            </button>
        </form>
    );
}

AktivitetFilterform.propTypes = {
    form: PT.string.isRequired,
    valg: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    closeDropdown: PT.func.isRequired,
    handleSubmit: PT.func.isRequired,
    change: PT.object.isRequired,
    onSubmit: PT.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const name = ownProps.form;
    const initialValues = ownProps.filtervalg[name];

    return { initialValues };
};

export default connect(mapStateToProps)(reduxForm()(AktivitetFilterform));
