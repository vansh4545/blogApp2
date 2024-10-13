
import { useState,useContext } from 'react';
import {Box,TextField,Button,styled,Typography} from '@mui/material'
import axios from 'axios';
import { DataContext } from '../../context/DataProvider.jsx';
import { useNavigate } from 'react-router-dom';
const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;

const Image = styled('img')({
    width: 100,
    margin: "auto",
    display: 'flex',
    padding: '50px 0 0'
});
const Wrapper = styled(Box)`
   padding: 25px 35px;
   display: flex;
   flex: 1;
   flex-direction: column;
    & > div, & > button, & > p(
        margin-top: 20px;
    )
`;
const LoginButton = styled(Button)`
   text-transform:none;
   background: #FB641B;
   margin-top:10px;
   color: #fff;
   height: 48px;
   border-radius: 2px;
`;
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;
const SignupButton= styled(Button)`
    text-transform:none;
    background: #fff;
    color: 2874f0;
    height: 48px;
    margin-top:10px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;
const Text = styled(Typography)`
   color: #878787;
   font-size: 12px;
   margin-top: 10px;
`
const loginInitialvalue={
    username:'Guest',
    password:'guest@123456' 
}
const signupInitialvalue= {
    name:'',
    username:'',
    password:''

}
const Login = ({isUserAuthenticated}) =>{
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const [account,toggleAccount] = useState('login');
    const [signup,setsignUp]= useState(signupInitialvalue);
    const [login,setlogin] = useState(loginInitialvalue);
    const [error,setError] = useState('');
    const {setaccount} = useContext(DataContext);
    const navigate = useNavigate();
    const toggleSignup = () => {
      account==="signup" ? toggleAccount('login'): toggleAccount('signup');
}

const onInputchange =(e) =>{
    setsignUp({...signup,[e.target.name]:e.target.value});
}
const onValueChange = (e) =>{
    setlogin({...login,[e.target.name]:e.target.value});
}
const loginUser = async()=>{
    
    try {
        const response = await axios.post('https://blogapp2-wc6e.onrender.com/login',login);
        setError('');

        sessionStorage.setItem('accesstoken', `Bearer ${response.data.accesstoken}`);
        sessionStorage.setItem('refreshtoken', `Bearer ${response.data.refreshtoken}`);

        setaccount({username:response.data.username, password:response.data.password});

        isUserAuthenticated(true);
        navigate('/');
    }
    catch(error){
        setError("something went wrong,please try again later");
       
    }
}
// const signupUser = async() =>{
    
//     let response = await API.userSignup(signup);

//     if(response.isSucess){
//      
    
//     else{
        
//         setError('Something went wrong');
//     }
// }
const signupUser=async()=>{
    
    try {
       
        const response=await axios.post('https://blogapp2-wc6e.onrender.com/signup',signup);
        toggleAccount('login')
        setError('');
    } catch (error) {
        console.log(error.response);
        if(error.response.data.typeOferror=== 0){
            setError("USERNAME REQUIRED");
        }
        else if(error.response.data.typeOferror=== 1){
            setError("NAME REQUIRED");
        }
        else if(error.response.data.typeOferror==="Already exists"){
            setError("");
            toggleAccount('login')
        }
        else 
          setError('Something went wrong');
    }
}
    return (
        <Component>
            <Box>
              <Image src = {imageURL} alt="login" />
            {
                account==='login' ?
            <Wrapper>
                <TextField variant='standard' value={login.username} onChange={(e)=> onValueChange(e)}name ="username" label="Enter username"/>
                <TextField variant='standard' value={login.password} onChange={(e)=> onValueChange(e)}name ="password" label="Enter your Password"/>
                {error && <Error>{error}</Error>}
                <LoginButton  variant='contained' onClick={ ()=> loginUser()}>Login</LoginButton>
                <Text style={{textAlign:'center'}}>OR</Text>
                <SignupButton onClick={ () => toggleSignup()}>Create an account</SignupButton>
            </Wrapper>
            :
            <Wrapper>
                <TextField variant='standard' value={signup.name} onChange={(e)=> onInputchange(e)} name = "name"  label="Enter Name"/>
                <TextField variant='standard' value={signup.username} onChange={(e)=> onInputchange(e)} name = "username" label="Enter Username"/>
                <TextField variant='standard' value={signup.password}onChange={(e)=> onInputchange(e)} name = "password" label="Enter your Password"/>
                {error && <Error>{error}</Error>}
                <SignupButton onClick={()=>signupUser()}>Signup</SignupButton>
                <Text style={{textAlign:'center'}}>OR</Text>
                <LoginButton  variant='contained' onClick={ () => toggleSignup()}>Already have an account</LoginButton>
            </Wrapper>
}
            </Box>
        </Component>
    )
}

export default Login;