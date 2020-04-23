import * as React from 'react';
import './toolbar.less';
import { ReactComponent as SokVeilederIkon } from '../ikoner/person-view-1.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import SokVeileder from './sok-veileder';

interface SokVeilederProps {
    skalVises?: boolean;
}

interface SokVeilederState {
    isInputOpen: boolean;
    isBtnClicked: boolean;
}

class SokVeilederKnapp extends React.Component<SokVeilederProps, SokVeilederState> {
    private wrapperRef;

    constructor(props: SokVeilederProps) {
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
                <div className="sok-veileder-container"
                     ref={(ref) => {
                         this.wrapperRef = ref;
                     }}
                     onClick={() => this.handleClick()}>
                    <SokVeileder
                        veileder={{}}
                        onClick={() => this.handleButtonClick()}
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
                    onClick={() => this.setState({
                        isInputOpen: true,
                    })}
                >
                    <SokVeilederIkon className="toolbar-knapp__ikon" id="sok-veileder-ikon"/>
                    <Normaltekst className="toolbar-knapp__tekst">Søk veileder</Normaltekst>
                </button>
            </div>
        );
    }
}

export default SokVeilederKnapp;
