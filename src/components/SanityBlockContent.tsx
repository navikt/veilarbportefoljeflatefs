import * as React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import {Normaltekst} from 'nav-frontend-typografi';
import {getClient} from '../lib/sanity';

const serializers = {
    types: {
        block: function renderBlock({node, children}) {
            const style = node.style;
            if (style === 'normal') {
                return <Normaltekst>{children}</Normaltekst>;
            }
            return children;
        }
    }
};

export const SanityBlockContent = (props: {blocks}) => {
    return <BlockContent blocks={props.blocks} serializers={serializers} {...getClient(false).config()} />;
};
