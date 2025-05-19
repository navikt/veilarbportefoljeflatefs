import {ReactNode} from 'react';
import classNames from 'classnames';
import {Button} from '@navikt/ds-react';
import {ArrowDownIcon, ArrowUpIcon} from '@navikt/aksel-icons';
import {Header, HeaderProps} from './header';
import {OrNothing} from '../../utils/types/types';
import './tabell.css';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../../typer/kolonnesortering';

interface SorteringHeaderProps extends HeaderProps {
    sortering: OrNothing<Sorteringsfelt>;
    onClick: (sortering: string) => void;
    rekkefolge: OrNothing<Sorteringsrekkefolge>;
    erValgt: boolean;
    tekst: ReactNode;
    title?: string;
    headerTestId?: string;
}

export function SorteringHeader({
    sortering,
    onClick,
    rekkefolge,
    erValgt,
    tekst,
    skalVises,
    className = '',
    title,
    headerTestId
}: SorteringHeaderProps) {
    const sorteringsrekkefolge =
        erValgt && rekkefolge !== Sorteringsrekkefolge.ikke_satt ? rekkefolge : 'ingen sortering';

    const sorteringspil = () => {
        const className = 'sorteringheader__pil';
        if (sorteringsrekkefolge === Sorteringsrekkefolge.stigende) {
            return <ArrowUpIcon title="Sortert stigende" className={className} aria-hidden />;
        } else if (sorteringsrekkefolge === Sorteringsrekkefolge.synkende) {
            return <ArrowDownIcon title="Sortert synkende" className={className} aria-hidden />;
        } else {
            return null;
        }
    };

    const ariaLabel = () => {
        return typeof tekst !== 'string' ? title : tekst;
    };

    return (
        <Header skalVises={skalVises} className={className} headerTestId={headerTestId}>
            <span>
                <Button
                    size="small"
                    variant="tertiary"
                    onClick={() => onClick(sortering ?? Sorteringsrekkefolge.ikke_satt)}
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
