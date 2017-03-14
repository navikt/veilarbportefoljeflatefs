import React, { PropTypes as PT, Component } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import './nedtrekksliste';

class Nedrekksliste extends Component {

    constructor(props) {
        super(props);

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
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    hideDialog() { // eslint-disable-line class-methods-use-this
        const el = document.querySelector('.nedtrekksliste');
        el.classList.remove('nedtrekksliste--apen');
        el.removeAttribute('aria-hidden');
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

    render() {
        const liste = ['Andersen, Kim', 'Barka, Elisabeth V.', 'Johnsen, Ola', 'Karlsen, Magnus'];

        return (
            <section className="nedtrekksliste-container" role="listbox">
                <button className="nedtrekksliste-toggle" onClick={this.toggleDialog}>Søk veileder(e)</button>
                <div className="nedtrekksliste">
                    <input placeholder="Søk.." />
                    <form>
                        <ul className="nedtrekksliste-liste">
                            {liste.map(navn => (
                                <li key={navn}>
                                    <input id={`${navn}-checkbox`} type="checkbox" className="nav-checkbox" />
                                    <label htmlFor={`${navn}-checkbox`}>{navn}</label>
                                </li>
                            ))}
                        </ul>
                        <Knapp onClick={this.toggleDialog}>Lukk</Knapp>
                    </form>
                </div>
            </section>
        );
    }
}

export default Nedrekksliste;
