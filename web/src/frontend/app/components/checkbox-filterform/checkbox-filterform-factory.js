import React, { Component, PropTypes as PT } from 'react';
import { reduxForm, Field } from 'redux-form';

function lagUnikId({ value, label }) {
    return `${value}--${label}`;
}
const tilObject = (acc, val) => ({...acc, ...val});

function lagCheckboks({ value, label }) {
    const id = lagUnikId({ value, label });

    return (
        <div className="skjema__input" key={id}>
            <Field type="checkbox" name={id} id={id} component="input" className="checkboks"/>
            <label htmlFor={id}>{label}</label>
        </div>
    );
}


function create(name, checkbokser) {
    class CheckboxFilterform extends Component {
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
            const names = checkbokser.map(lagCheckboks);
            const harEndringer = !this.props.pristine;

            const knappCls = ['knapp', 'knapp--mini', harEndringer ? 'knapp--hoved' : ''].join(' ');
            const knappText = harEndringer ? 'Velg' : 'Lukk';

            return (
                <form className="checkbox-filterform" onSubmit={this.props.handleSubmit(this.onSubmitProxy)}>
                    <div className="checkbox-filterform__valg">
                        {names}
                    </div>
                    <div className="knapperad">
                        <button type="submit" className={knappCls}>{knappText}</button>
                    </div>
                </form>
            );
        }
    }

    CheckboxFilterform.propTypes = {
    };
    CheckboxFilterform.displayName = `CheckboxFilterForm(${name})`;

    const initialValues = checkbokser.map((checkboks) => ({[lagUnikId(checkboks)]: checkboks.checked})).reduce(tilObject, {});

    return reduxForm({
        form: name,
        initialValues
    })(CheckboxFilterform);
}

export default create;
