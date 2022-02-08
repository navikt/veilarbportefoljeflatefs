import * as React from 'react';
import classNames from 'classnames';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../../model-interfaces';
import Header, {HeaderProps} from './header';
import './tabell.less';
import {OrNothing} from '../../utils/types/types';
import {Down, Up} from '@navikt/ds-icons';
import {Button} from '@navikt/ds-react';

interface SorteringHeaderProps extends HeaderProps {
    sortering: OrNothing<Sorteringsfelt>;
    onClick: (sortering: string) => void;
    rekkefolge: OrNothing<Sorteringsrekkefolge>;
    erValgt: boolean;
    tekst: React.ReactNode;
    title?: string;
    headerId: string;
}

function SorteringHeader({
    sortering,
    onClick,
    rekkefolge,
    erValgt,
    tekst,
    skalVises,
    className = '',
    title,
    headerId
}: SorteringHeaderProps) {
    const sorteringsrekkefolge =
        erValgt && rekkefolge !== Sorteringsrekkefolge.ikke_satt ? rekkefolge : 'ingen sortering';

    const sorteringspil = () => {
        const className = 'sorteringheader__pil';
        if (sorteringsrekkefolge === Sorteringsrekkefolge.stigende) {
            return <Up className={className} />;
        } else if (sorteringsrekkefolge === Sorteringsrekkefolge.synkende) {
            return <Down className={className} />;
        } else {
            return null;
        }
    };

    const ariaLabel = () => {
        return typeof tekst !== 'string' ? title : tekst;
    };

    return (
        <Header skalVises={skalVises} className={className} headerId={headerId}>
            <span className="sorteringheader__lenke">
                <Button
                    variant="tertiary"
                    onClick={() => onClick(sortering || Sorteringsrekkefolge.ikke_satt)}
                    className={classNames(
                        'lenke lenke--frittstaende text--left',
                        {valgt: erValgt},
                        {'valgt-sortering': erValgt}
                    )}
                    aria-pressed={erValgt}
                    aria-label={
                        erValgt && rekkefolge && rekkefolge !== Sorteringsrekkefolge.ikke_satt
                            ? ariaLabel() + ', ' + rekkefolge + ' rekkefølge'
                            : ariaLabel() + ', ingen sortering'
                    }
                    title={title}
                >
                    {tekst}
                </Button>
                {sortering === 'etternavn' ? ', Fornavn' : null}
            </span>
            {sorteringspil()}
        </Header>
    );
}

export default SorteringHeader;
