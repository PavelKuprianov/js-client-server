(() => {

  document.addEventListener('DOMContentLoaded', async () => {

    // Получение данных о номере страницы
    const pageParam = new URLSearchParams(window.location.search);

    

    let page;
    if (!pageParam.get('page')) {
      page = 1
    } else {
      page = Number(pageParam.get('page'));
    }
    // Получение данных об ID статьи
    let idIndex = Number(pageParam.get('id'));

    // Получение данных с сервера

    const response = await fetch(`https://gorest.co.in/public-api/posts/${idIndex}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 70d12981b105774285280b31e1a55d69fbd48f843d4e63a76a6acbafcb61f310',
        'Content-Type': 'application/json',
      },
    });

    // Получение статьи
    const postData = await response.json();

    const postTitle = postData.data.title;
    const postText = postData.data.body;


    // Получение комментариев с сервера
    const responseComment = await fetch(`https://gorest.co.in/public-api/comments?post_id=${idIndex}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 70d12981b105774285280b31e1a55d69fbd48f843d4e63a76a6acbafcb61f310',
        'Content-Type': 'application/json',
      },
    });

    // Получение комментариев
    const commentData = await responseComment.json();

    const commentList = commentData.data;


    console.log(commentData);
    console.log(commentList);


    // Отрисовка элементов DOM
    let container = document.getElementById('post-app')

    let backLink = document.createElement('a');
    backLink.classList.add('back-link');
    backLink.textContent = 'К списку статей';
    page === 1 ? backLink.href = `index.html` : backLink.href = `index.html?page=${page}`;

    container.append(backLink);

    let title = document.createElement('h1');
    title.classList.add('post-title');
    title.textContent = String(postTitle);

    let text = document.createElement('p');
    text.classList.add('post-text');
    text.textContent = postText;

    container.append(title);
    container.append(text)

    let commentBlock = document.createElement('div');
    commentBlock.classList.add('comment-block');
    commentBlock.textContent = 'Комментарии';

    commentList.forEach(comment => {
      let commentContent = document.createElement('ul');
      commentContent.classList.add('comment-content');

      let commentName = document.createElement('li');
      commentName.classList.add('comment-name');
      commentName.textContent = comment.name;

      let commentText = document.createElement('li');
      commentText.classList.add('comment-text');
      commentText.textContent = comment.body;

      commentContent.append(commentName);
      commentContent.append(commentText);

      commentBlock.append(commentContent);
    });

    container.append(commentBlock);


  });



})();
