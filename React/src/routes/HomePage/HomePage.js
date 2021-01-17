import React from 'react'
import BioCard from '../../components/BioCard/BioCard'
import Post from '../../components/Post/Post'
import PostContents from '../../components/PostContents/PostContents'
import TokenService from '../../services/token-service'
import './HomePage.css'

const HomePage = (props) => {
  return (
    <div className="homepage">
      <BioCard userData={props.userData} />
      <Post />
      {props.postData.map((post, index) => {
        return (<PostContents key={index} pData={post} uData={props.userData} />)
      })}


    </div>
  )
}

export default HomePage
