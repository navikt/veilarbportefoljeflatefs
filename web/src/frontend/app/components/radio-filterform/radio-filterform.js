import React, { PropTypes as PT } from 'react';
import { reduxForm, Fields, Field } from 'redux-form';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { filtervalgShape } from '../../proptype-shapes';
import { lagConfig } from './../../filtrering/filter-konstanter';

function renderFieldsFactory(form) {
    const fieldCls = (className) => classNames('skjemaelement skjemaelement--horisontal', className);

    return ({ names: _names, valg, ...fields }) => { // eslint-disable-line react/prop-types
        const fieldElements = Object.values(fields)
            .map((field) => {
                const { name, value: _value, ...handler } = field.input;
                const { label, className, ...fieldProps } = lagConfig(valg[field.input.name]);

                return {
                    element: (
                        <div key={field.input.name} className={fieldCls(className)} {...fieldProps}>
                            <Field
                                id={field.input.name}
                                name={form} value={name}
                                component="input"
                                type="radio"
                                className="skjemaelement__input radioknapp"
                                {...handler}
                            />
                            <label htmlFor={field.input.name} className="skjemaelement__label">
                                {label}
                            </label>
                        </div>
                    ),
                    hidden: (className || '').endsWith('__hide')
                };
            });

        const elements = fieldElements.map((fieldConfig) => fieldConfig.element);
        const visibleElements = fieldElements
            .reduce((antall, fieldConfig) => {
                if (fieldConfig.hidden) {
                    return antall;
                }
                return antall + 1;
            }, 0);

        return (
            <div className="field__container">
                {elements}
                <span className="text-hide" aria-live="polite" aria-atomic="true">
                    <FormattedMessage
                        id="components.viser.antall.treff"
                        values={{ antall: visibleElements }}
                    />
                </span>
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

function RadioFilterform({ pristine, handleSubmit, form, onSubmit, valg, closeDropdown }) {
    const knappCls = ['knapp', 'knapp--mini', !pristine ? 'knapp--hoved' : ''].join(' ');
    const submitknapp = !pristine ? (
        <button className={knappCls} type="submit">
            <FormattedMessage id="components.filterform.button.velg" />
        </button>
        ) : (
            <button className={knappCls} type="button" onClick={closeDropdown}>
                <FormattedMessage id="components.filterform.button.lukk" />
            </button>
        );

    const submithandler = handleSubmit(prepSubmit(form, onSubmit, closeDropdown));

    return (
        <form className="skjema radio-filterform" onSubmit={submithandler}>
            <div className="radio-filterform__valg">
                <Fields names={Object.keys(valg)} valg={valg} component={renderFieldsFactory(form)} />
            </div>
            <div className="knapperad blokk-xxs">
                {submitknapp}
            </div>
        </form>
    );
}


RadioFilterform.propTypes = {
    pristine: PT.bool.isRequired,
    handleSubmit: PT.func.isRequired,
    form: PT.string.isRequired,
    valg: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    closeDropdown: PT.func.isRequired,
    filtervalg: filtervalgShape, // eslint-disable-line react/no-unused-prop-types
    onSubmit: PT.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const name = ownProps.form;
    const initialValues = { [name]: ownProps.filtervalg[name] };

    return { initialValues };
};

export default connect(mapStateToProps)(reduxForm()(RadioFilterform));
