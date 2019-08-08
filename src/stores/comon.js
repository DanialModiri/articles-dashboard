import { observable, action } from "mobx";


class Comon {

    
    @observable collapse_sidenav = false;
    @observable error = null;
    
    @action setError(error){
        this.error = error;
    }

    @action toggleCollapse() {
        this.collapse_sidenav = !this.collapse_sidenav;
    }
}

export default new Comon();