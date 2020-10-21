import React, { useCallback, useEffect, useState } from "react";
import "./drag-and-drop.less";
import { lagreSorteringForFilter } from "../../../ducks/mine-filter";
import DragAndDropContainer from "./drag-and-drop-container";
import NyMineFilterRad from "../ny_mine-filter-rad";
import { useDispatch } from "react-redux";
import { useOnlyOnUnmount } from "./use-only-onUnmount-hook";
import { LagretFilter } from "../../../ducks/lagretFilter";
import { ListevisningType } from "../../../ducks/ui/listevisning";

export interface DragAndDropProps {
  stateFilterOrder: LagretFilter[];
  filtergruppe: ListevisningType;
  isDraggable: boolean;
  setisDraggable: React.Dispatch<React.SetStateAction<boolean>>;
}

function DragAndDrop({
  stateFilterOrder,
  filtergruppe,
  isDraggable,
  setisDraggable
}: DragAndDropProps) {
  const [dragAndDropOrder, setDragAndDropOrder] = useState([
    ...stateFilterOrder
  ]);
  const [onUnmountRef, setOnUnmount] = useOnlyOnUnmount();
  const dispatch = useDispatch();

  const lagreRekkefolge = useCallback(() => {
    const idAndPriorities = dragAndDropOrder.map((filter, idx) => ({
      sortOrder: idx,
      filterId: filter.filterId
    }));
    if (harEndretRekkefolge(dragAndDropOrder, stateFilterOrder)) {
      dispatch(lagreSorteringForFilter(idAndPriorities));
    }
    setisDraggable(false);
  }, [dragAndDropOrder, stateFilterOrder, setisDraggable, dispatch]);

  const avbryt = () => {
    setOnUnmount(() => null);
    setDragAndDropOrder([...stateFilterOrder]);
    setisDraggable(false);
  };

  const lagre = () => {
    setisDraggable(false);
  };

  useEffect(() => {
    setOnUnmount(lagreRekkefolge);
  }, [lagreRekkefolge, setOnUnmount]);

  useEffect(() => {
    setDragAndDropOrder([...stateFilterOrder]);
  }, [stateFilterOrder]);

  if (isDraggable) {
    return (
      <DragAndDropContainer
        dragAndDropOrder={dragAndDropOrder}
        setDragAndDropOrder={setDragAndDropOrder}
        lagreRekkefolge={lagre}
        avbryt={avbryt}
        onUnmount={onUnmountRef}
      />
    );
  }

  return (
    <>
      {dragAndDropOrder.map((filter, idx) => (
        <NyMineFilterRad
          key={idx}
          mineFilter={filter}
          filtergruppe={filtergruppe}
        />
      ))}
    </>
  );
}

function harEndretRekkefolge(a: LagretFilter[], b: LagretFilter[]) {
  return !(
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val.filterNavn === b[index].filterNavn)
  );
}

export default DragAndDrop;
