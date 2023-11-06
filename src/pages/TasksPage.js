import React from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import TaskList from "../components/TaskList";
import db from "../firebase/firebaseConfig";

function TasksPage() {
  const [currentTask, setCurrentTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Get the username from localStorage
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const taskDataList = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          const task = { id: id, ...data };
          taskDataList.push(task);
          setTaskList([...taskDataList]);
        });
      } catch (error) {
        console.error("Firestore error:", error);
      }
    };

    fetchDataFromFirestore();
  }, []);

  const handleChange = (e) => {
    setCurrentTask(e.target.value);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    const username = localStorage.getItem("username");
    if (currentTask) {
      const docRef = await addDoc(collection(db, "tasks"), {
        user: username,
        task: currentTask,
      });

      setCurrentTask("");
      const newTask = { id: docRef.id, task: currentTask };
      setTaskList([...taskList, newTask]);
    } else {
      alert("Please enter a To Do...");
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if (selectedTask) {
      try {
        await deleteDoc(doc(db, "tasks", selectedTask));
        setTaskList((newTaskList) =>
          newTaskList.filter((task) => task.id !== selectedTask)
        );
        setSelectedTask(null);
      } catch (error) {
        console.log("Firestore error", error);
      }
    }
  };

  const handleSelectTask = (taskId) => {
    if (selectedTask === taskId) {
      setSelectedTask(null);
    } else {
      setSelectedTask(taskId);
    }
  };

  const handleExit = () => {
    localStorage.removeItem("username");
  };

  return (
    <div className="App">
      <Container className="tasks-page d-flex justify-content-center flex-column">
        <Row className="mt-3">
          <Col className="d-flex justify-content-between align-items-center ">
            <h1 className="text-white">To Do List</h1>
            <Link onClick={handleExit} className="btn btn-primary" to="/">
              Exit
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Form className="mt-4">
              <Form.Group className="task-form-control ">
                <Form.Control
                  className="todo-bar rounded-pill text-center mt-5"
                  value={currentTask}
                  onChange={handleChange}
                  placeholder="New To-do"
                />
              </Form.Group>
              <div className="d-flex justify-content-center align-items-center ">
                <Button
                  type="submit"
                  className=" btn btn-primary"
                  onClick={handleAdd}
                >
                  Add
                </Button>
                <Button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleDelete}
                >
                  Delete Selected Task
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <Row>
          <TaskList
            taskList={taskList}
            selectedTask={selectedTask}
            handleSelectTask={handleSelectTask}
          />
        </Row>
      </Container>
    </div>
  );
}

export default TasksPage;
