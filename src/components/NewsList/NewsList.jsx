import React from 'react';
import {useNavigate} from "react-router-dom";
import formatDate from "../../utils/helpers";
import "./NewsList.css"

const NewsList = ({newsList}) => {

    const navigate = useNavigate();

    return (
        <div className="news-list-container">
            {newsList && newsList.map((newsItem) => (
                <div key={newsItem.id} className="news-list-container-item"
                     onClick={() => navigate(`/${newsItem.id}`)}
                >
                    <div className="news-list-item"></div>
                    <div className="news-list-item-title">📰 {newsItem.title}</div>
                    <div className="news-list-item-subtitle">
                        <div className="news-list-item-score">
                            Score: {newsItem.score}
                        </div>
                        <div className="news-list-item-author">
                            Author: {newsItem.by}
                        </div>
                        <div className="news-list-item-date">
                            {formatDate(new Date(newsItem.time))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsList;