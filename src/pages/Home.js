import React from 'react';
import Card from '../components/Card';
import Breadcrumbs from '../components/breadcrumbs';
import { Bar } from 'react-chartjs-2'
import IranMap, { convertToObj } from '../components/IRANMap'
import './Home.css'
import { observer, inject } from 'mobx-react';


/*const data = [
    {
        "_id": 2019,
        "articlesNumber": 165,
        "commentsNumber": 159,
        "usersNumber": 124
    },
    {
        "_id": 2018,
        "articlesNumber": 274,
        "commentsNumber": 237,
        "usersNumber": 236
    },
    {
        "_id": 2017,
        "articlesNumber": 256,
        "commentsNumber": 240,
        "usersNumber": 199
    },
    {
        "_id": 2016,
        "articlesNumber": 262,
        "commentsNumber": 249,
        "usersNumber": 244
    },
    {
        "_id": 2015,
        "articlesNumber": 43,
        "commentsNumber": 115,
        "usersNumber": 197
    }
]
*/
const OverviewCard = ({ color, title, value }) => {

    return <Card style={{ backgroundColor: color, width: '100%', marginLeft: 16 }}>
        <div className="header">
            <span className="title">
                {title}
            </span>
            <i className="fa fa-chart-bar" />
        </div>

        <h3>{value}</h3>

    </Card>;
}

const mapOfObject = (obj, name, cb) => {
    return obj && obj[name] ? obj[name].map(cb) : [];
}

@inject('home') @observer
class Home extends React.Component {

    componentWillMount() {
        this.props.home.getHome();
    }


    state = {
        selectedState: null,

    }

    render() {

        const home = this.props.home;

        const chart = home.chart || [];

        const labels = chart.map(item => item._id);

        const datasets = chart.map(item => item.articlesNumber)
        const comments = chart.map(item => item.commentsNumber);
        const users = chart.map(item => item.usersNumber)
        const selectedState = this.state.selectedState || {};

        const articlesNumber = home.articlesNumber;
        const commentsNumber = home.commentsNumber;
        const usersNumber = home.usersNumber;

        const all_cities = home.groupBycity || [];
        const cities = all_cities.slice(0, 7);

        console.log('numbers', articlesNumber)
        console.log('comments Number', commentsNumber)
        console.log('users Number', usersNumber)
        return <React.Fragment>
            <Breadcrumbs directions={[
                { label: 'Home', link: '/home' },
                { label: 'Insert', link: '/insert' }
            ]} />
            <div className="home-head">
                <OverviewCard color="#0074a1" title={'تعداد مقالات'} value={articlesNumber}></OverviewCard>
                <OverviewCard color="#ff7300" title={'تعداد کامنت ها'} value={commentsNumber}></OverviewCard>
                <OverviewCard color="#7e0000" title={'تعداد کاربران'} value={usersNumber}></OverviewCard>
                <OverviewCard color="#005225" title={'تعداد بازدید های مقالات'} value={6500}></OverviewCard>
            </div>
            <div className="grid" style={{ marginTop: 16 }}>
                <Card style={{ width: '45%', padding: 16 }}>
                    <h4>تعداد مقالات</h4>
                    <Bar
                        options={{
                            maintainAspectRatio: false
                        }}
                        data={{
                            labels: labels,
                            datasets: [{
                                label: 'تعداد مقالات',
                                data: datasets,
                                backgroundColor: '#0074a1'
                            },
                            {
                                label: 'تعداد کامنت ها',
                                data: comments,
                                backgroundColor: 'orange'
                            },
                            {
                                label: 'تعداد کاربران',
                                data: users,
                                backgroundColor: 'red'
                            }]
                        }} />
                </Card>

                <div className="card" style={{ marginLeft: 8, width: '50%' }}>
                    <h4>تراکم کاربران</h4>
                    <div style={{ display: 'flex', direction: 'rtl' }}>
                        <div className="details">
                            <div className="row">
                                <h4>نام استان</h4>
                                <span>{selectedState.name}</span>
                            </div>
                            <div className="row">
                                <h4>تعداد کامنت ها</h4>
                                <span>{selectedState.commentsNumber}</span>
                            </div>
                            <div className="row">
                                <h4>تعداد کاربران</h4>
                                <span>{selectedState.usersNumber}</span>
                            </div>
                        </div>
                        <IranMap style={{ width: 450 }} onChange={(state, id) => {
                            const users = (all_cities.find(item => item._id === id) || {}).number;
                            const commentsNumber = (all_cities.find(item => item._id === id) || {}).commentsNumber;
                            this.setState({ selectedState: { ...state, usersNumber: users, commentsNumber } });
                        }}></IranMap>

                    </div>
                    <h4>تعداد کاربران</h4>
                    <div className="cities">

                        {cities.map(item => <div key={item._id} className="city">
                            <h4 >{(convertToObj(item._id) || {}).name}</h4>

                            <p>
                                {item.number}
                            </p>
                            {item.commentsNumber}
                        </div>)}
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}


export default Home;