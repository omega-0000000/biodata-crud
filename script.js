let students = JSON.parse(localStorage.getItem('students')) || [];

document.getElementById('saveButton').addEventListener('click', saveStudent);

function saveStudent() {
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;
    const gender = document.getElementById("gender").value;
    const className = document.getElementById("class").value;

    const student = { name, dob, address, gender, className };
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    clearFields();
}

function displayStudents() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';

    if (students.length === 0) {
        resultDiv.innerHTML = '<p>Tidak ada data siswa.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'table';
    table.innerHTML = `
        <tr>
            <th>Nama</th>
            <th>Tanggal Lahir</th>
            <th>Alamat</th>
            <th>Jenis Kelamin</th>
            <th>Kelas</th>
            <th>Aksi</th>
        </tr>
    `;

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.dob}</td>
            <td>${student.address}</td>
            <td>${student.gender}</td>
            <td>${student.className}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Hapus</button>
            </td>
        `;
        table.appendChild(row);
    });

    resultDiv.appendChild(table);
}

function clearFields() {
    document.getElementById("name").value = '';
    document.getElementById("dob").value = '';
    document.getElementById("address").value = '';
    document.getElementById("gender").value = 'laki-laki';
    document.getElementById("class").value = '';
}

function editStudent(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("dob").value = student.dob;
    document.getElementById("address").value = student.address;
    document.getElementById("gender").value = student.gender;
    document.getElementById("class").value = student.className;

    document.getElementById('saveButton').onclick = function() {
        updateStudent(index);
    };
}

function updateStudent(index) {
    students[index].name = document.getElementById("name").value;
    students[index].dob = document.getElementById("dob").value;
    students[index].address = document.getElementById("address").value;
    students[index].gender = document.getElementById("gender").value;
    students[index].className = document.getElementById("class").value;

    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    clearFields();
    document.getElementById('saveButton').onclick = saveStudent; // Reset to save
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

// Initial display of students
displayStudents();
