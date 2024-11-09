import requests

#some basics variables, in order to make the code more readable
BASE_URL = 'http://localhost:9200'
HEADERS = {'Content-Type': 'application/json'}
INDEX_NAME = 'jobboard'

#function to create the index
def init_index():
    url = f'{BASE_URL}/{INDEX_NAME}'
    mappings = {
        "mappings": {
            "properties": {
                "jobTitle": {"type": "text"},
                "location": {"type": "text"},
                "company": {"type": "text"},
                "description": {"type": "text"}
            }
        }
    }
    resp = requests.put(url, headers=HEADERS, json=mappings)
    print(f"Index '{INDEX_NAME}' created. Status code was: ", resp.status_code)
    print("Response:", resp.json())

#function to fill the index with some jobs and their data
def fill_jobs():
    job_data = [
        {"jobTitle": "Software Engineer", "location": "Austin, TX", "company": "Google", "description": "Lorem Ipsum"},
        {"jobTitle": "Truck Driver", "location": "Dallas, TX", "company": "Trucking Company", "description": "Lorem Ipsum"},
        {"jobTitle": "Nurse", "location": "New York, NY", "company": "Hospital", "description": "Lorem Ipsum"}
    ]
    for i in job_data:
        res = requests.post(f'{BASE_URL}/{INDEX_NAME}/_doc', headers=HEADERS, json=i)
        print(f"Job '{i['jobTitle']}' added. Status code was: ", res.status_code)
        print("Response:", res.json())

#main function
if __name__ == '__main__':
	init_index()
	fill_jobs()