import * as React from 'react';
import { reduxForm, Fields, Field, SubmitHandler } from 'redux-form';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { filtervalgShape } from '../../proptype-shapes';
import { FiltervalgModell } from '../../model-interfaces';
import { lagConfig } from '../../filtrering/filter-konstanter';

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

    const fieldElements = Object.values(fields)
            .map((value) => {
                const { name, value: unusedValue, ...handler } = value.input;
                const { label, className } = lagConfig(valg[value.input.name]);

                return {
                    element: (
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
    valg: any;
    closeDropdown: () => void;
    filtervalg: FiltervalgModell;
    onSubmit: () => void;
}

function RadioFilterform({ pristine, handleSubmit, form, onSubmit, valg, closeDropdown }: RadioFilterformProps & RadioFilterformOwnProps, context) {
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

    // TODO Finne en bedre løsning på dette
    const FieldRenderer = Fields as any;

    return (
        <form className="skjema radio-filterform" onSubmit={submithandler}>
            <div className="radio-filterform__valg">
                <FieldRenderer names={Object.keys(valg)} valg={valg} skjema={form} component={RenderFields} />
            </div>
            <div className="knapperad blokk-xxs">
                {submitknapp}
            </div>
        </form>
    );
}

const RadioFilterReduxForm = reduxForm<RadioFilterformProps, RadioFilterformOwnProps>({
    form: 'veiledertildeling'
})(RadioFilterform);

const mapStateToProps = (state, ownProps) => {
    const name = ownProps.form;
    return { [name]: ownProps.filtervalg[name] };
};

export default connect(mapStateToProps)(RadioFilterReduxForm);
