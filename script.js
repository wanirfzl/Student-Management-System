const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const searchInput = document.getElementById("searchInput");

let students =
JSON.parse(localStorage.getItem("students")) || [];

let editIndex = null;

displayStudents();

studentForm.addEventListener("submit", function(e){

    e.preventDefault();

    const id =
    document.getElementById("studentId").value;

    const name =
    document.getElementById("studentName").value;

    const programme =
    document.getElementById("programme").value;

    const student = {
        id,
        name,
        programme
    };

    if(editIndex !== null){

        students[editIndex] = student;

        editIndex = null;

        document.getElementById("submitBtn")
        .textContent = "Add Student";

    }else{

        students.push(student);

    }

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

            <td> ${student.programme} </td>

            <td>

                <button
                    class="btn btn-warning btn-sm me-2"
                    onclick="editStudent(${index})">

                    Edit

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteStudent(${index})">

                    Delete

                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("totalStudents")
    .textContent = students.length;

}

function editStudent(index){

    document.getElementById("studentId").value =
    students[index].id;

    document.getElementById("studentName").value =
    students[index].name;

    document.getElementById("programme").value =
    students[index].programme;

    editIndex = index;

    document.getElementById("submitBtn")
    .textContent = "Update Student";

}

function deleteStudent(index){

    if(confirm("Delete this student?")){

        students.splice(index,1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();

    }

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
