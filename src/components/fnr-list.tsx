import './modal-liste.css';

export interface Fnr {
    brukerFnr: string;
}

interface FnrListProps {
    listeMedFnr: Fnr[];
}

export function FnrList({listeMedFnr}: FnrListProps) {
    const listElements = listeMedFnr.map(tilordning => <li key={tilordning.brukerFnr}>{tilordning.brukerFnr}</li>);

    const className = listElements.length >= 18 ? 'modal-liste__lang' : 'modal-liste';

    return <ul className={className}>{listElements}</ul>;
}
