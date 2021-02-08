import * as React from 'react';
import {HeaderProps} from './header';
import './tabell.less';
import Dropdown from '../dropdown/dropdown';
import ToggleSwitch from '../../filtrering/filtrering-mine-filter/toggle-switch/toggle-switch';
import {useState} from 'react';
import SorteringHeader from './sortering-header';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../../model-interfaces';
import {OrNothing} from '../../utils/types/types';
import './dropdown-header.less';

interface DropdownHeaderProps extends HeaderProps {
    sortering: OrNothing<Sorteringsfelt>;
    onClick: (sortering: string) => void;
    rekkefolge: OrNothing<Sorteringsrekkefolge>;
    erValgt: boolean;
    headerId: string;
    tekst: React.ReactNode;
}

function DropdownHeader({sortering, onClick, rekkefolge, erValgt, headerId, tekst}: DropdownHeaderProps) {
    const [blaPrikkSkalVises, setblaPrikkSkalVises] = useState(true);

    return (
        <div className="dropdown-header-wrapper">
            <SorteringHeader
                sortering={sortering}
                onClick={onClick}
                rekkefolge={rekkefolge}
                erValgt={erValgt}
                tekst={tekst}
                className="bla-prikk"
                title="Blå prikk"
                headerId={headerId}
            />
            {/*<Dropdown*/}
            {/*    id="test"*/}
            {/*    className="dropdown-header"*/}
            {/*    render={() => (*/}
            {/*        <div className="dropdown-header__innhold">*/}
            {/*            <div className="dropdown-header__toggle">*/}
            {/*                <ToggleSwitch*/}
            {/*                    onChange={() => setblaPrikkSkalVises(!blaPrikkSkalVises)}*/}
            {/*                    ariaLabel={'Skru av/på blå prikk'}*/}
            {/*                    checked={blaPrikkSkalVises}*/}
            {/*                    defaultChecked={true}*/}
            {/*                />*/}
            {/*                <label className="dropdown-header__toggle-label">Skru av/på</label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*/>*/}
        </div>
    );
}

export default DropdownHeader;
