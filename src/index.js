// app init
import { cat_img as cat } from "../public/assets/images/cat-img.js";
const app = document.querySelector("#app");
let clickCount = localStorage.getItem("clicks");

const state = {
	closeCount: 0,
	catFacts: [],
	errorMessage: "",
};

// Template
const catModal = `
<div class="modal">
    <div class="cat-card">
        <div class="image-container">
            <img src="${cat}"/>
        </div>
        <div class="cat-facts">
            <button class="close">x</button>
            <div class="content">
                <h1>Cat Facts</h1>
                <p>(Display 5 cat facts here)</p>
                <div class="facts"></div>
            </div>
            
            <button class="get-facts">Get Facts</button>
        </div>
    </div>
<div<
`;

// Methods
const openModal = e => {
	app.style.display = "unset";
	popup.classList.toggle("slide-up");
};

const closeModal = e => {
	e.preventDefault();

	if (clickCount) {
		state.closeCount++;
		localStorage.setItem("clicks", JSON.stringify(state.closeCount));
	}
	if (+clickCount === 1) {
		localStorage.setItem("clicks", JSON.stringify(2));
		state.closeCount = 2;
	}
	if (+clickCount === 2) state.closeCount = 2;
	popup.classList.toggle("slide-down");
	factsContainer.innerHTML = "";
};

const getFacts = async e => {
	e.preventDefault();
	try {
		factsContainer.innerHTML = "";

		const facts = await (
			await fetch("https://cat-fact.herokuapp.com/facts")
		).json();

		state.catFacts = facts.map(fact => fact.text);
		state.catFacts.forEach((fact, index) => {
			const catFact = `
                <p style="font-size: medium; width: 40ch;">
                    ${index + 1}. ${fact}
                </p>`;
			factsContainer.insertAdjacentHTML("beforeend", catFact);
		});
	} catch (error) {
		console.error("Error retreving cat facts");
	}
};

// Close Count Checker
if (+clickCount < 2) {
	app.insertAdjacentHTML("beforeend", catModal);
} else if (+clickCount === 2) {
	state.errorMessage = "You must clear your local storage to see cat modal.";
}

// DOM Elements
const popup = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const getFactsBtn = document.querySelector(".get-facts");
const factsContainer = document.querySelector(".facts");

// Event Listeners
if (!state.errorMessage.length) {
	setTimeout(openModal, 3000);
	closeBtn.addEventListener("click", closeModal);
	getFactsBtn.addEventListener("click", getFacts);
}
