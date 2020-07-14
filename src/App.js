import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customet';


const customers= [{
  'id': 1,
  'image':'https://placeimg.com/64/64/1',
  'name': '홍길동',
  'birthday': '961222',
  'gender': '남자',
  'job': '학생',
},
{
  'id': 2,
  'image':'https://placeimg.com/64/64/2',
  'name': '홍길동2',
  'birthday': '960608',
  'gender': '남자',
  'job': '학생',
},
{
  'id': 3,
  'image':'https://placeimg.com/64/64/3',
  'name': '홍길동3',
  'birthday': '961122',
  'gender': '남자',
  'job': '학생',
}
]

class App extends Component {

  render(){
    return(
      <div>
     {customers.map(customer => {
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
     })}
  </div>
    )
  }
}


export default App;
