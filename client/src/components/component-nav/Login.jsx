import React from 'react';
import axios from 'axios';
import history from '../History.jsx';
import {withRouter} from 'react-router-dom';
import {Button} from 'reactstrap';

import Modal from 'react-modal';
Modal.setAppElement(document.getElementById('app'));

class Login extends React.Component{
constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      username: '', 
      password: ''
    }
    this.toggleModel = this.toggleModel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkDatabase = this.checkDatabase.bind(this);
  }

  componentDidMount() {
    this.setState({showModal: true})
  }

  handleInputChange(e) {
    const name = e.target.name 
    this.setState({[name]: e.target.value})
  }

  toggleModel(e) {
    const {showModal} = this.state
    this.setState({showModal: !showModal})
  }

  checkDatabase(e) {
    e.preventDefault()
    const body = {username: this.state.username, password: this.state.password}
    axios.post('/user-login', body)
    .then(response => {
        this.props.handleUsername(response.data[0].id)
        history.push({pathname: '/bookmarks'})       
    })
    .catch(err => history.push({pathname: '/'}))
  }

  render() {
    return (
        <div>
          <Modal 
              isOpen={this.state.showModal}
              // contentLabel="Signup"
              // portalClassName="ReactModalPortal"
              // overlayClassName="ReactModal__Overlay"
              // className="ReactModal__Content"
              className="modal-dialog"
              ariaHideApp={true}
              shouldFocusAfterRender={true}
              shouldReturnFocusAfterClose={true}
              onRequestClose={() => this.toggleModel()}
            >
            <div className="modal-content">
               <h2 className="modal-header">Login</h2>   
               <form> 
                <div className="form-row"style={{padding: "10px"}}>
                  <div className="col"style={{padding: "5px"}} >
                  <input  type="text" 
                          name="username" 
                          value={this.state.username} 
                          onChange={this.handleInputChange} 
                          placeholder="username"
                          className="form-control"
                        />             
                  </div>  
                  <div className="col" style={{padding: "5px"}}>
                  <input  type="password"  
                          name="password"   
                          value={this.state.password} 
                          onChange={this.handleInputChange} 
                          placeholder="password"
                          className="form-control "
                    />   
                    </div>
                    </div>           
               </form>  
               <div style={{textAlign:"center"}}> 
                 <Button className="Button-modal" onClick={this.checkDatabase}>Login</Button>
                <Button className="Button-modal" onClick={() => history.push({pathname: '/signup'})}>Sign up</Button>
                <Button className="Button-modal" onClick={() => history.push({pathname: '/'})}>Close</Button>
              </div>
            </div>

          </Modal>

        </div>
      
    );
  }
}


export default withRouter(Login);