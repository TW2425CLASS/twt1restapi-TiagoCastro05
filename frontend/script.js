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
                    li.textContent = `ID: ${aluno.id}, Nome: ${aluno.nome}, Apelido: ${aluno.apelido}, CursoID: ${aluno.cursoID}`;

                    const btnContainer = document.createElement('div');
                    btnContainer.style.display = 'flex';
                    btnContainer.style.gap = '8px';

                    const editBtn = document.createElement('button');
                    editBtn.textContent = 'Edit';
                    editBtn.onclick = () => editAluno(aluno);

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.onclick = () => deleteAluno(aluno._id); // Usa o _id do MongoDB

                    btnContainer.appendChild(editBtn);
                    btnContainer.appendChild(deleteBtn);

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
        editingAlunoId = aluno._id; // Usa o _id do MongoDB
        alunoForm.querySelector('input[name="id"]').value = aluno.id;
        alunoForm.querySelector('input[name="nome"]').value = aluno.nome;
        alunoForm.querySelector('input[name="apelido"]').value = aluno.apelido;
        alunoForm.querySelector('input[name="cursoID"]').value = aluno.cursoID;
    }
    // Edit Curso
    function editCurso(curso) {
        editingCursoId = curso._id; // Usa o _id do MongoDB
        cursoForm.querySelector('input[name="id"]').value = curso.id;
        cursoForm.querySelector('input[name="nomeCurso"]').value = curso.nomeCurso;
    }

    // Delete Aluno
    function deleteCurso(_id) {
    fetch(`${apiURL}/Cursos/${_id}`, { method: 'DELETE' })
        .then(() => fetchCursos())
        .catch(error => console.error('Error deleting Curso:', error));
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

        const alunoData = { id, nome, apelido, cursoID };

        if (editingAlunoId) {
            fetch(`${apiURL}/Alunos/${editingAlunoId}`, {
              method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(alunoData)
        })
            .then(() => {
                alunoForm.reset();
                editingAlunoId = null;
                fetchAlunos();
            })
            .catch(error => console.error('Error updating Aluno:', error));
         } else {
            fetch(`${apiURL}/Alunos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(alunoData)
        })
            .then(() => {
                alunoForm.reset();
                fetchAlunos();
            })
            .catch(error => console.error('Error creating Aluno:', error));
        }
    });

    // Create or Update Curso
   cursoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = cursoForm.querySelector('input[name="id"]').value;
        const nomeCurso = cursoForm.querySelector('input[name="nomeCurso"]').value;

        const cursoData = { id, nomeCurso };

        if (editingCursoId) {
            fetch(`${apiURL}/Cursos/${editingCursoId}`, {
              method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cursoData)
        })
            .then(() => {
                cursoForm.reset();
                editingCursoId = null;
                fetchCursos();
            })
            .catch(error => console.error('Error updating Curso:', error));
        } else {
            fetch(`${apiURL}/Cursos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cursoData)
        })
            .then(() => {
                cursoForm.reset();
                fetchCursos();
            })
            .catch(error => console.error('Error creating Curso:', error));
        }
    });

    // Initial fetch
    fetchAlunos();
    fetchCursos();
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
