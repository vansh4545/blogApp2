
import {styled,Button, Table ,TableHead,TableCell,TableBody,TableRow} from '@mui/material';
import { categories } from '../constants/data';
import { Link,useSearchParams } from 'react-router-dom';

const Styledtble = styled(Table)`
 border: 2px solid rgba(224,224,224,1);
`
const Styledbutn = styled(Button)`
margin:20px;
width: 85%;
background: #6495ED;
color: #fff;

`;
const Styledlink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const Categories = ()=>{
    const [searchParams]= useSearchParams();
    const category = searchParams.get('category');
    return (
        <>
        <Styledlink to={`/create?category=${category || ''}`}>
           <Styledbutn variant='contained'> Create Blog </Styledbutn>
        </Styledlink>
        <Styledtble>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Styledlink to = '/'>
                        All Categories
                        </Styledlink>
                        </TableCell>
                   
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    categories.map(category=>(
                        <TableRow key = {category.id}>
                            <TableCell>
                                <Styledlink to = {`/?category=${category.type}`}>
                                  {category.type}
                                </Styledlink>
                            </TableCell>
                        </TableRow>
                    ))
                }
               
            </TableBody>
        </Styledtble>
        </>
    )
}


export default Categories;