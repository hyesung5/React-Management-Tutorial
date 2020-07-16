import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customet';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
root: {
  width: '100%',
  marginTop: theme.spacing(3),
overfolwX: "auto"
},
table:{
minWidth: 1080

},
progress: {
  margin : theme.spacing(2)

}



})
// const customers= [{
//   'id': 1,
//   'image':'https://placeimg.com/64/64/1',
//   'name': '홍길동',
//   'birthday': '961222',
//   'gender': '남자',
//   'job': '학생',
// },
// {
//   'id': 2,
//   'image':'https://placeimg.com/64/64/2',
//   'name': '홍길동2',
//   'birthday': '960608',
//   'gender': '남자',
//   'job': '학생',
// },
// {
//   'id': 3,
//   'image':'https://placeimg.com/64/64/3',
//   'name': '홍길동3',
//   'birthday': '961122',
//   'gender': '남자',
//   'job': '학생',
// }
// ]


/*
    1) constructor()
    
    2) componentWillMount

    3) render()

    4) componentDidMount()
*/

/*

props or stata 값을 변경되는 경우에는  shouldComponentUdate() 사용하고 render 함수를 불러온후 새로갱신처리 
props or state => shouldComponentUdate()
*/

class App extends Component {
  state ={
    customers: "",
    completed: 0
  }

  progress = () => {
    const {completed} = this.state;

    this.setState({
      completed: completed >= 100 ? 0 : completed + 1
    });
  };

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
     this.callApi()
     .then(res => this.setState({customers: res}))
     .catch(err => console.log(err));

  }

  callApi = async () => {
    const response =await fetch('/api/customers');
    const body = await response.json();

    return body;
  }
  render(){
    const {classes} = this.props;
    return(
      <div>
        <Paper className={classes.root}> 
        <Table className={classes.table} > 
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월이</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>


         
     {this.state.customers? this.state.customers.map(customer => {
       return (
         <Customer 
         key={customer.id}
          id={customer.id}
          name={customer.name}
          birthday={customer.birthday}
          gender={customer.gender}
          job={customer.job}
          image={customer.image}
         />
       )
     }) : 
     <TableRow>
        <TableCell colSpan="6"  align="center">
          <CircularProgress  className={classes.progress} variant="determinate" value={this.state.completed}/>

        </TableCell>
     </TableRow>
     }
      </TableBody>
     </Table>
     </Paper>
  </div>
    )
  }
}


export default withStyles(styles)(App);
