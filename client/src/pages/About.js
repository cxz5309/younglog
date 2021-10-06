import React from 'react';
import queryString from 'query-string';

const Home = ({location, match}) => {

  const query = queryString.parse(location.search);
  console.log(location.search);
  console.log(query);
  return (
    <div>
      <h2>
        About {match.params.name}
      </h2>
      <span> {query.detail && 'detail: blahblah'}</span>
    </div>
  )
}

export default Home;