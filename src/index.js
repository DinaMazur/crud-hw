


const getStudentsBtn = document.getElementById('get-students-btn');
const studentsTableBody = document.querySelector('#students-table tbody');
getStudentsBtn.addEventListener('click', getStudents);

async function getStudents() {
    try {

        const response = await fetch('students.json'
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        if (!response.ok) {
            throw new Error(`HTTP error! Статус: ${response.status}`);
        }

        const data = await response.json();

        renderStudents(data.students);
    } catch (err) {
        console.error('Помилка при завантаженні студентів:', err);
        alert('Не вдалося отримати студентів з сервера');
    }
}


function renderStudents(students) {
    studentsTableBody.innerHTML = '';

    students.forEach(({ id, name, age, course, skills, email, isEnrolled }) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${id}</td>
      <td>${name}</td>
      <td>${age}</td>
      <td>${course}</td>
      <td>${skills.join(', ')}</td>
      <td>${email}</td>
      <td>${isEnrolled ? 'Enrolled' : 'Not Enrolled'}</td>
      <td><!-- Edit / Delete --></td>
    `;
        studentsTableBody.appendChild(tr);
    });
}
