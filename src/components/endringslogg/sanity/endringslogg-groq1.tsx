import * as React from 'react';
import {GetStaticProps} from 'next';
import {getClient, usePreviewSubscription} from '../../../lib/sanity';
import groq from 'groq';
import EndringsloggForside from './endringslogg-forside3';

export const groqPostPreviewFields = `
title,
date,
link,
slug,
body
_createdAt,
_id,
`;

const query = groq`
*[_type == "post"] | order(_createdAt desc) {
  ${groqPostPreviewFields}
}
`;

export type EndringsloggData = {
    title: string;
    date: Date;
    link?: string;
    slug?: {current?: string};
    body: string;
    _createdAt: string;
    _id: string;
    sett: boolean;
};

export const getStaticProps: GetStaticProps = async ctx => {
    const preview = !!ctx.preview;
    const blogposts = await getClient(preview).fetch(query);
    return {
        props: {data: blogposts, preview},
        revalidate: 60
    };
};

const PreviewWrapper = (props: {data: EndringsloggData[]; preview?: boolean}) => {
    const {data} = usePreviewSubscription(query, {
        initialData: props.data,
        enabled: !!props.preview
    });
    return <EndringsloggForside endringsloggmeldinger={data} />;
};

export default PreviewWrapper;
