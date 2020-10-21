import * as React from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { VarselModal, VarselModalType } from "./varselmodal/varselmodal";
import "./feilmelding-brukere.less";
import { useState } from "react";

interface FilterFeilModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function FilterFeilModal(props: FilterFeilModalProps) {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  const lukkModal = () => {
    if (props.onClose) {
      props.onClose();
    }
    setIsOpen(false);
  };

  return (
    <VarselModal
      contentLabel={"Feil med filter"}
      isOpen={isOpen}
      type={VarselModalType.FEIL}
      closeButton={false}
      onRequestClose={lukkModal}
      portalClassName="filter-feil-modal"
      className="filter-feil-modal__content"
    >
      <Undertittel tag="h1" className="blokk-xxs">
        Det oppstod en teknisk feil.
      </Undertittel>
      <Normaltekst className="blokk-s">
        Det oppstod et problem med ett eller flere filter.
        <br />
        Prøv igjen senere.
      </Normaltekst>
      <button className="knapp knapp--hoved blokk-s" onClick={lukkModal}>
        Ok
      </button>
    </VarselModal>
  );
}
