import * as React from 'react';
import { reduxForm, Fields, Field, SubmitHandler } from 'redux-form';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import { FiltervalgModell } from '../../model-interfaces';
import { lagConfig } from '../../filtrering/filter-konstanter';
import SubmitKnapp from './../submit-knapp';

interface RenderFieldProps {
    names: any;
    valg: { [id: string]: ValgModell} | string;
    skjema: string;
}

interface ValgModell extends Field {
    className?: string;
    label: string;
}

function RenderFields({ names: unusedNames, valg, skjema, ...fields }: RenderFieldProps) {
    const fieldCls = (className) => classNames('skjemaelement skjemaelement--horisontal', className);

    const elements = Object.values(fields)
            .map((value) => {
                const { name, value: unusedValue, ...handler } = value.input;
                const { label, className } = lagConfig(valg[value.input.name]);

                return (
                    <div key={value.input.name} className={fieldCls(className)}>
                        <Field
                            id={value.input.name}
                            name={skjema} value={name}
                            component="input"
                            type="radio"
                            className="skjemaelement__input radioknapp"
                            {...handler}
                        />
                        <label htmlFor={value.input.name} className="skjemaelement__label">
                            {label}
                        </label>
                    </div>
                );
            });

    return (
        <div className="field__container">
            {elements}
        </div>
    );
}

type prepSubmitReturnType = (values: any[]) => void;

function prepSubmit(name, fn, close): prepSubmitReturnType {
    return (values) => {
        fn(name, values[name]);
        close();
    };
}

interface RadioFilterformProps {
    pristine: boolean;
    handleSubmit: SubmitHandler;
    form: string;
}

interface RadioFilterformOwnProps {
    initialValues: { [key: string]: string };
    valg: any;
    closeDropdown: () => void;
    filtervalg: FiltervalgModell;
    onSubmit: () => void;
}

function RadioFilterform({ pristine, handleSubmit, form, onSubmit, valg, closeDropdown }: RadioFilterformProps & RadioFilterformOwnProps, context) {
    const submithandler = handleSubmit(prepSubmit(form, onSubmit, closeDropdown));

    // TODO Finne en bedre løsning på dette
    const FieldRenderer = Fields as any;

    return (
        <form className="skjema radio-filterform" onSubmit={submithandler}>
            <div className="radio-filterform__valg">
                <FieldRenderer names={Object.keys(valg)} valg={valg} skjema={form} component={RenderFields} />
            </div>
            <div className="knapperad blokk-xxs">
                <SubmitKnapp pristine={pristine} closeDropdown={closeDropdown} />
            </div>
        </form>
    );
}

const RadioFilterReduxForm = reduxForm<RadioFilterformProps, RadioFilterformOwnProps>({
    form: 'veiledertildeling'
})(RadioFilterform);

const mapStateToProps = (state, ownProps) => {
    const name = ownProps.form;
    const initialValues = { [name]: ownProps.filtervalg[name] };
    return { initialValues };
};

export default connect(mapStateToProps)(RadioFilterReduxForm);
