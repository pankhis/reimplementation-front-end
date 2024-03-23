import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import useAPI from "hooks/useAPI";
interface Course {
  name: string;
  institution: string;
  instructor: string;
}

interface Institution {
    id: number;
    name: string;
  }
interface User {
    id: number;
    name: string;
}

interface DistributionItem {
  name: string;
  value: number;
}

const CoursesStatistics: React.FC = () => {
    const { data: courses, sendRequest: fetchCourses } = useAPI(); // Ensure the initial state aligns with the expected data type
    const { data: institutions, sendRequest: fetchInstitutions } = useAPI(); 
    const { data: users, sendRequest: fetchusers } = useAPI(); 
    const [uniqueInstitutionCounts, setUniqueInstitutionCounts] = useState<Record<string, number>>({});
    const [uniqueInstructorCounts, setUniqueInstructorCounts] = useState<Record<string, number>>({});


    useEffect(() => {
      fetchCourses({ url: '/courses' }); // Assuming sendRequest accepts an object with a URL property
      fetchInstitutions({ url: '/institutions' }); 
      fetchusers({url:'/users'});
    }, [fetchCourses, fetchInstitutions, fetchusers]);


    useEffect(() => {
        const institutionNameCounts: Record<string, number> = {};
        if (courses && courses.data && institutions && institutions.data) {
            for (let i = 0; i < courses.data.length; i++) {
                const course = courses.data[i];
                const institutionId = course.institution_id;
                const institution = institutions.data.find((inst: Institution) => inst.id === institutionId);
                if (institution) {
                    const institutionName = institution.name;
                    institutionNameCounts[institutionName] = (institutionNameCounts[institutionName] || 0) + 1;
                }
            }
            setUniqueInstitutionCounts(institutionNameCounts);
        }
    }, [courses, institutions]);
    
    useEffect(() => {
        const instructorNameCounts: Record<string, number> = {};
        if (courses && courses.data && users && users.data) {
            for (let i = 0; i < courses.data.length; i++) {
                const course = courses.data[i];
                const instructorId = course.instructor_id;
                const user = users.data.find((usr: User) => usr.id === instructorId);
                if (user) {
                    const instructorName = user.name;
                    instructorNameCounts[instructorName] = (instructorNameCounts[instructorName] || 0) + 1;
                }
            }
            setUniqueInstructorCounts(instructorNameCounts);
        }
    }, [courses, users]);
    
    useEffect(() => {
       if(uniqueInstitutionCounts){
       console.log(uniqueInstitutionCounts)
       }
      }, [uniqueInstitutionCounts]);

      useEffect(() => {
        if(uniqueInstructorCounts){
        console.log(uniqueInstructorCounts)
        }
       }, [uniqueInstructorCounts]);

  return (
    <div>
     
    </div>
  );
};

export default CoursesStatistics;
