import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import SubmitKnapp from './../submit-knapp';

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
                <div className="radioknapp-gruppe">
                    <Field
                        id={`aktivitet-${kode}-ja`}
                        name={kode}
                        value="JA"
                        type="radio"
                        className="skjemaelement__input radioknapp"
                        component="input"
                    />
                    <label
                        htmlFor={`aktivitet-${kode}-ja`}
                        className="skjemaelement__label aktivitet_radioknapp_label"
                    >
                        <span className="sr-only">Ja, {verdi}</span>
                    </label>
                    <Field
                        id={`aktivitet-${kode}-nei`}
                        name={kode}
                        value="NEI"
                        type="radio"
                        className="skjemaelement__input radioknapp"
                        component="input"
                    />
                    <label
                        htmlFor={`aktivitet-${kode}-nei`}
                        className="skjemaelement__label aktivitet_radioknapp_label"
                    >
                        <span className="sr-only">Nei, {verdi}</span>
                    </label>
                </div>
                <span className="aktivitetvalg__tekst">{verdi}</span>
            </div>
        ]);

    const submithandler = props.handleSubmit(prepSubmit(props.form, props.onSubmit, props.valg, props.closeDropdown));

    return (
        <form className="skjema aktivitetfilterform" onSubmit={submithandler}>
            <div className="aktivitetvalg__header blokk-xxs">
                <span className="aktivitetvalg__header--first">Ja</span>
                <span>Nei</span>
            </div>
            <div className="aktivitetfilterform__valg">
                {fields}

                <span className="text-hide" aria-live="polite" aria-atomic="true">
                    <FormattedMessage
                        id="components.viser.antall.treff"
                        values={{ antall: fields.length }}
                    />
                </span>
            </div>
            <div className="aktivitetfilter_knapper blokk-xxs">
                <SubmitKnapp {...props} />
                <button
                    type="button"
                    className="knapp knapp--standard knapp--mini"
                    onClick={reset(props.change, props.valg)}
                >
                    <FormattedMessage id="components.aktivitet-filterform.button.fjern" />
                </button>
            </div>
        </form>
    );
}

AktivitetFilterform.propTypes = {
    form: PT.string.isRequired,
    valg: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    closeDropdown: PT.func.isRequired,
    handleSubmit: PT.func.isRequired,
    change: PT.func.isRequired,
    onSubmit: PT.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const name = ownProps.form;
    const initialValues = ownProps.filtervalg[name];

    return { initialValues };
};

export default connect(mapStateToProps)(reduxForm()(AktivitetFilterform));
