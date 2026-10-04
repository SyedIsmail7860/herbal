const plants = [
  {
    name: "Tulsi",
    scientific: "Ocimum tenuiflorum",
    category: ["medicinal", "wellness"],
    image: "https://images.unsplash.com/photo-1601055903647-52b8a5f4a7a5?auto=format&fit=crop&w=700&q=80",
    benefits: "Traditionally used for wellness, immunity support and respiratory care.",
    parts: "Leaves and seeds",
    water: "Medium",
    sunlight: "High",
    temperature: "20–30°C",
    uses: "Herbal drinks and traditional home practices"
  },
  {
    name: "Neem",
    scientific: "Azadirachta indica",
    category: ["medicinal", "beauty"],
    image: "https://images.unsplash.com/photo-1599598425947-3307c7f0a8f4?auto=format&fit=crop&w=700&q=80",
    benefits: "Traditionally valued for skin and personal care.",
    parts: "Leaves, bark and seeds",
    water: "Low",
    sunlight: "High",
    temperature: "20–35°C",
    uses: "Traditional skin and household uses"
  },
  {
    name: "Aloe Vera",
    scientific: "Aloe barbadensis miller",
    category: ["beauty", "medicinal"],
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80",
    benefits: "Commonly used in traditional skin-care practices.",
    parts: "Leaf gel",
    water: "Low",
    sunlight: "Medium",
    temperature: "18–30°C",
    uses: "Traditional skin and beauty applications"
  },
  {
    name: "Ginger",
    scientific: "Zingiber officinale",
    category: ["food", "medicinal"],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80",
    benefits: "Traditionally used for digestion and common cold-related drinks.",
    parts: "Rhizome",
    water: "Medium",
    sunlight: "Medium",
    temperature: "20–30°C",
    uses: "Food and herbal drinks"
  },
  {
    name: "Turmeric",
    scientific: "Curcuma longa",
    category: ["food", "medicinal"],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80",
    benefits: "Traditionally used in food and wellness practices.",
    parts: "Rhizome",
    water: "Medium",
    sunlight: "Medium",
    temperature: "20–30°C",
    uses: "Food and traditional practices"
  },
  {
    name: "Hibiscus",
    scientific: "Hibiscus rosa-sinensis",
    category: ["beauty"],
    image: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?auto=format&fit=crop&w=700&q=80",
    benefits: "Popular in traditional hair and beauty practices.",
    parts: "Flowers and leaves",
    water: "Medium",
    sunlight: "High",
    temperature: "18–30°C",
    uses: "Traditional beauty and hair care"
  },
  {
    name: "Mint",
    scientific: "Mentha",
    category: ["food", "medicinal"],
    image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1f1?auto=format&fit=crop&w=700&q=80",
    benefits: "Traditionally used in food, drinks and digestion-related practices.",
    parts: "Leaves",
    water: "High",
    sunlight: "Medium",
    temperature: "15–25°C",
    uses: "Food and herbal drinks"
  },
  {
    name: "Lemongrass",
    scientific: "Cymbopogon",
    category: ["food", "wellness"],
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80",
    benefits: "Popular in herbal drinks and traditional wellness practices.",
    parts: "Stems and leaves",
    water: "Medium",
    sunlight: "High",
    temperature: "20–30°C",
    uses: "Herbal tea and food"
  }
];

const plantGrid = document.getElementById("plantGrid");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("plantModal");
const modalContent = document.getElementById("modalContent");

let favorites = JSON.parse(localStorage.getItem("herbalFavorites")) || [];
let selectedCategory = "all";

function renderPlants() {
  const search = searchInput.value.toLowerCase();

  const filtered = plants.filter(plant => {
    const categoryMatch =
      selectedCategory === "all" ||
      plant.category.includes(selectedCategory);

    const searchMatch =
      plant.name.toLowerCase().includes(search) ||
      plant.benefits.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });

  plantGrid.innerHTML = filtered.map(plant => `
    <article class="plant-card">
      <img class="plant-img" src="${plant.image}" alt="${plant.name}">

      <div class="plant-info">
        <button class="favorite" onclick="toggleFavorite('${plant.name}')">
          ${favorites.includes(plant.name) ? "❤️" : "🤍"}
        </button>

        <h3>${plant.name}</h3>
        <p><i>${plant.scientific}</i></p>
        <p>${plant.benefits}</p>

        <button class="btn" onclick="showPlant('${plant.name}')">
          View Details
        </button>
      </div>
    </article>
  `).join("");
}

