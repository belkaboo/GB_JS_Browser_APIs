
fetch('data.json')
    .then(response => response.json())
    .then(classes => {
        window.classesData = classes;
        displayClasses(classesData);
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));


function saveToJson() {
    fetch('data.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(window.classesData)
    })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка сохранения данных');
            console.log('Данные успешно сохранены');
        })
        .catch(error => console.error(error));
}


function displayClasses(classes) {
    const container = document.getElementById('classesContainer');
    container.innerHTML = '';

    classes.forEach(activity => {
        const isFull = activity.currentParticipants >= activity.maxParticipants;

        const cardHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="card-title">${activity.title}</h3>
                        <p class="card-text">Время: ${activity.time}</p>
                        <p class="card-text participants">Записано: ${activity.currentParticipants} из ${activity.maxParticipants}</p>
                        <button class="btn btn-primary btn-enroll" ${isFull ? 'disabled' : ''} onclick="enroll(${activity.id})">Записаться</button>
                        <button class="btn btn-danger btn-cancel" onclick="cancelEnroll(${activity.id})">Отменить запись</button>
                    </div>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}


function enroll(classId) {
    const activity = window.classesData.find(activity => activity.id === classId);

    if (activity && activity.currentParticipants < activity.maxParticipants) {
        if (!activity.isEnrolled) {
            activity.currentParticipants++;
            activity.isEnrolled = true;
            updateDisplay(activity);
            alert(`Вы записались на занятие - ${activity.title}`);
            saveToJson();
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
        saveToJson();

        alert(`Вы отменили запись на занятие - ${activity.title}`)
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
        enrollButton.disabled = activity.currentParticipants >= activity.maxParticipants || activity.isEnrolled;
    }
}


