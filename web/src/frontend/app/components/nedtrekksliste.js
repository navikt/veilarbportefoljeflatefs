import React, { Component, PropTypes as PT } from 'react';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import './nedtrekksliste';
import CheckboxListe from './checkbox-liste';

function nedtrekkslisteWrapper(ListeComponent) {
    class Nedtrekksliste extends Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 0,
                checked: []
            };

            let skjulHvisKlikkUtenfor = (e) => {
                let target = e.target;
                let isCalWrap = false;
                while (target.parentNode) {
                    if (target.classList.contains('nedtrekksliste-container')) {
                        isCalWrap = true;
                        break;
                    }
                    target = target.parentNode;
                }
                if (!isCalWrap) {
                    this.hideDialog();
                }
            };
            skjulHvisKlikkUtenfor = skjulHvisKlikkUtenfor.bind(this);
            document.querySelector('body').addEventListener('click', skjulHvisKlikkUtenfor);

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidMount() {
            const elementList = document.querySelectorAll('.nedtrekksliste li');
            elementList.forEach((element) => {
                let callback = (e) => {
                    switch (e.which) {
                        case 38: // Arrow up
                            this.setState({
                                index: this.state.index === 0 ? 0 : this.state.index - 1
                            });
                            break;
                        case 40: // Arrow downs
                            this.setState({
                                index: this.state.index === this.props.liste.length - 1 ?
                                    this.props.liste.length - 1 : this.state.index + 1
                            });
                            break;
                        case 27: // Escape
                            this.hideDialog();
                            break;
                        default:
                            return;
                    }
                };
                callback = callback.bind(this);
                element.addEventListener('keydown', callback);
            });
        }

        componentWillUnmount() {
            this.hideDialog();
        }

        onSubmit(e) {
            e.preventDefault();
            this.props.submitValgt(this.props.liste.filter((listeElement, i) => this.state.checked[i] === true));
        }

        handleChange(e) {
            this.props.liste[Number(e.target.value)].checked = e.target.checked;
           /* this.setState({
                checked: this.state.checked.map((choice, i) => {
                    if (i === Number(e.target.value)) {
                        return e.target.checked;
                    }
                    return choice;
                })
            });*/
        }

        noeErChecked() {
            return this.props.liste.some(listeElement => listeElement.checked === true);
            // return this.state.checked.includes(true);
        }

        toggleDialog(e) { // eslint-disable-line class-methods-use-this
            const el = document.querySelector('.nedtrekksliste');
            el.classList.toggle('nedtrekksliste--apen');
            if (el.hasAttribute('aria-hidden')) {
                el.removeAttribute('aria-hidden');
            } else {
                el.setAttribute('aria-hidden', 'true');
            }
            e.preventDefault();
        }

        hideDialog() { // eslint-disable-line class-methods-use-this
            const el = document.querySelector('.nedtrekksliste');
            if (el) {
                el.classList.remove('nedtrekksliste--apen');
                el.removeAttribute('aria-hidden');
            }
        }

        render() {
            const knapp = () => (
                this.noeErChecked() ?
                    <Hovedknapp onClick={this.onSubmit}>Velg</Hovedknapp> :
                    <Knapp onClick={this.toggleDialog}>Lukk</Knapp>
            );

            return (
                <section className="nedtrekksliste-container" role="listbox">
                    <button className="nedtrekksliste-toggle" onClick={this.toggleDialog}>Søk veileder(e)</button>
                    <div className="nedtrekksliste">
                        <form>
                            <ListeComponent liste={this.props.liste} handleChange={this.handleChange} />
                        </form>
                        {knapp()}
                    </div>
                </section>
            );
        }
    }

    Nedtrekksliste.propTypes = {
        liste: PT.arrayOf(PT.shape({
            key: PT.string,
            value: PT.string,
            checked: PT.bool
        })).isRequired,
        submitValgt: PT.func.isRequired
    };

    return Nedtrekksliste;
}

export default nedtrekkslisteWrapper(CheckboxListe);
