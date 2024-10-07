const displayForm = document.getElementById("displayForm");

const top_container = document.getElementById("top_container");

const formSubmit_container = document.getElementById("formSubmit_container");

const successful_container = document.getElementById("successful_container");

const report_container = document.getElementById("report_container");

const header_date_mark = document.getElementById("header_date_mark");
const header_date_success  =document.getElementById("header_date_success")

const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

document.getElementById("date").setAttribute("max", today);

let store_date;

//search button and event listener

document.getElementById("search").addEventListener("click", (event) => {
  const date = document.getElementById("date").value;

  header_date_success.innerText = "Attendance For Date: "+date;
  header_date_mark.innerText = "Attendance For Date: "+date;
  store_date = date;
  axios
    .post("http://localhost:4000/", { date: date }) //post request of search the date in the database
    .then((result) => {
      if (result.data === false) {
        successful_container.style.display = "none";
        report_container.style.display = "none";    
        formSubmit_container.style.display = "block";
      } else {
        report_container.style.display = "none";
        formSubmit_container.style.display = "none";
        takenAttendance(result.data);
        successful_container.style.display = "block";
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function displayFormSubmit(event) {
  event.preventDefault();


  const studentsAttendance = [
    {
      date: store_date,
      studentName: "Student-1",
      attendance: event.target.student1.value === "present" ? true : false,
    },
    {
      date: store_date,
      studentName: "Student-2",
      attendance: event.target.student2.value === "present" ? true : false,
    },
    {
      date: store_date,
      studentName: "Student-3",
      attendance: event.target.student3.value === "present" ? true : false,
    },
    {
      date: store_date,
      studentName: "Student-4",
      attendance: event.target.student4.value === "present" ? true : false,
    },
    {
      date: store_date,
      studentName: "Student-5",
      attendance: event.target.student5.value === "present" ? true : false,
    },
  ];
  axios
    .post("http://localhost:4000/attendance", studentsAttendance)
    .then((result) => {
      takenAttendance(studentsAttendance)
    })
    .catch((err) => {
      console.log(err);
    });

  displayForm.reset();
  formSubmit_container.style.display = "none";
}

const students = [
  { studentName: "Student-1" },
  { studentName: "Student-2" },
  { studentName: "Student-3" },
  { studentName: "Student-4" },
  { studentName: "Student-5" },
];

document.getElementById("fetch").addEventListener("click", (e) => {
 
  axios
    .post("http://localhost:4000/fetch", students)
    .then((result) => {
      // console.log(result.data);
      displayReport(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

function displayReport(data) {
  successful_container.style.display = "none";
  formSubmit_container.style.display = "none";

  const tbody = document.getElementById("report_tbody");
  tbody.innerHTML =""

  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.innerText = i + 1;
    th.setAttribute("scope", "col");
    tr.appendChild(th);

    Object.values(data[i]).forEach((value) => {
      const td = document.createElement("td");
      td.innerText = value;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }

  report_container.style.display = "block";
}

function takenAttendance(data) {

  // console.log(data)
  const tbody = document.getElementById("taken_tbody");
  tbody.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const user = data[i];

    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.innerText = i + 1;
    tr.appendChild(th);

    const td1 = document.createElement("td");
    td1.setAttribute("colspan", "2");
    td1.innerText = user.studentName;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    if (user.attendance) {
      td2.innerText = "Present";
      tr.classList.add("table-success");
    } else {
      td2.innerText = "Absent";
      tr.classList.add("table-danger");
    }
    tr.appendChild(td2);
    tbody.appendChild(tr);
  }

  successful_container.style.display = "block";
}
