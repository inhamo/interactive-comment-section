import data from './data.js';

const commentSection = document.getElementById('comments');
const message = document.getElementById('message');
const sendBtn = document.getElementById('send');
let postTime = 0;

let {comments, currentUser} = data;
localStorage.setItem('comments', JSON.stringify(comments));

//render the comments onto the screen
function initialize(){
    commentSection.innerHTML = '';

    JSON.parse(localStorage.getItem('comments')).forEach(comment => {
        commentSection.innerHTML += renderComments(comment, currentUser);
        const replies = comment.replies;
    
        if(replies.length > 0){
            replies.forEach(comment => {
                commentSection.innerHTML += renderReply(comment, currentUser);
            });
        }
    });
}

function renderComments(comment,currentUser){
    return `<section class = 'main-comment' data-comment = ${comment.id}>
                <section class="comment-wrapper">
                    <div class="comment-header">
                        <img src=${comment?.user.image.png} alt = ""/>
                        <div class="username">${comment?.user.username}</div>
                        ${comment.user.username === currentUser.username ? '<div class="you">you</div>' : ''}
                        <div class="timeframe">${comment?.createdAt}</div>
                    </div>
                    <div class="content">${comment?.content}</div>
                    <section class="comment-footer">
                        <div class="left-footer">
                        <svg data-plus = ${comment.id} class = "plus" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
                        <div class="score">${comment?.score}</div>
                        <svg data-minus = ${comment.id} class = "minus" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
                        </div>
                        <div class="right-footer">
                        ${comment?.user.username !== currentUser?.username ? '<svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg><span class="reply-text">Reply</span>' : ''}
                        ${comment?.user.username === currentUser?.username  ? '<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg><span class="edit-text">Edit</span>' : ''}
                        ${comment?.user.username === currentUser?.username ? `<svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg><span class="delete-text" data-delete = ${comment.id}>Delete</span>` : ''}
                        </div>
                    </section>
                </section>
            </section>`
}

function renderReply(comment, currentUser) {
    return `<section class="reply-comment" data-comment = ${comment.id}>
                <section class="reply-wrapper">
                    <div class="comment-header">
                        <img src=${comment?.user.image.png} alt = ""/>
                        <div class="username">${comment?.user.username}</div>
                        ${comment?.user.username === currentUser?.username ? '<div class="you">you</div>' : ''}
                        <div class="timeframe">${comment?.createdAt}</div>
                    </div>
                    <div class="content"><span class = "reply-to">@${comment?.replyingTo}</span> ${comment?.content}</div>
                    <section class="comment-footer">
                        <div class="left-footer">
                        <svg data-plus = ${comment.id} class = "plus" width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
                        <div class="score">${comment?.score}</div>
                        <svg data-minus = ${comment.id} class = "minus" width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
                        </div>
                        <div class="right-footer">
                        ${comment?.user.username !== currentUser?.username ? '<svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg><span class="reply-text">Reply</span>' : ''}
                        ${comment?.user.username === currentUser?.username  ? '<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg><span class="edit-text">Edit</span>' : ''}
                        ${comment?.user.username === currentUser?.username ? `<svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg><span class="delete-text" data-delete = ${comment.id}>Delete</span>` : ''}
                        </div>
                    </section>
                </section>
            </section>`
}

function createCommentObj(currentUser, commentId) {
    return message.value.trim().length > 0 ?
        {
            id: commentId + 1,
            content: message.value,
            createdAt: "1 sec",
            score: 0,
            user: currentUser,
            replies: []
        }: null;
};

function createReplyObj(currentUser, commentId, messageText, name) {
    return messageText.value.trim().length > 0 ?
        {
            id: commentId + 1,
            content: messageText.value,
            createdAt: "1 sec",
            score: 0,
            replyingTo: name,
            user: currentUser,
            replies: []
        }: null;
};

function renderNewComment() {
    const updatedArray = JSON.parse(localStorage.getItem('comments'))
    updatedArray.push(createCommentObj(currentUser, getMaxId(updatedArray)));
    localStorage.setItem('comments', JSON.stringify(updatedArray));

    initialize();
    
    message.value = '';
};

function getMaxId(comments){
    let maxId = 0;
    comments.forEach(comment => {
        maxId = comment.id > maxId ? comment.id : maxId;
        const replies = comment.replies;
        if(replies.length > 0) {
            replies.forEach(reply => {
                maxId = reply.id > maxId ? reply.id : maxId;
            });
        };
    });

    return maxId;
};

sendBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    renderNewComment();
});

function answeringBox(e){
    if (e.target.classList.contains('reply-text')) {
        const commentWrapper = e.target.closest('.main-comment') || e.target.closest('.reply-comment');
        const commentId = commentWrapper.dataset.comment;

        const replySection = document.createElement('section');
        replySection.classList.add('reply-section');
        replySection.innerHTML = `
            <img src="${currentUser.image.png}" alt=""/>
            <textarea class="message"></textarea>
            <button class="send" data-send="${commentId}">Send</button>
        `;

        commentWrapper.appendChild(replySection);
    };
};

function sendCommentReply(e,id){
    if (id) {
        const messageText = e.target.closest('.reply-section').querySelector('.message');
        let commentsArray = JSON.parse(localStorage.getItem('comments'));

        const updatedArray = [];

        commentsArray.forEach(prevComment => {
            if(prevComment.id == id) {
                prevComment.replies.push(createReplyObj(currentUser, getMaxId(commentsArray), messageText, prevComment.user.username));
                updatedArray.push(prevComment);
            } else {
                updatedArray.push(prevComment);
            }

            updatedArray.sort((a, b) => a.id - b.id);
        });

        localStorage.setItem('comments', JSON.stringify(updatedArray));

        initialize();
        
        //hide the reply section 
        e.target.closest('.reply-section').style.display = 'none';  
    };
};

function editComment(e) {
    if(e.target.classList.contains('edit-text')){
        const commentWrapper = e.target.closest('.main-comment') || e.target.closest('.reply-comment');
        const content = commentWrapper.querySelector('.content');
        content.setAttribute('contenteditable',true);
        content.focus();

        content.onblur = () => content.setAttribute('contenteditable',false);
    };
};

function deleteComment(e){
    if(e.target.classList.contains('delete-text')){
        let commentsArray = JSON.parse(localStorage.getItem('comments'));
        const deleteIndex = e.target.dataset.delete;
        
        const updatedArray = [];

        commentsArray.forEach(comment => {
            if(comment.id != deleteIndex) {
                const updatedReplies = [];

                comment.replies.forEach(reply => {
                    if(reply.id != deleteIndex){
                        updatedReplies.push(reply);        
                    } 
                });

                updatedArray.push({...comment, replies: updatedReplies});
            } 
        });

        localStorage.setItem('comments', JSON.stringify(updatedArray));

        initialize();
    }
}

function addScoreComment(e){
    if(e.target.classList.contains('plus') || e.target.closest('.plus')){
        const addId = e.target.dataset.plus || e.target.closest('.plus').dataset.plus;
        const updatedArray = [];

        JSON.parse(localStorage.getItem('comments')).forEach( comment => {
            const updatedReplies = [];

            if(comment.id == addId) {
                updatedArray.push({...comment, score : comment.score + 1}); 
            } else {
                comment.replies.forEach(reply => {
                    if(reply.id == addId) {
                        updatedReplies.push({...reply, score : reply.score + 1}); 
                    } else {
                        updatedReplies.push(reply);
                    };
                });

                updatedArray.push({...comment, replies: updatedReplies});
            }
        });

        localStorage.setItem('comments', JSON.stringify(updatedArray)); 
        initialize(); 
    };
}

function subtractScoreComment(e){
    if(e.target.classList.contains('minus') || e.target.closest('.minus')){
        const addId = e.target.dataset.plus || e.target.closest('.minus').dataset.plus;
        const updatedArray = [];

        JSON.parse(localStorage.getItem('comments')).forEach( comment => {
            const updatedReplies = [];

            if(comment.id == addId) {
                updatedArray.push({...comment, score : comment.score - 1}); 
            } else {
                comment.replies.forEach(reply => {
                    if(reply.id == addId) {
                        updatedReplies.push({...reply, score : reply.score - 1}); 
                    } else {
                        updatedReplies.push(reply);
                    };
                });

                updatedArray.push({...comment, replies: updatedReplies});
            }
        });

        localStorage.setItem('comments', JSON.stringify(updatedArray)); 
        initialize(); 
    };
}


document.addEventListener('click', (e) => {
    answeringBox(e);
    sendCommentReply(e, e.target.dataset.send);
    editComment(e);
    deleteComment(e);
    addScoreComment(e);
    subtractScoreComment(e)
});

document.onload = initialize();






