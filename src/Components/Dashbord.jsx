// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Dashbord() {
//   const navigate = useNavigate();
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const [taskText, setTaskText] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editText, setEditText] = useState("");

//   const taskKey = currentUser ? `tasks_${currentUser.email}` : "tasks_guest";

//   // Load tasks
//   useState(() => {
//     const savedTasks = JSON.parse(localStorage.getItem(taskKey)) || [];
//     setTasks(savedTasks);
//   }, []);

//   // CREATE
//   const addTask = () => {
//     if (!taskText.trim()) {
//       alert("Task cannot be empty");
//       return;
//     }

//     const newTasks = [...tasks, { text: taskText, completed: false }];
//     setTasks(newTasks);
//     localStorage.setItem(taskKey, JSON.stringify(newTasks));
//     setTaskText("");
//   };

//   // DELETE
//   const deleteTask = (index) => {
//     const newTasks = tasks.filter((_, i) => i !== index);
//     setTasks(newTasks);
//     localStorage.setItem(taskKey, JSON.stringify(newTasks));
//   };

//   // START EDIT
//   const startEdit = (index) => {
//     setEditIndex(index);
//     setEditText(tasks[index].text);
//   };

//   // SAVE EDIT
//   const saveEdit = (index) => {
//     if (!editText.trim()) return;

//     const newTasks = [...tasks];
//     newTasks[index].text = editText;
//     setTasks(newTasks);
//     localStorage.setItem(taskKey, JSON.stringify(newTasks));

//     setEditIndex(null);
//     setEditText("");
//   };

//   // TOGGLE STATUS
//   const toggleStatus = (index) => {
//     const newTasks = [...tasks];
//     newTasks[index].completed = !newTasks[index].completed;
//     setTasks(newTasks);
//     localStorage.setItem(taskKey, JSON.stringify(newTasks));
//   };

//   // LOGOUT
//   const logout = () => {
//     localStorage.removeItem("currentUser");
//     navigate("/");
//   };

//   return (
//     <div className="dashboard">
//       <h2>Hello, {currentUser?.username || "Guest"} 👋</h2>

//       {/* CREATE TASK */}
//       <input
//         placeholder="Enter a new task"
//         value={taskText}
//         onChange={(e) => setTaskText(e.target.value)}
//       />
//       <button onClick={addTask}>Add Task</button>

//       {/* TASK LIST */}
//       {tasks.length === 0 && <p>No tasks added yet</p>}

//       {tasks.map((task, index) => (
//         <div
//           key={index}
//           className="task"
//           style={{
//             borderLeft: task.completed
//               ? "5px solid #22c55e"
//               : "5px solid #facc15",
//             background: task.completed ? "#ecfdf5" : "#fffbeb",
//           }}
//         >
//           {editIndex === index ? (
//             <input
//               value={editText}
//               onChange={(e) => setEditText(e.target.value)}
//               style={{ marginRight: "10px", flex: 1 }}
//             />
//           ) : (
//             <span
//               style={{
//                 textDecoration: task.completed ? "line-through" : "none",
//                 color: task.completed ? "#16a34a" : "#92400e",
//               }}
//             >
//               {task.text}
//             </span>
//           )}

//           <div>
//             <button onClick={() => toggleStatus(index)}>
//               {task.completed ? "Undo" : "Done"}
//             </button>

//             {editIndex === index ? (
//               <button onClick={() => saveEdit(index)}>Save</button>
//             ) : (
//               <button onClick={() => startEdit(index)}>Edit</button>
//             )}

//             <button onClick={() => deleteTask(index)}>Delete</button>
//           </div>
//         </div>
//       ))}

