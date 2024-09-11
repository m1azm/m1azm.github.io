document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('addNoteBtn');
    const noteTitleInput = document.getElementById('noteTitle');
    const noteContentInput = document.getElementById('noteContent');
    const notesList = document.getElementById('notesList');

    // Функция для создания элемента заметки
    function createNoteElement(title, content) {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');

        const noteTitle = document.createElement('h2');
        noteTitle.textContent = title;

        const noteContent = document.createElement('p');
        noteContent.textContent = content;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            notesList.removeChild(noteDiv);
            saveNotes();
        });

        noteDiv.appendChild(noteTitle);
        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(deleteBtn);

        return noteDiv;
    }

    // Функция для загрузки заметок из localStorage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => {
            const noteElement = createNoteElement(note.title, note.content);
            notesList.appendChild(noteElement);
        });
    }

    // Функция для сохранения заметок в localStorage
    function saveNotes() {
        const notes = [];
        document.querySelectorAll('.note').forEach(noteDiv => {
            const title = noteDiv.querySelector('h2').textContent;
            const content = noteDiv.querySelector('p').textContent;
            notes.push({ title, content });
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Загрузка заметок при загрузке страницы
    loadNotes();

    // Обработчик для добавления новой заметки
    addNoteBtn.addEventListener('click', () => {
        const title = noteTitleInput.value.trim();
        const content = noteContentInput.value.trim();

        if (title && content) {
            const noteElement = createNoteElement(title, content);
            notesList.appendChild(noteElement);
            noteTitleInput.value = '';
            noteContentInput.value = '';
            saveNotes();
        } else {
            alert('Пожалуйста, заполните все поля.');
        }
    });
});
