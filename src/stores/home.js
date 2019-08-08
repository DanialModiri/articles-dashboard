import { action, observable } from "mobx";
import getData from "../fetchData";

class home {

    @observable chart = []
    @observable articlesNumber = 0
    @observable commentsNumber = 0
    @observable usersNumber = 0

    @observable groupBycity = []

    getHome = () => {
        getData('/home').then((res) => {
            this.getArticles(res);
            console.log(res)
        });
    }

    @action getArticles(data) {
        data = data || {};
        this.chart = data.articlesAndYear;
        this.articlesNumber = data.articles;
        this.commentsNumber = data.comments;
        this.usersNumber = data.users;
        this.groupBycity = data.groupByCity;
    }
}

export default new home();