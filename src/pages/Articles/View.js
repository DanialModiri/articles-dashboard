import React from 'react';
import './View.css'
import { inject, observer } from 'mobx-react';
import classnames from 'classnames'

const formatDate = (date) => {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
}

const formatBody = (body) => {
    if (body.length > 30)
        return body.slice(0, 30) + '...';
    return body;
}

const columnOrder = [
    { label: 'عنوان', value: 'title', format: formatBody },
    { label: 'تعداد بازدید', value: 'views' },
    { label: 'مطالب', value: 'body', format: formatBody },
    { label: 'تاریخ', value: 'date', format: formatDate },

]

const Pagination = () => {

    return <div className="table-pagination">
        <div className="left">
            <select>
                <option>5</option>
                <option selected>10</option>
                <option>15</option>
            </select>
            <span>
                در هر صفحه
            </span>
        </div>
    </div>
}


const TableHead = ({ columnOrder, onSortChange, sortColumn, sortDirection }) => {
    return <thead>
        <tr>
            {columnOrder.map(item => <td key={item.value} onClick={() => {
                if (item.value === sortColumn)
                    onSortChange({ column: item.value, direction: sortDirection === 'asc' ? 'desc' : 'asc' });
                else
                    onSortChange({ column: item.value, direction: 'asc' });
            }}>
                <div style={{ display: 'flex' }}>
                    {item.label}
                    <i className={classnames("fas fa-angle-down", 'sort', {
                        'sort-acs': sortColumn === item.value && sortDirection === 'asc',
                        'sort-desc': sortColumn === item.value && sortDirection === 'desc'
                    })}></i>
                </div>
            </td>)}
        </tr>
    </thead>
}


@inject('articles') @observer
class ArticlesView extends React.Component {


    state = {
        columnOrder: columnOrder,
        sort: { column: 'title', direction: 'acs' }
    }

    componentDidMount() {
        this.props.articles.getArticles();
    }

    sort = (sort) => {
        this.setState({ sort: sort });
    }

    render() {

        const articlesStore = this.props.articles;
        const articles = articlesStore.articles;

        const columnOrder = this.state.columnOrder;

        return <div className="card">
            <table className="articles-table">
                <TableHead onSortChange={this.sort}
                    columnOrder={this.state.columnOrder}
                    sortColumn={this.state.sort.column}
                    sortDirection={this.state.sort.direction} />
                <tbody>
                    {articles.map(item => <tr key={item._id}>
                        {columnOrder.map((column, index) => <td key={column.value}>
                            {column.format ? column.format(item[column.value]) : item[column.value]}
                        </td>)}
                    </tr>)}
                </tbody>
                <tfoot>
                    <Pagination></Pagination>
                </tfoot>
            </table>
        </div>
    }
}

export default ArticlesView;