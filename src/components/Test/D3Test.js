import './Test.css';
import TreeChart from "react-d3-tree";
import "@ssthouse/react-tree-chart/lib/react-tree-chart.css";
import { useEffect, useState } from 'react';
import getResponse from "../../utils/RequestHandler";
import obj from "../../test1.json"
function getNode(bigNode,courses,taken){
    
    let hasChilds = false;
    courses.map((course)=>{
        if(course.prerequisites==bigNode.courseID)
            hasChilds=true;
    });
   
    if(hasChilds){
        let childrens = [];
        courses.map((course)=>{
            if(course.prerequisites==bigNode.courseID)
                childrens.push(course);
        });

        let nodes = [];

        childrens.map((child)=>{
                nodes.push(getNode(child,courses,taken));
        });
        if(taken.includes(bigNode.courseID))
            return {value: bigNode.courseName, children: nodes,color:"#FF2E2E"};
        else
            return {value: bigNode.courseName, children: nodes};
    }
    else{
        if(taken.includes(bigNode.courseID))
            return {value : bigNode.courseName,color:"#FF2E2E"};
        else
            return {value : bigNode.courseName};
    }
}
function D3Test() {
   
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const schoolName = params.get("schoolName");
    const departmentName= params.get("departmentName");
    const year = params.get("year");
    const username = params.get("username");
    const firstName = params.get("fname");
    const lastName = params.get("lname");
    const studentID = params.get("studentID");
    
    const [response, setResponse] = useState(obj);
    const responseData = async()=>{ 
         getResponse("kasit", "cs", 2017,"mhm0173632").then((res)=>{
        setResponse(res);
    });
};
 useEffect(()=>{
        responseData();
        console.log("response inside useEffect");
        console.log(response);
        console.log("---------------------------");
    },[]);
    console.log("response outside useEffect");
    console.log(response);
    console.log("---------------------------");
    console.log(obj)
    console.log("---------------------------");
    // --------------------------------------

    
    const [index,setIndex] = useState(0);
    var universityPlan = response["universityPlan"];
    var facultyPlan = response["studyPlan"];
    var taken = response["takes"];
    const universityPlanGroup = new Map();
    universityPlan.map((course)=>{
        if(course.preCount == 0 && course.category!="Elective_University_Requirements") {
            universityPlanGroup.set(course,0);
    }
    });

    let universityPlanGroupChildren = [];
    for (let [key, value] of universityPlanGroup) {
        universityPlanGroupChildren.push(getNode(key,universityPlan,taken));
    }
    
    const eUniversiyPlanGroup = new Map();
    universityPlan.map((course)=>{
        if(course.preCount == 0 && course.category== "Elective_University_Requirements") {
            eUniversiyPlanGroup.set(course,0);
        }
    });

    let eUniversiyPlanGroupChildren = [];
    for (let [key, value] of eUniversiyPlanGroup) {
        eUniversiyPlanGroupChildren.push(getNode(key,universityPlan,taken));
    }




    const facultyGroup = new Map();
    facultyPlan.map((course)=>{
        if(course.preCount == 0) {
            facultyGroup.set(course,0);
        }
    });

    let facultyGroupChildren = [];
    for (let [key, value] of facultyGroup) {
        facultyGroupChildren.push(getNode(key,facultyPlan,taken));
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
    if(index == 1)
        data = electiveUniversityData;
    else if (index ==2)
        data = facultyData;
    else
        data = universityData;
  return (
    <div className="testDaoud">
        <header className='list' style={{ 
               "justifyContent": "space-around",
               "position":"fixed",
               "width":"100%",
               "zIndex":"1000"
               }}>
                   <div style={{
                "margin-left":"20px"
            }}>
            <img alt="logo" width="55px" 
                src={require("./../../images/logoUniversity.png")} />
                </div>
            <div style={{
                "margin-top":"5px",
                "margin-left":"25px",
                "color":"white"
            }}>
            <label >{firstName} {lastName} | {studentID}  </label>
            <br></br>
            <label >{schoolName} {departmentName} | {year} </label>
            </div>
            <div className='listElement'
                onClick={()=>{
                    setIndex(0);
                }}
            >
                University Plan
            </div>
            <div className='listElement'
                onClick={()=>{
                    setIndex(1);
                }}
            >
                 Elective University Plan
            </div>
            <div className='listElement'
                onClick={()=>{
                    setIndex(2);
                }}
            >
                Faculty Plan
            </div>
        
        </header>
      <TreeChart
        
        className="testDaoud"
        data={data}
        collapseEnabled={true}
 
        style={{
          width: "100em",
          height: "5000em",
          
        }}
        renderCustomNode={({ data, collapsed }) => {
            if(data.color) {
               return (
                    <div style={{
                        "position":"relative",
                        "zIndex":"99"
                    }}>
                        
                      <span className= 'circle' style={{
                          "color":"white",
                          "textAlign" : "center",
                          "margin" :"25px",
                          "backgroundColor": "#FF2E2E"
                      }}>
                          {data.value}
                      </span>
                    </div>
                  )
            }else{
                return (
                    <div>
                      <span className= 'circle' style={{
                          "color": "white",
                          "textAlign" : "center",
                          "margin" :"25px",
                          "backgroundColor": "#4CAF50"
                      }}>
                          {data.value}
                      </span>
                    </div>
                  )
            }
        }}
        />
      
    </div>
  );
}

export default D3Test;
