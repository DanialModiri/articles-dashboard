import { observable, action } from "mobx";
import getData from "../fetchData";
import Axios from "axios";
import comon from "./comon";


class Articles {

    @observable articles = [];
    @observable page = 1;
    @observable query = {

    }

    @action async getArticles() {
        try {
            const res = await Axios.get("/articles", { params: { ...this.query, page: this.page, perPage: this.perPage }, });
            this.articles = res.data.articles;
        } catch (err) {
            if (err && err.response)
                comon.setError(err.response.data);
            else
                comon.setError(err.message);
        }

    }
}

export default new Articles();