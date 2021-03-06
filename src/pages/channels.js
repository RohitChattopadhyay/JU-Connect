import React from "react"
import Channels from "../components/channels"
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { navigate } from "gatsby"
import {pusher} from "../package/oneSignal"
import axios from 'axios'

const cookies = new Cookies();

class ChannelContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           next:(Buffer.from(cookies.get('identifier')||' ', 'base64').toString()).length===12?true:false
        }
     }

     submitter = () => {
        var array = [];
        var checkboxes = document.querySelectorAll('input[name=channelBox]:checked');

        for (var i = 0; i < checkboxes.length; i++) {
          array.push(checkboxes[i].value);
        }
        axios.post('/api/subscriber/update', {
            channels : array
          })
          .then(function (response) {
                if(response.data.code==200)
                    toast.success(`✔ Subscribed to ${array.length===0?"No":array.length} Channel${array.length>1?"s":""}`)
                else{
                    toast.error('Fatal Error | Try again later or Contact Admin stating error code 402')
                    toast.warn('Logging out in a second')
                    setTimeout(function(){
                      cookies.remove('identifier', { path: '/' })
                      // location.reload();
                    }, 2000);
                }
            }
          )
          .catch(function (error) {
            toast.error('Fatal Error | Try again later or Contact Admin stating error code 401')
            toast.warn('Logging out in a second')
            setTimeout(function(){
              cookies.remove('identifier', { path: '/' })
              location.reload();
            }, 2000);
          }
        );
     }  
     componentDidMount() {
        const isLoggedIn = this.state.next;
        if(!isLoggedIn){
            navigate("/")
            return(<span></span>)
        }
        pusher.setup() 
     }
    render() {
        return(
            <div>
                <Channels submitter={this.submitter}/>
            </div>
        )
    }
 }
 export default ChannelContainer