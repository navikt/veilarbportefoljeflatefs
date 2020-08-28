import React, {useEffect, useRef, useState} from 'react';
import throttle from 'lodash.throttle';
import classNames from 'classnames';
import './til-toppen-knapp.less'
import {ReactComponent as TilToppenIkonBla} from '../ikoner/til-toppen-bla.svg';
import {logEvent} from "../../utils/frontend-logger";
import {finnSideNavn} from "../../middleware/metrics-middleware";

export const TilToppenKnapp = () => {
    const [scrollPosition, setScrollPosition] = useState<number | undefined>();
    const knappRef = useRef<HTMLButtonElement>(null);

    const onScroll = throttle(() => {
        setScrollPosition(window.scrollY);
    }, 1000);

    const onClick = (e) => {
        if (knappSkalVises) {
            window.scrollTo({top: 0});
        }
        if (knappRef && knappRef.current) {
            knappRef.current.blur();
        }
        logEvent('portefolje.metrikker.tiltoppenknapp', {sideNavn: finnSideNavn()})
    };

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [onScroll]);

    const knappSkalVises = scrollPosition && scrollPosition > window.innerHeight;

    return (
        <button
            ref={knappRef}
            className={classNames('til-toppen-knapp', 'knapp', !knappSkalVises && 'til-toppen-knapp--skjul')}
            aria-hidden={!knappSkalVises}
            onClick={onClick}
        >
            <TilToppenIkonBla/>
        </button>
    );
};
