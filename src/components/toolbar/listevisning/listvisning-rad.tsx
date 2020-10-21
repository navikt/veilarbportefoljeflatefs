import { Kolonne } from "../../../ducks/ui/listevisning";
import { alternativerConfig } from "./listevisning-utils";
import { ChangeEvent } from "react";
import * as React from "react";
import { Checkbox } from "nav-frontend-skjema";

interface ListevisningRadProps {
  kolonneoverskrift: Kolonne;
  disabled: boolean;
  valgt: boolean;
  onChange: (name: Kolonne, checked: boolean) => void;
}

function ListevisningRad(props: ListevisningRadProps) {
  const alternativ = alternativerConfig.get(props.kolonneoverskrift);
  const kolonneoverskrift = props.kolonneoverskrift.toString();

  if (alternativ == null) {
    return null;
  }

  return (
    <li>
      <Checkbox
        label={alternativ.tekstlabel}
        value={kolonneoverskrift}
        checked={props.valgt}
        disabled={props.disabled || alternativ.checkboxDisabled}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          props.onChange(props.kolonneoverskrift, e.target.checked)
        }
        data-testid={`velg-kolonne-rad_${kolonneoverskrift}`}
      />
    </li>
  );
}

export default ListevisningRad;
