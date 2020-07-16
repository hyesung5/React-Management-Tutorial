import React, {Component} from 'react';
import {post} from 'axios';


class CustomerAdd extends Component {


    constructor(props){
        super(props);
        this.state ={
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''

        }
    }




handleformSubmit =(e) => {

    e.preventDefault();
    this.addCustomer()
    .then((response) => {
        console.log(response.data);

        this.props.stateRefrash();
    });

    this.setState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: ''
    });


}

handlefileChange = (e) => {
    this.setState({
        file: e.target.files[0],
        fileName : e.target.value
    })

}

handleValueChange = (e) => {

    
    // let nextState = {};

    // nextState[e.target.name] = e.target.value;


    // this.setState({nextState});
    const { name, value } = e.target;
		this.setState({
			[name]: value,
		});


}

addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    
    formData.append('image', this.state.file);
    formData.append('name', this.state.userName);
    formData.append('birthday', this.state.birthday);
    formData.append('gender', this.state.gender);
    formData.append('job', this.state.job);
    
    // 파일이 있는 데이터를 보낼때는 파ㅏ일 형식에 맞는 ㅊ타입을 지정해 주어야 한다.
    
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    
    }
    
    return post(url, formData, config);
    
    
    
    
    }

render() {
    return (
        <form onSubmit ={this.handleformSubmit}>
            <h1>고객 추가</h1>
            프로필 이미지:<input type="file" name="file" file={this.state.file} value={this.state.fileName}  onChange={this.handlefileChange} />
            이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
            생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} />
            성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
            직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
            <button type="submit" > 추가하기</button>
        </form>

    );

}

}


export default CustomerAdd;