import "./Plan.css";
import TreeChart from "@ssthouse/react-tree-chart";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import "@ssthouse/react-tree-chart/lib/react-tree-chart.css";
import { useEffect, useState, Fragment } from "react";
import getResponse from "../../utils/RequestHandler";
import obj from "../../initJson.json";

function getNode(bigNode, courses, taken) {
  let hasChilds = false;
  courses.map((course) => {
    if (course.prerequisites == bigNode.courseID) hasChilds = true;
  });

  if (hasChilds) {
    let childrens = [];
    courses.map((course) => {
      if (course.prerequisites == bigNode.courseID) childrens.push(course);
    });

    let nodes = [];

    childrens.map((child) => {
      nodes.push(getNode(child, courses, taken));
    });
    if (
      taken.includes(bigNode.courseID) ||
      bigNode.courseName.includes("PLACEMENT TEST") ||
      bigNode.courseName.includes("BASICS OF")
    ) {
      if (
        bigNode.courseName.includes("PLACEMENT TEST") ||
        bigNode.courseName.includes("BASICS OF")
      ) {
        if (taken.includes(bigNode.courseID))
          return {
            value: bigNode.courseName,
            children: nodes,
            color: "#FF2E2E",
          };
        return { value: bigNode.courseName, children: nodes, color: "#8f8f8f" };
      }
      return { value: bigNode.courseName, children: nodes, color: "#FF2E2E" };
    } else return { value: bigNode.courseName, children: nodes };
  } else {
    if (
      taken.includes(bigNode.courseID) ||
      bigNode.courseName.includes("PLACEMENT TEST") ||
      bigNode.courseName.includes("BASICS OF")
    ) {
      if (
        bigNode.courseName.includes("PLACEMENT TEST") ||
        bigNode.courseName.includes("BASICS OF")
      ) {
        if (taken.includes(bigNode.courseID))
          return { value: bigNode.courseName, color: "#FF2E2E" };
      }
      return { value: bigNode.courseName, color: "#FF2E2E" };
    } else return { value: bigNode.courseName };
  }
}
function PlanMain() {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const schoolName = params.get("schoolName");
  const departmentName = params.get("departmentName");
  const year = params.get("year");
  const username = params.get("username");
  const firstName = params.get("fname");
  const lastName = params.get("lname");
  const studentID = params.get("studentID");
  const instructorID = params.get("instructorID");

  const [response, setResponse] = useState(obj);
  const responseData = async () => {
    getResponse(schoolName, departmentName, year, username).then((res) => {
      setResponse(res);
    });
  };
  useEffect(() => {
    responseData();
    console.log("response inside useEffect");
    console.log(response);
    console.log("---------------------------");
  }, []);
  console.log("response outside useEffect");
  console.log(response);
  console.log("---------------------------");
  console.log(obj);
  console.log("---------------------------");

  // --------------------------------------

  const [index, setIndex] = useState(0);
  var universityPlan = response["universityPlan"];
  var facultyPlan = response["studyPlan"];
  var taken = response["takes"];
  const universityPlanGroup = new Map();
  universityPlan.map((course) => {
    if (
      course.preCount == 0 &&
      course.category != "Elective_University_Requirements"
    ) {
      universityPlanGroup.set(course, 0);
    }
  });

  let universityPlanGroupChildren = [];
  for (let [key, value] of universityPlanGroup) {
    universityPlanGroupChildren.push(getNode(key, universityPlan, taken));
  }

  const eUniversiyPlanGroup = new Map();
  universityPlan.map((course) => {
    if (
      course.preCount == 0 &&
      course.category == "Elective_University_Requirements"
    ) {
      eUniversiyPlanGroup.set(course, 0);
    }
  });

  let eUniversiyPlanGroupChildren = [];
  for (let [key, value] of eUniversiyPlanGroup) {
    eUniversiyPlanGroupChildren.push(getNode(key, universityPlan, taken));
  }

  const facultyGroup = new Map();
  facultyPlan.map((course) => {
    if (course.preCount == 0) {
      facultyGroup.set(course, 0);
    }
  });

  let facultyGroupChildren = [];
  for (let [key, value] of facultyGroup) {
    facultyGroupChildren.push(getNode(key, facultyPlan, taken));
  }

  const universityData = {
    value: "University Requirements",
    children: universityPlanGroupChildren,
  };
  const electiveUniversityData = {
    value: "Elective University Requirements",
    children: eUniversiyPlanGroupChildren,
  };

  const facultyData = {
    value: "Faculty Requirements",
    children: facultyGroupChildren,
  };

  let data = universityData;
  if (index == 1) data = electiveUniversityData;
  else if (index == 2) data = facultyData;
  else data = universityData;
  return (
    <div className="testDaoud">
      <header
        className="list"
        style={{
          justifyContent: "space-around",
          position: "fixed",
          width: "100%",
          zIndex: "999",
          height: "auto",
          borderBottom: "5px #FF2E2E solid ",
          marginBottom: "100px",
          boxShadow:
            " 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12",
        }}
      >
        <div
          style={{
            "margin-left": "20px",
          }}
        >
          <img
            alt="logo"
            width="55px"
            src={require("./../../images/logoUniversity.png")}
          />
        </div>
        <div
          style={{
            "margin-top": "5px",
            "margin-left": "25px",
            color: "white",
          }}
        >
          <label>
            {firstName} {lastName}{" "}
            <strong style={{ color: "rgb(238, 251, 238)" }}>|</strong>{" "}
            {studentID}
            {instructorID}{" "}
          </label>
          <br></br>
          <label style={{ textTransform: "uppercase" }}>
            {schoolName} {departmentName}{" "}
            <strong style={{ color: "rgb(238, 251, 238)" }}>|</strong> {year}{" "}
          </label>
          <br></br>
          <strong>
            <a
              style={{
                color: "#FF2E2E",
                "text-decoration-line": "none",
              }}
              href="http://localhost:8080/login"
              onClick={() => {}}
            >
              Logout
            </a>
          </strong>
        </div>
        {!studentID && (
          <div className="listElement">
            <a
              href={
                "http://localhost:8000/downloadCSVPlan/" +
                schoolName +
                "/" +
                departmentName +
                "/" +
                year
              }
              style={{ textDecorationLine: "none", color: "white" }}
            >
              Download This Plan
            </a>
          </div>
        )}
        {!studentID && (
          <div className="listElement">
            <a
              href="http://localhost:8000/downloadCSVUniversityPlan"
              style={{ textDecorationLine: "none", color: "white" }}
            >
              Download University Plan
            </a>
          </div>
        )}
        <div
          className="listElement"
          onClick={() => {
            setIndex(0);
          }}
        >
          University Plan
        </div>
        <div
          className="listElement"
          onClick={() => {
            setIndex(1);
          }}
        >
          Elective University Plan
        </div>
        <div
          className="listElement"
          onClick={() => {
            setIndex(2);
          }}
        >
          Faculty Plan
        </div>
      </header>
      <div className="testDaoud">
        <TransformWrapper initialScale={1}>
          <TransformComponent>
            <TreeChart
              className="testDaoud"
              dataset={data}
              collapseEnabled={true}
              style={{
                width: "1900px",
                height: "5000px",
              }}
              renderCustomNode={({ data, collapsed }) => {
                if (data.color) {
                  return (
                    <div
                      style={{
                        marginTop: "20px",
                        position: "relative",
                        zIndex: "99",
                      }}
                    >
                     {studentID &&  <div
                        className="circle"
                        style={{
                          color: "white",
                          textAlign: "center",
                          margin: "25px",
                          backgroundColor: data.color,
                        }}
                        
                      >
                         {studentID && <div className="tooltip2">
                          {data.value}
                          <span className="tooltiptext2">STILL !</span>
                        </div>}
                        {instructorID && 
                        <div>{data.value}</div>}
                      </div>}
                      {instructorID && 
                       <div
                       className="circle"
                       style={{
                         color: "white",
                         textAlign: "center",
                         margin: "25px",
                         backgroundColor: "#4CAF50",
                       }}
                       
                     >
                        {studentID && <div className="tooltip2">
                         {data.value}
                         <span className="tooltiptext2">STILL !</span>
                       </div>}
                       {instructorID && 
                       <div>{data.value}</div>}
                     </div>}
                    </div>
                  );
                } else {
                  return (
                    <div
                      style={{
                        marginTop: "20px",
                        position: "relative",
                        zIndex: "99",
                      }}
                    >
                      <span
                        className="circle"
                        style={{
                          color: "white",
                          textAlign: "center",
                          margin: "25px",
                          backgroundColor: "#4CAF50",
                        }}
                      >
                        {studentID && <div className="tooltip2">
                          {data.value}
                          <span className="tooltiptext2">STILL !</span>
                        </div>}
                        {instructorID && 
                        <div>{data.value}</div>}
                        
                      </span>
                    </div>
                  );
                }
              }}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}

export default PlanMain;
