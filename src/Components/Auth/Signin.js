// import React,{Component} from 'react'
//
// import {connect} from 'react-redux'
//
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
//
//
//
// const mapStateToProps = (state)=>{
//
// return {
//
//  firebase: state.firebaseReducer.firebase,
//  db: state.firebaseReducer.firebaseDB,
//  messageInput: state.inputfieldReducer.messageInput
// }
//
// }
//
//
//
//
//
//
//
// class Signin extends Component {
//
//
// render(){
//
//
//
//
// const {dispatch} = this.props
//
// console.log('firebse',this.props.firebase)
//
//
//   return(
//
//   <div >
//
//
//   <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={this.props.firebase.auth()}/>
//
//
//   </div>
//
//
//
//   )
// }
//
//
//
//
// }
// //<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={this.props.firebase.auth()}/>
// // <input type = 'text' />
// // <input type = "text"/>
// //  <button onClick = {()=> dispatch({type:'SIGNIN_REQUEST',payload:{name:'alwin',type:'staff'}})}
// //
// //  >send</button>
// // <button onClick = {()=> dispatch({type:'SIGN_OUT'})}>sign out</button>
//
//
//
// export default Signin
