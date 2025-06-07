document.addEventListener("DOMContentLoaded", () => {
    const alunosList = document.getElementById('alunos-list');
    const cursosList = document.getElementById('cursos-list');
    const alunoForm = document.getElementById('aluno-form');
    const cursoForm = document.getElementById('curso-form');
    const apiURL = 'https://twt1restapi-tiagocastro05-1.onrender.com'; // Adjust the API URL as needed

    let editingAlunoId = null; // Track the Aluno being edited
    let editingCursoId = null; // Track the Curso being edited

    // Fetch and display all Alunos
    function fetchAlunos() {
        fetch(`${apiURL}/Alunos`)
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
        fetch(`${apiURL}/cursos`)
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
        fetch(`${apiURL}/Alunos/${id}`, { method: 'DELETE' })
            .then(() => fetchAlunos())
            .catch(error => console.error('Error deleting Aluno:', error));
    }

    // Delete Curso
    function deleteCurso(id) {
        fetch(`${apiURL}/Cursos/${id}`, { method: 'DELETE' })
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
            ? `${apiURL}/Alunos/${editingAlunoId}`
            : editingAlunoId
            ? `${apiURL}/Alunos/${editingAlunoId}`
            : `${apiURL}/Alunos`;

        // Handle ID change by deleting the old entry and creating a new one
        if (editingAlunoId && editingAlunoId !== id) {
            fetch(`${apiURL}/Alunos/${editingAlunoId}`, { method: 'DELETE' })
                .then(() => {
                    fetch(`${apiURL}/Alunos`, {
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
            ? `${apiURL}/Cursos/${editingCursoId}`
            : `${apiURL}/Cursos`;

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


// Procurar aluno por nome
document.getElementById('search-aluno-btn').addEventListener('click', () => {
    const nome = document.getElementById('search-aluno').value.trim();
    if (!nome) return fetchAlunos(); // Se vazio, lista todos

    fetch(`${apiURL}/Alunos/nome/${nome}`)
        .then(res => {
            if (!res.ok) throw new Error('Aluno não encontrado');
            return res.json();
        })
        .then(aluno => {
            alunosList.innerHTML = '';
            const li = document.createElement('li');
            li.textContent = `ID: ${aluno.id}, Nome: ${aluno.nome}, Apelido: ${aluno.apelido}, CursoID: ${aluno.cursoID}`;

            const btnContainer = document.createElement('div');
            btnContainer.style.display = 'flex';
            btnContainer.style.gap = '8px';

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => editAluno(aluno);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteAluno(aluno.id);

            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(deleteBtn);
            li.appendChild(btnContainer);
            alunosList.appendChild(li);
        })
        .catch(error => {
            alunosList.innerHTML = `<li>Aluno não encontrado</li>`;
            console.error(error);
        });
});

// Procurar curso por nome
document.getElementById('search-curso-btn').addEventListener('click', () => {
    const nomeCurso = document.getElementById('search-curso').value.trim();
    if (!nomeCurso) return fetchCursos(); // Se vazio, lista todos

    fetch(`${apiURL}/Cursos/nome/${nomeCurso}`)
        .then(res => {
            if (!res.ok) throw new Error('Curso não encontrado');
            return res.json();
        })
        .then(cursos => {
            cursosList.innerHTML = '';
            cursos.forEach(curso => {
                const li = document.createElement('li');
                li.textContent = `ID: ${curso.id}, Nome do Curso: ${curso.nomeCurso}`;

                const btnContainer = document.createElement('div');
                btnContainer.style.display = 'flex';
                btnContainer.style.gap = '8px';

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.onclick = () => editCurso(curso);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => deleteCurso(curso.id);

                btnContainer.appendChild(editBtn);
                btnContainer.appendChild(deleteBtn);
                li.appendChild(btnContainer);
                cursosList.appendChild(li);
            });
        })
        .catch(error => {
            cursosList.innerHTML = `<li>Curso não encontrado</li>`;
            console.error(error);
        });
});




// Filtrar Alunos
document.getElementById('search-alunos').addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    const alunos = document.querySelectorAll('#alunos-list li');

    alunos.forEach(li => {
        const texto = li.textContent.toLowerCase();
        li.style.display = texto.includes(query) ? 'flex' : 'none';
    });
});

// Filtrar Cursos
document.getElementById('search-cursos').addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    const cursos = document.querySelectorAll('#cursos-list li');

    cursos.forEach(li => {
        const texto = li.textContent.toLowerCase();
        li.style.display = texto.includes(query) ? 'flex' : 'none';
    });
});
