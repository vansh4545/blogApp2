
import { AppBar,Toolbar,Typography,styled } from "@mui/material";
import { Link } from "react-router-dom";
const Component= styled(AppBar)`
     background: #ADD8E6;
     
     color: #000;
    
`
//#FFFFFF
const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: inherit;
        text-decoration: none;
    }
`
const Header = ({isAuthenticated}) => {
    return (
        <Component>
            <Container>
               <Link to='/'>Home</Link>
               <Link to = '/contact'>Contact</Link>
               <Link to = '/about'>About</Link>
               {isAuthenticated ? (
                   <Link to='/login'>Logout</Link>
               ) : (
                   <Link to='/login'>Login</Link>
               )}
               
            </Container>
        </Component>
    )
}

export default Header;