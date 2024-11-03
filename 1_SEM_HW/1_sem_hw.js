
fetch('data.json')
    .then(response => response.json())
    .then(classes => {
        window.classesData = classes;
        displayClasses(classesData);
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));


function displayClasses(classes) {
    const container = document.getElementById('classesContainer');
    container.innerHTML = '';

    classes.forEach(activity => {
        const isFull = activity.currentParticipants >= activity.maxParticipants;

        const cardHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 bg-light">
                    <div class="card-body">
                        <h3 class="card-title">${activity.title}</h3>
                        <p class="card-text">Время: ${activity.time}</p>
                        <p class="card-text participants">Записано: ${activity.currentParticipants} из ${activity.maxParticipants}</p>
                        <div class="mb-4" id="status-${activity.id}"></div>                      
                        <button class="btn btn-primary btn-enroll mt-2" ${isFull ? 'disabled' : ''} onclick="enroll(${activity.id})">Записаться</button>
                        <button class="btn btn-danger btn-cancel mt-2" onclick="cancelEnroll(${activity.id})">Отменить запись</button> 
                        
                    </div>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}



function enroll(classId) {
    const activity = window.classesData.find(activity => activity.id === classId);
    const statusMessage = document.getElementById(`status-${classId}`);

    if (activity && activity.currentParticipants < activity.maxParticipants) {
        if (!activity.isEnrolled) {
            activity.currentParticipants++;
            activity.isEnrolled = true;
            updateDisplay(activity);

            statusMessage.textContent = "Вы записаны";
            statusMessage.style.color = "green";
            saveToLocalStorage();
        }
    }
}


function cancelEnroll(classId) {
    const activity = window.classesData.find(activity => activity.id === classId);
    const statusMessage = document.getElementById(`status-${classId}`);

    if (activity && activity.currentParticipants > 0 && activity.isEnrolled) {
        activity.currentParticipants--;
        activity.isEnrolled = false;
        updateDisplay(activity);
        saveToLocalStorage();

        statusMessage.textContent = "Вы отменили запись";
        statusMessage.style.color = "red";
        setTimeout(() => {
            statusMessage.textContent = "";
        }, 2000);
    }
}


function updateDisplay(activity) {
    const card = Array.from(document.querySelectorAll('.card')).find(card =>
        card.querySelector('.card-title').textContent === activity.title
    );

    if (card) {
        const participantsText = card.querySelector('.participants');
        participantsText.textContent = `Записано: ${activity.currentParticipants} из ${activity.maxParticipants}`;

        const enrollButton = card.querySelector('.btn-enroll');
        enrollButton.disabled = activity.currentParticipants >= activity.maxParticipants || activity.isEnrolled === true;


    }
}


// но зачем?! а чтоб было.
function saveToLocalStorage() { // 
    localStorage.setItem('classesData', JSON.stringify(window.classesData));
}


