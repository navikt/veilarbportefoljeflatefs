import {Link} from '@navikt/ds-react';
import {ExternalLinkIcon} from '@navikt/aksel-icons';

interface EndringsloggLinkProps {
    linkText: string;
    link: string;
    onClick: () => void;
}

export const EndringsloggLink = ({linkText, link, onClick}: EndringsloggLinkProps) => {
    return (
        <Link target="_blank" href={link} onClick={onClick}>
            {linkText || link}
            <ExternalLinkIcon title="Ekstern lenke" fontSize="1.2em" />
        </Link>
    );
};
