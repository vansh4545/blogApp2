import { useState ,useEffect } from "react";
import  axios from "axios";
import { getAccessToken } from "../../utils/common-utils";
import {Box,styled , Grid} from "@mui/material";
import Post from "./Post";
import { useSearchParams,Link } from "react-router-dom";
const Sgrid = styled(Grid)`
   
   
`
const  Posts= ()=>{

    const [posts,setPosts] = useState([]);
    const [searchParams]  = useSearchParams();
    const category = searchParams.get('category');
    
    
// Add the category parameter conditionally
    
    useEffect(()=>{
        const fetchData = async() => {
           let response = await axios.get('https://blogapplication-q26h.onrender.com/posts',{ params: {
            category: category || ''
          },
            headers:{
                authorization: getAccessToken()
            }
        });
          
              setPosts(response.data);
           
        }
        fetchData();
    },[category])
    return (
       <> 
         {
            posts && posts.length>0 ? posts.map(post =>(
                <Sgrid item lg={3} sm={4} xs={12}>
                  <Link to={`details/${post._id}`} style={{textDecoration:'none', color:'inherit'}}>
                     <Post post = {post}/>
                  </Link>
                </Sgrid>
            )): <Box style={{color:'#878787',marign: '30px 80px', fontSize: 18}}>  No data available</Box>
         }
        </>
    )
}

export default Posts;