// --- Hero Background Icons Randomizer ---
function initHeroBackground() {
  const icons = [
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/hockey-puck.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/baseball-bat-ball.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/basketball.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/futbol.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/volleyball.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/table-tennis-paddle-ball.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/bowling-ball.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/dumbbell.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/person-snowboarding.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/person-skating.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/person-skiing.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/medal.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/trophy.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/shoe-prints.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/flag.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/stopwatch.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/bullseye.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/person-running.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/person-swimming.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/person-biking.svg",
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/golf-ball-tee.svg",
  ];

  const filters = ["invert(100%) opacity(0.18)"];

  const container = document.getElementById("hero-background-icons");
  if (!container) return;

  const placedIcons = [];

  // Create ~60 icons for an even more extreme edge density
  for (let i = 0; i < 60; i++) {
    const img = document.createElement("img");
    img.src = icons[Math.floor(Math.random() * icons.length)];
    img.className = "bg-svg-icon";

    let posX, posY, scale;
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      attempts++;
      scale = 0.5 + Math.random() * 1.5;

      // Distribute near the edges: steep exponent pushes vast majority to the absolute edge, fizzling out at ~25%
      const edgeDist = Math.pow(Math.random(), 5) * 25;
      const edge = Math.floor(Math.random() * 4);
      if (edge === 0) {
        posX = Math.random() * 100;
        posY = edgeDist;
      } else if (edge === 1) {
        posX = 100 - edgeDist;
        posY = Math.random() * 100;
      } else if (edge === 2) {
        posX = Math.random() * 100;
        posY = 100 - edgeDist;
      } else {
        posX = edgeDist;
        posY = Math.random() * 100;
      }

      let collision = false;
      for (const icon of placedIcons) {
        // Approximate distance check in percentages (scaled)
        // 48px base size. A distance of roughly 3-5% based on scales.
        const dx = icon.x - posX;
        const dy = icon.y - posY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (icon.scale + scale) * 2.5;

        if (dist < minDistance) {
          collision = true;
          break;
        }
      }

      if (!collision) {
        placed = true;
      }
    }

    if (placed) {
      placedIcons.push({ x: posX, y: posY, scale: scale });

      const rotation = Math.random() * 360;

      img.style.left = `${posX}%`;
      img.style.top = `${posY}%`;
      img.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      img.style.filter = filters[Math.floor(Math.random() * filters.length)];

      container.appendChild(img);
    }
  }
}
initHeroBackground();

// --- Hero Section Logic ---
const input = document.getElementById("athlete-input");
const response = document.getElementById("hero-response");
let typingTimeout;

const indigenousCanadianOlympians = [
  "Peter Deer",
  "Sandy Cowan",
  "Haudenosaunee Team",
  "Tom Longboat",
  "Fred Simpson",
  "John Tait",
  "Joe Keeper",
  "Alex Decoteau",
  "Kenneth Moore",
  "Sharon Firth",
  "Shirley Firth",
  "Steve Collins",
  "Alwyn Morris",
  "Angela Chalmers",
  "Kerri Buchberger",
  "Waneek Horn-Miller",
  "Theoren Fleury",
  "Kara Grant",
  "Monica Pinette",
  "Carolyn Darbyshire-McRorie",
  "Caroline Calvé",
  "Mary Spencer",
  "Carey Price",
  "Jocelyne Larocque",
  "Spencer O'Brien",
  "Jesse Cockney",
  "Brigette Lacquette",
  "Rene Bourque",
  "Kevin Koe",
  "Jillian Weir",
  "Liam Gill",
  "Apollo Hess",
  "Margo Erlam",
  "Justina Di Stasio",
];

const validHeroAnswers = new Set(
  indigenousCanadianOlympians.map((name) =>
    name
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, ""),
  ),
);

function normalizeHeroAnswer(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const val = input.value.trim();
    if (val && validHeroAnswers.has(normalizeHeroAnswer(val))) {
      response.textContent = "Correct. But how many more can you name?";
    } else {
      response.textContent = "Most Canadians can't. Here's who you're missing.";
    }

    response.style.opacity = 0;
    response.classList.remove("hidden");

    void response.offsetWidth;
    response.style.opacity = 1;

    setTimeout(() => {
      document
        .getElementById("profiles")
        .scrollIntoView({ behavior: "smooth" });
    }, 1500);
  }
});

input.addEventListener("input", () => {
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    if (!input.value.trim()) {
      response.textContent = "Most Canadians can't. Here's who you're missing.";
      response.classList.remove("hidden");
      response.style.opacity = 1;

      setTimeout(() => {
        document
          .getElementById("profiles")
          .scrollIntoView({ behavior: "smooth" });
      }, 1500);
    }
  }, 5000);
});

