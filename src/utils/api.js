export async function getLatestNewsList() {
    try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json');
        if (!response.ok) {
            throw new Error('Ошибка при получении списка новостей');
        }
        const newsIds = await response.json();
        const news = await Promise.all(newsIds.slice(0, 100).map(async (newsId) => {
            return getNewsItem(newsId)
        }));
        return news;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getNewsItem(newsId) {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`);
        if (!response.ok) {
            throw new Error('Ошибка при получении новости');
        }
        const newsItem = await response.json();
        return newsItem;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getAllCommentsRecursive(commentIds, newsId) {
    const commentsMap = {};

    async function getComment(commentId) {

        if (!commentsMap[commentId]) {
            const commentResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`);
            if (!commentResponse.ok) {
                throw new Error('Ошибка при получении комментария');
            }
            const commentData = await commentResponse.json();

            const comment = {
                id: commentData?.id,
                by: commentData.by,
                text: commentData.text,
                parent: commentData.parent,
                kids: commentData.kids || [],
                time: commentData.time
            };

            commentsMap[commentId] = comment;
        }

        return commentsMap[commentId];
    }

    async function getComments(commentIds) {
        for (const commentId of commentIds) {
            await getComment(commentId);

            const comment = commentsMap[commentId];
            if (comment.kids.length > 0) {
                await getComments(comment.kids);
            }
        }
    }

    await getComments(commentIds);

    const comments = Object.values(commentsMap)
        .filter(comment => comment.text !== undefined)
        .sort((a, b) => a.time - b.time);

    // const result = createNestedComments(comments, newsId);
    // console.log(result)
    return comments;
}

function createNestedComments(comments, rootCommentId) {
    function findChildren(commentId) {
        const comment = commentsMap[commentId];

        if (comment.kids && comment.kids.length > 0) {
            comment.children = comment.kids.map(childId => findChildren(childId));
        } else {
            comment.children = [];
        }

        return comment;
    }

    const commentsMap = {};
    comments.forEach(comment => {
        commentsMap[comment.id] = {...comment};
    });

    const rootComment = commentsMap[rootCommentId];

    rootComment.children = rootComment.kids.map(childId => findChildren(childId));

    return rootComment;
}