import * as React from "react";
import { PropsWithChildren } from "react";
import { Redirect, useParams } from "react-router";
import { useVeilederListeSelector } from "../hooks/redux/use-veilederliste-selector";
import { useIdentSelector } from "../hooks/redux/use-inlogget-ident";
import classNames from "classnames";
import "./ny__minoversikt.less";

interface MinOversiktWrapperProps {
  className: string;
  id: string;
}

export function NyMinOversiktWrapper(
  props: MinOversiktWrapperProps & PropsWithChildren<{}>
) {
  const { ident } = useParams();
  const innloggetVeileder = useIdentSelector();
  const veiledere = useVeilederListeSelector();
  const visesAnnenVeiledersPortefolje = ident
    ? ident !== innloggetVeileder!.ident
    : false;

  if (ident && veiledere.findIndex(v => v.ident === ident) < 0) {
    return <Redirect to="/enhet" />;
  }

  return (
    <div
      className={classNames(
        props.className,
        visesAnnenVeiledersPortefolje ? "ny__annen-veileder" : ""
      )}
      role="tabpanel"
      aria-labelledby={props.id}
      id={props.id}
    >
      {props.children}
    </div>
  );
}
