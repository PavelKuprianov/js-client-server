(() => {

  document.addEventListener('DOMContentLoaded', async () => {
    // Получение данных о номере страницы
    const pageParam = new URLSearchParams(window.location.search)
    let page;
    if (!pageParam.get('page')) {
      page = 1
    } else {
      page = Number(pageParam.get('page'));
    }
    // Получение данных с сервера

    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 70d12981b105774285280b31e1a55d69fbd48f843d4e63a76a6acbafcb61f310',
        'Content-Type': 'application/json',
      },
    });
    // Получение массива со списком статей
    const blogData = await response.json();

    let postList = blogData.data;

    console.log(postList);

    // Отрисовка ДОМ 

    let container = document.getElementById('blog-app');

    // Список статей
    let paperBlock = document.createElement('div');
    paperBlock.classList.add('blog__paper-block', 'list-group', 'mb-3');

    let paperTitle = document.createElement('h1');
    paperTitle.classList.add('blog__title');
    paperTitle.textContent = 'Список статей';

    paperBlock.append(paperTitle);

    postList.forEach(post => {
      let paperItem = document.createElement('a');
      paperItem.classList.add('list-group-item', 'list-group-item-action', 'blog__link');
      paperItem.textContent = post.title;
      paperItem.href = `post.html?id=${post.id}&page=${page}`;
      paperBlock.append(paperItem);
    });

    container.append(paperBlock);

    // Постраничная навигация

    let navLeftValue;
    let navRightValue = page + 1;
    let navFirstValue;
    let navSecondValue;
    let navThirdValue;
    let navFourthValue;
    let navFifthValue;

    page === 1 ? navLeftValue = 1 : navLeftValue = page - 1;

    //Центровка кнопок

    if (page < 3) {
      navFirstValue = 1;
      navSecondValue = 2;
      navThirdValue = 3;
      navFourthValue = 4;
      navFifthValue = 5;
    } else {
      navFirstValue = page - 2;
      navSecondValue = page - 1;
      navThirdValue = page;
      navFourthValue = page + 1;
      navFifthValue = page + 2;
    }


    let navList = document.createElement('ul');
    navList.classList.add('pagination', 'justify-content-center');

    let navLeft = document.createElement('li');
    navLeft.classList.add('page-item');
    let navLeftLink = document.createElement('a');
    navLeftLink.classList.add('page-link');
    navLeftLink.href = `index.html?page=${navLeftValue}`;
    navLeftLink.textContent = 'Предыдущая';
    navLeft.append(navLeftLink);

    let navRight = document.createElement('li');
    navRight.classList.add('page-item');
    let navRightLink = document.createElement('a');
    navRightLink.classList.add('page-link');
    navRightLink.href = `index.html?page=${navRightValue}`;
    navRightLink.textContent = 'Следующая';
    navRight.append(navRightLink);


    let navFirst = document.createElement('li');
    navFirst.classList.add('page-item');
    let navFirstLink = document.createElement('a');
    navFirstLink.classList.add('page-link');
    navFirstLink.href = `index.html?page=${navFirstValue}`;
    navFirstLink.textContent = navFirstValue;
    navFirst.append(navFirstLink);

    let navSecond = document.createElement('li');
    navSecond.classList.add('page-item');
    let navSecondLink = document.createElement('a');
    navSecondLink.classList.add('page-link');
    navSecondLink.href = `index.html?page=${navSecondValue}`;
    navSecondLink.textContent = navSecondValue;
    navSecond.append(navSecondLink);

    let navThird = document.createElement('li');
    navThird.classList.add('page-item');
    let navThirdLink = document.createElement('a');
    navThirdLink.classList.add('page-link');
    navThirdLink.href = `index.html?page=${navThirdValue}`;
    navThirdLink.textContent = navThirdValue;
    navThird.append(navThirdLink);

    let navFourth = document.createElement('li');
    navFourth.classList.add('page-item');
    let navFourthLink = document.createElement('a');
    navFourthLink.classList.add('page-link');
    navFourthLink.href = `index.html?page=${navFourthValue}`;
    navFourthLink.textContent = navFourthValue;
    navFourth.append(navFourthLink);

    let navFifth = document.createElement('li');
    navFifth.classList.add('page-item');
    let navFifthLink = document.createElement('a');
    navFifthLink.classList.add('page-link');
    navFifthLink.href = `index.html?page=${navFifthValue}`;
    navFifthLink.textContent = navFifthValue;
    navFifth.append(navFifthLink);

    switch (page) {
      case 1:
        navFirstLink.classList.add('page-active');
        navFirstLink.href = `index.html`;

        break;
      case 2:
        navSecondLink.classList.add('page-active');
        navFirstLink.href = `index.html`;
        navLeftLink.href = `index.html`;
        break;
      case 3:
        navThirdLink.classList.add('page-active');
        navFirstLink.href = `index.html`;
        break;
      default:
        navThirdLink.classList.add('page-active');

    }


    navList.append(navLeft);
    navList.append(navFirst);
    navList.append(navSecond);
    navList.append(navThird);
    navList.append(navFourth);
    navList.append(navFifth);
    navList.append(navRight);

    container.append(navList);


  });



})();
