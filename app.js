document.addEventListener("DOMContentLoaded", function () {
    setSelectedPath('Home'); // Kui leht on laaditud, määratakse vaikimisi valikuks "Home"
});

function setSelectedPath(path) {
    const content = document.getElementById("roadmapContainer");
    content.innerHTML = ''; // Tühjendame sisu
    
    if (path === 'Home') {
        // Kui valik on "Home", kuvame vaikimisi pildi
        content.innerHTML = '<img src="images/Web-Developer-skill-1200x682.jpg" alt="Developer Roadmap" class="img-fluid">';
        return;
    }
    
    if (!window.roadmapData || !roadmapData[path]) {
        console.warn(`Andmeid ei leitud: ${path}`); // Kui andmeid ei leitud, väljastame hoiatus
        return;
    }
    
    // Loome pealkirja
    const pageName = document.createElement("h2");
    pageName.textContent = path;
    content.appendChild(pageName);
    pageName.className = "w-100 text-center";
    
    // Loome nupu JSON-faili allalaadimiseks
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Laadi JSON alla";
    downloadButton.className = "btn btn-primary btn-sm mb-3 w-auto";
    downloadButton.onclick = function () {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(roadmapData[path]));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", path + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };
    content.appendChild(downloadButton);

    // Loome ja kuvame kategooriad ja nende elemendid
    Object.keys(roadmapData[path]).forEach(category => {
        const categoryHeader = document.createElement("h3");
        categoryHeader.textContent = category;
        content.appendChild(categoryHeader);
        
        const row = document.createElement("div");
        row.className = "row";
        
        roadmapData[path][category].forEach(item => {
            const col = document.createElement("div");
            col.className = "col-md-4 mb-3";
            
            const card = document.createElement("div");
            card.className = "card";
            card.style.cursor = "pointer";
            
            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
            
            const title = document.createElement("h5");
            title.className = "card-title";
            title.textContent = item.name;
            
            const description = document.createElement("p");
            description.className = "card-text";
            description.textContent = item.description;
            
            card.addEventListener("click", function () {
                document.getElementById("modalTitle").textContent = item.name;
                document.getElementById("modalDescription").textContent = item.description;
                const modalVideo = document.getElementById("modalVideo");
                
                if (item.video) {
                    modalVideo.src = item.video;
                    modalVideo.style.display = "block";
                } else {
                    modalVideo.style.display = "none";
                }
                
                const modal = new bootstrap.Modal(document.getElementById("techModal"));
                modal.show();
            });
            
            cardBody.appendChild(title);
            cardBody.appendChild(description);
            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);
        });
        content.appendChild(row);
    });
}

// Funktsioon uudiste kuvamiseks
function showNews() {
    const content = document.getElementById("roadmapContainer");
    content.innerHTML = `
        <nav class="nav nav-pills mb-3" id="category-nav">
            <a class="nav-link active" href="#" onclick="filterNews('All')">Kõik</a>
            <a class="nav-link" href="#" onclick="filterNews('Tehnoloogia')">Tehnoloogia</a>
            <a class="nav-link" href="#" onclick="filterNews('Sport')">Sport</a>
            <a class="nav-link" href="#" onclick="filterNews('Poliitika')">Poliitika</a>
            <a class="nav-link" href="#" onclick="filterNews('Kultuur')">Kultuur</a>
        </nav>
        <input type="text" id="search" class="form-control mb-3" placeholder="Otsi uudiseid..." onkeyup="searchNews()">
        <div id="news-section" class="row"></div>
    `;
    displayNews(news);
}

// Funktsioon uudiste kuvamiseks
function displayNews(newsArray) {
    const newsSection = document.getElementById("news-section");
    newsSection.innerHTML = "";
    newsArray.forEach(newsItem => {
        const newsCard = document.createElement("div");
        newsCard.className = "col-md-4 mb-3";
        newsCard.innerHTML = `
            <div class="card">
                <img src="${newsItem.image}" class="card-img-top" alt="${newsItem.title}">
                <div class="card-body">
                    <h5 class="card-title">${newsItem.title}</h5>
                    <p class="card-text">${newsItem.description}</p>
                    <p class="card-text"><small class="text-muted">${newsItem.datetime}</small></p>
                </div>
            </div>
        `;
        newsSection.appendChild(newsCard);
    });
}

// Funktsioon uudiste filtreerimiseks kategooria järgi
function filterNews(category) {
    if (category === "All") {
        displayNews(news);
    } else {
        const filteredNews = news.filter(newsItem => newsItem.category === category);
        displayNews(filteredNews);
    }
}

// Funktsioon uudiste otsimiseks sisestatud märksõna põhjal
function searchNews() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filteredNews = news.filter(newsItem => 
        newsItem.title.toLowerCase().includes(searchTerm) ||
        newsItem.description.toLowerCase().includes(searchTerm)
    );
    displayNews(filteredNews);
}
