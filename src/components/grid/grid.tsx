import React from 'react';
import './grid.less';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    columns: number;
    gap?: string;
}

class Grid extends React.Component<Props> {
    public render() {
        const columns = new Array(this.props.columns)
            .fill('1fr')
            .join(this.props.gap ? ` ${this.props.gap} ` : ' ');

        const rows = new Array(Math.ceil(React.Children.count(this.props.children) / this.props.columns))
            .fill('auto')
            .join(this.props.gap ? ` ${this.props.gap} ` : ' ');

        const style = {
            gridTemplateColumns: columns,
            gridTemplateRows: rows,
            msGridColumns: columns,
            msGridRows: rows
        };

        const placedChildren = React.Children.map(this.props.children, (child: any, index: number) => {
            const rawRow = Math.floor(index / this.props.columns) + 1;
            const rawColumn = (index % this.props.columns) + 1;

            const row = rawRow + (rawRow - 1);
            const column = rawColumn + (rawColumn - 2);

            const childStyle = { gridColumn: column, msGridColumn: column, gridRow: row, msGridRow: row };

            return React.cloneElement(child, { style: Object.assign({}, child.props.style, childStyle) });
        });

        return (
            <div className={`grid ${this.props.className ? this.props.className : ''}`} style={style}>
                {placedChildren}
            </div>
        );
    }
}

export default Grid;
