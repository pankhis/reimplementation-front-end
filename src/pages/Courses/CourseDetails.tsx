// CourseDetails.tsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ICourseResponse as ICourse } from "../../utils/interfaces"; // Ensure the path is correct

interface CourseDetailsProps {
  show: boolean;
  onHide: () => void;
  course: ICourse | null;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ show, onHide, course }) => {
    return (
        <Modal centered show={show} onHide={onHide} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Course Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {course && (
            <div>
                <h4>{course.name}</h4>
                <p>Institution: {course.institution?.name}</p>
                <p>Instructor: {course.instructor?.name}</p>
                <p>Course Information: {course.info}</p>
                <p>Course Directory: {course.directory_path}</p>
                <p>Course Visibility: {course.private ? "Private" : "Public"}</p>
            </div>
             )}
</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CourseDetails;
