import axios from "axios";
import { Component } from "react";
import "./styles.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      searchText: ""
    };
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      this.setState({
        loading: false,
        users: response.data
      });
    });
  }

  handleInputChange = (text) => {
    this.setState({
      searchText: text
    });
  };

  render() {
    const style = {
      border: "1px solid black",
      margin: "10px"
    };

    const data =
      this.state.searchText === ""
        ? this.state.users.map((user) => {
            return (
              <div key={user.id} style={style}>
                <p>{user.name}</p>
              </div>
            );
          })
        : this.state.users
            .filter((user) =>
              user.name.toLowerCase().includes(this.state.searchText)
            )
            .map((user) => {
              return (
                <div key={user.id} style={style}>
                  <p>{user.name}</p>
                </div>
              );
            });

    return (
      <div className="App">
        <h1>React List Filtering</h1>
        <input
          placeholder="Search user..."
          onChange={(event) => this.handleInputChange(event.target.value)}
        />
        {data.length > 0 ? data : <p>No record found!</p>}
      </div>
    );
  }
}
