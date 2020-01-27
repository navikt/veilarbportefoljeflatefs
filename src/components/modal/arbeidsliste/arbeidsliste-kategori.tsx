import * as React from 'react';
import './arbeidsliste-kategori.less';
import { ReactComponent as ArbeidslisteikonBla } from './arbeidslisteikon/arbeidslisteikon_bla.svg';
import { ReactComponent as ArbeidslisteikonRod } from './arbeidslisteikon/arbeidslisteikon_rod.svg';
import { ReactComponent as ArbeidslisteikonGronn } from './arbeidslisteikon/arbeidslisteikon_gronn.svg';
import { ReactComponent as ArbeidslisteikonGul } from './arbeidslisteikon/arbeidslisteikon_gul.svg';
import ArbeidslisteIkon from './arbeidslisteikon/arbeidslisteikon';

interface ArbeidslisteKategoriProps {
    name: string;
}

function ArbeidslisteKategori({name}: ArbeidslisteKategoriProps) {
    return (
        <div className="arbeidslisteikon">
            <ArbeidslisteIkon
                value="bla"
                arbeidslisteikon={<ArbeidslisteikonBla/>}
                name={name}
            />
            <ArbeidslisteIkon
                value="rod"
                arbeidslisteikon={<ArbeidslisteikonRod/>}
                name={name}
            />
            <ArbeidslisteIkon
                value="gronn"
                arbeidslisteikon={<ArbeidslisteikonGronn/>}
                name={name}
            />
            <ArbeidslisteIkon
                value="gul"
                arbeidslisteikon={<ArbeidslisteikonGul/>}
                name={name}
            />
        </div>
    );
}

export default ArbeidslisteKategori;
