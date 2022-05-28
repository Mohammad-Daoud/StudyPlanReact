import './Test.css';
import TreeChart from "@ssthouse/react-tree-chart";
import "@ssthouse/react-tree-chart/lib/react-tree-chart.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import obj from './../../test1.json';
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
            return {value: bigNode.courseName, children: nodes,color:"blue"};
        else
            return {value: bigNode.courseName, children: nodes};
    }
    else{
        if(taken.includes(bigNode.courseID))
            return {value : bigNode.courseName,color:"blue"};
        else
            return {value : bigNode.courseName};
    }
}
function Test() {
    const [index,setIndex] = useState(0);
    const universityPlan = obj["universityPlan"];
    const facilityPlan = obj["studyPlan"];
    const taken = obj["takes"];
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




    const facilityGroup = new Map();
    facilityPlan.map((course)=>{
        if(course.preCount == 0) {
            facilityGroup.set(course,0);
        }
    });

    let facilityGroupChildren = [];
    for (let [key, value] of facilityGroup) {
        facilityGroupChildren.push(getNode(key,facilityPlan,taken));
    }

    const universityData = {
        value: "University Requirements",
        children: universityPlanGroupChildren,

    };
    const electiveUniversityData = {
        value: "Elective University Requirements",
        children: eUniversiyPlanGroupChildren,

    };

    const facilityData = {
        value: "Facility Requirements",
        children: facilityGroupChildren,

    };
    
    const config = {
        nodeWidth: 4000,
        nodeHeight: 5000,
        levelHeight: 5000
    }
    let data = universityData;
    if(index == 1)
        data = electiveUniversityData;
    else if (index ==2)
        data = facilityData;
    else
        data = universityData;
  return (
    <div className="testDaoud">
        <div className='list'>
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
                 Facility Plan
            </div>
            <div className='listElement'
                onClick={()=>{
                    setIndex(2);
                }}
            >
                Elective University Plan
            </div>
        </div>
      <TreeChart
        className="testDaoud"
        dataset={data}
        collapseEnabled={true}
        style={{
          width: "100%",
          height: "6000px",
        }}
        renderCustomNode={({ data, collapsed }) => {
            if(data.color) {
               return (
                    <div>
                      <span style={{
                          "min-height": "500px",
                          "width": "150px",
                          "color": "green",
                          "border": "1px solid black",
                          "backgroundColor" : "black",
                          "textAlign" : "center",
                          
                      }}>
                          {data.value}
                      </span>
                    </div>
                  )
            }
            else{
                return (
                    <div>
                      <span style={{
                          "min-height": "500px",
                          "width": "150px",
                          "color": "green",
                          "border": "1px solid black",
                          "backgroundColor" : "red",
                          "textAlign" : "center",
                          
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

export default Test;