// --- Profiles Generation ---
const profilesData = [
  {
    name: "Tom Longboat",
    nation: "Onondaga",
    sport: "Distance Running",
    desc: "Tom Longboat (Gagwe:gih) broke the 1907 Boston Marathon record by five minutes, represented Canada at the 1908 London Olympics, and won the World Professional Marathon Championship in 1909.",
    img: "images/tom_longboat.png",
  },
  {
    name: "Angela Chalmers",
    nation: "Birdtail Sioux First Nation",
    sport: "Middle-distance Running",
    desc: "Angela Chalmers won Olympic bronze in the 3,000 m at the 1992 Barcelona Olympics and gold at the 1994 Commonwealth Games, setting new Canadian and Commonwealth records.",
    img: "images/angela_chalmers.png",
  },
  {
    name: "Kenneth Moore",
    nation: "Peepeekisis First Nation",
    sport: "Ice Hockey",
    desc: "Kenneth Moore won gold at the 1932 Lake Placid Winter Olympics as part of the Winnipeg Hockey Club, making him Canada's first Indigenous Olympic gold medallist.",
    img: "images/ken_moore.png",
  },
  {
    name: "Shirley & Sharon Firth",
    nation: "Gwich'in",
    sport: "Cross-Country Skiing",
    desc: "The Firth sisters are the only female skiers to have represented Canada in four consecutive Winter Olympic Games, winning 79 medals at Canadian and World Championships.",
    img: "images/shirley_sharon_firth.png",
  },
  {
    name: "Alwyn Morris",
    nation: "Mohawk",
    sport: "Sprint Kayaking",
    desc: "Alwyn Morris won Olympic gold at the 1984 Los Angeles Games in the K-2 1,000 m and raised an eagle feather on the podium to honour his heritage.",
    img: "images/alwyn_morris.png",
  },
  {
    name: "Carey Price",
    nation: "Ulkatcho / Nuxalk",
    sport: "Ice Hockey",
    desc: "Carey Price became the first goalie in NHL history to win the Hart, Vezina, Ted Lindsay, and William Jennings trophies in a single season (2014-15), and won Olympic gold int 2014.",
    img: "images/carey_price.png",
  },
];

const profilesGrid = document.querySelector(".profiles-grid");
profilesGrid.innerHTML = "";
profilesData.forEach((p, index) => {
  const accentColor = index % 2 === 0 ? "#f7b731" : "#d92d20"; // Alternate gold and red
  const textColor = accentColor === "#d92d20" ? "#ffffff" : "#0f0f11"; // White for red, dark for gold
  const card = document.createElement("div");
  card.className = "card";
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";
  cardInner.style.border = `5px solid ${accentColor}`;
  cardInner.style.borderRadius = "17px";
  cardInner.style.boxSizing = "border-box";
  cardInner.innerHTML = `<div class="card-front">
                <div class="card-media">
                  <img src="${p.img}" alt="${p.name}" class="card-image" loading="lazy">
                </div>
                <div class="card-info" style="background-color: ${accentColor}; color: ${textColor};">
                    <h3 class="card-name" style="color: ${textColor};">${p.name}</h3>
                    <div class="card-nation" style="color: ${textColor};">${p.nation}</div>
                    <div class="card-sport" style="color: ${textColor};">${p.sport}</div>
                </div>
            </div>
            <div class="card-back" style="background-color: ${accentColor};">
                <div class="card-achievement" style="font-size: 1.1rem; color: ${textColor};">${p.desc}</div>
            </div>`;

  card.appendChild(cardInner);

  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  profilesGrid.appendChild(card);
});

