import { Component } from "react";
import TodoItem from "../TodoItem";
import { v4 as uuidv4 } from "uuid";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { CiSearch, CiFilter } from "react-icons/ci";
import { Calendar } from "primereact/calendar";
import { FcExpired, FcInspection, FcAlarmClock } from "react-icons/fc";
import { GoDotFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./index.css";

var TodoItems = [
  {
    todoId: uuidv4(),
    todoImpact: "Low",
    todoName: "Brainstorming",
    todoDesc: "Brainstorming brings team members diverse experience into play.",
    todoStatus: "Todo",
    todoDeadline: "12/5/30",
    expired: false
  },
  {
    todoId: uuidv4(),
    todoImpact: "High",
    todoName: "Research",
    todoDesc: "User research helps you to create an optimal product for users.",
    todoStatus: "Todo",
    todoDeadline: "12/5/24",
    expired: true
  },
  {
    todoId: uuidv4(),
    todoImpact: "High",
    todoName: "Wireframes",
    todoDesc:
      "Low fidelity wireframes include the most basic content and visuals.",
    todoStatus: "Todo",
    todoDeadline: "12/5/30",
    expired: false
  },
  {
    todoId: uuidv4(),
    todoImpact: "Low",
    todoName: "Onboarding Illustrations",
    todoDesc: "",
    todoStatus: "OnProgress",
    todoDeadline: "12/5/30",
    expired: false
  },
  {
    todoId: uuidv4(),
    todoImpact: "Low",
    todoName: "Moodboard",
    todoDesc: "",
    todoStatus: "OnProgress",
    todoDeadline: "12/5/24",
    expired: true
  },
  {
    todoId: uuidv4(),
    todoImpact: "Completed",
    todoName: "Mobile App Design",
    todoDesc: "",
    todoStatus: "Completed",
    todoDeadline: "12/5/30",
    expired: false
  },
  {
    todoId: uuidv4(),
    todoImpact: "Completed",
    todoName: "Design System",
    todoDesc: "It just needs to adapt the UI from what you did before",
    todoStatus: "Completed",
    todoDeadline: "12/5/24",
    expired: true
  },
];

class TodoHome extends Component {
  state = {
    todoItems: TodoItems,
    visible: false,
    visible1: false,
    descValue: "",
    nameValue: "",
    date: "",
    priority: "",
    searchValue: "",
    category: "",
  };

  submitTodoTask = (e) => {
    e.preventDefault();
    const { descValue, nameValue, date, priority, todoItems } = this.state;
    const date1 = this.formatDate(date)
    const newItem = {
      todoId: uuidv4(),
      todoImpact: priority,
      todoName: nameValue,
      todoDesc: descValue,
      todoStatus: "Todo",
      todoDeadline: this.formatDate(date),
      expired: this.DateComparison(date)
    };
    this.setState((prevState) => ({
      todoItems: [...prevState.todoItems, newItem],
      visible: false,
      descValue: "",
      nameValue: "",
      date: "",
      priority: "",
      modalShow: true,
    }));
  };

  DateComparison = (dateString) => {
      const dateObject = new Date(dateString); // Convert date string to Date object
      const currentDate = new Date(); // Get the current date
  
      return dateObject < currentDate;
  }

  hangleCategory = (val) => {
    this.setState({ category: val });
  };

  updateList = (todoId) => {
    const {category} = this.state
    this.setState((prevState) => (
      {todoItems: prevState.todoItems.map(eachItem => {
        if(eachItem.todoId === todoId){
          return {...eachItem,todoStatus: category}
        }
          return eachItem
        }
      )}
    ))
  }

  searchItems = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  handlePriority = (e) => {
    this.setState({ priority: e.value });
  };

  showDialog = () => {
    this.setState({ visible: true });
  };

  hideDialog = () => {
    if (!this.state.visible) return;
    this.setState({ visible: false });
  };

  handleDescription = (e) => {
    this.setState({ descValue: e.target.value });
  };

  handleDateChange = (e) => {
    this.setState({ date: e.value });
  };

  handleName = (e) => {
    this.setState({ nameValue: e.target.value });
  };

  formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  getCountExpired = (items) => {
    const expiredItems = items.filter(eachItem => eachItem.expired === true)
    return expiredItems.length
  }

  showDialog1 = () => {
    this.setState({ visible1: true });
}

hideDialog1 = () => {
    if (!this.state.visible1) return;
    this.setState({ visible1: false });
}

  render() {
    const { todoItems, searchValue, category } = this.state;
    const expiredCount = this.getCountExpired(todoItems)
    const activeCount = todoItems.length - expiredCount
    const UpdatedList = todoItems.filter((eachItem) =>
      eachItem.todoName.toLowerCase().includes(searchValue.toLowerCase())
    );
    const todoTasks = UpdatedList.filter(
      (eachItem) => eachItem.todoStatus === "Todo"
    );
    const onProgressTasks = UpdatedList.filter(
      (eachItem) => eachItem.todoStatus === "OnProgress"
    );
    const doneTasks = UpdatedList.filter(
      (eachItem) => eachItem.todoStatus === "Completed"
    );
    return (
      <>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <div className="todo-bg-container">
                <div className="todo-header">
                  <div className="search-container">
                    <CiSearch size={20} />
                    <input
                      type="search"
                      placeholder="Search Projects"
                      onChange={this.searchItems}
                      style={{
                        border: "none",
                        outline: "none",
                        marginLeft: "6px",
                        width: "100%",
                        fontSize: "15px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col xs={12} md={3} className="mt-4">
              <Row className="d-flex justify-content-center">
                <Col>
                  <div className="aside-card-container">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FcExpired size={45} />
                      <p className="m-0" style={{ color: "#717171" }}>
                        Expired Tasks
                      </p>
                    </div>
                    <h1 className="m-0">{expiredCount}</h1>
                  </div>
                </Col>
              </Row>
              <Row>
              <Col>
                  <div className="aside-card-container mt-3">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <FcAlarmClock size={35} />
                      <p className="m-0" style={{ color: "#717171" }}>
                        Active Tasks
                      </p>
                    </div>
                    <h1 className="m-0">{activeCount}</h1>
                  </div>
                </Col>
              </Row>
              <Row>
              <Col>
                  <div className="aside-card-container mt-3 mb-3">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <FcInspection size={35} />
                      <p className="m-0" style={{ color: "#717171" }}>
                        Completed Tasks
                      </p>
                    </div>
                    <h1 className="m-0">{doneTasks.length}/<span style={{fontSize: '25px'}}>{todoItems.length}</span></h1>
                  </div>
                </Col>
              </Row>
              <Row>
              <Col>
                  <Button
                    className="mb-5 d-flex justify-content-center add-btn-width"
                    style={{
                      
                      borderRadius: "20px",
                      backgroundColor: "black",
                    }}
                    variant="dark"
                    onClick={this.showDialog}
                  >
                    <div className="d-flex align-items-center">
                      <FaPlus size={15} className="mt-1 mr-2" />
                      <p className="m-0">Add Task</p>
                    </div>
                  </Button>
                  <Dialog
                    header="ADD TASK"
                    visible={this.state.visible}
                    style={{ width: "350px" }}
                    onHide={this.hideDialog}
                  >
                    <hr className="mt-0" />
                    <form onSubmit={this.submitTodoTask}>
                      <p
                        className="m-0 mt-4 mb-2"
                        style={{ fontWeight: "bold" }}
                      >
                        Task Name:
                      </p>
                      <InputText
                        placeholder="Enter the task name"
                        value={this.state.nameValue}
                        onChange={this.handleName}
                        className="todo-name-input"
                        required
                      />
                      {/* <input type="text"   /> */}
                      {/* <hr className="mt-0" style={{borderWidth: '1.5px'}}/> */}
                      <p
                        className="m-0 mt-2 mb-2"
                        style={{ fontWeight: "bold" }}
                      >
                        Task Description:
                      </p>
                      <div className="card flex justify-content-center">
                        <InputTextarea
                          value={this.state.descValue}
                          onChange={this.handleDescription}
                          rows={5}
                          cols={30}
                          placeholder="Enter the task description"
                        />
                      </div>
                      <p
                        className="m-0 mt-2 mb-2"
                        style={{ fontWeight: "bold" }}
                      >
                        Task Priority:
                      </p>
                      <div className="d-flex justify-content-between w-50">
                        <div className="flex align-items-center">
                          <RadioButton
                            inputId="priority1"
                            name="priority"
                            value="Low"
                            onChange={this.handlePriority}
                            checked={this.state.priority === "Low"}
                            required
                          />
                          <label htmlFor="priority1" className="ml-2">
                            Low
                          </label>
                        </div>
                        <div className="flex align-items-center">
                          <RadioButton
                            inputId="priority2"
                            name="priority"
                            value="High"
                            onChange={this.handlePriority}
                            checked={this.state.priority === "High"}
                            required
                          />
                          <label htmlFor="priority2" className="ml-2">
                            High
                          </label>
                        </div>
                      </div>
                      <div>
                        <p
                          className="m-0 mt-2 mb-2"
                          style={{ fontWeight: "bold" }}
                        >
                          Task Deadline:
                        </p>
                        <Calendar
                          onChange={this.handleDateChange}
                          value={this.state.date}
                          style={{ border: "0px", width: "100%" }}
                          required
                        />
                      </div>
                      <div className="mt-3 d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary" onClick={this.showDialog1} >
                          Assign
                        </button>
                      </div>
                      
                    </form>
                  </Dialog>
                  <Dialog 
                    visible={this.state.visible1} 
                    modal={false}
                    onHide={this.hideDialog1} 
                    style={{ width: '400px',borderRadius: '10PX' }} 
                >
                    <div className="d-flex flex-column justify-content-center align-items-center" >
                    <img src={`${process.env.PUBLIC_URL}/TodoAdded.png`} alt="My Image" style={{width: '100px'}} />
                    <p className="text-center" style={{fontWeight: 'bold',color: 'black',fontSize: '22px'}}>New task has been created <br/> Successfully</p>
                    <button type="submit" className="btn btn-dark w-100" style={{backgroundColor: 'black',height: '60px'}} onClick={this.hideDialog1}>Back</button>
                    </div>
                </Dialog>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={3} className="mt-0 mt-md-4">
              <Row>
                <Col>
                  <div className="to-do-container">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <GoDotFill className="mr-3" style={{ color: "blue" }} />
                      <h5 className="m-0">To Do</h5>
                      <div className="todo-count-container">
                        {todoTasks.length}
                      </div>
                    </div>
                    <hr style={{ borderWidth: "3px", color: "Blue" }} />
                    <div style={{height: '100%'}}>
                    {todoTasks.length === 0 ? <div className="d-flex flex-column justify-content-center align-items-center">
                      <div className="d-flex justify-content-center align-items-center">
                      <img src={`${process.env.PUBLIC_URL}/NoItemsFound.png`} style={{width: '120px'}} />
                      
                      </div>
                      <p className="m-0" style={{fontSize: '20px',fontWeight: 'bold',color: "#717171"}}>Not Found</p>
                    </div> : <ul className="m-0 p-0">
                      {todoTasks.map((eachItem) => (
                        <TodoItem
                          todoDetails={eachItem}
                          categoryVal={category}
                          hangleCategory={this.hangleCategory}
                          updateList={this.updateList}
                          key={eachItem.todoId}
                        />
                      ))}
                    </ul>}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={3} className="mt-4">
              <Row>
                <Col>
                  <div className="to-do-container">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <GoDotFill className="mr-3" style={{ color: "orange" }} />
                      <h5 className="m-0">On Progress</h5>
                      <div className="todo-count-container">
                        {onProgressTasks.length}
                      </div>
                    </div>
                    <hr style={{ borderWidth: "3px", color: "orange" }} />
                    {onProgressTasks.length === 0 ? <div className="d-flex flex-column justify-content-center align-items-center">
                      <div className="d-flex justify-content-center align-items-center">
                      <img src={`${process.env.PUBLIC_URL}/NoItemsFound.png`} style={{width: '120px'}} />
                      
                      </div>
                      <p className="m-0" style={{fontSize: '20px',fontWeight: 'bold',color: "#717171"}}>Not Found</p>
                    </div> : <ul className="m-0 p-0">
                      {onProgressTasks.map((eachItem) => (
                        <TodoItem
                          todoDetails={eachItem}
                          categoryVal={category}
                          hangleCategory={this.hangleCategory}
                          updateList={this.updateList}
                          key={eachItem.todoId}
                        />
                      ))}
                    </ul>}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={3} className="mt-4">
              <Row>
                <Col>
                  <div className="to-do-container">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <GoDotFill className="mr-3" style={{ color: "green" }} />
                      <h5 className="m-0">Done</h5>
                      <div className="todo-count-container">
                        {doneTasks.length}
                      </div>
                    </div>
                    <hr style={{ borderWidth: "3px", color: "green" }} />
                    {doneTasks.length === 0 ? <div className="d-flex flex-column justify-content-center align-items-center">
                      <div className="d-flex justify-content-center align-items-center">
                      <img src={`${process.env.PUBLIC_URL}/NoItemsFound.png`} style={{width: '120px'}} />
                      
                      </div>
                      <p className="m-0" style={{fontSize: '20px',fontWeight: 'bold',color: "#717171"}}>Not Found</p>
                    </div> : <ul className="m-0 p-0">
                      {doneTasks.map((eachItem) => (
                        <TodoItem
                          todoDetails={eachItem}
                          categoryVal={category}
                          hangleCategory={this.hangleCategory}
                          updateList={this.updateList}
                          key={eachItem.todoId}
                        />
                      ))}
                    </ul>}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default TodoHome;
