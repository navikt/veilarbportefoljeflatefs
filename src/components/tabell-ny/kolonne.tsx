import React from 'react';
import KolonneTittel from "./kolonne-tittel";

type KolonneType = 'DatoKolonne' | 'TekstKolonne' | 'UkkeKolonne';


interface KolonneProps<T> {
    tittel: string;
    undetittel: string;
    sorterbar?: boolean;
    kolonnetype: KolonneType;
    data: T;
}


function Kolonne<T> (props: KolonneProps<T>) {
 return (
     <div>
      <KolonneTittel/>
     </div>
 )
}

function KolonneType (kolonnetype: KolonneType) {

}


export default Kolonne;
