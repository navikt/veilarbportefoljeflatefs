import * as React from 'react';
import { ReactComponent as FlaggBla } from '../../../minoversikt/flagg-filled_bla.svg';
import { ReactComponent as FlaggRod } from '../../../minoversikt/flagg-filled_rod.svg';
import { ReactComponent as FlaggGronn } from '../../../minoversikt/flagg-filled_gronn.svg';
import { ReactComponent as FlaggGul } from '../../../minoversikt/flagg-filled_gul.svg';
import './arbeidsliste-kategori.less';

function ArbeidslisteKategori() {
    return (
        <div className="arbeidslisteikon_wrapper">
            <button className="arbeidslisteikon__knapp" >
                <FlaggBla className="arbeidslisteikon__bla"/>
            </button>
            <button className="arbeidslisteikon__knapp">
                <FlaggRod className="arbeidslisteikon__rod"/>
            </button>
            <button className="arbeidslisteikon__knapp">
                <FlaggGronn className="arbeidslisteikon__gronn"/>
            </button>
            <button className="arbeidslisteikon__knapp">
                <FlaggGul className="arbeidslisteikon__gul"/>
            </button>
        </div>
    );
}

export default ArbeidslisteKategori;
