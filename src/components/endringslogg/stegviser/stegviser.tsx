import * as React from "react";
import classNames from "classnames";
import "./stegviser.less";

interface StegviserProps {
  antallSteg: number;
  valgtSteg: number;
}

const Stegviser = (props: StegviserProps) => {
  const mapTilSteg = (antall: number, selectedIdx: number) => {
    return new Array(antall).fill(0).map((_, i) => (
      <div
        key={i}
        className={classNames("stegviser__steg", {
          "stegviser__steg--selected": i === selectedIdx,
        })}
      />
    ));
  };

  return (
    <div
      className={"stegviser"}
      data-testid="endringslogg_stegviser"
    >
      {mapTilSteg(props.antallSteg, props.valgtSteg)}
    </div>
  );
};

export default Stegviser;
