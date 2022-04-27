import * as React from 'react';

export interface Props {
    className?: string,
    height?: string
    width?: string
}

const ExternalLinkIcon: React.FC<Props> = ({
                                               className,
                                               height,
                                               width,
                                           }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        height={height || '1em'}
        width={width || '1em'}
        viewBox="0 0 12 12"
        xmlSpace="preserve"
    >
        <style>
            {'.hyperlink-ikon{fill:none;stroke:#0067c5;stroke-linecap:round}'}
        </style>
        <path
            className="hyperlink-ikon"
            d="M11 8.1v1.3c0 .9-.7 1.6-1.7 1.6H2.7c-1 0-1.7-.7-1.7-1.7V2.7C1 1.7 1.7 1 2.7 1H4M5 7l6-6M7 1h4v4.1"
        />
    </svg>
);

export default ExternalLinkIcon;
