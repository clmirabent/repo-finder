import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material"
import toast from "react-hot-toast"


import SearchBarComponent, { SearchBarSize } from "../components/searchBar/SearchBarComponent";
import UserService from "../services/api/userService";
import LogoComponent from "../components/logo/LogoComponent";


function MainDashboard() {
  const navigate = useNavigate()

  /**
 ** Function that handles the submission of a search
 * @param {string} userName - The username to search for
 * @returns {Promise<void>}
 */

  async function onSearchSubmit(userName: string) {
    // Check if a username is provided
    if (userName) {
      // Get username from UserService
      const user = await UserService.getByName(userName);
      //If the user is found, navigate to the repositories page with the user data.
      if (user) {
        navigate('/repositories', {
          state: {
            user: user
          }
        })
      }
      else {
        // Display an error message if the user was not found.
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


