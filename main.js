"use strict";

/*

tile placeholder:

<div class="tile">
            <div class="tile_header">
                <div class="tile_heading">${}</div>
            </div>
            <div class="tile_body">
                <div class="tile_content">content</div>
            </div>
        </div>

*/

function GENERATE_ID() {
    return crypto.randomUUID();
}

let activities = [];

const STATE = Object.freeze({
    NOT_STARTED: "not started",
    IN_PROGRESS: "in progress",
    COMPLETED: "completed",
});

const PRIORITY = Object.freeze({
    LOW: "low priority",
    MEDIUM: "medium priority",
    HIGH: "high priority",
});

const formAddActivity = document.getElementById("form_add_activity");
formAddActivity.addEventListener('submit', (formEvent) => {
    formEvent.preventDefault();

    const formData = new FormData(formAddActivity);
    let activity = {
        task_name: "",
        task_date_due: "",
        task_goal_time: "",
        task_priority: "",
        task_time_to_complete: "",
        task_recurrence_id: 0,
        task_project_id: 0,

        date_created: new Date(),
        time_spent: 0,
        id: GENERATE_ID(),
        status: STATE.NOT_STARTED,
        started_at: null,
        completed_at: null,
        last_modified_at: null,
        archived: false,
    };

    for (let [key, value] of formData.entries()) {
        activity[key] = value;
    }

    activities.push(activity);

    formAddActivity.reset();

    mainContainer.innerHTML = renderProgressPage();
});

/*
create new activity -> form_add_activity
collecting: 
task_name, 
task_date_due, 
task_goal_time, 
task_priority, 
task_time_to_complete, 
task_recurrence_id, 
task_project_id

data to generate: 
date created, 
time spent (0), 
id (unique), 
status (not started initially, 
started at (date), 
completed at (date), 
last modified at (today), 
archived? bool

*/


let recurrences = [];

const formAddRecurrence = document.getElementById("form_add_recurrence");
formAddRecurrence.addEventListener('submit', (formEvent) => {
    formEvent.preventDefault();

    const formData = new FormData(formAddRecurrence);
    let recurrence = {
        recurrence_name: "",
        recurrence_rule: "",
        recurrence_start_date: null,
        recurrence_end_date: null,
        id: GENERATE_ID(),
        active: false,
    };

    for (let [key, value] of formData.entries()) {
        recurrence[key] = value;
    }

    recurrences.push(recurrence);
    formAddRecurrence.reset();
});

/*
create new recurrence -> form_add_recurrence
collecting: recurrence_name, recurrence_rule, recurrence_start_date, recurrence_end_date
*/


let projects = [];

const formAddProject = document.getElementById("form_add_project");
formAddProject.addEventListener('submit', (formEvent) => {
    formEvent.preventDefault();

    let formData = new FormData(formAddProject);
    let project = {
        project_name: "",
        project_color: "",
        project_goal: "",
    };

    for (let [key, value] of formData.entries()) {
        project[key] = value;
    }

    projects.push(project);
    formAddProject.reset();
});

/*
create new project -> form_add_project
collecting: project_name, project_color, project_goal 

*/


// updating page content section
const mainContainer = document.getElementById("content_container");

const buttonProgressPage = document.getElementById("nav_view_progress");
buttonProgressPage.addEventListener('click', (buttonEvent) => {
    mainContainer.innerHTML = renderProgressPage();
});

const buttonActivitiesPage = document.getElementById("nav_manage_activities");
buttonActivitiesPage.addEventListener('click', (buttonEvent) => {
    mainContainer.innerHTML = renderActivitiesPage();

});

const buttonAnalyticsPage = document.getElementById("nav_analytics");
buttonAnalyticsPage.addEventListener('click', (buttonEvent) => {
    mainContainer.innerHTML = renderAnalyticsPage();

});

const buttonSettingsPage = document.getElementById("nav_settings");
buttonSettingsPage.addEventListener('click', (buttonEvent) => {
    mainContainer.innerHTML = renderSettingsPage();

});

// rendering HTML CONTENT for updating page section
// lists
function renderActivityList() {
    let listOfActivities = [];

    for (const activity of activities) {
        const { task_name, task_date_due, task_goal_time, task_priority, time_spent, status, task_time_to_complete } = activity;

        listOfActivities.push(`<div class="tile">
        <div class="tile_header">
            <div class="tile_heading">${task_name}</div>
            <button class="universal_button time_button">take action</button>
        </div>
        <div class="tile_body">
            <div class="tile_content">due: ${task_date_due}</div>
            <div class="tile_content">${task_goal_time ? `progress: ${time_spent} / ${task_goal_time}` : `goal: ${task_time_to_complete}`} minutes </div>
            <div class="tile_content">priority: ${task_priority}</div>
            <div class="tile_content">status: ${status}</div>
        </div>
    </div>`);
    }

    return listOfActivities.join("") || "no activities yet";;
}

function renderProjectList() {
    let listOfProjects = [];

    for (const project of projects) {
        const { project_name, project_color, project_goal } = project;
        listOfProjects.push(`<div class="tile" style="border-color: ${project_color}; background: ${project_color}20;">
            <div class="tile_header">
                <div class="tile_heading">${project_name}</div>
            </div>
            <div class="tile_body">
                <div class="tile_content">goal: ${project_goal}</div>
            </div>
        </div>`);
    }

    return listOfProjects.join("") || "no projects yet";
}

