import React from "react";

import Col from "react-bootstrap/Col";

function TaskList({ taskList, selectedTask, handleSelectTask }) {
  
  return (
    <Col className="d-flex justify-content-center align-items-center ">
      <ul className="tasklist text-white mt-2 ms-4  ">
        {taskList &&
          taskList.map((element) => (
            <li
              className="mt-1 d-flex "
              key={element.id}
              onClick={() => handleSelectTask(element.id)}
            >
              {" "}
              <span
                className={`round rounded-circle me-3 bg-secondary ${
                  selectedTask === element.id ? "bg-success" : ""
                }`}
              ></span>
              {element.task}
            </li>
          ))}
      </ul>
    </Col>
  );
}

export default TaskList;
