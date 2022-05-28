export default function getAPISubjects(schoolName, departmentName, year,username) {
    async function apiData() {
      
      const response = await fetch("http://localhost:8000/read/get-plan/"+username, {
        method: "post",
        body: JSON.stringify({
          schoolName: schoolName,
          departmentName: departmentName,
          year: year
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      
      return data;
    }
    return apiData();
  }
  