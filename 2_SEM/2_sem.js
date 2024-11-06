/*
Вам необходимо создать навигационное меню для веб-сайта, в
котором меняется активный пункт при клике без фактического
перехода на другие страницы. Меню должно обладать следующими
характеристиками:
1. Подсветка активного пункта: При клике на пункт меню он
должен становиться активным, и для активного пункта должен
применяться определенный стиль (например, изменение цвета
фона). Если выбрать другой пункт, предыдущий должен
перестать быть активным.
2. Эффекты наведения: При наведении курсора на пункты меню
должны применяться эффекты (например, изменение цвета
текста или фона) для подсказки пользователю, что пункт меню
является интерактивным.
*/


const menuLinks = document.querySelectorAll('.menu__link');

menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        menuLinks.forEach(link => {
            link.parentNode.classList.remove('active')
        });
        this.parentNode.classList.add('active');
    });
});


/*
Создайте простое модальное окно, которое появляется при клике на кнопку "Открыть
модальное окно" и закрывается при клике на кнопку "Закрыть". Модальное окно
должно содержать заголовок "Модальное окно" и кнопку для закрытия.
* Модальное окно должно плавно появляться и исчезать при открытии и закрытии.
*/


const modalEl = document.querySelector('#modal');
const modalOpenBtn = document.querySelector('.modal-open-btn');
const modalCloseBtn = document.querySelector('.modal-close-btn');


modalOpenBtn.addEventListener('click', function (e) {
    modalEl.classList.add('active');

});

modalCloseBtn.addEventListener('click', function (e) {
    modalEl.classList.remove('active');
});

/*
У вас есть кнопка "Купить". Создайте скрипт, который при клике на эту кнопку меняет её текст на "Товар
добавлен в корзину" в течение 2 секунд, а затем возвращает исходный текст "Купить". В обработчике
события клика также проверьте, является ли событие доверенным. Если событие является доверенным,
выполните изменение текста кнопки и убедитесь, что после 2 секунд текст возвращается в исходное
состояние.
*/

const buyBtn = document.querySelector('.buy-btn');

buyBtn.addEventListener('click', function (e) {
    if (e.isTrusted) {
        e.target.textContent = 'Товар добавлен в корзину';
        buyBtn.disabled = true;
        setTimeout(() => {
            e.target.textContent = 'Купить'
            buyBtn.disabled = false;
        }, 2000);
    }
});



