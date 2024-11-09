import React from 'react';
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
} from '@appbaseio/reactivesearch';

function App() {
  return (
    <ReactiveBase
      app="jobboard"
      url="http://localhost:9200"
      enableAppbase={false}
    >
      {/* i saw the tip on the github, about the type, but i removed it because from what i saw, 
    its not longer needed for ElasticSearch version more than 7(im using 7.17.25) and also because my code wasnt working with it */}
      <div>
        <DataSearch
          componentId="job_query"
          dataField={['jobTitle', 'jobTitle.keyword']}
          title="Find Job Title"
          placeholder="Type in a job title"
        />
        <DataSearch
          componentId="company_query"
          dataField={['company', 'company.keyword']}
          title="Find by Company"
          placeholder="Type in company name"
        />
        <DataSearch
          componentId="location_query"
          dataField={['location', 'location.keyword']}
          title="Search by Location"
          placeholder="Type in location"
        />
      </div>

      <ReactiveList
        componentId="jobs_list"
        dataField="jobTitle"
        react={{
          and: ['job_query', 'company_query', 'location_query'],
        }}
        renderItem={renderItem}
      />
    </ReactiveBase>
  );
}
/* i put the style in there, as i'll just give you the App.js and not the App.css */
const renderItem = (data) => (
  <div
    key={data._id}
    style={{
      border: '1px solid gray',
      padding: '10px',
      margin: '10px 0',
    }}
  >
    <h2>{data.jobTitle}</h2>
    <p><strong>Company:</strong> {data.company}</p>
    <p><strong>Location:</strong> {data.location}</p>
    <p><strong>Job Description:</strong> {data.description}</p>
  </div>
);

export default App;
