import * as React from 'react';
import {getClient} from '../../../lib/sanity';
import groq from 'groq';
import EndringsloggForside from './endringslogg-forside3';
import {useEffect, useState} from 'react';

export const groqEndringsloggPreviewFields = `
  tittel,
  dato,
  innhold,
  lenke,
  stepper,
  _createdAt,
  _id
`;

const query = groq`
*[_type == "endringsloggmelding"] | order(dato desc) {
  ${groqEndringsloggPreviewFields}
}
`;

export type EndringsloggData = {
    tittel: string;
    dato: Date;
    innhold: string;
    lenke?: string;
    stepper?: Array<any>;
    _createdAt: string;
    _id: string;
};

const PreviewWrapper = () => {
    const [post, setPost] = useState<Array<any>>([]);

    useEffect(() => {
        getClient(false)
            .fetch(query)
            .then(blogpost => {
                setPost(blogpost);
            });
    }, []);

    return <EndringsloggForside endringsloggmeldinger={post} />;
};

export default PreviewWrapper;
