/*eslint-disable*/

import React, { PropTypes as PT, Component } from 'react';
import classnames from 'classnames';
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
        this.setState({erApen: true});
    };

    skjul() {
        this.setState({erApen: false});
    };

    toggle() {
        if(this.state.erApen) {
            this.skjul();
        }
        else {
            this.vis();
        }
    }

    render() {

        const liste = ['Andersen, Kim', 'Barka, Elisabeth V.', 'Johnsen, Ola', 'Karlsen, Magnus'];

        const classesApen = classnames("nedtrekksliste--er-apen", {
            hidden: !this.state.erApen
        });

        return (
            <section className="nedtrekksliste">
                <h3 className="nedtrekksliste-toggle" onClick={this.toggle} tabIndex="2">Søk veileder(e)</h3>
                <div className={classesApen}>
                    <input placeholder="Søk.." />
                    <form>
                        {liste.map(navn => (
                            <div key={navn} className="nedtrekksliste-liste">
                                <input type="checkbox" />
                                <label>{navn}</label>
                            </div>
                        ))}
                    </form>
                </div>
            </section>
        );
    }
}

Nedrekksliste.defaultProps = {
    erApen: false
};

export default Nedrekksliste;
