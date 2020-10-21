import React from "react";

export interface HandleDragEnterProps {
  setdDragIsInsideElement: React.Dispatch<React.SetStateAction<boolean>>;
  eventIsInsideContainer: (e: React.MouseEvent) => boolean;
}

export interface HandleDragStartProps {
  setSrcIndex: React.Dispatch<React.SetStateAction<number>>;
  setDropIndex: React.Dispatch<React.SetStateAction<number>>;
  eventIsInsideContainer: (e: React.MouseEvent) => boolean;
}

export interface HandleDragEndProps {
  srcIndex: number;
  destIndex: number;
  dragIsInsideElement: boolean;
  requestNewOrder: (from: number, to: number) => void;
  setSrcIndex: React.Dispatch<React.SetStateAction<number>>;
  setDestIndex: React.Dispatch<React.SetStateAction<number>>;
  eventIsInsideContainer: (e: React.MouseEvent) => boolean;
}

export interface HandleDragOverProps {
  setDestIndex: React.Dispatch<React.SetStateAction<number>>;
  eventIsInsideContainer: (e: React.MouseEvent) => boolean;
}

export function handleDragEnter({
  eventIsInsideContainer,
  setdDragIsInsideElement
}: HandleDragEnterProps) {
  return (e: React.MouseEvent) => {
    if (eventIsInsideContainer(e)) {
      setdDragIsInsideElement(true);
    } else {
      setdDragIsInsideElement(false);
    }
  };
}

export function handleDragStart({
  eventIsInsideContainer,
  setSrcIndex,
  setDropIndex
}: HandleDragStartProps) {
  return e => {
    if (eventIsInsideContainer(e)) {
      if (typeof e.target.value === "number") setSrcIndex(e.target.value);
      setDropIndex(-1);
    }
  };
}

export function handleDragEnd({
  srcIndex,
  destIndex,
  dragIsInsideElement,
  requestNewOrder,
  setSrcIndex,
  setDestIndex
}: HandleDragEndProps) {
  return () => {
    if (dragIsInsideElement) {
      requestNewOrder(srcIndex, destIndex);
    }
    setSrcIndex(-1);
    setDestIndex(-1);
  };
}

export function handleDragOver({
  eventIsInsideContainer,
  setDestIndex
}: HandleDragOverProps) {
  return e => {
    e.preventDefault();
    e.stopPropagation();
    if (eventIsInsideContainer(e)) {
      if (typeof e.target.value === "number") {
        setDestIndex(e.target.value);
      }
    } else {
      setDestIndex(-1);
    }
  };
}
