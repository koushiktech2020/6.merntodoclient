import { Link } from "react-router-dom";
import "./TaskItem.css";

const TaskItem = ({ todo, editTodoHandler, clearState, updateTodoMark }) => {
  return (
    <div className="todo_task_item">
      <div className="task_check_title">
        <input
          type="checkbox"
          name=""
          id=""
          className="task_mark"
          value={todo._id}
          defaultChecked={todo.mark}
          onChange={updateTodoMark}
        />
        <p className={`task_title ${todo.mark ? "complete" : ""} `}>
          {todo.title}
        </p>
      </div>
      <div className="action_btn">
        <Link to="#" className="edit_btn" onClick={() => editTodoHandler(todo)}>
          Edit
        </Link>
        <Link to="#" className="delete_btn">
          Delete
        </Link>
        <Link to="#" className="clr_btn" onClick={clearState}>
          Clear
        </Link>
      </div>
    </div>
  );
};

export default TaskItem;
