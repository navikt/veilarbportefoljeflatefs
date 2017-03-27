import React, { Component, PropTypes as PT } from 'react';
import { reduxForm, Field } from 'redux-form';

function lagUnikId({ value, label }) {
    return `${value}--${label}`;
}

function lagRadio({ value, label, name }) {
    const id = value;

    return (
        <div className="skjema__input" key={id}>
            <Field type="radio" name={name} id={id} value={value} component="input" className="radioknapp" />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}


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

    RadioFilterform.propTypes = {
    };
    RadioFilterform.displayName = `RadioFilterForm(${name})`;

    const valgt = radioknapper.find((radio) => radio.checked);
    const initialValues = { [name]: valgt ? valgt.value : undefined };

    return reduxForm({
        form: name,
        initialValues
    })(RadioFilterform);
}

export default create;
