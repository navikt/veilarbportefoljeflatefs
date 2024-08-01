import React from 'react';
import './grid.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    columns: number;
    gap?: string;
}

function Grid({columns, gap, className, children}: Props) {
    const templateColumns = new Array(columns).fill('1fr').join(gap ? ` ${gap} ` : ' ');

    const rows = new Array(Math.ceil(React.Children.count(children) / columns))
        .fill('auto')
        .join(gap ? ` ${gap} ` : ' ');

    const style = {
        gridTemplateColumns: templateColumns,
        gridTemplateRows: rows,
        msGridColumns: templateColumns,
        msGridRows: rows
    };

    const placedChildren = React.Children.map(children, (child: any, index: number) => {
        const rawRow = Math.floor(index / columns) + 1;
        const rawColumn = (index % columns) + 1;

        const childStyle = {
            gridColumn: rawColumn,
            msGridColumn: rawColumn,
            gridRow: rawRow,
            msGridRow: rawColumn
        };

        return React.cloneElement(child, {
            style: Object.assign({}, child.props.style, childStyle)
        });
    });

    return (
        <div className={`grid ${className || ''}`} style={style}>
            {placedChildren}
        </div>
    );
}

export default Grid;
