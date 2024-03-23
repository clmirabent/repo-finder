import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material"
import toast from "react-hot-toast"


import SearchBarComponent, { SearchBarSize } from "../components/searchBar/SearchBarComponent";
import UserService from "../services/api/user";
import LogoComponent from "../components/logo/LogoComponent";


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
        toast.error("Sorry. User not found.")
      }
    }
  }


  return <Box display="flex" flexDirection="column" alignItems="center" justifyItems="center" width="100%" paddingTop="14%">
    <LogoComponent />
    <Box width="50%">
      <SearchBarComponent placeholder="Find user..." onSearch={onSearchSubmit} size={SearchBarSize.lg} />
    </Box>
  </Box >

}
export default MainDashboard


