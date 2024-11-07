import { config } from "./config.js";

const accessKey = config.API_KEY;

const photoElement = document.getElementById('photo');
const authorElement = document.getElementById('author');
const avatarElement = document.getElementById('avatar');
const likeCountElement = document.getElementById('like-count');
const likeButton = document.getElementById('like-button');
const description = document.getElementById('description');
const link = document.getElementById('author-link');

function fetchRandomImage() {
    fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
        .then(response => response.json())
        .then(data => {

            description.textContent = data.alt_description;
            photoElement.src = data.urls.regular;
            authorElement.textContent = data.user.name;
            avatarElement.src = data.user.profile_image.medium;
            likeCountElement.textContent = data.likes;
            link.href = data.user.links.html;

            let likeCount = data.likes;

            // в условия задания указано "Каждый раз, когда пользователь нажимает кнопку "лайк", 
            // счетчик должен увеличиваться на единицу."

            likeButton.addEventListener('click', () => {
                likeCount++;
                likeCountElement.textContent = likeCount;
            });
        })
        .catch(error => console.error("Ошибка:", error));
}


document.addEventListener('DOMContentLoaded', fetchRandomImage);