import React from 'react';
import BioCard from '../../components/BioCard/BioCard';
import Post from '../../components/Post/Post';
import TokenService from '../../services/token-service';
import PostContents from '../../components/PostContents/PostContents';
import './ProfilePage.css';

const ProfilePage = (props) => {

  // function checkPost(post) {
  //   console.log("Checking post:", post);
  //   if (!post.user) {
  //     console.log("post has no user...");
  //     return true;
  //   }
  //   else {
  //     return post.userId === user.userId;
  //   }
  // }
  // const user = TokenService.getUser();
  // const user_posts = props.postData.filter(checkPost);
  // console.log("user:", user);
  // console.log("before user_posts:", props.postData);
  // console.log("user_posts:", user_posts);

  // const user = TokenService.getUser()
  //   .then((user_response) => {
  //     const user_posts = props.postData.filter(checkPost);
  //     console.log("user_posts:", user_posts);
  //   });

  // console.log("props.postData:", props.postData);
  // console.log(user_posts)
  return (
    <div className="profilepage">
      <BioCard userId={props.userId} userData={props.userData}/>
      <Post />
      {props.userData.map((user, index) => {
          return user.posts.map((post, key) => {
            return (<PostContents key={key} pData={post} uData={user} numOfUsers={props.userData.length} />)
          })
        })}
    </div>
  )
}

export default ProfilePage;
