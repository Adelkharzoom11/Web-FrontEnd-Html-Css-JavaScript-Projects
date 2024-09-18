let projects = [];

// Fetch and display projects on initial load
async function fetchProjects() {
    projects = JSON.parse(localStorage.getItem('projects')) || [];
    displayProjects();
}

// Display projects and tasks
function displayProjects() {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';

    const searchQuery = document.getElementById('projectSearch')?.value.toLowerCase() || '';

    projects.forEach(project => {
        if (project.name.toLowerCase().includes(searchQuery)) {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');

            const projectTitle = document.createElement('h2');
            projectTitle.textContent = project.name;
            projectDiv.appendChild(projectTitle);

            const viewTasksBtn = document.createElement('button');
            viewTasksBtn.textContent = 'View Tasks';
            viewTasksBtn.classList.add('btn');
            viewTasksBtn.onclick = () => {
                localStorage.setItem('currentProjectId', project.id);
                window.location.href = 'view-tasks.html';
            };
            projectDiv.appendChild(viewTasksBtn);

            const editProjectBtn = document.createElement('button');
            editProjectBtn.textContent = 'Edit Project';
            editProjectBtn.classList.add('btn');
            editProjectBtn.onclick = () => {
                localStorage.setItem('editProjectId', project.id);
                window.location.href = 'edit-project.html';
            };
            projectDiv.appendChild(editProjectBtn);

            const addTaskBtn = document.createElement('button');
            addTaskBtn.textContent = 'Add Task';
            addTaskBtn.classList.add('btn');
            addTaskBtn.onclick = () => {
                localStorage.setItem('currentProjectId', project.id);
                window.location.href = 'add-task.html';
            };
            projectDiv.appendChild(addTaskBtn);

            const deleteProjectBtn = document.createElement('button');
            deleteProjectBtn.textContent = 'Delete Project';
            deleteProjectBtn.classList.add('btn');
            deleteProjectBtn.onclick = () => {
                if (confirm('Are you sure you want to delete this project and its tasks?')) {
                    projects = projects.filter(p => p.id !== project.id);
                    localStorage.setItem('projects', JSON.stringify(projects));
                    displayProjects();
                }
            };
            projectDiv.appendChild(deleteProjectBtn);

            projectList.appendChild(projectDiv);
        }
    });
}

// Add new project
document.getElementById('projectForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDescription').value;
    const newProject = {
        id: Date.now(), // Unique ID
        name,
        description,
        tasks: []
    };

    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    window.location.href = 'index.html';
});

// Edit project
document.getElementById('editProjectForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = parseInt(localStorage.getItem('editProjectId'));
    const project = projects.find(p => p.id === id);

    if (project) {
        project.name = document.getElementById('editProjectName').value;
        project.description = document.getElementById('editProjectDescription').value;

        localStorage.setItem('projects', JSON.stringify(projects));
        window.location.href = 'index.html';
    }
});

// Add task to project
document.getElementById('taskForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const projectId = parseInt(localStorage.getItem('currentProjectId'));
    const project = projects.find(p => p.id === projectId);

    if (project) {
        const newTask = {
            taskId: Date.now(), // Unique ID
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            dueDate: document.getElementById('dueDate').value,
            completed: false
        };

        project.tasks.push(newTask);
        localStorage.setItem('projects', JSON.stringify(projects));
        window.location.href = 'index.html';
    } else {
        alert('Project not found');
    }
});

// Display tasks for a project
function displayTasks() {
    const projectId = parseInt(localStorage.getItem('currentProjectId'));
    const project = projects.find(p => p.id === projectId);

    if (project) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        const searchQuery = document.getElementById('taskSearch')?.value.toLowerCase() || '';

        project.tasks.forEach(task => {
            if (task.title.toLowerCase().includes(searchQuery)) {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');

                const taskTitle = document.createElement('h3');
                taskTitle.textContent = task.title;
                taskDiv.appendChild(taskTitle);

                const taskDetails = document.createElement('p');
                taskDetails.textContent = `Description: ${task.description}, Due Date: ${task.dueDate}`;
                taskDiv.appendChild(taskDetails);

                taskList.appendChild(taskDiv);
            }
        });
    }
}

// On document ready
document.addEventListener('DOMContentLoaded', function() {
    fetchProjects();

    // Display tasks if on the view-tasks page
    if (document.getElementById('taskList')) {
        displayTasks();
    }

    // Add search event listeners
    document.getElementById('projectSearch')?.addEventListener('input', displayProjects);
    document.getElementById('taskSearch')?.addEventListener('input', displayTasks);
});
