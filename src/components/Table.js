import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
function Table() {
  const navigate = useNavigate();
  const location = useLocation();
  let currentPage = location.pathname.charAt(location.pathname.length - 1);
  if (currentPage === "/") currentPage = 1;
  else currentPage = parseInt(currentPage);

  const [people, setPeople] = React.useState([]);
  const [btnNumbers, setbtnNumbers] = React.useState([]);
  React.useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => {
        const btnArr = [];
        for (let i = 1; i <= Math.ceil(data.results.length / 10); i++) {
          btnArr.push(i);
        }
        setbtnNumbers(btnArr);
        const results = data.results.sort((a, b) => {
          const nameA = a.login.username.toUpperCase();
          const nameB = b.login.username.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        setPeople(results);
      });
  }, []);

  return (
    <div className="App">
      <table className="table">
        <tbody>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Thumbnail icon</th>
          </tr>
          {people
            .slice(currentPage * 10 - 10, currentPage * 10 - 1)
            .map((person, index) => (
              <tr key={person.login.uuid}>
                <td>
                  {person.name.title +
                    " " +
                    person.name.first +
                    " " +
                    person.name.last}
                </td>
                <td>{person.login.username}</td>
                <td>
                  <img src={person.picture.thumbnail} alt="" />{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="btnArea">
        {btnNumbers?.map((ele) => (
          <button
            key={ele}
            onClick={() => {
              navigate(`/page/${ele}`);
            }}
            style={ele === currentPage ? { backgroundColor: "violet" } : {}}
          >
            {ele}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Table;
