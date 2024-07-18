import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StudentContext } from "../components/StudentContext";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const AllStudents = () => {
  const { state, dispatch } = useContext(StudentContext);
  const { students, filteredStudents, loading, error } = state;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = students;
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedGroup) {
      filtered = filtered.filter((student) => student.group === selectedGroup);
    }
    filtered.sort((a, b) => a.id - b.id);
    dispatch({ type: "FILTER_STUDENTS", payload: filtered });
  }, [searchTerm, selectedGroup, students, dispatch]);

  const deleteStudent = (id) => {
    // Just remove from state without calling API
    dispatch({ type: "DELETE_STUDENT", payload: id });
    toast.success("Student deleted from the screen successfully!");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const uniqueGroups = [...new Set(students.map((student) => student.group))];

  return (
    <div>
      <h2 className="my-3">All Students</h2>
      <div className="mb-3 d-flex justify-content-between">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="form-select w-25"
          value={selectedGroup}
          onChange={handleGroupChange}
        >
          <option value="">All Groups</option>
          {uniqueGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        <Link to="/add" className="btn btn-primary">
          Add Student
        </Link>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.group}</td>
              <td>
                <Link
                  to={`/update/${student.id}`}
                  className="btn btn-info mr-2 mx-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteStudent(student.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudents;
