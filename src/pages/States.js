import React from 'react';
import { inject, observer } from 'mobx-react';
import IRANMap from '../components/IRANMap';
import Card from '../components/Card';
import { Bar } from 'react-chartjs-2'

@inject('states') @observer
class States extends React.Component {

    state = {
        selectedState: null
    }


    onSelectedChange = (value, id) => {
        this.setState({ selectedState: value }, () => {
            this.props.states.getState(id);
        });
    }

    render() {
        const state = this.props.states.state;
        const chart = this.props.states.state_chart || [];

        const labels = chart.map(item => item._id);
        const usersNumber = chart.map(item => item.usersNumber);
        const commentsNumber = chart.map(item => item.commentsNumber);

        const stateCommentsNumber = state.commentsNumber;
        const staetUsersNumber = state.usersNumber;

        const selectedState = this.state.selectedState || {};

        return <div style={{ display: 'flex' }}>
            <Card style={{ width: 680 }}>
                <h4>ایران</h4>
                {!this.state.selectedState && <p>استان مورد نظر را انتخاب کنید</p>}
                {this.state.selectedState && <div style={{ height: 150, overflow: 'hidden' }}>

                    {this.state.selectedState.name}
                    <h4>تعداد کاربران</h4>
                    {staetUsersNumber}
                    <h4>تعداد کامنت ها</h4>
                    {stateCommentsNumber}
                </div>}

                <IRANMap onChange={this.onSelectedChange}></IRANMap>
            </Card>
            {this.state.selectedState &&
                <Card style={{ width: 450, marginLeft: 16, flexGrow: 1 }}>
                    <h4>
                        استان
                    {' '}
                        {this.state.selectedState.name}
                    </h4>

                    <Bar
                        options={{
                            maintainAspectRatio: false
                        }}
                        data={{
                            labels: labels,
                            datasets: [{
                                label: 'تعداد کاربران',
                                backgroundColor: 'red',
                                data: usersNumber,
                            },
                            {
                                label: 'تعداد کامنت ها',
                                backgroundColor: 'orange',
                                data: commentsNumber
                            }]
                        }}
                    ></Bar>
                </Card>}
        </div>
    }
}

export default States;