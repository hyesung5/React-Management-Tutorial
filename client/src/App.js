import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
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

  constructor(props){
    super(props);
    this.state= {
      customers: '',
      completed: 0

    }

  }

  stateRefresh = () => {
    this.setState({
        customers: '',
        completed: 0
    });
    this.callApi()
     .then(res => this.setState({customers: res}))
     .catch(err => console.log(err));
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
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>


         
     {this.state.customers? this.state.customers.map(customer => {
       return (
         <Customer 
         stateRefresh={this.stateRefresh}
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
                    
     <CustomerAdd stateRefresh={this.stateRefresh} />
  </div>
    )
  }
}


export default withStyles(styles)(App);