// --- Timeline Generation & Animation ---
const timelineData = [
  {
    year: "1869",
    title: "Kahnawake Wins Lacrosse Championship",
    desc: "The Mohawk team from Kahnawake won the national lacrosse championship, predating Confederation.",
  },
  {
    year: "1907",
    title: "Tom Longboat Wins Boston Marathon",
    desc: "Onondaga runner Tom Longboat won the Boston Marathon in 2:24:24, breaking the existing record by five minutes.",
  },
  {
    year: "1908",
    title: "Longboat Represents Canada",
    desc: "Tom Longboat competed in the marathon at the London Olympics, becoming one of the first Indigenous Canadians at the Games.",
  },
  {
    year: "1932",
    title: "Kenneth Moore Wins Hockey Gold",
    desc: "Kenneth Moore won gold with the Winnipeg Hockey Club at Lake Placid, making him Canada's first Indigenous Olympic gold medallist.",
  },
  {
    year: "1984",
    title: "Alwyn Morris Raises Eagle Feather",
    desc: "Alwyn Morris won gold in kayaking at the Los Angeles Olympics and raised an eagle feather on the podium in tribute to his heritage.",
  },
  {
    year: "1987",
    title: "Firth Sisters Receive Order of Canada",
    desc: "After 4 consecutive Olympics and 79 combined medals, Shirley and Sharon Firth were awarded the Order of Canada.",
  },
  {
    year: "1990",
    title: "NAIG Founded",
    desc: "The first North American Indigenous Games were held in Edmonton to bring Indigenous youth together in sport.",
  },
  {
    year: "1992",
    title: "Angela Chalmers Wins Bronze",
    desc: "Angela Chalmers won Olympic bronze in the 3,000 m in Barcelona, and later set a Commonwealth Games record.",
  },
  {
    year: "1999",
    title: "Waneek Horn-Miller Wins Pan Am Gold",
    desc: "Water polo player Waneek Horn-Miller won gold at the Pan Am Games, later co-captaining Canada's first Olympic women's water polo team.",
  },
  {
    year: "2003",
    title: "Jordin Tootoo Makes NHL Debut",
    desc: "Jordin Tootoo became the first player of Inuit descent to play in a regular-season NHL game, suiting up for Nashville.",
  },
  {
    year: "2013",
    title: "Brigette Lacquette Joins National Team",
    desc: "Brigette Lacquette became the first Indigenous player named to Canada's National Women's Hockey Team.",
  },
  {
    year: "2015",
    title: "Carey Price's Historic NHL Season",
    desc: "Carey Price won the Hart, Vezina, Ted Lindsay, and William Jennings trophies—the first goalie to ever win all four in one season.",
  },
  {
    year: "2025",
    title: "Lacrosse Added to Canada Summer Games",
    desc: "Lacrosse was added as a permanent sport to the Canada Summer Games to increase Indigenous participation and inclusion.",
  },
];

const timelineContainer = document.querySelector(".timeline-container");
const nodesToRemove = timelineContainer.querySelectorAll(".timeline-node");
nodesToRemove.forEach((node) => node.remove());

timelineData.forEach((item, index) => {
  const node = document.createElement("div");
  node.className = "timeline-node";
  node.innerHTML = `<div class="timeline-dot"></div>
        <div class="timeline-content">
            <div class="timeline-year">${item.year}</div>
            <h4 style="font-family: var(--font-heading); margin-bottom: 5px; color: var(--text-white); font-size: 1.25rem;">${item.title}</h4>
            <p>${item.desc}</p>
        </div>
        <div style="width: 45%;"></div>`;
  timelineContainer.appendChild(node);
});

// Intersection Observer for Timeline
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
);

document
  .querySelectorAll(".timeline-node")
  .forEach((node) => observer.observe(node));

const timelineLine = document.querySelector(".timeline-line");
const existingFill = timelineLine.querySelector(".timeline-line-fill");
if (existingFill) existingFill.remove();

const fill = document.createElement("div");
fill.className = "timeline-line-fill";
timelineLine.appendChild(fill);

window.addEventListener("scroll", () => {
  const rect = timelineLine.getBoundingClientRect();
  const st = window.innerHeight;
  if (rect.top < st) {
    let h = st - rect.top;
    if (h > rect.height) h = rect.height;
    fill.style.height = h + "px";
  }
});

