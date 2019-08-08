import { observable, action } from "mobx";
import getData from "../fetchData";


class States {

    @observable state_chart = [];

    @observable state = {  }

    @action getState(state) {
        this.state = {}
        getData(`/states/${state}`).then(res => {
            this.state_chart = res;
            console.log(res)
            const usersNumber = res.reduce((a,b) => {
                console.log(a,b)
                return a+ b.usersNumber
            } ,0);
            const commentsNumber = res.reduce((a,b) => a+ b.commentsNumber, 0);
            this.state = {
                commentsNumber,
                usersNumber
            }
        });
    }
}

export default new States();