//       <button onClick={() => navigate("/changePW")}>Change Password</button>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken"); // Consistent token key
  const backendUrl = "https://terrorful-avah-bluishly.ngrok-free.dev"; // Consistent URL

  // Load tasks from backend
  useEffect(() => {
    if (token) {
      loadTasks();
    }
  }, [token]);

  const loadTasks = async () => {
    try {
      const response = await axios.get(`${backendUrl}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Tasks response:", response.data); // Debug log
      // Handle both response formats: direct array or { tasks: [...] }
      const tasksData = response.data.tasks || response.data;
      // Normalize field names: backend uses 'title', frontend uses 'text'
      const normalizedTasks = tasksData.map((task) => ({
        id: task.id,
        text: task.title || task.text, // Map title to text
        completed: task.completed,
      }));
      console.log("Normalized tasks:", normalizedTasks); // Debug log
      setTasks(normalizedTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
      // Fallback to localStorage if backend fails
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setTasks(savedTasks);
    }
  };

  // const addTask = () => {
  //   if (!taskText.trim()) {
  //     alert("Task cannot be empty");
  //     return;
  //   }
  //   const newTasks = [...tasks, { text: taskText, completed: false }];
  //   setTasks(newTasks);
  //   localStorage.setItem(taskKey, JSON.stringify(newTasks));
  //   setTaskText("");
  // };
  const addTask = async () => {
    if (!taskText.trim()) {
      alert("Task cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/tasks`,
        { title: taskText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Assuming backend returns the new task
      const newTask = response.data.task || response.data;
      const normalizedTask = {
        id: newTask.id,
        text: newTask.title || newTask.text || taskText,
        completed: newTask.completed || false,
      };
      setTasks([...tasks, normalizedTask]);
      setTaskText("");
    } catch (error) {
      alert("Failed to save task to database");
      console.error(error.response?.data || error);
      // Don't add to state if backend fails
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (index) => {
    const taskId = tasks[index].id; // Assuming tasks have id from backend
    if (!taskId) {
      // If no id, just remove from local state
      setTasks(tasks.filter((_, i) => i !== index));
      return;
    }

    try {
      await axios.delete(`${backendUrl}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      alert("Failed to delete task from database");
      console.error(error);
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = async (index) => {
    if (!editText.trim()) return;

    const taskId = tasks[index].id;
    if (!taskId) {
      // If no id, just update local state
      const newTasks = [...tasks];
      newTasks[index].text = editText;
      setTasks(newTasks);
      setEditIndex(null);
      setEditText("");
      return;
    }

    try {
      await axios.put(
        `${backendUrl}/tasks/${taskId}`,
        { title: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newTasks = [...tasks];
      newTasks[index].text = editText;
      setTasks(newTasks);
      setEditIndex(null);
      setEditText("");
    } catch (error) {
      alert("Failed to update task");
      console.error(error);
    }
  };

  const toggleStatus = async (index) => {
    const taskId = tasks[index].id;
    if (!taskId) {
      // If no id, just update local state
      const newTasks = [...tasks];
      newTasks[index].completed = !newTasks[index].completed;
      setTasks(newTasks);
      return;
    }

    const newCompleted = !tasks[index].completed;

    try {
      await axios.put(
        `${backendUrl}/tasks/${taskId}`,
        { completed: newCompleted },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newTasks = [...tasks];
      newTasks[index].completed = newCompleted;
      setTasks(newTasks);
    } catch (error) {
      alert("Failed to update task status");
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h2>Hello, {currentUser?.username || "Guest"} 👋</h2>

      <input
        placeholder="Enter a new task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button onClick={addTask} disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>

      {tasks.length === 0 && <p>No tasks added yet</p>}

      {tasks.map((task, index) => (
        <div
          key={index}
          className="task"
          style={{
            borderLeft: task.completed
              ? "5px solid #22c55e"
              : "5px solid #facc15",
            background: task.completed ? "#ecfdf5" : "#fffbeb",
          }}
        >
          {editIndex === index ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{ marginRight: "10px", flex: 1 }}
            />
          ) : (
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#16a34a" : "#92400e",
              }}
            >
              {task.text}
            </span>
          )}

          <div>
            <button onClick={() => toggleStatus(index)}>
              {task.completed ? "Undo" : "Done"}
            </button>

            {editIndex === index ? (
              <button onClick={() => saveEdit(index)}>Save</button>
            ) : (
              <button onClick={() => startEdit(index)}>Edit</button>
            )}

            <button onClick={() => deleteTask(index)}>Delete</button>
          </div>
        </div>
      ))}

      <button onClick={() => navigate("/changePW")}>Change Password</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
