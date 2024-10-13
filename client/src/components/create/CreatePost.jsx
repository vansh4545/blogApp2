import { useState ,useEffect,useContext } from "react";
import { styled,Box,FormControl ,InputBase,Button,TextareaAutosize } from "@mui/material";
import {AddCircle as Add} from "@mui/icons-material";
import { useLocation ,useNavigate} from "react-router-dom";
import axios from 'axios';
import { DataContext } from "../../context/DataProvider";
import { getAccessToken } from "../../utils/common-utils";
const Container = styled(Box)`
    margin: 50px 100px
`

const Image = styled('img')({
     width: '100%',
     height: '50vh',
     objectFit: 'cover'

     
});
const StyledFormControl = styled(FormControl)`
  marign:top: 10px;
  display: flex;
  flex-direction: row;
`;
const InputTextField= styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;
const InputText = styled(TextareaAutosize)`
 width: 100%;
 margin-top:30px;
 font-size:12px;
 border: none;
 &: focus-visible{
    outline: none;
    
 }

`;
const initialPost={
   title:'',
   description:'',
   picture:'',
   username:'',
   categories:'',
   createdDate: new Date(),

}
const CreatePost =()=>{
    const [post,setPost] = useState(initialPost);
    const [file,setfile]= useState('');
    const {account} = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();
    const url = post.picture? post.picture: "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    useEffect(()=>{
        const getImage = async()=>{
            if(file){
                const data = new FormData();
                data.append("name",file.name);
                data.append("file",file);

                const  response= await axios.post('https://blogapp2-wc6e.onrender.com/file/upload',data);
                post.picture = response.data.imageUrl;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username= account.username;
    },[file])
    

    
    const savePost = async()=>{
       
        let response = await axios.post('https://blogapp2-wc6e.onrender.com/create',post,{
            headers:{
                authorization: getAccessToken()
            }
        });
        
            navigate('/');
        
    }
    const handlechange =(e) =>{
        setPost({...post,[e.target.name]:e.target.value});
    }
    return (
        <Container>
            <Image src = {url} alt ="banner"/>
            <StyledFormControl>
                <label htmlFor="fileInput">
                      <Add fontSize="large" color="action"/>
                </label>
                <input 
                type="file" 
                id="fileInput"
                style= {{display:"none"}}
                onChange={ (e)=> setfile(e.target.files[0])}
                />
                <InputTextField placeholder="Title" onChange={(e)=> handlechange(e)} name="title"/>
                <Button variant="contained" onClick={()=> savePost()}>Publish</Button>
            </StyledFormControl>
                
                <InputText
                minRows={5}
                placeholder="Write your story...."
                onChange={(e)=> handlechange(e)} name="description"/>
               
        </Container>
       
    
    )
}

export default CreatePost;