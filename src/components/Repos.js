import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const {repos} = React.useContext(GithubContext);
  // console.log(repos);

  // reduce method: callback function and return object
  let languages = repos.reduce( (total, item) => {
    // console.log(item);
    const { language, stargazers_count } = item;

    if(!language) return total;

    if(!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language], 
        value: total[language].value + 1,
        stars:total[language].stars + stargazers_count
      };
    }
    // console.log(language);
    return total;
  }, {})
  // console.log(languages);

  // Object.values gives us back an array of the values
  const mostUsedlanguages = Object.values(languages).sort((a, b) => {
    return b.value - a.value;
  }).slice(0, 6);

  // console.log(languages);

  // mostStarsPerLanguage
  const mostStarsPerLanguage = Object.values(languages).sort((a, b) => {
    return b.stars - a.stars;
  }).map((item) => {
    return {...item, value:item.stars};
  }).slice(0,6);

  // console.log(mostStarsPerLanguage);

  // Stars, forks
  let {stars, forks } = repos.reduce((total, item) => {
    const {stargazers_count, name, forks} = item;
    // stars
    total.stars[stargazers_count] = {label: name, value: stargazers_count}
    // forks
    total.forks[forks] = {label: name, value:forks}
    return total;
  }, {
    stars: {},
    forks: {}
  })

  // generates an array of values
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  // console.log(stars);

  const chartData = [
    {
      label: "JavaScript",
      value: "50"
    },
    {
      label: "HTML",
      value: "20"
    },
    {
      label: "CSS",
      value: "20"
    },
    {
      label: "Python",
      value: "10"
    }
  ];

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={mostUsedlanguages} />
        <Column3D data={stars} />
        <Doughnut2D data={mostStarsPerLanguage} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  )
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  
  .fusioncharts-container {
    width: 100% !important;
  }

  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
