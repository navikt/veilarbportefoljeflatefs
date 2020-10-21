import { Normaltekst } from "nav-frontend-typografi";
import React from "react";

export function MineFilterFnrFeil() {
  return (
    <div className="mine-filter-meny-modal__wrapper fnr-feil">
      <Normaltekst>
        Fødselsnummer og navn kan ikke brukes i mine filter.
      </Normaltekst>
      <Normaltekst>
        Du må fjerne fødselsnummer og navn for å lagre filteret.
      </Normaltekst>
    </div>
  );
}
