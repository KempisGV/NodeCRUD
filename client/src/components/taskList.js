import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// This will require to npm install axios
import axios from 'axios';
import { Link } from 'react-router-dom';

const Task = props => (
  <tr>
    <td>{props.Task.name}</td>
    <td>{props.Task.description}</td>
    <td>{String(props.Task.status)}</td>

    <td>
      <Link to={'/edit/' + props.Task._id}>Edit</Link> |
      <a
        href='/'
        onClick={() => {
          props.deleteTask(props.Task._id);
        }}>Delete
      </a> <a
        href='/'
        onClick={() => {
          props.changeStatusTask(props.Task._id);
        }}>Done
      </a>
    </td>
  </tr>
);

class taskList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
    this.changeStatusTask = this.changeStatusTask.bind(this);
    this.state = { tasks: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    const { user } = this.props.auth;
    axios
      .get(`http://localhost:4000/api/tasks/${user.id}`)
      .then(response => {

        this.setState({ tasks: response.data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a Task based on the method
  deleteTask(id) {
    axios.delete('http://localhost:4000/api/tasks/' + id).then(response => {
      //console.log(response.data);
    });

    this.setState({
      Task: this.state.tasks.filter(el => el._id !== id),
    });
  }
 // This method will delete a Task based on the method
 changeStatusTask(id) {
  axios.get('http://localhost:4000/api/tasks/change/' + id).then(response => {
  });
}

  // This method will map out the users on the table
  taskList() {
    return this.state.tasks.map(currentTask => {
      return (
        <Task
          Task={currentTask}
          deleteTask={this.deleteTask}
          changeStatusTask={this.changeStatusTask}
          key={currentTask._id}
        />
      );
    });
  }

  // This following section will display the table with the tasks of individuals.
  render() {
    return (
      <div>
        <h3>Task List</h3>
        <table className='table table-striped' style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.taskList()}</tbody>
        </table>
      </div>
    );
  }
}

taskList.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(taskList);
