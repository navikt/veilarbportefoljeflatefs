import React, { PropTypes as PT } from 'react';
import { Field, Fields, reduxForm } from 'redux-form';
import AlertStripe from 'nav-frontend-alertstriper';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { lagConfig } from './../../filtrering/filter-konstanter';
import SubmitKnapp from './../submit-knapp';

function renderFields({ names: _names, valg, ...fields }) { // eslint-disable-line react/prop-types
    const fieldCls = (className) => classNames('skjemaelement skjemaelement--horisontal', className);

    const elements = Object.values(fields)
        .map((field) => {
            const { label, className, ...fieldProps } = lagConfig(valg[field.input.name]);

            return (
                <div key={field.input.name} className={fieldCls(className)} {...fieldProps} >
                    <Field
                        id={field.input.name}
                        component="input"
                        type="checkbox"
                        className="skjemaelement__input checkboks"
                        onDragStart={field.input.onDragStart}
                        onChange={field.input.onChange}
                        onDrop={field.input.onDrop}
                        onFocus={field.input.onFocus}
                        value={field.input.value}
                        name={field.input.name}
                        // onBlur={field.input.onBlur} NB: This causes problems with redux-devtools, tmp turned off
                        // https://github.com/erikras/redux-form/issues/3831
                    />
                    <label htmlFor={field.input.name} className="skjemaelement__label">{label}</label>
                </div>
            );
        });

    return (
        <div className="field__container">
            {elements}
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

function CheckboxFilterform({ pristine, handleSubmit, form, onSubmit, valg, closeDropdown, justerVenstre }) {
    const submithandler = handleSubmit(prepSubmit(form, onSubmit, closeDropdown));
    const harValg = Object.keys(valg).length > 0;

    return (
        <form className="skjema checkbox-filterform" onSubmit={submithandler}>
            {harValg &&
                <div className="checkbox-filterform__valg">
                    <Fields names={Object.keys(valg)} valg={valg} component={renderFields} />
                </div>
            }
            <div className="checkbox-filterform__under-valg">
                {harValg ?
                    <div
                        className={classNames({ knapperad: !justerVenstre },
                            'checkbox-filterform__valg-knapp', 'blokk-xxs')}
                    >
                        <SubmitKnapp pristine={pristine} closeDropdown={closeDropdown} />
                    </div>
                    :
                    <AlertStripe type="info" className="checkbox-filterform__alertstripe">
                        <FormattedMessage id="components.filterform.ingen-treff" />
                    </AlertStripe>
                }
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
    closeDropdown: PT.func,
    onSubmit: PT.func.isRequired,
    justerVenstre: PT.bool
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
