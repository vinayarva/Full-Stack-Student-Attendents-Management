let store_date;

document.getElementById("search").addEventListener("click", (e) => {
  const date = document.getElementById("date");
  store_date = date.value;
  axios
    .post("http://localhost:4000/dateSearch", { date: date.value })
    .then((result) => {
      const data = result.data;
      if (data) {
        document.getElementById("Students_Container").style.display = "none";
        document.getElementById("presentDay_container").style.display = "none";
        document.getElementById("report_container").style.display = "none";

        createForm(data);
      } else {
        document.getElementById("Students_Container").style.display = "none";
        document.getElementById("form_container").style.display = "none";
        document.getElementById("report_container").style.display = "none";

        axios
          .post("http://localhost:4000/DayAttendance", { date: store_date })
          .then((result) => {
            takenAttendance(result.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

document.getElementById("fetchstudents").addEventListener("click", (e) => {
  document.getElementById("presentDay_container").style.display = "none";
  document.getElementById("form_container").style.display = "none";
  document.getElementById("report_container").style.display = "none";

  fetchStudentName()
    .then((result) => {
      displayStudents(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

document.getElementById("fetch").addEventListener("click", (e) => {
  document.getElementById("presentDay_container").style.display = "none";
  document.getElementById("form_container").style.display = "none";
  document.getElementById("Students_Container").style.display = "none";

  axios
    .get("http://localhost:4000/fetchReport")
    .then((result) => {
      displayReport(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

function handleFormSubmit(event) {
  event.preventDefault();

  const students = fetchStudentName();

  students
    .then((result) => {
      const attendanceData = [];

      result.forEach((student) => {
        const attendanceStatusPresent = document.getElementById(
          "P" + student.Id
        ).checked;
        const attendanceStatusAbsent = document.getElementById(
          "A" + student.Id
        ).checked;

        attendanceData.push({
          date: store_date,
          attendance: attendanceStatusPresent ? true : false,
          studentId: student.Id,
        });
      });

      axios
        .post("http://localhost:4000/attendance", attendanceData)
        .then((result) => {
          document.getElementById("form_container").style.display = "none";
          axios
            .post("http://localhost:4000/DayAttendance", { date: store_date })
            .then((result) => {
              takenAttendance(result.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
}

function studentEnterForm(event) {
  event.preventDefault();
  const studentName = event.target.input.value;
  axios
    .post("http://localhost:4000/students", { studentName: studentName })
    .then((result) => {
      event.target.input.value = "";

      displayStudents(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function displayStudents(data) {
  const tbody = document.getElementById("student_tbody");
  tbody.innerHTML = "";

  data.forEach((element) => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.innerText = element.Id;
    tr.appendChild(th);

    const td = document.createElement("td");
    td.innerText = element.studentName;
    tr.appendChild(td);
    tbody.appendChild(tr);
  });

  document.getElementById("Students_Container").style.display = "block";
}

async function fetchStudentName() {
  try {
    const result = await axios.get("http://localhost:4000/students");
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

function createForm(data) {
  const container = document.getElementById("table_form");
  container.innerHTML = "";

  data.forEach((data) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `   
            <th scope="row">${data.Id}</th>
            <td>${data.studentName}</td>
            <td>
                <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name=${data.Id} id="P${data.Id}" value="present">
    <label class="form-check-label" for="P${data.Id}">Present</label>
  </div>           
            </td>
            <td>
            <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name=${data.Id} id="A${data.Id}" value="absent">
    <label class="form-check-label" for="A${data.Id}">Absent</label>
  </div> 
                </td>        
`;
    container.appendChild(tr);
  });

  document.getElementById("form_container").style.display = "block";
}

function takenAttendance(data) {
  const tbody = document.getElementById("taken_tbody");
  tbody.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const user = data[i];

    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.innerText = user.student.Id;
    tr.appendChild(th);

    const td1 = document.createElement("td");
    td1.setAttribute("colspan", "2");
    td1.innerText = user.student.studentName;
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
  document.getElementById("presentDay_container").style.display = "block";
}

function displayReport(data) {
  const tbody = document.getElementById("report_tbody");
  tbody.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const user = data[i];
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <th scope="row">${user.Id}</th>
      <td>${user.studentName}</td>
      <td>${NoOfDayPresent(user.attendances)}/${user.attendances.length}</td>
      <td>${percentage(user.attendances)}</td>`;

    tbody.appendChild(tr);
  }
  document.getElementById("report_container").style.display = "block";
}

function NoOfDayPresent(data) {
  let counter = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].attendance === true) {
      counter++;
    }
  }

  return counter;
}

function percentage(data) {
  let presentDays = NoOfDayPresent(data);

  let total = data.length;
  return Math.floor((presentDays / total) * 100);
}
