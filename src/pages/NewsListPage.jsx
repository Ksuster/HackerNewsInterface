import React, {useContext, useEffect} from 'react';
import "../components/NewsList/NewsList.css"
import Navbar from "../components/NavBar/Navbar";
import {getLatestNewsList} from "../utils/api";
import NewsList from "../components/NewsList/NewsList";
import {FallingLines} from 'react-loader-spinner';
import UpdateButton from "../components/UpdateButton";
import {Context} from "../index"
import {observer} from "mobx-react";


const NewsListPage = observer(() => {

    const {news} = useContext(Context);

    const fetchLatestNews = async () => {
        const latestNews = await getLatestNewsList();
        news.setNewsList(latestNews);
    };

    useEffect(() => {
        if (!news.newsList.length) {
            fetchLatestNews();
        }
    }, [])

    return (
        <>
            <Navbar/>
            <div className="news-list-main-container">
                {news.newsList.length ? (
                    <>
                        <UpdateButton
                            onClick={() => {
                                news.setNewsList([]);
                                fetchLatestNews();
                            }}
                        />
                        <NewsList newsList={news.newsList}/>
                    </>
                ) : (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}>
                        <FallingLines
                            color="#ff6600"
                            width={100}
                            visible={true}
                            ariaLabel="falling-circles-loading"
                        />
                    </div>
                )}
            </div>
        </>

    );
});

export default NewsListPage;