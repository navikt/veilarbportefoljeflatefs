import React from 'react';
import './grid.less';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    columns: number;
    gap?: string;
}

function Grid(props: Props) {
/*
 extends React.Component<Props> {
*/
        const columns = new Array(props.columns)
            .fill('1fr')
            .join(props.gap ? ` ${props.gap} ` : ' ');

        const rows = new Array(Math.ceil(React.Children.count(props.children) / props.columns))
            .fill('auto')
            .join(props.gap ? ` ${props.gap} ` : ' ');

        const style = {
            gridTemplateColumns: columns,
            gridTemplateRows: rows,
            msGridColumns: columns,
            msGridRows: rows
        };

        const placedChildren = React.Children.map(props.children, (child: any, index: number) => {
            const rawRow = Math.floor(index / props.columns) + 1;
            const rawColumn = (index % props.columns) + 1;

            const childStyle = { gridColumn: rawColumn, msGridColumn: rawColumn, gridRow: rawRow, msGridRow: rawColumn };

            return React.cloneElement(child, { style: Object.assign({}, child.props.style, childStyle) });
        });

        return (
            <div className={`grid ${props.className ? props.className : ''}`} style={style}>
                {placedChildren}
            </div>
        );
}

export default Grid;
