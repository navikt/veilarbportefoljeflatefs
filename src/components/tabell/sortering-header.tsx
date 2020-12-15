import * as React from 'react';
import classNames from 'classnames';
import {Sorteringsfelt, Sorteringsrekkefolge} from '../../model-interfaces';
import Header, {HeaderProps} from './header';
import {ReactComponent as PilStigende} from './arrow-up.svg';
import {ReactComponent as PilSynkende} from './arrow-down.svg';
import './tabell.less';
import {OrNothing} from '../../utils/types/types';

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
    skalVises = true,
    className = '',
    title,
    headerId
}: SorteringHeaderProps) {
    const sorteringsrekkefolge =
        erValgt && rekkefolge !== Sorteringsrekkefolge.ikke_satt ? rekkefolge : 'ingen sortering';

    const sorteringspil = () => {
        const className = 'sorteringheader__pil';
        if (sorteringsrekkefolge === Sorteringsrekkefolge.stigende) {
            return <PilStigende className={className} />;
        } else if (sorteringsrekkefolge === Sorteringsrekkefolge.synkende) {
            return <PilSynkende className={className} />;
        } else {
            return null;
        }
    };

    const ariaLabel = () => {
        return typeof tekst !== 'string' ? title : tekst;
    };

    return (
        <Header skalVises={skalVises} className={className} headerId={headerId}>
            <div className="sorteringheader__lenke">
                <button
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
                </button>
                {sortering === 'etternavn' ? ', Fornavn' : null}
            </div>
            {sorteringspil()}
        </Header>
    );
}

export default SorteringHeader;
