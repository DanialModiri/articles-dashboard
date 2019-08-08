import { observable, action } from "mobx";
import getData from "../fetchData";
import Axios from "axios";
import comon from "./comon";


class Articles {

    @observable articles = [];
    @observable loading = false;
    @observable query = {

    }

    @action async getArticles(query = {}) {
        this.query.page = 1;
        this.query = {...this.query, ...query};
        this.loading = true;
        try {
            const res = await Axios.get("/articles", { params: this.query } );
            this.articles = res.data.articles;
        } catch (err) {
            if (err && err.response)
                comon.setError(err.response.data);
            else
                comon.setError(err.message);
        }
        this.loading = false;
    }
}

export default new Articles();