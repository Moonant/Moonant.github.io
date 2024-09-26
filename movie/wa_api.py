import requests
import json

def get_woody_allen_movies(api_key):
    # Step 1: Find Woody Allen's ID
    search_response = requests.get(f"https://api.themoviedb.org/3/search/person?api_key={api_key}&query=Woody%20Allen")
    woody_allen_id = search_response.json()['results'][0]['id']
    
    # Step 2: Get his movies
    movies_response = requests.get(f"https://api.themoviedb.org/3/person/{woody_allen_id}/movie_credits?api_key={api_key}")
    movies = movies_response.json()['crew']
    
    # Prepare a list to hold movie details
    movie_details = []
    
    # Filter movies where he is the director and gather required details
    for movie in movies:
        if movie['job'] == 'Director':
            details = {
                "id": movie['id'],
                "title": movie['title'],
                "overview": movie['overview'],
                "release_date": movie['release_date'],
                "poster_path": f"https://image.tmdb.org/t/p/original{movie['poster_path']}" if movie.get('poster_path') else None
            }
            movie_details.append(details)
    
    # Convert the list of dictionaries to a JSON string
    json_output = json.dumps(movie_details, indent=4)
    print(json_output)

api_key = '98325a9d3ed3ec225e41ccc4d360c817'
get_woody_allen_movies(api_key)