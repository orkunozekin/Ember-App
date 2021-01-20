import React, { useState, useEffect } from 'react';
import './UserSettings.css';
import TokenService from '../../services/token-service';
import { Form, Button } from 'react-bootstrap';
import ProfilePic from '../../components/ProfilePic/ProfilePic';
import ValidationError from '../../components/RegistrationForm/ValidationError/ValidationError'
import axios from 'axios';
import ResetPassword from '../../components/ResetPassword/ResetPassword/ResetPassword';
import S3 from 'react-aws-s3';



const UserSettings = (props) => {


    const [user, setUser] = useState({});
    const [email, setEmail] = useState({ value: '', touched: false })
    //emails to check against user's email at registration
    const [emails, setEmails] = useState([])
    const [file, setFile] = useState({ value: null, touched: false })


    useEffect(() => {

        setUser(TokenService.getUser());
        getAllEmails();

    }, [])



    window.localStorage.setItem('email', user.email);


    const getAllEmails = () => {
        axios.get('http://localhost:9001/SocialApp/api/getAllEmails')
            .then((response) => {
                setEmails(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const patchEmail = (e) => {
        e.preventDefault();
        if (email.value) {
            fetch('http://localhost:9001/SocialApp/api/updateEmail',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'

                    },
                    body: JSON.stringify({
                        userId: user.userId,
                        email: email.value
                    })
                }
            ).then(response => response.text()

            ).then(data => {
                window.localStorage.setItem('email', data);
                // history.push('/user/home');
                props.getUpdatedUser(user);
            });
        }
    }
    const updateEmail = (email) => {
        setEmail({ value: email, touched: true })
    }

    const updateFile = (file) => {
        setFile({ value: file, touched: true })

    }

    const validateEmail = () => {
        //Check the emails in the DB to ensure emails' uniqueness. 
        if (emails.includes(email.value.trim())) {
            return "Another account is already registered with this email"
        }
    }

    const patchImage = (e) => {
        e.preventDefault();
        const config = {
            bucketName: 'socialmediasite',
            dirName: `${email.value}/profilepic`, /* optional */
            region: 'us-east-2',
            accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
        }
        const ReactS3Client = new S3(config);
        ReactS3Client
            .uploadFile(file.value)
            .then(data => {

                fetch('http://localhost:9001/SocialApp/api/updatePic',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'

                        },
                        body: JSON.stringify({
                            userId: user.userId,
                            email: user.email,
                            profilePicURL: data.location
                        })
                    }
                ).then((response) => {
                    response.text();
                    props.getUpdatedUser(user);
                }
                ).then(data => {
                });
            })
    }

    if (props.updatedUser.profilePicURL) {
        return (
            <section className="user-settings">
                <h2>Edit Profile</h2>
                <br></br>
                <div className="edit-bio-wrapper">
                    <Form id="profilePic-form" onSubmit={e => patchImage(e)}>
                        <h4>Profile Picture</h4>
                        <ProfilePic profilePic={props.updatedUser.profilePicURL} />
                        <Form.Group>
                            <Form.File id="formProfilePicFile" label="Change your profile picture" onChange={e => updateFile(e.target.files[0])} />
                        </Form.Group>
                        <Button type="submit">update</Button>
                    </Form>
                </div>
                <div className="edit-bio-wrapper">
                    <Form id="email-form" onSubmit={e => patchEmail(e)}>
                        <h4>Edit email</h4>

                        <Form.Group>
                            <Form.Control type="text" defaultValue={email.value} onChange={e => updateEmail(e.target.value)} />
                            {email.touched && <ValidationError message={validateEmail()} />}
                            <Button type="submit">update</Button>
                        </Form.Group>
                    </Form>

                </div>
                <div>
                    <ResetPassword />
                </div>
            </section>
        )
    }
    else {
        return (
            <section className="user-settings">
                <h2>Edit Profile</h2>
                <br></br>
                <div className="edit-bio-wrapper">
                    <Form id="profilePic-form" onSubmit={e => patchImage(e)}>
                        <h4>Profile Picture</h4>
                        <ProfilePic profilePic={window.localStorage.getItem('updatedProfilePic') || user.profilePicURL} />
                        <Form.Group>
                            <Form.File id="formProfilePicFile" label="Change your profile picture" onChange={e => updateFile(e.target.files[0])} />
                        </Form.Group>
                        <Button type="submit">update</Button>
                    </Form>
                </div>
                <div className="edit-bio-wrapper">
                    <Form id="email-form" onSubmit={e => patchEmail(e)}>
                        <h4>Edit email</h4>

                        <Form.Group>
                            <Form.Control type="text" defaultValue={user.email} onChange={e => updateEmail(e.target.value)} />
                            {email.touched && <ValidationError message={validateEmail()} />}
                            <Button type="submit">update</Button>
                        </Form.Group>
                    </Form>

                </div>
                <div>
                    <ResetPassword />
                </div>

            </section>
        )
    }
}

export default UserSettings
