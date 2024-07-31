# Musaeid Backend API
- To run the backend, get a replicate api token from [replicate](https://replicate.com) and an openai api token from [openai](https://platform.openai.com)
- Create a *.env* file using the *.env-example* for reference and add these keys to the environment
- Install the requirements of this project after creating a virtual environment for the project:
```
pip install -r requirements
```
- Run the command to run migrations and create an sqlite db for the chats if none exists:
```
python manage migrate
```
- You can now then serve the backend api with:
```
python manage.py runserver
```

## Preparing the data
- To avail the data for the API, I created an sqlite db by using pandas to read the csv files
- Exporting these dataframes into sql to create the final sql database which can be queried by the llm

## Features
- The API has one endpoint the `chat` endpoint, fetching from this endpoint without a chat id (`chat/<chat_id>/`) automatically creates a chat id for the sessions which can be stored in the local storage
- Fetching the endpoint with a chat id returns the chat timeline or all the messages under the chat
- Posting to the `chat` endpoint has to be done with a chat id and this adds a message to the chat
- The message is first processed by the llm which then adds its own message to the chat

## Key challenges
- The biggest challenge was to query the llm and return proper sql for the question posed by the user
- Creating a good enough response from the llm with a raw prompt wasn't going well therefore I decided to research into text to sql options which got me to the llama-index library
- Even with the library's retrievers, the response is not good enough, I believe more data processing is needed on the data before actually feeding it to the natural language to sql retrievers
- Only one question came out with impressive results, `Find sales people for companies that are attending events in Singapore over the next 9 months`

## Improvements
- Preprocess the data, create a more extensive database for the raw data with constraints and integrity checks, define the schema a little for the llm to receive more context
- Add authentication and authorization
- Add analytics to track how much usage a user has had to enable features such as billing