function showPlant(name) {
  const plant = plants.find(p => p.name === name);

  modalContent.innerHTML = `
    <h2>🌿 ${plant.name}</h2>
    <p><b>Scientific Name:</b> ${plant.scientific}</p>
    <p><b>Benefits:</b> ${plant.benefits}</p>
    <p><b>Parts Used:</b> ${plant.parts}</p>
    <p><b>Common Uses:</b> ${plant.uses}</p>
    <p><b>💧 Water:</b> ${plant.water}</p>
    <p><b>☀️ Sunlight:</b> ${plant.sunlight}</p>
    <p><b>🌡️ Temperature:</b> ${plant.temperature}</p>
    <hr>
    <p><b>⚠️ Safety:</b> Traditional uses do not replace professional medical advice. Use herbs responsibly.</p>
  `;

  modal.classList.add("show");
}

function toggleFavorite(name) {
  if (favorites.includes(name)) {
    favorites = favorites.filter(item => item !== name);
  } else {
    favorites.push(name);
  }

  localStorage.setItem("herbalFavorites", JSON.stringify(favorites));
  renderPlants();
}

searchInput.addEventListener("input", renderPlants);

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    selectedCategory = button.dataset.category;
    renderPlants();
  });
});

document.getElementById("closeModal").onclick = () => {
  modal.classList.remove("show");
};

modal.onclick = event => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
};

/* HEALTH FINDER */
document.getElementById("healthSelect").addEventListener("change", event => {
  const value = event.target.value;

  const results = {
    immunity: ["Tulsi", "Ginger", "Turmeric"],
    digestion: ["Ginger", "Mint"],
    skin: ["Aloe Vera", "Neem"],
    cold: ["Tulsi", "Ginger"],
    wellness: ["Tulsi", "Lemongrass"]
  };

  const names = results[value] || [];

  document.getElementById("healthResult").innerHTML =
    names.length
      ? `<h3>🌿 Suggested Plants</h3><p>${names.join(" • ")}</p>`
      : "<p>Select a health need.</p>";
});

/* VIRTUAL GARDEN */
let garden = JSON.parse(localStorage.getItem("herbalGarden")) || [];

document.querySelectorAll(".gardenPlant").forEach(button => {
  const name = button.textContent.replace(/[^\w ]/g, "").trim();

  if (garden.includes(name)) {
    button.classList.add("selected");
  }

  button.addEventListener("click", () => {
    if (garden.includes(name)) {
      garden = garden.filter(item => item !== name);
      button.classList.remove("selected");
    } else {
      garden.push(name);
      button.classList.add("selected");
    }

    localStorage.setItem("herbalGarden", JSON.stringify(garden));
    document.getElementById("gardenCount").textContent = garden.length;
  });
});

document.getElementById("gardenCount").textContent = garden.length;

/* COMPARISON */
const plant1 = document.getElementById("plant1");
const plant2 = document.getElementById("plant2");

plants.forEach(plant => {
  plant1.innerHTML += `<option value="${plant.name}">${plant.name}</option>`;
  plant2.innerHTML += `<option value="${plant.name}">${plant.name}</option>`;
});

plant2.selectedIndex = 1;

document.getElementById("compareBtn").onclick = () => {
  const a = plants.find(p => p.name === plant1.value);
  const b = plants.find(p => p.name === plant2.value);

  document.getElementById("comparisonResult").innerHTML = `
    <h3>${a.name} vs ${b.name}</h3>
    <p><b>Parts:</b> ${a.parts} | ${b.parts}</p>
    <p><b>Water:</b> ${a.water} | ${b.water}</p>
    <p><b>Sunlight:</b> ${a.sunlight} | ${b.sunlight}</p>
    <p><b>Temperature:</b> ${a.temperature} | ${b.temperature}</p>
  `;
};

