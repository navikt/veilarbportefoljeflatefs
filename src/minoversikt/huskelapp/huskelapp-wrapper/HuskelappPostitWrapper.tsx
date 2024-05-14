import React, {ReactNode} from 'react';
import cls from 'classnames';
import './huskelapp-postitstyling.css';

interface Props {
    children?: ReactNode;
    className?: string;
}

export const HuskelappPostitWrapper = ({children, className}: Props) => (
    <div className={cls('huskelapp__postit huskelapp__innhold', className)}>{children}</div>
);
