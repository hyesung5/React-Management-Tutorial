import React , {Component} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class Customer extends Component {
render() {
    const {id, name, birthday, gender, job, image} = this.props;
    return(

        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell><img src={image}  alt="profile"/></TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{birthday}</TableCell>
            <TableCell>{gender}</TableCell>
            <TableCell>{job}</TableCell>

        </TableRow>
            // <div>
            //    <CustomerProfile id={id} name={name} image={image}/>
            //    <CustomerInfo birthday={birthday} gender={gender} job={job}/>
            // </div>

    )
}
}


// class CustomerProfile extends Component {

//     render(){
//         const {image, id, name } = this.props;
//         return(
//             <div>
//                 <img src={ image} alt="profile"/>
//         <h2>{name} ({id})</h2>

//             </div>

//         )
//     }
// }


// class CustomerInfo extends Component{
//     render(){
//         const {birthday, gender, job } = this.props;
//         return(
//                 <div>
//                     <p>{birthday}</p>
//                     <p>{gender}</p>
//                     <p>{job}</p>


//                 </div>

//         )

//     }
// }

export default Customer;