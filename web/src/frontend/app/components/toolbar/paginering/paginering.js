import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Chevron from 'nav-frontend-chevron';
import classNames from 'classnames';
import { DEFAULT_PAGINERING_STORRELSE } from './../../../konstanter';
import KnappPanel from './knapp-panel';

const cls = (className) => classNames('paginering', className);

class Paginering extends PureComponent {
    render() {
        const {
            className,
            erPaForsteSide,
            navarendeSide,
            erPaSisteSide,
            antallSider,
            seAlle,
            antall,
            sideStorrelse,
            onChange
        } = this.props;

        const fraIndex = (navarendeSide - 1)* sideStorrelse;
        const nyAntall = antall === sideStorrelse ? DEFAULT_PAGINERING_STORRELSE : antall;
        const seAlleState = sideStorrelse !== DEFAULT_PAGINERING_STORRELSE;

        return (
            <div className={cls(className)}>
                <KnappPanel
                    disabled={!seAlleState && antall <= sideStorrelse}
                    pressed={seAlleState && antall <= sideStorrelse}
                    onClick={() => onChange(0, nyAntall)}
                >
                    <FormattedMessage id="paginering.se.alle"/>
                </KnappPanel>

                <KnappPanel disabled={erPaForsteSide} onClick={() => onChange(fraIndex - sideStorrelse, sideStorrelse)}>
                    <Chevron orientasjon="venstre">
                        <FormattedMessage id="paginering.forrige"/>
                    </Chevron>
                </KnappPanel>

                {!erPaForsteSide && <KnappPanel onClick={() => onChange(0, sideStorrelse)}>1</KnappPanel>}

                <KnappPanel>
                    <strong>{navarendeSide}</strong>
                </KnappPanel>

                {!erPaSisteSide && <KnappPanel onClick={() => onChange((antallSider - 1) * sideStorrelse, sideStorrelse)}>{antallSider}</KnappPanel>}

                <KnappPanel disabled={erPaSisteSide} onClick={() => onChange(fraIndex + sideStorrelse, sideStorrelse)}>
                    <Chevron orientasjon="høyre">
                        <FormattedMessage id="paginering.neste"/>
                    </Chevron>
                </KnappPanel>
            </div>
        );
    }
}

const mapStateToProps = ({ paginering }) => {
    const antallSider = Math.ceil(paginering.antall / paginering.sideStorrelse);

    return ({
        ...paginering,
        antallSider,
        navarendeSide: paginering.side,
        erPaForsteSide: paginering.side === 1,
        erPaSisteSide: paginering.side === antallSider
    })
};

export default connect(mapStateToProps)(Paginering);
