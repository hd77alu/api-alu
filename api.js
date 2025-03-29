import { SECURED_API_KEY } from './config.js';

// KEY Elements
const apiBaseUrl = 'https://book-recommender1.p.rapidapi.com/recommend/genre';
const searchButton = document.getElementById('searchButton');
const genreInput = document.getElementById('genreInput');
const booksResults = document.getElementById('booksResults');
const booksList = document.getElementById('booksList');
const genreInputError = document.getElementById('genreInputError');
const resultsFilter = document.getElementById('resultsFilter');

// API settings
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': SECURED_API_KEY,
        'x-rapidapi-host': 'book-recommender1.p.rapidapi.com',
    },
};

// Prevent automatic API requests
let isFetching = false;

// Main search function
const handleSearch = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isFetching) return;
    isFetching = true;
    searchButton.disabled = true;

    // Input Pattern
    const validateInput = (input) => {
        // Only allow alphabetical characters for genres
        const genreRegex = /^[a-zA-Z\s]+$/;
        return !(!input || input.length < 3 || !genreRegex.test(input));
    };

    // Get user input, trim it, and convert to lowercase
    const genre = genreInput.value.trim().toLowerCase();
    genreInputError.textContent = ''; // Clear previous errors

    // Input validation
    if (!validateInput(genre)) {
        genreInputError.textContent = 'Invalid input. Please enter a valid genre.';
        genreInput.focus();
        searchButton.disabled = false;
        isFetching = false;
        return;
    }

    // Clear previous results
    booksList.innerHTML = '';
    booksResults.style.display = 'none';

    // Generate the API URL with the genre as a query parameter
    const url = `${apiBaseUrl}?genre=${encodeURIComponent(genre)}`;

    try {
        // Create a timeout for the fetch request
        const controller = new AbortController();
        const signal = controller.signal;
        const timeout = setTimeout(() => controller.abort(), 10000); // Timeout is 10 seconds

        // Perform the API request
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} - ${response.statusText}`);
        }

        const responseJson = await response.json();
        const books = responseJson.recommendations;

        // Handle API results
        if (!books || !Array.isArray(books) || books.length === 0) {
            booksList.innerHTML = '<li>No results found.</li>';
        } else {
            // Filter and display the results based on the selected value
            displayResults(books);
        }

        // Show the results container
        booksResults.style.display = 'block';
    } catch (error) {
        console.error('Error fetching books:', error);
        genreInputError.textContent = 'API is down at the moment. Please try again';
    } finally {
        isFetching = false;
        searchButton.disabled = false;
    }
};

// Function to display results with filtering
const displayResults = (books) => {
    // Get selected filter value
    const filterValue = resultsFilter.value;

    // Determine how many results to display
    const booksToDisplay =
        filterValue === 'all' ? books : books.slice(0, parseInt(filterValue, 10));

    // Create and append book elements to the DOM
    booksToDisplay.forEach((book) => {
        const li = document.createElement('li');
        li.classList.add('book');

        // Create book image
        const img = document.createElement('img');
        img.src = book.coverImage || 'placeholder.jpg';
        img.alt = `Cover of ${book.title || 'Unknown'}`;
        img.className = 'book-cover';
        li.appendChild(img);

        // Create book info container
        const bookInfo = document.createElement('div');
        bookInfo.className = 'book-info';

        // Create book title
        const bookTitle = document.createElement('h3');
        bookTitle.className = 'book-title';
        bookTitle.textContent = book.title || 'No title available';
        bookInfo.appendChild(bookTitle);

        // Create book author
        const bookAuthor = document.createElement('p');
        bookAuthor.className = 'book-author';
        bookAuthor.textContent = book.author ? `By ${book.author}` : 'Author unknown';
        bookInfo.appendChild(bookAuthor);

        // Create book description with details element
        const details = document.createElement('details');
        details.className = 'book-description';
        details.setAttribute('aria-label', 'Book description');

        const summary = document.createElement('summary');
        summary.textContent = 'Show Description';
        details.appendChild(summary);

        const description = document.createElement('p');
        description.textContent =
            book.description || 'Unfortunately, no description available for this book.';
        details.appendChild(description);

        bookInfo.appendChild(details);
        li.appendChild(bookInfo);

        // Append the book item to the list
        booksList.appendChild(li);
    });
};

// Attach "click" event listener to the search button
searchButton.addEventListener('click', handleSearch);

// Attach "keydown" event listener to handle the "Enter" key
genreInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSearch(e); // Trigger search on "Enter"
    }
});