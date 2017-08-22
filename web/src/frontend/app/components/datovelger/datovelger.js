import React, { Component, PropTypes as PT } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { CustomField } from 'react-redux-form-validation';
import { connect } from 'react-redux';
import { change, touch } from 'redux-form';
import MaskedInput from 'react-maskedinput';
import {
    autobind,
    dateToISODate,
    erGyldigISODato,
    ISODateToDatePicker,
    datePickerToISODate,
    erGyldigFormattertDato,
    validerDatoField
} from '../../utils/dato-utils';
import DayPickerComponent from './daypicker';

function stopEvent(event) {
    try {
        event.nativeEvent.stopImmediatePropagation();
    } catch (e) {
        event.stopPropagation();
    }
}

class DatoField extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            erApen: false
        };
    }

    componentDidMount() {
        this.container.addEventListener('focusout', this.onFocusOut);
    }

    componentWillUnmount() {
        this.container.removeEventListener('focusout', this.onFocusOut);
    }

    onFocusOut(e) {
        const targetErChildnode = this.container.contains(e.relatedTarget);
        if (!targetErChildnode) {
            this.lukk(false);
        }
    }

    onKeyUp(e) {
        const ESCAPE_KEYCODE = 27;
        if (e.which === ESCAPE_KEYCODE) {
            this.lukk();
        }
    }

    onDayClick(event, jsDato) {
        const { feltNavn, meta } = this.props;
        const isoDate = dateToISODate(new Date(jsDato));
        this.props.dispatch(change(meta.form, feltNavn, isoDate));
        this.props.dispatch(touch(meta.form, feltNavn));
        this.lukk();
    }

    toggle(e) {
        e.preventDefault();
        if (this.state.erApen) {
            this.lukk();
        } else {
            this.apne();
        }
    }
    apne() {
        this.setState({
            erApen: true
        });
    }

    lukk(settFokus = true) {
        this.setState({
            erApen: false
        });
        if (settFokus) {
            this.toggleButton.focus();
        }
    }

    render() {
        const {
            meta,
            input,
            id,
            label,
            disabled,
            tidligsteFom,
            errorMessage
        } = this.props;

        const feil = errorMessage && errorMessage;
        const value = input.value;
        const maskedInputProps = {
            ...input,
            value: erGyldigISODato(value) ? ISODateToDatePicker(value) : value
        };

        return (
            <div
                className="datovelger skjemaelement"
                ref={(container) => {
                    this.container = container;
                }}
            >
                <label className="skjemaelement__label text-hide" htmlFor={id}>
                    {label}
                </label>
                <div // eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role
                    className="datovelger__inner"
                    tabIndex=""
                    onClick={stopEvent}
                >
                    <div className="datovelger__inputContainer">
                        <MaskedInput
                            type="tel"
                            mask="11.11.1111"
                            autoComplete="off"
                            placeholder="dd.mm.åååå"
                            id={id}
                            disabled={disabled}
                            className={`skjemaelement__input datovelger__input
                                                ${meta.touched && meta.error ? 'input--feil' : ''}`}
                            {...maskedInputProps}
                        />
                        <button
                            className="js-toggle datovelger__toggleDayPicker"
                            aria-label={
                                this.state.erApen
                                    ? 'Skjul datovelger'
                                    : 'Vis datovelger'
                            }
                            ref={(toggle) => {
                                this.toggleButton = toggle;
                            }}
                            id={`toggle-${id}`}
                            disabled={disabled}
                            onKeyUp={this.onKeyUp}
                            onClick={this.toggle}
                            aria-pressed={this.erApen}
                            type="button"
                        />
                    </div>
                    {this.state.erApen &&
                    <DayPickerComponent
                        {...this.props}
                        ariaControls={`toggle-${id}`}
                        tidligsteFom={tidligsteFom}
                        onDayClick={this.onDayClick}
                        onKeyUp={this.onKeyUp}
                        lukk={this.lukk}
                    />}
                </div>
                <div
                    role="alert"
                    aria-live="assertive"
                    className="skjemaelement__feilmelding"
                >
                    {feil}
                </div>
            </div>
        );
    }
}

DatoField.propTypes = {
    meta: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    id: PT.string.isRequired,
    feltNavn: PT.string.isRequired,
    label: PT.oneOfType([PT.string, PT.node]).isRequired,
    input: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    dispatch: PT.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    disabled: PT.bool,
    tidligsteFom: PT.instanceOf(Date),
    errorMessage: PT.oneOfType([PT.arrayOf(PT.node), PT.node])
};

DatoField.defaultProps = {
    disabled: false,
    tidligsteFom: undefined,
    errorMessage: undefined
};

function parseDato(dato) {
    return erGyldigFormattertDato(dato) ? datePickerToISODate(dato) : dato;
}

const ConnectedDatoField = connect()(DatoField);

function Datovelger(props) {
    const { feltNavn, tidligsteFom, intl, feltErValgfritt} = props;

    const datoFelt = (
        <ConnectedDatoField
            label={<span>Velg dato for arbeidsliste</span>}
            {...props}
        />
    );
    return (
        <CustomField
            name={feltNavn}
            parse={parseDato}
            errorClass="skjemaelement--harFeil"
            customComponent={datoFelt}
            validate={(value) =>
                validerDatoField(
                    value,
                    intl,
                    { fra: tidligsteFom},
                    feltErValgfritt
                )}
        />
    );
}

Datovelger.propTypes = {
    feltNavn: PT.string.isRequired,
    tidligsteFom: PT.instanceOf(Date),
    intl: intlShape.isRequired,
    feltErValgfritt: PT.bool.isRequired
};

Datovelger.defaultProps = {
    tidligsteFom: undefined,
    feltErValgfritt: false
};

export default injectIntl(Datovelger);
