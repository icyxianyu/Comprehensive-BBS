import io from 'socket.io-client';
let socket=null ;
export default{
    connect(){
        socket=io("ws://localhost:3000");
    },
    getInstance(){
        if(socket!==null)
        return socket
    },
    destroy(){
        socket.close();
        socket=null;
    }
}
