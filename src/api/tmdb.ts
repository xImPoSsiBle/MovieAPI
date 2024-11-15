export const fetchAPI = async (url: string) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWY4YWVhM2RjMmUyYzRiOGU4YzU5ZTY5NjNiOGY5NyIsIm5iZiI6MTcyMzAwOTYwNi4xODQyNTgsInN1YiI6IjY2YjMwNzQwNzYyNzQ0Nzg5MmYxM2ZiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AcPmQrRjntf4StDmoiV1CuAH5kpk1QXFaMI9aRJSbh4'
        }
    };

    const response = await fetch(`https://api.themoviedb.org/3/${url}?language=ru`, options)

    return response.json()
}