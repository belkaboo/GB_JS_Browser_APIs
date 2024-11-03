/*
1. Определение текущего размера окна браузера:
    ○ Напишите функцию, которая будет выводить текущую
ширину и высоту окна браузера при его изменении.
2. Подтверждение закрытия страницы:
    ○ Создайте всплывающее окно или диалоговое окно,
которое появляется при попытке закрыть вкладку
браузера и спрашивает пользователя, уверен ли он в
своем решении закрыть страницу.
3. Управление историей переходов:
    ○ Используйте объект history для управления историей
переходов на веб-странице. Создайте кнопки "Назад" и
"Вперед" для перемещения по истории.
*/

const heightEl = document.getElementById('height')
const widthEl = document.getElementById('width')

function windowSize() {
    heightEl.textContent = `Высота окна - ${window.innerHeight}`;
    widthEl.textContent = `Ширина окна - ${window.innerWidth}`;
}
window.addEventListener('load', () => {
    windowSize();
});

window.addEventListener('resize', () => {
    windowSize();
});



window.addEventListener('beforeunload', () => {
    e.preventDefaul();
    event.returnValue = ''; // ХАХА
});

document.querySelector('.button-back')
    .addEventListener('click', () => {
        window.history.back();
    });

document.querySelector('.button-forward')
    .addEventListener('click', () => {
        window.history.forward();
    });



/*
Вы должны создать веб-страницу, которая позволяет пользователю динамически
управлять элементами на странице. Ниже приведены основные требования и
функциональность:
1. На странице должны быть кнопки "Добавить элемент", "Удалить элемент" и
"Клонировать элемент".
2. При нажатии на кнопку "Добавить элемент" на страницу добавляется новый
квадратный элемент (<div>) с размерами 100x100 пикселей. Этот элемент
должен иметь класс .box и содержать текст, указывающий порядковый номер
элемента (1, 2, 3 и так далее).
3. При нажатии на кнопку "Удалить элемент" удаляется последний добавленный
элемент, если таковой имеется.
4. При нажатии на кнопку "Клонировать элемент" создается копия последнего
добавленного элемента и добавляется на страницу.
5. Все элементы имеют класс .box и стилизованы с помощью CSS (см. пример).
6. Элементы могут быть добавлены, удалены и клонированы в любом порядке и в
любом количестве.
*/

const addBtn = document.querySelector('.add-button');
const delBtn = document.querySelector('.del-button');
const clonBtn = document.querySelector('.clon-button');
const boxDiv = document.querySelector('.box-container');


addBtn.addEventListener('click', function (e) {
    const newBox = document.createElement('div');
    newBox.classList.add('box');
    newBox.textContent = boxDiv.children.length + 1
    boxDiv.appendChild(newBox);

    // counter = boxDiv.children.length + 1;
    // boxDiv.insertAdjacentHTML("beforeend", `
    //     <div class="box">${boxDiv.children.length + 1}</div>
    //     `)
});

delBtn.addEventListener('click', function (e) {
    if (boxDiv.children.length > 0) {
        const lastBox = boxDiv.lastChild;
        boxDiv.removeChild(lastBox);
    }
});

clonBtn.addEventListener('click', function (e) {
    if (boxDiv.children.length > 0) {
        // const cloneBox = document.createElement('div');
        // cloneBox.classList.add('box');
        // cloneBox.textContent = boxDiv.lastChild.textContent;
        // boxDiv.appendChild(cloneBox);

        //из семинара
        const lastBox = boxDiv.lastChild;
        const cloneBox = lastBox.cloneNode(true);
        boxDiv.appendChild(cloneBox)
    }
});


/*
1. Вы создаете веб-страницу для отображения списка статей. Каждая статья состоит из заголовка и
текста. Вам необходимо использовать Bootstrap для стилизации элементов.
2. Используйте Bootstrap, чтобы стилизовать элементы:
a. Заголовок статьи (<h2>)
b. Текст статьи (<p>)
c. Кнопки "Добавить статью", "Удалить" и "Редактировать".
3. Создайте начальный список статей, который будет загружаться при загрузке страницы. Используйте
JSON-данные для определения заголовков и текстов статей.
4. Позвольте пользователю добавлять новые статьи. При нажатии на кнопку "Добавить статью" должна
появиться новая статья с заголовком "Новая статья" и текстом "Введите содержание статьи...".
5. Реализуйте функциональность удаления статей. При нажатии на кнопку "Удалить" соответствующая
статья должна быть удалена из списка.
6. Реализуйте функциональность редактирования статей. При нажатии на кнопку "Редактировать"
пользователь должен иметь возможность изменить заголовок и текст статьи. Используйте
всплывающее окно или prompt для ввода новых данных.
7. Все изменения (добавление, удаление, редактирование) должны быть сохранены в локальное
хранилище браузера, чтобы они сохранялись после перезагрузки страницы.
*/


