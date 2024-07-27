import "./index.css";
import { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { RadioButton } from "primereact/radiobutton";
import { SlOptions } from "react-icons/sl";

const TodoItem = (props) => {
  const { todoDetails,hangleCategory,categoryVal,updateList } = props;
  const op = useRef(null);
  const { todoId, todoImpact, todoName, todoDesc, todoStatus, todoDeadline,expired } =
    todoDetails;
  const seletedCategory = (e) => {
    hangleCategory(e.target.value)
  }
  const updateCategory = () => {
    updateList(todoId)
  }
  return (
    <li className="m-0" style={{ listStyleType: "none" }}>
      <div className="todo-item-container">
        <div className="d-flex justify-content-between">
          {todoImpact === "Low" ? (
            <p
              className="m-0 todo-impact"
              style={{ backgroundColor: "#f9eee3", color: "#d58d49" }}
            >
              {todoImpact}
            </p>
          ) : (
            <p
              className="m-0 todo-impact"
              style={{ backgroundColor: "#fbf1f2", color: "#d8727d" }}
            >
              {todoImpact}
            </p>
          )}

          <button
            type="button"
            className="item-options"
            onClick={(e) => op.current.toggle(e)}
          >
            <SlOptions
              size={10}
              style={{ position: "relative", bottom: "10px" }}
            />
          </button>
        </div>
        <OverlayPanel ref={op}>
          <div>
            <p className="m-0 mb-2" style={{ fontWeight: "bold" }}>
              Select Category
            </p>
            <div className="d-flex flex-column justify-content-between w-50">
                        <form onSubmit={updateCategory} >
                        <div className="flex align-items-center mb-1">
                          <RadioButton
                            inputId="priority1"
                            name="category"
                            value="Todo"
                            onChange={seletedCategory}
                            checked={categoryVal === "Todo"}
                            required
                          />
                          <label htmlFor="priority1" className="ml-2">
                            Todo
                          </label>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <RadioButton
                            inputId="priority2"
                            name="category"
                            value="OnProgress"
                            onChange={seletedCategory}
                            checked={categoryVal === "OnProgress"}
                            required
                          />
                          <label htmlFor="priority2" className="ml-2">
                          OnProgress
                          </label>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <RadioButton
                            inputId="priority3"
                            name="category"
                            value="Completed"
                            onChange={seletedCategory}
                            checked={categoryVal === "Completed"}
                            required
                          />
                          <label htmlFor="priority3" className="ml-2">
                            Completed
                          </label>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2 ml-5">Assign</button>
                        </form>
                      </div>
          </div>
        </OverlayPanel>
        <h5 className="m-0 mt-2">{todoName}</h5>
        <p className="m-0 mt-1" style={{ fontSize: "12px", color: "#717171" }}>
          {todoDesc}
        </p>
        <div className="d-flex justify-content-between align-items-end">
        <div className="d-flex mt-3" style={{ fontSize: "14px" }}>
          <p className="m-0" style={{ fontWeight: "500" }}>
            Deadline:
          </p>
          <p className="m-0">{todoDeadline}</p>
        </div>
        {expired === true? <img src={`${process.env.PUBLIC_URL}/TaskExpired.png`} style={{width: '60px'}} /> : ''}
        
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