// --- Quiz Section Logic ---
const quizData = [
  {
    q: "This Onondaga runner from Six Nations won the 1907 Boston Marathon by five minutes, broke multiple world records across three continents, and was named by Maclean's magazine as the greatest Canadian star of the 20th century — ahead of Wayne Gretzky. Who is this athlete?",
    options: ["Tom Longboat", "Fred Simpson", "Paul Acoose", "Albert Smoke"],
    correct: 0,
    fact: "Tom Longboat (Gagwe:gih) was born in 1886 on the Six Nations of the Grand River reserve. Ontario declared June 4 'Tom Longboat Day' in 2008.",
  },
  {
    q: "This Mohawk kayaker from Kahnawake won Olympic gold at the 1984 Los Angeles Games and, on the medal podium, raised a single eagle feather to honour his late grandfather and acknowledge Indigenous peoples worldwide. Who is this athlete?",
    options: [
      "Alwyn Morris",
      "Hugh Fisher",
      "Waneek Horn-Miller",
      "Carey Price",
    ],
    correct: 0,
    fact: "Alwyn Morris is the first and only Indigenous Canadian to win a gold medal at the Summer Olympics. He later co-founded the Aboriginal Sport Circle.",
  },
  {
    q: "This athlete from Rankin Inlet, Nunavut, made history on October 9, 2003, when he played his first NHL game for the Nashville Predators — becoming the first person of Inuit descent ever to play in the league. Who is this athlete?",
    options: [
      "Jordin Tootoo",
      "Carey Price",
      "Jonathan Cheechoo",
      "Reggie Leach",
    ],
    correct: 0,
    fact: "Jordin Tootoo wore #22 in honour of his brother. After retiring, he became a mental health advocate and co-founded the Team Tootoo Foundation.",
  },
  {
    q: "This Mohawk athlete from Kahnawake, who was stabbed by a soldier during the 1990 Oka Crisis at age 14, went on to co-captain Canada's first Olympic women's water polo team at the Sydney 2000 Games. Who is this athlete?",
    options: [
      "Waneek Horn-Miller",
      "Angela Chalmers",
      "Brigette Lacquette",
      "Sharon Firth",
    ],
    correct: 0,
    fact: "Waneek Horn-Miller was the first Mohawk woman to compete at the Olympics. She was later a CBC host at the Paris 2024 Summer Olympics.",
  },
  {
    q: "These two sisters from the Gwich'in First Nation in the Northwest Territories are the only female skiers to have represented Canada in four consecutive Winter Olympic Games (1972–1984). Who are they?",
    options: [
      "Shirley and Sharon Firth",
      "Waneek and Kaniehtiio Horn-Miller",
      "Angela and Sandra Chalmers",
      "Brigette and Megan Lacquette",
    ],
    correct: 0,
    fact: "They won 79 medals at Canadian and World Championships and proved that world-class athletes could come from remote northern communities.",
  },
];

let currentQuizIndex = 0;
let quizScore = 0;
const quizContainer = document.getElementById("quiz-container");
let currentQuizChoices = [];

function shuffleArray(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i]];
  }
  return shuffled;
}

function renderQuiz() {
  if (currentQuizIndex >= quizData.length) {
    let resultMessage =
      quizScore >= 4
        ? "You knew your history. Most Canadians don't."
        : "Now you know. That's exactly the point.";
    quizContainer.innerHTML = `<div class="quiz-results">
                <h3>Quiz Complete!</h3>
                <p style="font-size: 1.5rem; margin-bottom: 5px;">You scored ${quizScore} out of ${quizData.length}.</p>
                <p style="color: var(--text-gray); margin-bottom: 20px;">${resultMessage}</p>
                <button class="retry-btn" onclick="retryQuiz()">Try Again</button>
            </div>`;
    return;
  }

  const q = quizData[currentQuizIndex];
  currentQuizChoices = shuffleArray(
    q.options.map((option, index) => ({
      text: option,
      isCorrect: index === q.correct,
    })),
  );

  let html = `<div class="quiz-question" style="font-size: 1.25rem; font-weight: normal; margin-bottom: 20px;"><span style="color: var(--text-gray); font-size: 1rem;">Question ${currentQuizIndex + 1} of 5</span><br/><br/>${q.q}</div><div class="quiz-options">`;

  currentQuizChoices.forEach((choice, idx) => {
    html += `<button class="quiz-btn" onclick="checkAnswer(${idx}, this)">${choice.text}</button>`;
  });

  html += `</div><div id="quiz-feedback"></div>`;
  quizContainer.innerHTML = html;
}

window.checkAnswer = function (selectedIdx, btnElement) {
  const q = quizData[currentQuizIndex];
  const buttons = document.querySelectorAll(".quiz-btn");
  const correctButtonIndex = currentQuizChoices.findIndex((choice) => choice.isCorrect);

  buttons.forEach((b) => (b.disabled = true));

  if (currentQuizChoices[selectedIdx]?.isCorrect) {
    btnElement.classList.add("correct");
    btnElement.innerHTML += " ✓";
    quizScore++;
  } else {
    btnElement.classList.add("incorrect");
    btnElement.innerHTML += " ✗";
    buttons[correctButtonIndex].classList.add("correct");
    buttons[correctButtonIndex].innerHTML += " ✓";
  }

  const feedback = document.getElementById("quiz-feedback");
  feedback.innerHTML = `<div class="quiz-fact" style="margin-top: 20px;">
            <h4 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--accent-gold);">${currentQuizChoices[correctButtonIndex].text}</h4>
            <p style="margin-top: 10px;">${q.fact}</p>
        </div>
        <div style="overflow: hidden; margin-top: 15px;">
            <button class="next-btn" onclick="nextQuestion()">${currentQuizIndex === quizData.length - 1 ? "See Results &rarr;" : "Next Question &rarr;"}</button>
        </div>`;
};

window.nextQuestion = function () {
  currentQuizIndex++;
  renderQuiz();
};

window.retryQuiz = function () {
  currentQuizIndex = 0;
  quizScore = 0;
  renderQuiz();
};

renderQuiz();
