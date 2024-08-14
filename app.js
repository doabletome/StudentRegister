let hamburger = document.querySelector("#hamburger");
let menu = document.querySelector("#menu");
let register = document.querySelector(".register");
let studentsTableBody = document.getElementById("studentsTableBody");
let hlinks = document.querySelectorAll(".hlink");

for (let hlink of hlinks) {
  hlink.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}

hamburger.addEventListener("click", function (e) {
  menu.classList.toggle("hidden");
  hamburger.classList.toggle("bg-white");
});

// Function to save form data to local storage
function saveFormData() {
  // Get existing students from local storage or initialize as empty array
  let students = JSON.parse(localStorage.getItem("students")) || [];

  //Get current form data
  const studentData = {
    studentName: document.getElementById("studentName").value,
    studentID: document.getElementById("studentID").value,
    emailID: document.getElementById("emailID").value,
    contactNumber: document.getElementById("contactNumber").value,
    country: document.getElementById("country").value,
  };

  //pushing new student obj in student array
  students.push(studentData);

  // storing the updated array in local storage
  localStorage.setItem("students", JSON.stringify(students));

  //reset the form
  register.reset();

  // rerender table

  renderStudentTable();
}

function renderStudentTable() {
  // get the students array
  let students = JSON.parse(localStorage.getItem("students")) || [];

  studentsTableBody.innerHTML = "";

  students.forEach((student, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
    <td class="border px-4 py-2">${index + 1}</td>
    <td class="border px-4 py-2">${student.studentName}</td>
    <td class="border px-4 py-2">${student.studentID}</td>
    <td class="border px-4 py-2">${student.emailID}</td>
    <td class="border px-4 py-2">${student.contactNumber}</td>
    <td class="border px-4 py-2">${student.country}</td>
    <td class="border px-4 py-2"><div  class="flex gap-4">
    <div> <a id="deleteBtn"  class="deleteBtn border shadow-lg bg-red-400 p-2 rounded-lg hover:cursor-pointer" data-id="${
      student.studentID
    }">Delete</a></div>
    <div> <a id="editBtn"  class="border shadow-lg bg-blue-400 p-2 hover:cursor-pointer rounded-lg" data-index="${index}">Edit</a></div>
   
   </div></td>
`;

    studentsTableBody.appendChild(row);
  });

  //envent handlers for all delete button
  document.querySelectorAll("#deleteBtn").forEach((button) => {
    button.addEventListener("click", function () {
      console.log("delete");
      const studentID = this.getAttribute("data-id");
      console.log(studentID);
      deleteStudent(studentID);
    });
  });

  // Event listeners for edit buttons
  document.querySelectorAll("#editBtn").forEach((button) => {
    button.addEventListener("click", function () {
      console.log("edit click");
      const index = this.getAttribute("data-index");
      editStudent(index);
    });
  });
}

function editStudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  let student = students[index];

  // Populate the form with the current data
  document.getElementById("editStudentIndex").value = index;
  document.getElementById("editStudentName").value = student.studentName;
  document.getElementById("editStudentID").value = student.studentID;
  document.getElementById("editEmailID").value = student.emailID;
  document.getElementById("editContactNumber").value = student.contactNumber;
  document.getElementById("editCountry").value = student.country;

  // Show the form
  document.getElementById("editFormContainer").style.display = "block";
}

document
  .getElementById("editStudentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let index = document.getElementById("editStudentIndex").value;

    students[index].studentName =
      document.getElementById("editStudentName").value;
    students[index].studentID = document.getElementById("editStudentID").value;
    students[index].emailID = document.getElementById("editEmailID").value;
    students[index].contactNumber =
      document.getElementById("editContactNumber").value;
    students[index].country = document.getElementById("editCountry").value;

    // Update local storage and re-render the table
    localStorage.setItem("students", JSON.stringify(students));
    renderStudentTable();

    // Hide the form after saving
    document.getElementById("editFormContainer").style.display = "none";
    alert("Student data Updated!!");
  });

function deleteStudent(studentID) {
  let students = JSON.parse(localStorage.getItem("students")) || [];

  // Find the index of the student with the given studentID
  const index = students.findIndex(
    (student) => student.studentID === studentID
  );

  if (index !== -1) {
    students.splice(index, 1); // Remove the student from the array
    localStorage.setItem("students", JSON.stringify(students)); // Update local storage
    renderStudentTable(); // Re-render the table to reflect the changes
    alert("Student data Deleted");
  }
}

// Event listener to save data on form submit
register.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  saveFormData(); // Save form data to local storage
  alert("Student information saved successfully!");
});

let cancelBtn = document.querySelector("#cancel");
cancelBtn.addEventListener("click", function (e) {
  document.getElementById("editFormContainer").style.display = "none";
});

// Load and render the students table when the page loads
window.addEventListener("load", renderStudentTable);

function allLetter(inputtxt) {
  var letters = /^[A-Za-z\s]+$/;
  if (inputtxt.value.match(letters)) {
    return true;
  } else {
    alert("Enter Valid Student Name");
    register.reset();
    return false;
  }
}