const articlesData = [
    {
        title: 'Название статьи 1',
        content: 'Текст статьи 1, текст статьи. ТЕКСТ'

    },
    {
        title: 'Название статьи 2',
        content: 'Текст статьи 2, текст статьи. ТЕКСТтексттекст'

    },
    {
        title: 'Название статьи 3',
        content: 'Текст статьи 3, текстстатьи. ТЕКСТ'

    }
];

articlesData.forEach(currentItem => {
    const articleItem = createArticle(currentItem.title, currentItem.content);
    articleList.append(articleItem);

});


function createArticle(title, content) {
    const articelItem = document.createElement('li');
    articelItem.classList.add('list-group-item');

    const articleTitle = document.createElement('h2');
    articleTitle.classList.add('mb-3');
    articleTitle.textContent = title;

    const articleContent = document.createElement('p');
    articleContent.textContent = content;

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-warning');
    editButton.textContent = 'Редактировать'

    const delButton = document.createElement('button');
    delButton.classList.add('btn', 'btn-danger', 'm-2')
    delButton.textContent = 'Удалить'

    articelItem.append(articleTitle);
    articelItem.append(articleContent);
    articelItem.append(editButton);
    articelItem.append(delButton);


    return articelItem;
}

saveNewArticle.addEventListener('click', function (e) {
    const newTitle = formInput.value.trim();
    const newContent = formTextarea.value.trim();
    const articelItem = createArticle(newTitle, newContent);
    articleList.append(articelItem);
    formInput.value = '';
    formTextarea.value = ''
});


articleList.addEventListener('click', function (e) {
    if (e.target.textContent === 'Удалить') {
        const articleItem = e.target.closest('li');
        articleItem.remove();
    }
    if (e.target.textContent === 'Редактировать') {
        const articleItem = e.target.closest('li');
        const articleTitle = articleItem.querySelector('h2');
        const articleContent = articleItem.querySelector('p');

        const newTitle = prompt('Введите название статьи', articleTitle.textContent);
        const newContent = prompt('Введите текст статьи', articleContent.textContent);

        articleTitle.textContent = newTitle;
        articleContent.textContent = newContent;

    }
});


/*
1.накрутить свой функционал
2. накрутить модальное окно на кнопку редактирования
*/





/* // заготовка


displayArticles(articlesData);

// загрузка списка статей.

function displayArticles(articles) {
    document.getElementById('articleList').innerHTML = '';
    articles.forEach(article => {
        document.getElementById('articleList').insertAdjacentHTML('beforeend', `
        <li class="list-group-item">
        <h3 class='mb-3'>${article.title}</h3>
        <p>${article.content}</p>
        <button class="btn btn-warning mt-2 col-3">Редактировать</button>
        <button class="btn btn-danger mt-2 col-2">Удалить</button>
        </li>
    `)
    });
}


function createArticle(articles, title, content) {
// собрать tittle и content из модального окна и запушить в новый объект со статьями.
}


function editArticle(arguments) {
// вызвать модальное окно, передать текущие значения в input и textarea, изменения запушить в объект. перерисовать страницу

}



function deleteArticle(article) {
    // найти индекс нужной статьи, удалить из массива, перерисовать страницу

    const indexToDel = articlesData.findIndex(elem => elem.title === article)
    articlesData.splice(indexToDel, 1);
    displayArticles(articlesData);
}


const s = document.querySelectorAll('.btn-danger')

s.forEach(button => {
    button.addEventListener('click', function (e) {
        const titleText = e.target.closest('.list-group-item').querySelector('h3').textContent;
        deleteArticle(titleText);
    });
});



document.getElementById('addArticleButton')
    .addEventListener('click', function (e) {
        createArticle(articlesData, 'new', 'newsd');
        console.log(articlesData);
    });
*/



