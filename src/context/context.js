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
  const [loading, setIsLoading] = useState(false);
  // error
  const [error, setError] = useState({show: false, msg: ""});

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
  <GithubContext.Provider value={{ githubUser, repos, followers, requests, error }} >
    {children}
  </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext };
