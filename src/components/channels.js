import React from "react"

import bs from "../styles/bootstrap.module.css"
import Card from "../components/cardHolder"
import { Slide,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios'

class Channels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected : [],
            data: [],
            search: ""
        }
     }
     getSubscribed = () => {
        return axios.get('/api/subscriber'); 
     }
     getAll = () => {
        return axios.get('/api/channels')
     }
     componentDidMount() {
        let self = this;
        axios.all([this.getAll(), this.getSubscribed()])
        .then(axios.spread(function (all, sub) {
          self.setState(prevState => ({
            selected: [...prevState.selected, ...sub.data.data],
            data: [...prevState.data, ...all.data.data]
          }))          
            }
        )
        ).catch(function (error) {
          console.log(error)
          }
        )
     }
    render() {
        const props = this.props;
        const data = this.state.data;
        const selected = this.state.selected;
       return (
            <div className={[bs.container,"channelScreen"].join(' ')}>
                <div className={bs.container}>
                <ToastContainer transition={Slide} position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange />
                <div className={bs.jumbotron}>
              <h3>JU Connect</h3><hr />
              <input type="text" className="searchBar" name="search" placeholder="Search.." />
          </div>
          <h3>{data.length} Channels</h3>
          <small>Choose Channel and click on save</small>
          <div className={bs.row}>
                    <div className={`col-12 flex-container`}>
                    {
                      data.map((node) => <Card key={node.slug} name={node.name} slug={node.slug} check={selected.includes(node.slug)}/>)
                    }
                </div>
                    <button onClick={props.submitter} className={[bs.btn,bs.btnPrimary,"save-btn"].join(' ')}><i className={"fas fa-save saveBtn"}></i></button>
                </div>
            </div>
        </div>
        );
    }
 }
 export default Channels

// import React from "react"

// import bs from "../styles/bootstrap.module.css"
// import Card from "../components/cardHolder"
// import { Slide,ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
// import axios from 'axios'
// import { func } from "prop-types";

// class Channels extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selected : [],
//             data: [],
//             search: ""
//         }
//      }
//      getSubscribed = () => {
//         return axios.get('/api/subscriber'); 
//      }
//      getAll = () => {
//         return axios.get('/api/channels')
//      }
//      componentDidMount() {
//         let self = this;
//         axios.get('/api/channels').then(function(res1){
//             self.setState({
//               data : res1.data
//           });          
//         }).then(function(res){
//           axios.get('/api/subscriber').then(function(res2){
//             self.setState({
//               selected : res1.data
//             });
//           })
//         })
//         axios.all([this.getAll(), this.getSubscribed()])
//         .then(axios.spread(function (all, sub) {
                    
//                     console.log(self.state.selected)
//                 }
//             )
//         ).catch(function (error) {
//           self.setState({
//             selected: []
//             });
//           }
//         )
//      }
//     render() {
//         const props = this.props;
//         const data = this.state.data;
//         console.log(data)
//        return (
//             <div className={[bs.container,"channelScreen"].join(' ')}>
//                 <div className={bs.container}>
//                 <ToastContainer transition={Slide} position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange />
//                 <div className={bs.jumbotron}>
//               <h3>JU Connect</h3><hr />
//               <input type="text" className="searchBar" name="search" placeholder="Search.." />
//           </div>
//           <h3>{data.length} Channels</h3>
//           <small>Choose Channel and click on save</small>
//           <div className={bs.row}>
//                     <div className={`col-12 flex-container`}>
//                 {data.map(({ node }) => (
//                 <Card key={node.slug} name={node.name} slug={node.slug} check={selected.includes(node.slug)}/> 
//                 ))}
//                 </div>
//                     <button onClick={props.submitter} className={[bs.btn,bs.btnPrimary,"save-btn"].join(' ')}><i className={"fas fa-save saveBtn"}></i></button>
//                 </div>
//             </div>
//         </div>
//         );
//     }
//  }
//  export default Channels
// import React from "react"
// import bs from "../styles/bootstrap.module.css"
// import Card from "../components/cardHolder"
// import { StaticQuery, graphql } from "gatsby"
// import { Slide,ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';

// export default ({submitter,selected}) => (

//   <StaticQuery
//       query={graphql`
//       {
//         allChannelsResults{
//           edges{
//             node{
//                 name
//                 slug
//             }
//           }
//         }
//       }
//       `}

//       render={data => (
//         <div className={[bs.container,"channelScreen"].join(' ')}>
//         <div className={bs.container}>
//           <ToastContainer transition={Slide} position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange />
//           <div className={bs.jumbotron}>
//               <h3>JU Connect</h3><hr />
//               <input type="text" className="searchBar" name="search" placeholder="Search.." />
//           </div>
//           <h3>{data.allChannelsResults.edges.length} Channels</h3>
//           <small>Click to subscribe</small>
//           <div className={bs.row}>
//             <div className={`col-12 flex-container`}>
//           {data.allChannelsResults.edges.map(({ node }) => (
//            <Card key={node.slug} name={node.name} slug={node.slug} check={selected.includes(node.slug)}/> 
//           ))}
//             </div>
//             <button onClick={submitter} className={[bs.btn,bs.btnPrimary,"save-btn"].join(' ')}><i className={"fas fa-save saveBtn"}></i></button>
//           </div>
//         </div>
//         </div>
//       )}
//     />

//   )