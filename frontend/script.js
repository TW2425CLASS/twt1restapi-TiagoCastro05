document.addEventListener("DOMContentLoaded", () => {
    const alunosList = document.getElementById('alunos-list');
    const cursosList = document.getElementById('cursos-list');
    const alunoForm = document.getElementById('aluno-form');
    const cursoForm = document.getElementById('curso-form');

    let editingAlunoId = null; // Track the Aluno being edited
    let editingCursoId = null; // Track the Curso being edited

    // Fetch and display all Alunos
    function fetchAlunos() {
        fetch('https://twt1restapi-tiago-castro05.vercel.app/alunos')
            .then(response => response.json())
            .then(alunos => {
                const alunosList = document.getElementById('alunos-list');
                alunosList.innerHTML = '';
                alunos.forEach(aluno => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${aluno.id}, Nome: ${aluno.nome}, Apelido: ${aluno.apelido}, CursoID: ${aluno.cursoID} `;

                    // Create a container for the buttons
                    const btnContainer = document.createElement('div');
                    btnContainer.style.display = 'flex';
                    btnContainer.style.gap = '8px';

                    // Edit button
                    const editBtn = document.createElement('button');
                    editBtn.textContent = 'Edit';
                    editBtn.onclick = () => editAluno(aluno);

                    // Delete button
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.onclick = () => deleteAluno(aluno.id);

                    btnContainer.appendChild(editBtn);
                    btnContainer.appendChild(deleteBtn);

                    // Clear li and add text and buttons
                    li.textContent = `ID: ${aluno.id}, Nome: ${aluno.nome}, Apelido: ${aluno.apelido}, CursoID: ${aluno.cursoID}`;
                    li.appendChild(btnContainer);
                    alunosList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching Alunos:', error));
    }

    // Fetch and display all Cursos
    function fetchCursos() {
        fetch('https://twt1restapi-tiago-castro05.vercel.app/cursos')
            .then(response => response.json())
            .then(cursos => {
                const cursosList = document.getElementById('cursos-list');
                cursosList.innerHTML = '';
                cursos.forEach(curso => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${curso.id}, Nome do Curso: ${curso.nomeCurso} `;

                    // Create a container for the buttons
                    const btnContainer = document.createElement('div');
                    btnContainer.style.display = 'flex';
                    btnContainer.style.gap = '8px';

                    // Edit button
                    const editBtn = document.createElement('button');
                    editBtn.textContent = 'Edit';
                    editBtn.onclick = () => editCurso(curso);

                    // Delete button
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.onclick = () => deleteCurso(curso.id);

                    btnContainer.appendChild(editBtn);
                    btnContainer.appendChild(deleteBtn);

                    // Clear li and add text and buttons
                    li.textContent = `ID: ${curso.id}, Nome do Curso: ${curso.nomeCurso}`;
                    li.appendChild(btnContainer);
                    cursosList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching Cursos:', error));
    }

    // Edit Aluno
    function editAluno(aluno) {
        editingAlunoId = aluno.id;
        alunoForm.querySelector('input[name="id"]').value = aluno.id;
        alunoForm.querySelector('input[name="nome"]').value = aluno.nome;
        alunoForm.querySelector('input[name="apelido"]').value = aluno.apelido;
        alunoForm.querySelector('input[name="cursoID"]').value = aluno.cursoID;
    }

    // Edit Curso
    function editCurso(curso) {
        editingCursoId = curso.id;
        cursoForm.querySelector('input[name="id"]').value = curso.id;
        cursoForm.querySelector('input[name="nomeCurso"]').value = curso.nomeCurso;
    }

    // Delete Aluno
    function deleteAluno(id) {
        fetch(`https://twt1restapi-tiago-castro05.vercel.app/Alunos/${id}`, { method: 'DELETE' })
            .then(() => fetchAlunos())
            .catch(error => console.error('Error deleting Aluno:', error));
    }

    // Delete Curso
    function deleteCurso(id) {
        fetch(`https://twt1restapi-tiago-castro05.vercel.app/Cursos/${id}`, { method: 'DELETE' })
            .then(() => fetchCursos())
            .catch(error => console.error('Error deleting Curso:', error));
    }

    // Create or Update Aluno
    alunoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = alunoForm.querySelector('input[name="id"]').value;
        const nome = alunoForm.querySelector('input[name="nome"]').value;
        const apelido = alunoForm.querySelector('input[name="apelido"]').value;
        const cursoID = alunoForm.querySelector('input[name="cursoID"]').value;

        const method = editingAlunoId && editingAlunoId !== id ? 'DELETE' : editingAlunoId ? 'PUT' : 'POST';
        const url = editingAlunoId && editingAlunoId !== id
            ? `https://twt1restapi-tiago-castro05.vercel.app/Alunos/${editingAlunoId}`
            : editingAlunoId
            ? `https://twt1restapi-tiago-castro05.vercel.app/Alunos/${editingAlunoId}`
            : 'https://twt1restapi-tiago-castro05.vercel.app/Alunos';

        // Handle ID change by deleting the old entry and creating a new one
        if (editingAlunoId && editingAlunoId !== id) {
            fetch(`https://twt1restapi-tiago-castro05.vercel.app/Alunos/${editingAlunoId}`, { method: 'DELETE' })
                .then(() => {
                    fetch('https://twt1restapi-tiago-castro05.vercel.app/Alunos', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id, nome, apelido, cursoID })
                    })
                        .then(() => {
                            alunoForm.reset();
                            editingAlunoId = null;
                            fetchAlunos();
                        })
                        .catch(error => console.error('Error creating Aluno with new ID:', error));
                })
                .catch(error => console.error('Error deleting old Aluno:', error));
        } else {
            fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, nome, apelido, cursoID })
            })
                .then(() => {
                    alunoForm.reset();
                    editingAlunoId = null;
                    fetchAlunos();
                })
                .catch(error => console.error(`Error ${editingAlunoId ? 'updating' : 'creating'} Aluno:`, error));
        }
    });

    // Create or Update Curso
    cursoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = cursoForm.querySelector('input[name="id"]').value;
        const nomeCurso = cursoForm.querySelector('input[name="nomeCurso"]').value;

        const method = editingCursoId ? 'PUT' : 'POST';
        const url = editingCursoId
            ? `https://twt1restapi-tiago-castro05.vercel.app/Cursos/${editingCursoId}`
            : 'https://twt1restapi-tiago-castro05.vercel.app/Cursos';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, nomeCurso })
        })
            .then(() => {
                cursoForm.reset();
                editingCursoId = null;
                fetchCursos();
            })
            .catch(error => console.error(`Error ${editingCursoId ? 'updating' : 'creating'} Curso:`, error));
    });

    // Initial fetch
    fetchAlunos();
    fetchCursos();
});