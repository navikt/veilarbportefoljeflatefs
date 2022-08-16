import { FiltervalgModell } from "../../../model-interfaces";
import * as React from "react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Grid from "../../../components/grid/grid";
import { Tooltip } from "@navikt/ds-react";
import NullstillKnapp from "../../../components/nullstill-valg-knapp/nullstill-knapp";
import { MultiSelect } from "react-multi-select-component";
import { useFoedelandSelector } from "../../../hooks/redux/use-foedeland-selector";
import { FoedelandOptions } from "../../../ducks/foedeland";
import { landgruppe, landgruppeTooltips } from "../../filter-konstanter";


interface FoedelandFilterformProps {
  endreFiltervalg: (form: string, filterVerdi: string[]) => void;
  filtervalg: FiltervalgModell;
  gridColumns?: number;
  emptyCheckboxFilterFormMessage?: string;
}

function FoedelandFilterform({ endreFiltervalg, filtervalg, gridColumns=1}: FoedelandFilterformProps) {
  const [landgrupppeValg, setLandgrupppeValg] = useState<string[]>(filtervalg.landgruppe);
  const [selectedFoedeland, setSelectedFoedeland] = useState<FoedelandOptions[]>([]);
  const [foedelandSelectOptions, setFoedelandSelectOptions] = useState<FoedelandOptions[]>([]);
  const foedelandListData = useFoedelandSelector();

  const harValg = Object.keys(landgruppe).length > 0;

  useEffect(() => {
    setLandgrupppeValg(filtervalg.landgruppe);

    if (foedelandListData != null && foedelandListData.size > 0){
      let selectedValues:FoedelandOptions[] = [];
      filtervalg.foedeland.forEach(x => {
        if (foedelandListData.get(x) != null && foedelandListData.get(x) !== undefined){
          selectedValues.push({label: foedelandListData.get(x)!, value: x, checked: true})
        }
      });
      setSelectedFoedeland(selectedValues);
    }
  }, [filtervalg, foedelandListData]);

  const velgFoedeland = (data) => {
    nullstillLandgruppeValg();
    setSelectedFoedeland(data);

    let selectedValues:string[] = [];
    data.forEach(x => selectedValues.push(x.value));
    endreFiltervalg("foedeland", selectedValues);
  }

  useEffect(() => {
    let result: FoedelandOptions[] = [];

    let selectedFoedeland = filtervalg.foedeland;

    if (foedelandListData != null && foedelandListData.size > 0){
      foedelandListData.forEach((value, key) => {
        if (selectedFoedeland.includes(key)){
          result.push({label: value, value: key, checked: true})
        }else{
          result.push({label: value, value: key, checked: false})
        }
      });
      setFoedelandSelectOptions(result);
    }
  }, [foedelandListData, filtervalg]);

  const velgLandgruppe = e => {
    nullstillFoedelandValg();
    e.persist();
    return e.target.checked
      ? endreFiltervalg("landgruppe", [...landgrupppeValg, e.target.value])
      : endreFiltervalg(
        "landgruppe",
        landgrupppeValg.filter(value => value !== e.target.value)
      );
  };

  const nullstillValg = () => {
    nullstillLandgruppeValg();
    nullstillFoedelandValg();
  };

  const nullstillLandgruppeValg = () => {
    endreFiltervalg("landgruppe", []);
  }

  const nullstillFoedelandValg = () => {
    endreFiltervalg("foedeland", []);
  }

return (
  <>
    <form className="skjema checkbox-filterform" data-testid="checkbox-filterform">
      {harValg && (
        <div className={classNames('checkbox-filterform__valg', 'landgruppe')}>
          <Grid columns={gridColumns}>
            {Object.entries(landgruppe).map(([filterKey, filterValue]) =>
                <Tooltip
                  content={landgruppeTooltips[filterKey]}
                  placement="right"
                  offset={-130}
                  maxChar={999}
                  key={`tooltip-${filterKey}`}
                >
                  <div className="skjemaelement skjemaelement--horisontal" key={filterKey}>
                    <input
                      id={filterKey}
                      type="checkbox"
                      className="skjemaelement__input checkboks"
                      value={filterKey}
                      name={landgruppe[filterKey]}
                      checked={landgrupppeValg.includes(filterKey)}
                      onChange={velgLandgruppe}
                      data-testid={`filter_${filterKey}`}
                    />
                    <label htmlFor={filterKey} className="skjemaelement__label">
                      {filterValue}
                    </label>
                  </div>
                </Tooltip>
            )}
          </Grid>
        </div>
      )}
      <hr/>
      <label className="skjemaelement__label">
        Velg et eller flere land
      </label>
      <MultiSelect
        className="multiSelect"
        options={foedelandSelectOptions}
        value={selectedFoedeland}
        onChange={velgFoedeland}
        labelledBy="Select"
        hasSelectAll={false}
        overrideStrings={
          {
            "allItemsAreSelected": "Alle land er valgt.",
            "clearSearch": "Fjern søk",
            "clearSelected": "Fjern valgt",
            "noOptions": "Ingen resultater ved søk",
            "search": "Søk",
            "selectSomeItems": "Velg land..."
          }
        }
      />
      <NullstillKnapp
        dataTestId="checkbox-filterform"
        nullstillValg={nullstillValg}
        form={"landgruppe"}
        disabled={landgrupppeValg.length <= 0 && selectedFoedeland.length <= 0}
      />
    </form>
  </>
);
}

export default FoedelandFilterform;