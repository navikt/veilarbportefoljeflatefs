import * as React from 'react';
import EndringsloggPreview from './endringslogg-preview2';
import {EndringsloggData} from './endringslogg-groq1';

interface EndringsloggForsideProps {
    endringsloggmeldinger: EndringsloggData[];
}

function EndringsloggForside(props: EndringsloggForsideProps) {
    return (
        <>
            {props.endringsloggmeldinger.map(post => {
                return (
                    <li key={post._id}>
                        <EndringsloggPreview post={post} />
                    </li>
                );
            })}
        </>
    );
}

export default EndringsloggForside;
