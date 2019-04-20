import React from "react"
import bs from "../styles/bootstrap.module.css"
import Card from "../components/cardHolder"
import { StaticQuery, graphql } from "gatsby"
import { Slide,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default ({submitter}) => (

  <StaticQuery
      query={graphql`
      {
        allChannelsResults{
          edges{
            node{
                name
                slug
            }
          }
        }
      }
      `}

      render={data => (
        <div className={[bs.container,"channelScreen"].join(' ')}>
        <div className={bs.container}>
          <ToastContainer transition={Slide} position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange />
          <div className={bs.jumbotron}>
              <h3>JU Connect</h3><hr />
              <input type="text" className="searchBar" name="search" placeholder="Search.." />
          </div>
          <h3>{data.allChannelsResults.edges.length} Channels</h3>
          <small>Click to subscribe</small>
          <div className={bs.row}>
            <div className={`col-12 flex-container`}>
          {data.allChannelsResults.edges.map(({ node }) => (
           <Card key={node.slug} name={node.name} slug={node.slug}/> 
          ))}
            </div>
            <button onClick={submitter} className={[bs.btn,bs.btnPrimary,"save-btn"].join(' ')}><i className={"fas fa-save saveBtn"}></i></button>
          </div>
        </div>
        </div>
      )}
    />

  )