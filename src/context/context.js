import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
// library for requesting data
import axios from 'axios';

const rootUrl = 'https://api.github.com';
// setup Context: gives access to provider and consumer: 
// GithubContext.Consumer, GithubContext.Provider
const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
  // user
  const [githubUser, setGithubUser] = useState(mockUser);
  // repositories
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request 
  const [requests, setRequests] = useState(0);
  // loading
  const [isloading, setIsLoading] = useState(false);
  // error
  const [error, setError] = useState({show: false, msg: ""});

  // searching Users
  const searchGithubUser = async(user) => {
    // console.log(user);
    // just invoke the function cuz we have set default values already.
    toggleError();
    setIsLoading(true);
    // catach the reponse
    const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err))

    console.log(response);
    if(response) {
      setGithubUser(response.data);
      const {login, followers_url} = response.data;

      // repos: https://api.github.com/users/rjgupta/repos?per_page=100
      // followers: https://api.github.com/users/rjgupta/followers     
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`), 
        axios(`${followers_url}?per_page=100`)
      ]).then((results) => {
        // console.log(results);
        const [repos, followers] = results;
        const status = 'fulfilled';
        if(repos.status === status) {
          setRepos(repos.value.data)
        }
        if(followers.status === status) {
          setFollowers(followers.value.data)
        }
      }).catch(err => console.log(err));
    } else {
      toggleError(true, 'user not found');
    }

    checkRequests();
    setIsLoading(false);
  }

  // check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
    .then(({data}) => {
      // console.log(data)
      let {
        rate: {remaining}
      } = data;

      // set
      setRequests(remaining)
      if(remaining === 0) {
        // error msg
        toggleError(true, 'you have exceeded your hourly request limit.');
      }
    })
    .catch((err) => console.log(err));
  };

  // errors
  function toggleError(show = false, msg = '') {
    setError({show, msg})
  } 
  // useEffect method
  useEffect(checkRequests, []);

  return (
  <GithubContext.Provider 
    value={
      { 
        githubUser, 
        repos, 
        followers, 
        requests, 
        error,
        searchGithubUser,
        isloading
      }
    } 
    >
    {children}
  </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext };
