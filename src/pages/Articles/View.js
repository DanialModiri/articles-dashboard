import React from 'react';
import './View.css'
import { inject, observer } from 'mobx-react';
import classnames from 'classnames'
import Loading from '../../components/Loading';
import DropdownButton, { DropdownOption, DropdownOptionTitle, DropdownOptionIcon } from '../../components/DropdownButton';

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
    { width: 250, label: 'عنوان', value: 'title', format: formatBody },
    { width: 75, label: 'تعداد بازدید', value: 'views' },
    { width: 250, label: 'مطالب', value: 'body', format: formatBody },
    { width: 250, label: 'تاریخ', value: 'date', format: formatDate },

]

const Pagination = ({ onChange, currentPage }) => {

    return <div className="table-pagination">
        <div className="left">
            <select defaultValue={10} onChange={(e) => {
                onChange({ perPage: e.target.value });
            }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
            </select>
            <span>
                در هر صفحه
            </span>
        </div>
        <div className="right">
            <span style={{ fontSize: 18 }}>{currentPage}</span>
            <i onClick={() => { onChange({ page: currentPage - 1 > 0 ? currentPage - 1 : 1 }) }} class="angle fas fa-angle-left"></i>
            <i onClick={() => { onChange({ page: currentPage + 1 }) }} class="angle fas fa-angle-right"></i>

        </div>
    </div>
}


const TableHead = ({ columnOrder, onSortChange, sortColumn, sortDirection }) => {
    return <thead>
        <tr>
            {columnOrder.map(item => <td key={item.value} style={{ width: item.width }} onClick={() => {
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
            <td style={{ width: 50 }}>
                عملیات
            </td>
        </tr>
    </thead>
}


const ArticlesFilter = () => {

    return <div className="card">

    </div>
}

const SearchCard = ({ onChange }) => {
    return (
        <div className="card" onChange={(e) => onChange(e.target.value)} style={{ marginBottom: 8, display: 'flex', direction: 'rtl' }}>
            <div className="search">
                <input placeholder="جستوجو" />
                <i className="fas fa-search"></i>
            </div>
        </div>
    )
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
        this.setState({ sort: sort }, () => {
            this.props.articles.getArticles({ sort: sort.column, sortDirection: sort.direction })
        });
    }

    render() {

        const articlesStore = this.props.articles;
        const articles = articlesStore.articles;
        const loading = articlesStore.loading;
        const columnOrder = this.state.columnOrder;

        const page = (articlesStore.query || {}).page || 1;

        return <React.Fragment>
            <SearchCard onChange={(value) => {
                const query = {};
                if (value.length === 0)
                    query.search = undefined;
                else
                    query.search = value;
                articlesStore.getArticles(query);
            }} />
            <div className="card">
                <table className="articles-table">
                    <TableHead onSortChange={this.sort}
                        columnOrder={this.state.columnOrder}
                        sortColumn={this.state.sort.column}
                        sortDirection={this.state.sort.direction} />
                    <tbody>
                        {loading ? <Loading /> :
                            <React.Fragment>
                                {
                                    articles.map(item => <tr key={item._id}>
                                        {columnOrder.map((column, index) => <td key={column.value}>
                                            {column.format ? column.format(item[column.value]) : item[column.value]}
                                        </td>)}
                                        <td>
                                            <DropdownButton>
                                                <DropdownOption onClick={() => alert('Hello')}>
                                                    <DropdownOptionIcon icon="fa fa-trash" />
                                                    <DropdownOptionTitle>
                                                        حذف
                                                    </DropdownOptionTitle>
                                                </DropdownOption>
                                                <DropdownOption onClick={() => alert('Hello')}>
                                                    <DropdownOptionIcon icon="fa fa-edit" />
                                                    <DropdownOptionTitle>
                                                        ویرایش
                                                    </DropdownOptionTitle>
                                                </DropdownOption>
                                                <DropdownOption onClick={() => alert('Hello')}>
                                                <DropdownOptionIcon icon="fas fa-eye" />
                                                    <DropdownOptionTitle>
                                                        مشاهده
                                                    </DropdownOptionTitle>
                                                </DropdownOption>
                                            </DropdownButton>
                                        </td>
                                    </tr>)
                                }
                            </React.Fragment>}
                    </tbody>

                </table>
                <Pagination
                    currentPage={page}
                    onChange={(values) => {
                        console.log(values)
                        articlesStore.getArticles(values);
                    }} />
            </div>
        </React.Fragment>
    }
}

export default ArticlesView;