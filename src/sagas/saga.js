import {SIGNIN_REQUESTED,LOGIN_SUCCESS} from '../constants/constants.js'
import axios from 'axios'

 import {delay,eventChannel} from 'redux-saga'
import {takeEvery,put,call,take,fork,cancelled,cancel,all,apply} from 'redux-saga/effects';

import {createWebSocketConnection} from '../socketConnection'



  export function* authorize(name,type) {


    try{

   const token = yield call(

     ()=>{

  return axios.post('http://127.0.0.1:5000/signin',{name,type})

     }


   )

   yield put({type:'SIGNIN_SUCCESS',payload:token})
   // set token to localStorage

    }
    catch(error){
      yield put({type:'SIGNIN_ERROR',payload:error})
    }finally {

     if(yield cancelled()){

        // dispatch an action to set isLoginPending to false,

     }

    }

    }



export function* loginFlow(){


   while(true){


     const {payload} = yield take('SIGNIN_REQUEST')


     const task = yield fork(authorize,payload.name,payload.type)

    const action =  yield take(['SIGN_OUT',"SIGNOUT_ERROR"])

    if(action.type ==='LOGOUT')
      {
        yield cancel(task)
        //clear the token from localStorage
      }


   }


}



function createSocketChannel(socket){

   return eventChannel(emit=>{


     const initialHandler = (event)=>{


       emit({type:'INITIAL_RECIEVED',payload:event})
     }
     const messageHandler =(event)=>{
       emit({type:'MESSAGE_RECIEVED',payload:event})
     }

    const errorHandler = (errorEvent)=>{

    emit(new Error(errorEvent.reason))


 }

socket.on('initial',initialHandler)
socket.on('message',messageHandler)
socket.on('error',errorHandler)

const unsubscribe =()=>{

  socket.off('ping',messageHandler)

}

return unsubscribe;


   })





}


export function* watchOnPings(){

     const socket = yield call(createWebSocketConnection)

     yield put({type:'SET_SOCKET',payload:socket})

     const socketChannel = yield call(createSocketChannel,socket)



     while(true){

    try{

      const data = yield take(socketChannel)

      yield put({type:data.type,payload:data.payload})



    }catch(err){
      console.error('socket err',err)
    }






     }

}

function* sendMessage(payload){



  yield apply(payload.socket,payload.socket.emit,['message',payload.messageInput])

  yield put({type:"CLEAR_MESSAGE_FIELD"})



}
export function* sendMessageListener(){
 while(true){

  const {payload} = yield take('SEND_MESSAGE_REQUESTED')

  yield fork(sendMessage,payload)
}
}


export function* rootSaga(){

   yield all([
  //fork(watchOnPings),
  fork(loginFlow),
  //fork(sendMessageListener)


   ])

}