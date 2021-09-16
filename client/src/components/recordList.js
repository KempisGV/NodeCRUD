import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// This will require to npm install axios
import axios from 'axios';
import { Link } from 'react-router-dom';

const Record = props => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.description}</td>
    <td>
      <Link to={'/edit/' + props.record._id}>Edit</Link> |
      <a
        href='/'
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.state = { records: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    const { user } = this.props.auth;
    axios
      .get(`http://localhost:4000/api/tasks/${user.id}`)
      .then(response => {
        this.setState({ records: response.data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a record based on the method
  deleteRecord(id) {
    axios.delete('http://localhost:4000/' + id).then(response => {
      //console.log(response.data);
    });

    this.setState({
      record: this.state.records.filter(el => el._id !== id),
    });
  }

  // This method will map out the users on the table
  recordList() {
    //console.log(this.state.record);
    return this.state.records.map(currentrecord => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div>
        <h3>Record List</h3>
        <table className='table table-striped' style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
      </div>
    );
  }
}

RecordList.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(RecordList);
