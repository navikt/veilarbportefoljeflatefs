import React, { Component, PropTypes as PT } from 'react';
import { reduxForm, Field } from 'redux-form';

function lagUnikId({ value, label }) {
    return `${value}--${label}`;
}
const tilObject = (acc, val) => ({ ...acc, ...val });

function lagRadio({ value, label, name }) {
    const id = value;

    return (
        <div className="skjema__input" key={id}>
            <Field type="checkbox" name={id} id={id} component="input" className="checkboks" />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

lagCheckboks.propTypes = {
    value: PT.number.isRequired,
    label: PT.string.isRequired
};


function create(name, radioknapper) {
    class RadioFilterform extends Component {
        constructor(props) {
            super(props);

            this.onSubmitProxy = this.onSubmitProxy.bind(this);
        }

        onSubmitProxy(...args) {
            this.props.closeDropdown();
            if (!this.props.pristine) {
                this.props.onSubmit(...args);
            }
        }

        render() {
            const names = radioknapper.map(lagRadio);
            const harEndringer = !this.props.pristine;

            const knappCls = ['knapp', 'knapp--mini', harEndringer ? 'knapp--hoved' : ''].join(' ');
            const knappText = harEndringer ? 'Velg' : 'Lukk';

            return (
                <form className="radio-filterform" onSubmit={this.props.handleSubmit(this.onSubmitProxy)}>
                    <div className="radio-filterform__valg">
                        {names}
                    </div>
                    <button type="submit" className={knappCls}>{knappText}</button>
                </form>
            );
        }
    }

    CheckboxFilterform.propTypes = {
        closeDropdown: PT.func.isRequired,
        pristine: PT.bool.isRequired,
        onSubmit: PT.func.isRequired,
        handleSubmit: PT.func.isRequired
    RadioFilterform.propTypes = {
    };
    RadioFilterform.displayName = `RadioFilterForm(${name})`;

    const initialValues = checkbokser.map(checkboks => (
        { [lagUnikId(checkboks)]: checkboks.checked })).reduce(tilObject, {}
    );
    const valgt = radioknapper.find((radio) => radio.checked);
    const initialValues = { [name]: valgt ? valgt.value : undefined };

    return reduxForm({
        form: name,
        initialValues
    })(RadioFilterform);
}

export default create;
