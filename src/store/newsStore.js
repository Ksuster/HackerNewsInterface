import {makeAutoObservable} from 'mobx';

export default class NewsStore {
    constructor() {
        this._news = [];
        makeAutoObservable(this);
    }

    setNewsList(news) {
        this._news = news;
    }

    get newsList() {
        return this._news;
    }

}
