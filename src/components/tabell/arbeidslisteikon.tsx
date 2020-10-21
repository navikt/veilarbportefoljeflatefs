import * as React from "react";
import "../../minoversikt/minoversikt.less";
import { ReactComponent as ArbeidslisteikonBla } from "../ikoner/arbeidsliste/arbeidslisteikon_bla.svg";
import { ReactComponent as ArbeidslisteikonLilla } from "../ikoner/arbeidsliste/arbeidslisteikon_lilla.svg";
import { ReactComponent as ArbeidslisteikonGronn } from "../ikoner/arbeidsliste/arbeidslisteikon_gronn.svg";
import { ReactComponent as ArbeidslisteikonGul } from "../ikoner/arbeidsliste/arbeidslisteikon_gul.svg";
import { KategoriModell } from "../../model-interfaces";

interface ArbeidslistekategoriProps {
  skalVises: boolean;
  kategori: KategoriModell;
  dataTestid?: string;
}

export default function ArbeidslistekategoriVisning({
  skalVises,
  kategori,
  dataTestid
}: ArbeidslistekategoriProps) {
  const velgArbeidslistekategori = () => {
    switch (kategori) {
      case KategoriModell.BLA:
        return <ArbeidslisteikonBla data-testid={dataTestid} />;
      case KategoriModell.LILLA:
        return <ArbeidslisteikonLilla data-testid={dataTestid} />;
      case KategoriModell.GRONN:
        return <ArbeidslisteikonGronn data-testid={dataTestid} />;
      case KategoriModell.GUL:
        return <ArbeidslisteikonGul data-testid={dataTestid} />;
      default:
        return null;
    }
  };

  return (
    <span
      className="arbeidsliste--ikon"
      data-testid="brukerliste_span_arbeidslisteikon"
    >
      {skalVises && velgArbeidslistekategori()}
    </span>
  );
}
