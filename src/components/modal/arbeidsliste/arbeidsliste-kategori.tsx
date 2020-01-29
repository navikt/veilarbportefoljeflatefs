import * as React from 'react';
import './arbeidsliste-kategori.less';
import { ReactComponent as ArbeidslisteikonBla } from './arbeidslisteikon/arbeidslisteikon_bla.svg';
import { ReactComponent as ArbeidslisteikonRod } from './arbeidslisteikon/arbeidslisteikon_rod.svg';
import { ReactComponent as ArbeidslisteikonGronn } from './arbeidslisteikon/arbeidslisteikon_gronn.svg';
import { ReactComponent as ArbeidslisteikonGul } from './arbeidslisteikon/arbeidslisteikon_gul.svg';
import ArbeidslisteIkon from './arbeidslisteikon/artbeidslisteikon';

interface ArbeidslisteKategoriProps {
    name: string;
}

interface StateProps {
    radio: any;
}

class ArbeidslisteKategori extends React.Component<ArbeidslisteKategoriProps, StateProps> {

    constructor(props) {
        super(props);
        this.state = {
            radio: 'BLA'
        };
    }

    handleChange = (event) => {
        this.setState({
            radio: event.target.value
        });
    };

    render() {
        return (
            <div className="arbeidslisteikon">
                <ArbeidslisteIkon
                    value='BLA'
                    arbeidslisteikon={<ArbeidslisteikonBla/>}
                    name={this.props.name}
                    tabIndex={1}
                    onChange={this.handleChange}
                    checked={this.state.radio === 'BLA'}
                />
                <ArbeidslisteIkon
                    value='ROD'
                    arbeidslisteikon={<ArbeidslisteikonRod/>}
                    name={this.props.name}
                    tabIndex={2}
                    onChange={this.handleChange}
                    checked={this.state.radio === 'ROD'}
                />
                <ArbeidslisteIkon
                    value='GRONN'
                    arbeidslisteikon={<ArbeidslisteikonGronn/>}
                    name={this.props.name}
                    tabIndex={3}
                    onChange={this.handleChange}
                    checked={this.state.radio === 'GRONN'}
                />
                <ArbeidslisteIkon
                    value='GUL'
                    arbeidslisteikon={<ArbeidslisteikonGul/>}
                    name={this.props.name}
                    tabIndex={4}
                    onChange={this.handleChange}
                    checked={this.state.radio === 'GUL'}
                />
            </div>
        );
    }
}

export default ArbeidslisteKategori;
