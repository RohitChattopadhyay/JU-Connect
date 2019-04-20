import React from "react"
import Login from "../components/login"
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { navigate } from "gatsby"

const cookies = new Cookies();

class Home extends React.Component {
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
        console.log(JSON.stringify(array));
        toast.success(`✔ Subscribed to ${array.length===0?"No":array.length} Channel${array.length>1?"s":""}`)
     }  
     nextPage = (roll) => {
        if(roll.length===12){
            cookies.set('identifier', Buffer.from(roll).toString('base64'), { path: '/' });
            this.setState({
                next: true
              });  
            navigate("/channels")
        }
     }
     componentDidMount() {
        const isLoggedIn = this.state.next;
        if(isLoggedIn){
            navigate("/channels")
            return(<span></span>)
        }         
     }
     
    render() {
        return(
            <div>
                <Login next={this.nextPage} />
            </div>
        )
    }
 }
 export default Home