import React, { PropTypes as PT } from 'react';
import { Field, Fields, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { lagConfig } from './../../filtrering/filter-konstanter';

function renderFields({ names: _names, valg, ...fields }) { // eslint-disable-line react/prop-types
    const fieldCls = (className) => classNames('skjemaelement skjemaelement--horisontal', className);

    const fieldElements = Object.values(fields)
        .map((field) => {
            const { label, className, ...fieldProps } = lagConfig(valg[field.input.name]);

            return {
                element: (
                    <div key={field.input.name} className={fieldCls(className)} {...fieldProps}>
                        <Field
                            id={field.input.name}
                            component="input"
                            type="checkbox"
                            className="skjemaelement__input checkboks"
                            {...field.input}
                        />
                        <label htmlFor={field.input.name} className="skjemaelement__label">{label}</label>
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
                Viser {visibleElements} treff
            </span>
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
    };
}

function CheckboxFilterform({ pristine, handleSubmit, form, onSubmit, valg, closeDropdown }) {
    const knappCls = ['knapp', 'knapp--mini', !pristine ? 'knapp--hoved' : ''].join(' ');
    const submitknapp = !pristine ? (
        <button className={knappCls} type="submit">Velg</button>
        ) : (
            <button className={knappCls} type="button" onClick={closeDropdown}>Lukk</button>
        );

    const submithandler = handleSubmit(prepSubmit(form, onSubmit, closeDropdown));

    return (
        <form className="skjema checkbox-filterform" onSubmit={submithandler}>
            <div className="checkbox-filterform__valg">
                <Fields names={Object.keys(valg)} valg={valg} component={renderFields} />
            </div>
            <div className="knapperad blokk-xxs">
                {submitknapp}
            </div>
        </form>
    );
}

CheckboxFilterform.defaultProps = {
    veileder: {}
};

CheckboxFilterform.propTypes = {
    pristine: PT.bool.isRequired,
    handleSubmit: PT.func.isRequired,
    form: PT.string.isRequired,
    valg: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    closeDropdown: PT.func.isRequired,
    onSubmit: PT.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const name = ownProps.form;

    const initialValues = Object.keys(ownProps.valg).reduce((acc, v) => ({
        ...acc,
        [v]: ownProps.filtervalg[name].includes(v)
    }), {});

    return { initialValues };
};


export default connect(mapStateToProps)(reduxForm()(CheckboxFilterform));
