import React, { PropTypes as PT } from 'react';
import { reduxForm, Fields, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endreFiltervalg } from './../../ducks/filtrering';
import { veilederShape } from '../../proptype-shapes';

function renderFieldsFactory(form) {
    return ({ names: _names, valg, ...fields }) => { // eslint-disable-line react/prop-types
        const fieldElements = Object.values(fields)
            .map((field) => {
                const { name, value: _value, ...handler } = field.input;
                return (
                    <div key={field.input.name} className="skjema__input">
                        <Field
                            id={field.input.name}
                            name={form} value={name}
                            component="input"
                            type="radio"
                            className="radioknapp"
                            {...handler}
                        />
                        <label htmlFor={field.input.name}>{valg[field.input.name]}</label>
                    </div>
                );
            });

        return (
            <div>
                {fieldElements}
            </div>
        );
    };
}

function prepSubmit(name, fn, close) {
    return (values) => {
        fn(name, values[name]);
        close();
    };
}

function RadioFilterform({ pristine, handleSubmit, form, actions, valg, closeDropdown }) {
    const knappCls = ['knapp', 'knapp--mini', !pristine ? 'knapp--hoved' : ''].join(' ');
    const submitknapp = !pristine ? (
        <button className={knappCls} type="submit">Velg</button>
        ) : (
            <button className={knappCls} onClick={closeDropdown}>Lukk</button>
        );

    const submithandler = handleSubmit(prepSubmit(form, actions.endreFiltervalg, closeDropdown));

    return (
        <form className="radio-filterform" onSubmit={submithandler}>
            <div className="radio-filterform__valg">
                <Fields names={Object.keys(valg)} valg={valg} component={renderFieldsFactory(form)} />
            </div>
            <div className="knapperad">
                {submitknapp}
            </div>
        </form>
    );
}

RadioFilterform.defaultProps = {
    veileder: {}
};

RadioFilterform.propTypes = {
    pristine: PT.bool.isRequired,
    handleSubmit: PT.func.isRequired,
    form: PT.string.isRequired,
    valg: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    closeDropdown: PT.func.isRequired,
    actions: PT.shape({
        endreFiltervalg: PT.func
    }).isRequired,
    veileder: veilederShape
};

const mapStateToProps = (state, ownProps) => {
    const name = ownProps.form;
    const initialValues = { [name]: state.filtrering[name] };

    return { initialValues };
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ endreFiltervalg }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm()(RadioFilterform));
