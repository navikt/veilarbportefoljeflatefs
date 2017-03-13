import React, { PropTypes as PT, Component } from 'react';
import classnames from 'classnames';
import { Knapp } from 'nav-frontend-knapper';
import './nedtrekksliste';

class Nedrekksliste extends Component {

    constructor(props) {
        super(props);
        this.state = {
            erApen: this.props.erApen
        };

        this.vis = this.vis.bind(this);
        this.skjul = this.skjul.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    vis() {
        this.setState({ erApen: true });
    }

    skjul() {
        this.setState({ erApen: false });
    }

    toggle() {
        if (this.state.erApen) {
            this.skjul();
        } else {
            this.vis();
        }
    }

    render() {
        const liste = ['Andersen, Kim', 'Barka, Elisabeth V.', 'Johnsen, Ola', 'Karlsen, Magnus'];

        const classesApen = classnames('nedtrekksliste--er-apen', {
            hidden: !this.state.erApen
        });

        return (
            <section className="nedtrekksliste" role="listbox">
                <button className="nedtrekksliste-toggle" onClick={this.toggle}>Søk veileder(e)</button>
                <div className={classesApen}>
                    <input placeholder="Søk.." />
                    <form>
                        <div>
                            {liste.map(navn => (
                                <div key={navn} className="nedtrekksliste-liste">
                                    <input id={`${navn}-checkbox`} type="checkbox" />
                                    <label htmlFor={`${navn}-checkbox`}>{navn}</label>
                                </div>
                            ))}
                        </div>
                        <Knapp onClick={this.skjul}>Lukk</Knapp>
                    </form>
                </div>
            </section>
        );
    }
}

Nedrekksliste.defaultProps = {
    erApen: false
};

Nedrekksliste.propTypes = {
    erApen: PT.bool.isRequired
};

export default Nedrekksliste;
