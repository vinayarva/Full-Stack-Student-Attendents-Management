const displayForm = document.getElementById("displayForm");
let store_date;


const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    
document.getElementById('date').setAttribute('max', today);


document.getElementById("search").addEventListener("click",(event)=>{

    const date = document.getElementById("date").value
    store_date = date;
  
    axios
      .post("http://localhost:4000/", { date: date })
      .then((result) => {
        if (result.data === false) {
          document.getElementById("success").style.display = "none"
          displayForm.style.display = "block";
        } else {
          displayForm.style.display = "none";
          document.getElementById("success").style.display = "block"
        }
      })
      .catch((err) => {
        console.log(err);
      });


})

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
        document.getElementById("success").style.display = "block"
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

    displayForm.reset();
    displayForm.style.display = "none";

}