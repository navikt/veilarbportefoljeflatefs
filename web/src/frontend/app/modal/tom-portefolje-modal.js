import React, { PropTypes as PT } from 'react';
import AriaModal from 'react-aria-modal';
import { FormattedMessage } from 'react-intl';

function TomPortefoljeModal({ skjulModal, visModal }) {
    const modal = (
        <AriaModal
            titleText="modal"
            mounted={visModal}
            onExit={() => {}}
        >
            <div className="side-innhold">
                <div className="modal-bakteppe" />
                <div className="modal-alert modal-vindu">
                    <div className="panel">
                        <h2 className="hode hode-feil hode-dekorert hode-advarsel blokk-s" >
                            <p className="blokk-s text-center"><FormattedMessage id="modal.tittel" /></p>
                            <p className="modaltekst"><FormattedMessage id="modal.infotekst" /></p>
                            <button className="knapp knapp-hoved" onClick={skjulModal}>
                                <FormattedMessage id="modal.knapptekst" />
                            </button>
                        </h2>
                    </div>
                </div>
            </div>
        </AriaModal>
    );
    return (
        <div>
            {modal}
        </div>
    );
}

TomPortefoljeModal.propTypes = {
    skjulModal: PT.func.isRequired,
    visModal: PT.bool.isRequired
};


export default TomPortefoljeModal;
