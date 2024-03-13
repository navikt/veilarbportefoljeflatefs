import React from 'react';
import {Link} from '@navikt/ds-react';
import {ExternalLink} from '@navikt/ds-icons';

interface EndringsloggLinkProps {
    linkText: string;
    link: string;
    onClick: () => void;
}

export const EndringsloggLink = ({linkText, link, onClick}: EndringsloggLinkProps) => {
    return (
        <Link target="_blank" href={link} onClick={onClick}>
            {linkText ? linkText : link}
            <ExternalLink />
        </Link>
    );
};
