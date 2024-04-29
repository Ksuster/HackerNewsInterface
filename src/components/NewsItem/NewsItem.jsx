import React, {useEffect, useState} from 'react';
import "./NewsItem.css"
import formatDate from "../../utils/helpers";
import Microlink from "@microlink/react";
import {getAllCommentsRecursive} from "../../utils/api";
import {FallingLines} from "react-loader-spinner";

const Comment = ({comment}) => {
    return (
        <div className="comment-item">
            <div className="comment-header">
                <div className="comment-person">
                    <b>{comment.by}</b>
                </div>
                <span style={{marginLeft: "5px", color: '#575b65', fontSize: "12px"}}>
                    {formatDate(new Date(comment.time))}
                </span>
            </div>
            <div className="comment-text" dangerouslySetInnerHTML={{__html: comment.text}}/>
            {/*{comment.kids && comment.kids.length > 0 && (*/}
            {/*    <div className="comment-replies">*/}
            {/*        {comment.kids.map(childComment => (*/}
            {/*            <Comment key={childComment.id} comment={childComment}/>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};
const NewsItem = ({newsItem}) => {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            if (newsItem.kids && newsItem.kids.length > 0) {
                const allComments = await getAllCommentsRecursive(newsItem.kids, newsItem.id);
                setComments(allComments);
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    return (
        loading ? (
            <div style={{
                minHeight: "100vh",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <FallingLines
                    color="#ff6600"
                    width={100}
                    visible={true}
                    ariaLabel="falling-circles-loading"
                />
            </div>
        ) : (
            <div className="news-item-container">
                <div className="news-item-content">
                    <div className="news-item-title">
                        {newsItem.title}
                    </div>
                    <div className="news-item-subtitle">
                        <div className="news-item-score">
                            <b>Score:</b> {newsItem.score}
                        </div>
                        <div className="news-item-author">
                            <b>Author:</b> {newsItem.by}
                        </div>
                        <div className="news-item-date">
                            <b>{formatDate(new Date(newsItem.time))}</b>
                        </div>
                    </div>
                    <div className="news-item-link">
                        <Microlink
                            url={newsItem.url}
                            media='image' size="large"
                        />
                    </div>
                </div>
                <div className="news-item-comments-container">
                    <div className="news-item-comments-title">
                        <b>Comments:</b> {comments.length}
                    </div>
                    <div className="comments-list">
                        {comments && comments.map(comment => (
                            <Comment key={comment.id} comment={comment}/>
                        ))}
                    </div>
                </div>
            </div>
        ));
};

export default NewsItem;