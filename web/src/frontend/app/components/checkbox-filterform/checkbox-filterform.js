import React, { Component } from 'react';
import { reduxForm, Fields, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endreFiltervalg } from './../../ducks/filtrering';

function renderFields({ names, valg, ...fields }) {
    const fieldElements = Object.values(fields)
        .map((field) => (
            <div key={field.input.name} className="skjema__input">
                <Field id={field.input.name} {...field.input} component="input" type="checkbox" className="checkboks" />
                <label htmlFor={field.input.name}>{valg[field.input.name]}</label>
            </div>
        ));

    return (
        <div>
            {fieldElements}
        </div>
    );
}

function prepSubmit(name, fn, close) {
    return (values) => {
        const arrValue = Object.entries(values)
            .filter(([_, checked]) => checked)
            .map(([value]) => value);

        fn(name, arrValue);
        close();
    }
}

function CheckboxFilterform({ pristine, handleSubmit, form, actions, valg, closeDropdown }) {
    const knappCls = ['knapp', 'knapp--mini', !pristine ? 'knapp--hoved' : ''].join(' ');
    const submitknapp = !pristine ? (
            <button className={knappCls} type="submit">Velg</button>
        ) : (
            <button className={knappCls} onClick={closeDropdown}>Lukk</button>
        );

    const submithandler = handleSubmit(prepSubmit(form, actions.endreFiltervalg, closeDropdown));

    return (
        <form className="checkbox-filterform" onSubmit={submithandler}>
            <div className="checkbox-filterform__valg">
                <Fields names={Object.keys(valg)} valg={valg} component={renderFields} />
            </div>
            <div className="knapperad">
                {submitknapp}
            </div>
        </form>
    );
}

CheckboxFilterform.propTypes = {};
CheckboxFilterform.displayName = `CheckboxFilterForm(${name})`;

const mapStateToProps = (state, ownProps) => {
    const name = ownProps.form;

    const initialValues = Object.keys(ownProps.valg).reduce((acc, v) => ({
        ...acc,
        [v]: state.filtrering[name].includes(v)
    }), {});

    return { initialValues };
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ endreFiltervalg }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm()(CheckboxFilterform));
