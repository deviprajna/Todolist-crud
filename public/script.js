const API_URL = '/api/tasks';

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');
    const todosContainer = document.querySelector('.todos-container');
    const progressBar = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');
    const taskDescription = document.getElementById('task-description');
    
    const toggleEmptyState = () => {
        if (emptyImage) {
            emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        }
        if (todosContainer) {
            todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
        }
    };

    const updateProgress = () => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;
        
        if (progressBar) {
            progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
        }
        if (progressNumbers) {
            progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;
        }
    };
    
    async function fetchTasks() {
        try {
            const response = await fetch(API_URL);
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Gagal memuat tugas');
            }

            taskList.innerHTML = '';
            
            result.data.forEach(task => {
                addTaskToDOM(task.title, task.isCompleted, task._id, task.description);
            });
            
            toggleEmptyState();
            updateProgress();
        } catch (error) {
            console.error('Error fetching tasks:', error);
            taskList.innerHTML = `<p class="error-message">${error.message}</p>`;
        }
    }

    const addTaskToDOM = (text, completed = false, id = null, description = '') => {
        if (!text) return;
        
        const li = document.createElement('li');
        li.setAttribute('data-id', id || Date.now().toString());
        
        const descriptionHtml = description ? 
            `<p class="task-desc"><i class="fa-regular fa-note-sticky"></i> ${escapeHtml(description)}</p>` : '';
        
        li.innerHTML = `
            <div class="task-content-wrapper">
                <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
                <div class="task-text-wrapper">
                    <span class="task-title ${completed ? 'completed-text' : ''}">${escapeHtml(text)}</span>
                    ${descriptionHtml}
                </div>
            </div>
            <div class="task-buttons">
                <button class="edit-btn" ${completed ? 'disabled' : ''}><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>  
        `; 
        
        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');
        const taskSpan = li.querySelector('.task-title');

        if (completed) {
            li.classList.add('completed');
            if (editBtn) {
                editBtn.disabled = true;
                editBtn.style.opacity = '0.5';
                editBtn.style.pointerEvents = 'none';
            }
        }
        
        checkbox.addEventListener('change', async () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            taskSpan.classList.toggle('completed-text', isChecked);
            
            if (editBtn) {
                editBtn.disabled = isChecked;
                editBtn.style.opacity = isChecked ? '0.5' : '1';
                editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            }
            
            await toggleTask(li.getAttribute('data-id'), isChecked);
            
            updateProgress();
        });
        
        editBtn.addEventListener('click', async () => {
            if (!checkbox.checked) {
                const newText = prompt('Edit tugas:', taskSpan.textContent);
                if (newText !== null && newText.trim() !== '') {
                    taskSpan.textContent = newText.trim();
                    await updateTask(li.getAttribute('data-id'), newText.trim());
                }
            }
        });

        deleteBtn.addEventListener('click', async () => {
            if (confirm('Yakin ingin menghapus tugas ini?')) {
                li.style.animation = 'fadeOut 0.3s forwards';
                await deleteTask(li.getAttribute('data-id'));
                setTimeout(() => {
                    li.remove();
                    toggleEmptyState();
                    updateProgress();
                }, 300);
            }
        });
        
        taskList.appendChild(li);
        toggleEmptyState();
        updateProgress();
    };

    async function addTask() {
        const taskText = taskInput.value.trim();
        const description = taskDescription ? taskDescription.value.trim() : '';
        
        if (!taskText) {
            alert('Please enter a task!');
            return;
        }
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: taskText,
                    description: description || undefined,
                    isCompleted: false,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Gagal menambah tugas');
            }

            addTaskToDOM(taskText, false, result.data._id, description);
            
            taskInput.value = '';
            if (taskDescription) taskDescription.value = '';
            
        } catch (error) {
            alert(error.message);
        }
    }

    async function toggleTask(id, isCompleted) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isCompleted: isCompleted,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Gagal memperbarui tugas');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function updateTask(id, newTitle) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newTitle,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Gagal memperbarui tugas');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function deleteTask(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Gagal menghapus tugas');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addTask();
        });
    }
    
    if (taskInput) {
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTask();
            }
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            to { 
                opacity: 0; 
                transform: translateY(-20px); 
                height: 0;
                padding: 0;
                margin: 0;
                border: none;
            }
        }
        
        .completed-text {
            text-decoration: line-through;
            opacity: 0.7;
        }
        
        .task-content-wrapper {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            flex: 1;
        }
        
        .task-text-wrapper {
            flex: 1;
        }
        
        .task-title {
            display: block;
            font-size: 16px;
            margin-bottom: 4px;
        }
        
        .task-desc {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            margin-top: 4px;
            font-style: italic;
        }
        
        .error-message {
            color: #ff6b6b;
            text-align: center;
            padding: 20px;
        }
        
        .task-buttons {
            display: flex;
            gap: 8px;
        }
        
        .task-buttons button {
            background: transparent;
            border: none;
            cursor: pointer;
            font-size: 16px;
            padding: 5px;
            transition: all 0.2s;
        }
        
        .edit-btn {
            color: #4ecdc4;
        }
        
        .delete-btn {
            color: #ff6b6b;
        }
        
        .edit-btn:hover, .delete-btn:hover {
            transform: scale(1.1);
        }
        
        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            margin: 8px 0;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            transition: all 0.3s;
        }
    `;
    document.head.appendChild(style);
    
    fetchTasks();
});