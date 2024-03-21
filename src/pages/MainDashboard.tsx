import { useNavigate } from "react-router-dom";

import { SearchBarComponent } from "../components/searchBar/SearchBarComponent";
import UserService from "../services/api/user";

function MainDashboard() {
  const navigate = useNavigate()

  async function onSearchSubmit(userName: string) {
    if (userName) {
      const user = await UserService.getByName(userName);
      if (user) {
        navigate('/repositories', {
          state: {
            user: user
          }
        })
      }
      else {
        alert("Not found")
      }
    }
  }


  return <div>
    <SearchBarComponent placeholder="Enter Github user..." onSearch={onSearchSubmit} />
  </div>
}
export default MainDashboard


