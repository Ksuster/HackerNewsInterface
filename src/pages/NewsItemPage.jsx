import React, {useEffect, useState} from 'react';
import Navbar from "../components/NavBar/Navbar";
import NewsItem from "../components/NewsItem/NewsItem";
import {getNewsItem} from "../utils/api";
import {useParams} from "react-router-dom";

const NewsItemPage = () => {

    const {NewsItemId} = useParams();

    const [newsItem, setNewsItem] = useState();
    const fetchNewsItem = async () => {
        const data = await getNewsItem(NewsItemId);
        setNewsItem(data);
    };

    useEffect(() => {
        fetchNewsItem()
    }, [])

    return (
        <>
            <Navbar/>
            <div className="news-item-main-container">
                {newsItem ? <NewsItem newsItem={newsItem}/> : <div></div>}
            </div>
        </>

    );
};

export default NewsItemPage;