/* DAILY TIP */
const tips = [
  "Water plants according to their actual soil needs.",
  "Grow herbs in clean and healthy soil.",
  "Provide enough sunlight for plants that need it.",
  "Learn the correct plant name before using it.",
  "Do not use herbal remedies as a replacement for medical treatment."
];

const day = new Date().getDate();

document.getElementById("dailyTip").textContent =
  tips[day % tips.length];

/* PLANT OF DAY */
const todayPlant = plants[day % plants.length];

document.getElementById("plantOfDay").innerHTML = `
  <div class="plant-card" style="max-width:600px;margin:auto">
    <img class="plant-img" src="${todayPlant.image}">
    <div class="plant-info">
      <h3>${todayPlant.name}</h3>
      <p><i>${todayPlant.scientific}</i></p>
      <p>${todayPlant.benefits}</p>
      <button class="btn" onclick="showPlant('${todayPlant.name}')">
        Learn More
      </button>
    </div>
  </div>
`;

/* QUIZ */
const questions = [
  {
    q: "Which part of ginger is commonly used?",
    a: ["Flower", "Rhizome", "Fruit", "Seed"],
    correct: 1
  },
  {
    q: "Which plant is commonly associated with traditional skin care?",
    a: ["Aloe Vera", "Mint", "Ginger", "Lemongrass"],
    correct: 0
  },
  {
    q: "Which plant is commonly used in herbal drinks?",
    a: ["Lemongrass", "Neem", "Aloe Vera", "Hibiscus"],
    correct: 0
  },
  {
    q: "Which plant is commonly used as a food spice?",
    a: ["Turmeric", "Neem", "Aloe Vera", "Hibiscus"],
    correct: 0
  },
  {
    q: "Which plant is commonly used in traditional beauty practices?",
    a: ["Hibiscus", "Ginger", "Mint", "Lemongrass"],
    correct: 0
  }
];

let quizIndex = 0;
let quizScore = 0;

function loadQuestion() {
  const question = questions[quizIndex];

  document.getElementById("question").textContent = question.q;

  document.getElementById("answers").innerHTML =
    question.a.map((answer, index) =>
      `<button onclick="answerQuiz(${index})">${answer}</button>`
    ).join("");

  document.getElementById("score").textContent =
    `Question ${quizIndex + 1} of ${questions.length} | Score: ${quizScore}`;
}

function answerQuiz(index) {
  if (index === questions[quizIndex].correct) {
    quizScore++;
  }

  quizIndex++;

  if (quizIndex >= questions.length) {
    document.getElementById("question").textContent =
      `🎉 Quiz Completed! Score: ${quizScore}/${questions.length}`;

    document.getElementById("answers").innerHTML =
      `<button onclick="restartQuiz()">🔄 Play Again</button>`;

    document.getElementById("score").textContent =
      "Great job learning about herbal plants!";

    return;
  }

  loadQuestion();
}

function restartQuiz() {
  quizIndex = 0;
  quizScore = 0;
  loadQuestion();
}

/* MENU */
document.getElementById("menuBtn").onclick = () => {
  document.getElementById("navLinks").classList.toggle("show");
};

/* DARK MODE */
document.getElementById("themeBtn").onclick = () => {
  document.body.classList.toggle("dark");

  const dark = document.body.classList.contains("dark");

  localStorage.setItem("herbalDarkMode", dark);

  document.getElementById("themeBtn").textContent =
    dark ? "☀️" : "🌙";
};

if (localStorage.getItem("herbalDarkMode") === "true") {
  document.body.classList.add("dark");
  document.getElementById("themeBtn").textContent = "☀️";
}

/* YEAR */
document.getElementById("year").textContent = new Date().getFullYear();

/* TOP BUTTON */
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

topBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

/* KEYBOARD SEARCH */
document.addEventListener("keydown", event => {
  if (event.ctrlKey && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

/* START */
renderPlants();
loadQuestion();
