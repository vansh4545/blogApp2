import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';
import { getAccessToken } from '../../../utils/common-utils';
import { useParams } from 'react-router-dom';
import axios from "axios";

//components
import Comment from './comment';


const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const {id} = useParams();
    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`https://blogapplication-q26h.onrender.com/comments/${id}`,{
                
            headers:{
                authorization: getAccessToken()
            }
        });
            
            setComments(response.data);
            
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
       let response =  await axios.post('https://blogapplication-q26h.onrender.com/comment/new',comment,{
                
        headers:{
            authorization: getAccessToken()
        }
    });
        setComment(initialValue)
        setToggle(prev => !prev);
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsMin={3} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;