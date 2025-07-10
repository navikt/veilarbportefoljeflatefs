import {ReactNode} from 'react';
import {Button} from '@navikt/ds-react';
import {ArrowDownIcon, ArrowsUpDownIcon, ArrowUpIcon} from '@navikt/aksel-icons';
import {OrNothing} from '../../utils/types/types';
import './tabell.css';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../../typer/kolonnesortering';

interface SorteringHeaderIkonProps {
    sortering?: OrNothing<Sorteringsfelt>;
    onClick: (sortering: string) => void;
    rekkefolge?: OrNothing<Sorteringsrekkefolge>;
    erValgt?: boolean;
    ikon: ReactNode;
    title: string;
    headerId: string;
    skalVises?: boolean;
    className?: string;
}

export function SorteringHeaderIkon({
    sortering,
    onClick,
    rekkefolge,
    erValgt,
    skalVises,
    ikon,
    className = '',
    title,
    headerId
}: SorteringHeaderIkonProps) {
    const sorteringsrekkefolge =
        erValgt && rekkefolge !== Sorteringsrekkefolge.ikke_satt ? rekkefolge : 'ingen sortering';

    const sorteringspil = () => {
        const className = 'sorteringspil';
        if (sorteringsrekkefolge === Sorteringsrekkefolge.stigende) {
            return <ArrowUpIcon title="Sortert stigende" className={className} aria-hidden />;
        } else if (sorteringsrekkefolge === Sorteringsrekkefolge.synkende) {
            return <ArrowDownIcon title="Sortert synkende" className={className} aria-hidden />;
        } else {
            return <ArrowsUpDownIcon title="Sorter" className={className} aria-hidden />;
        }
    };

    return (
        <Button
            size="small"
            variant="tertiary"
            icon={
                <>
                    {ikon}
                    {sorteringspil()}
                </>
            }
            onClick={() => onClick(sortering ?? Sorteringsrekkefolge.ikke_satt)}
            className={className}
            data-testid={`sorteringheader_${headerId}`}
            title={title}
            aria-label={
                erValgt && rekkefolge && rekkefolge !== Sorteringsrekkefolge.ikke_satt
                    ? headerId + ', ' + rekkefolge + ' rekkefølge'
                    : headerId + ', ingen sortering'
            }
            aria-live="polite"
        ></Button>
    );
}
