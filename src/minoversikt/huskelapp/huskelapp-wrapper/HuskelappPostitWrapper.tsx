import {ReactNode} from 'react';
import classNames from 'classnames';
import './huskelapp-postitstyling.css';

interface Props {
    children?: ReactNode;
    className?: string;
}

export const HuskelappPostitWrapper = ({children, className}: Props) => (
    <div className={classNames('huskelapp__postit huskelapp__innhold', className)}>{children}</div>
);
