import * as React from 'react';
import './toolbar.less';
import { ReactComponent as TildelVeilederIkon } from '../ikoner/person-add-1.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import TildelVeileder from '../modal/tildel-veileder/tildel-veileder';

interface TildelVeilederProps {
    skalVises: boolean;
    filtergruppe?: string;
    gjeldendeVeileder?: string;
    aktiv: boolean;
}

interface TildelVeilederState {
    isInputOpen: boolean;
    isBtnClicked: boolean;
}

class TildelVeilederKnapp extends React.Component<TildelVeilederProps, TildelVeilederState> {
    private wrapperRef;

    constructor(props: TildelVeilederProps) {
        super(props);

        this.state = {
            isInputOpen: false,
            isBtnClicked: false,
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (e) => {
        if ((this.state.isInputOpen && this.wrapperRef && !this.wrapperRef.contains(e.target))) {
            this.setState({isInputOpen: false});
        }
    };

    handleClick = () => {
        this.setState(() => {
            return {isInputOpen: true};
        });
    };

    handleButtonClick = () => {
        this.setState(() => {
            return {isBtnClicked: true};
        });
    };

    render() {
        if (!this.props.skalVises) {
            return null;
        }

        if (this.state.isBtnClicked) {
            this.setState({
                isInputOpen: false,
                isBtnClicked: false,
            });
        }

        if (this.state.isInputOpen) {
            return (
                <div className="tildel-veileder-input"
                     ref={(ref) => {
                         this.wrapperRef = ref;
                     }}
                     onClick={() => this.handleClick()}>
                    <TildelVeileder
                        btnOnClick={() => this.handleButtonClick()}
                        skalVises={this.props.skalVises}
                    />
                </div>
            );
        }

        return (
            <div className="toolbar_btnwrapper">
                <button
                    type="button"
                    className='toolbar_btn'
                    disabled={!this.props.aktiv}
                    onClick={() => this.setState({
                        isInputOpen: true,
                    })}
                >
                    <TildelVeilederIkon className="toolbar-knapp__ikon" id="tildel-veileder-ikon"/>
                    <Normaltekst className="toolbar-knapp__tekst">Tildel veileder</Normaltekst>
                </button>
            </div>
        );
    }
}

export default TildelVeilederKnapp;
