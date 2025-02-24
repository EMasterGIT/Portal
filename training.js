function showTraining() {
    const content = document.getElementById("roadmapContainer");
    content.innerHTML = `
        <form id="trainingForm" class="mb-4">
            <div class="mb-3">
                <label for="trainingName" class="form-label">Treeningu nimi</label>
                <input type="text" class="form-control" id="trainingName" required>
            </div>
            <div class="mb-3">
                <label for="trainingType" class="form-label">Treeningu tüüp</label>
                <select class="form-select" id="trainingType" required>
                    <option value="jõutreening">Jõutreening</option>
                    <option value="kardio">Kardio</option>
                    <option value="jooga">Jooga</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="duration" class="form-label">Kestus (minutites)</label>
                <input type="number" class="form-control" id="duration" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Treeningu intensiivsus</label>
                <div>
                    <input type="radio" name="intensity" value="madal" required> Madal
                    <input type="radio" name="intensity" value="keskmine" required> Keskmine
                    <input type="radio" name="intensity" value="kõrge" required> Kõrge
                </div>
            </div>
            <div class="mb-3">
                <label for="frequency" class="form-label">Treenimise sagedus (nädalas mitu korda)</label>
                <input type="number" class="form-control" id="frequency" required>
            </div>
            <div class="mb-3">
                <label for="comments" class="form-label">Kommentaar</label>
                <textarea class="form-control" id="comments"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Lisa treening</button>
        </form>
        <div id="trainingList" class="row"></div>
        <button class="btn btn-danger mt-3" onclick="clearTrainings()">Kustuta kõik treeningud</button>
    `;

    document.getElementById("trainingForm").addEventListener("submit", addTraining);
    displayTrainings();
}

function addTraining(event) {
    event.preventDefault();

    const training = {
        name: document.getElementById("trainingName").value,
        type: document.getElementById("trainingType").value,
        duration: document.getElementById("duration").value,
        intensity: document.querySelector('input[name="intensity"]:checked').value,
        frequency: document.getElementById("frequency").value,
        comments: document.getElementById("comments").value
    };

    let trainings = JSON.parse(localStorage.getItem("trainings")) || [];
    trainings.push(training);
    localStorage.setItem("trainings", JSON.stringify(trainings));

    displayTrainings();
    document.getElementById("trainingForm").reset();
}

function displayTrainings() {
    const trainingList = document.getElementById("trainingList");
    trainingList.innerHTML = "";

    let trainings = JSON.parse(localStorage.getItem("trainings")) || [];
    trainings.forEach((training, index) => {
        const trainingCard = document.createElement("div");
        trainingCard.className = "col-md-4 mb-3";
        trainingCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${training.name}</h5>
                    <p class="card-text">Tüüp: ${training.type}</p>
                    <p class="card-text">Kestus: ${training.duration} min</p>
                    <p class="card-text">Intensiivsus: ${training.intensity}</p>
                    <p class="card-text">Sagedus: ${training.frequency} korda nädalas</p>
                    <p class="card-text">Kommentaar: ${training.comments}</p>
                    <button class="btn btn-danger" onclick="deleteTraining(${index})">Kustuta</button>
                </div>
            </div>
        `;
        trainingList.appendChild(trainingCard);
    });
}

function deleteTraining(index) {
    let trainings = JSON.parse(localStorage.getItem("trainings")) || [];
    trainings.splice(index, 1);
    localStorage.setItem("trainings", JSON.stringify(trainings));
    displayTrainings();
}

function clearTrainings() {
    localStorage.removeItem("trainings");
    displayTrainings();
}