function renderRecurrenceList() {
    let listofRecurrences = [];

    for (const recurrence of recurrences) {
        const { recurrence_name, recurrence_rule, recurrence_start_date, recurrence_end_date } = recurrence;
        listofRecurrences.push(`<div class="tile">
            <div class="tile_header">
                <div class="tile_heading">${recurrence_name}</div>
            </div>
            <div class="tile_body">
                <div class="tile_content">repeat rule: ${recurrence_rule}</div>
                <div class="tile_content">start date: ${recurrence_start_date}</div>
                <div class="tile_content">end date: ${recurrence_end_date}</div>
            </div>
        </div>`);
    }

    return listofRecurrences.join("") || "no recurrences yet";
}
// main page content
function renderProgressPage() {
    return `<div class="progress_page">
        <div class="section_header">view your tasks</div>
        <div class="tile_container">
            ${renderActivityList()}
        </div>
    </div>`;
}

function renderActivitiesPage() {
    return `<div class="add_activity_page">
        ${renderActivityForm()}
        ${renderProjectForm()}
        ${renderRecurrenceForm()}
    </div>`;
}

function renderAnalyticsPage() {
    return `<div class="analytics_page">
            <div class="section_header">analytics section</div>
            <div>there is nothing</div>
        </div>`;
}

function renderSettingsPage() {
    return `<div class="settings_page">
            <div class="section_header">settings</div>
            <div>there is nothing</div>
        </div>`;
}

function startup() {
    mainContainer.innerHTML = renderProgressPage();
}


function renderActivityForm() {
    return `<div class="section_header">add activity section</div>

            <div class="tile">
                <div class="tile_header">
                    <div class="tile_heading">create new activity</div>
                </div>

                <form id="form_add_activity">
                    <div class="form_grid">
                        <label for="task_name">name</label>
                        <input id="task_name" name="task_name" type="text" required />

                        <label for="task_date_due">due</label>
                        <input id="task_date_due" name="task_date_due" type="date" required />

                        <label for="task_goal_time">goal time to spend in minutes each day </label>
                        <input id="task_goal_time" name="task_goal_time" type="number" />

                        <label for="task_priority">priority ( 1 to 3, 1 is weakest )</label>
                        <input id="task_priority" name="task_priority" type="number" required />

                        <label for="task_time_to_complete">estimated time to complete (minutes)</label>
                        <input id="task_time_to_complete" name="task_time_to_complete" type="number" />

                        <label for="task_recurrence_id">recurrence id (create a new one below)</label>
                        <input id="task_recurrence_id" name="task_recurrence_id" type="number" />

                        <label for="task_project_id">project id (create a new one below)</label>
                        <input id="task_project_id" name="task_project_id" type="number" />
                    </div>

                    <div class="form_actions">
                        <button type="submit" class="universal_button">add activity</button>
                    </div>
                </form>
            </div>`;
}

function renderRecurrenceForm() {
    return `<button class="universal_button">add new recurrence pattern</button>
            <div class="tileContainer">${renderRecurrenceList()}</div>

            <div class="tile">
                <div class="tile_header">
                    <div class="tile_heading">create new recurrence</div>
                </div>

                <form id="form_add_recurrence">
                    <div class="form_grid">
                        <label for="recurrence_name">name</label>
                        <input id="recurrence_name" name="recurrence_name" type="text" required />

                        <label for="recurrence_rule">recurrence rule (string)</label>
                        <input id="recurrence_rule" name="recurrence_rule" type="text" required />

                        <label for="recurrence_start_date">start date</label>
                        <input id="recurrence_start_date" name="recurrence_start_date" type="date" required />

                        <label for="recurrence_end_date">end date</label>
                        <input id="recurrence_end_date" name="recurrence_end_date" type="date" />
                    </div>

                    <div class="form_actions">
                        <button type="submit" class="universal_button">add recurrence</button>

                    </div>
                </form>
            </div>`;
}

function renderProjectForm() {
    return `<button class="universal_button">add new project</button>

            <div class="tileContainer">${renderProjectList()}</div>
            <div class="tile">
                <div class="tile_header">
                    <div class="tile_heading">create new project</div>
                </div>

                <form id="form_add_project">
                    <div class="form_grid">
                        <label for="project_name">name of project</label>
                        <input id="project_name" name="project_name" type="text" required />

                        <label for="project_color">color</label>
                        <select id="project_color" name="project_color" required>
                            <option value="#ffadad">red</option>
                            <option value="#ffd6a5">orange</option>
                            <option value="#fdffb6">yellow</option>
                            <option value="#caffbf">green</option>
                            <option value="#add8e6">blue</option>
                            <option value="#bdb2ff">indigo</option>
                            <option value="#ffc6ff">violet</option>
                        </select>

                        <label for="project_goal">goal for project (optional)</label>
                        <input id="project_goal" name="project_goal" type="text" />
                    </div>

                    <div class="form_actions">
                        <button type="submit" class="universal_button">add project</button>
                    </div>
                </form>
            </div>`;
}


function parseRecurrenceString() {

}

startup();