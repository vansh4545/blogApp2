import { useEffect,useState ,useContext} from "react";
import {Box,Typography,styled} from "@mui/material";
import { Delete, Edit } from '@mui/icons-material';
import {useParams,Link,useNavigate} from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import axios from "axios";
import { getAccessToken } from "../../utils/common-utils";
import Comments from "./comments/Comments";
const Container= styled(Box)`
    margin: 50px 100px ;
`;
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
    word-break: break-word;
`;
const Autho = styled(Typography)`
    marginLeft: 'auto';
`;
const Des = styled(Typography)`
   word-break: break-word;
`
 const DetailsView = ()=>{

    const [post,setPost]= useState({});
    const {id} = useParams();
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchdata = async()=>{
             let repsonse = await axios.get(`https://blogapp2-wc6e.onrender.com/post/${id}`
                
                // headers:{
                //     authorization: getAccessToken()
                // }
            );

             setPost(repsonse.data)
        }
        fetchdata();
    },[])
    const deleteBlog = async () => {  
        console.log("deleteBlog");
        await axios.delete(`https://blogapp2-wc6e.onrender.com/delete/${id}`,{
                
        headers:{
            authorization: getAccessToken()
        }
    });
        navigate('/')
    }
    const url = post.picture? post.picture: "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    return (
     <Container> 
        <Image  src ={ url }alt="blog"/>
        <Box style={{ float: 'right' }}>
                {   
                    account.username === post.username && 
                    <>  
                        <Link to ={`/update/:${id}`}><EditIcon color="primary" /> </Link>
                        <DeleteIcon onClick={() => deleteBlog()}color="error" />
                    </>
                }
        </Box>
        <Heading>{post.title}</Heading>
        <Box style={{color:'#878787' ,display:'flex',margin: '20px 0'}}>
            <Typography>Author: <Box component="span" style={{fontWeight: 600}}>{post.username}</Box></Typography>
            <Typography style={{marginLeft:'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
        </Box>
         <Des>{post.description}</Des>
         <Comments post={post} />
     </Container>
    )
}

export default DetailsView;