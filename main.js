"use strict";

// format: "activity": goal (minutes)
let activities = new Map();

function renderPage() {
    let pageBody = document.getElementById("app");
    pageBody.innerHTML = `<h1>activity tracker</h1>
    
    <h2>current activities</h2>
    <section id="list_of_activities"></section>

    <h2>add activity</h2>
    <div><form id="add_activity"> 
        <label>activity name: </label> <input type="text" id="activity" required /><br />
        <label>goal time/day: </label> <input type="number" id="goal" required /><br />
        <input type="submit" />
    </form></div>`;

    // for add activity form
    const formAddActivity = document.getElementById("add_activity");
    formAddActivity.addEventListener('submit', (event) => {
        event.preventDefault();

        const activity = document.getElementById("activity").value;
        const goalNumber = +document.getElementById("goal").value;
        const timeSpent = 0;

        activities.set(activity, [timeSpent, goalNumber]);
        renderList();

        formAddActivity.reset();
    });
}



function renderList() {
    let listBody = document.getElementById("list_of_activities");
    let listElements = [];

    for (let [activity, time] of activities) {
        listElements.push(`<div><li>
                <span class="bold-text">${activity}</span> goal: ${time[0]}/${time[1]} minutes
                <form id="log_${activity}">
                    <label>log time: </label> <input type="number" id="time_spent_${activity}" required />
                    <input type="submit" />
                </form>
            </li></div>`
        );
    }

    listBody.innerHTML = `
    <ul>
    ${listElements.join("")}
    </ul>`;

    for (let [activity] of activities) {
        const formLogActivity = document.getElementById(`log_${activity}`);
        if (!formLogActivity) {
            continue;
        }

        formLogActivity.addEventListener('submit', (event) => {
            event.preventDefault();
            const timeOnActivity = +document.getElementById(`time_spent_${activity}`).value;
            activities.get(activity)[0] += timeOnActivity;
            renderList();
        });
    }
}

renderPage();
