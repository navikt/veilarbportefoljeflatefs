import React from 'react';
import './barlabel.less';

export default function BarInputGruppe(props: { children: React.ReactNode }) {
    return (
        <div className="forsteBarlabelIGruppe">
            {props.children}
        </div>
    );
}
