const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const searchInput = document.getElementById("searchInput");

let students = JSON.parse(localStorage.getItem("students")) || [];

displayStudents();

studentForm.addEventListener("submit", function(e){

    e.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("studentName").value;
    const programme = document.getElementById("programme").value;

    const student = {
        id,
        name,
        programme
    };

    students.push(student);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();

    studentForm.reset();
});

function displayStudents(){

    studentTable.innerHTML = "";

    students.forEach((student,index)=>{

        studentTable.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.programme}</td>

            <td>
                <button
                class="btn btn-danger btn-sm"
                onclick="deleteStudent(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });

}

function deleteStudent(index){

    students.splice(index,1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();
}

searchInput.addEventListener("keyup", function(){

    const searchValue =
    this.value.toLowerCase();

    const rows =
    studentTable.querySelectorAll("tr");

    rows.forEach(row=>{

        const text =
        row.textContent.toLowerCase();

        row.style.display =
        text.includes(searchValue)
        ? ""
        : "none";

    });

});
