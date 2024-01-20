# github-Repository
Github-Repository Project fetches the public github repositories of user

Overview:

This project is a simple web application that allows users to enter a GitHub username and view information about the user along with their repositories. The application supports pagination and provides a search functionality to find specific repositories.

1.Open the index.html file in a web browser or host url.

2.Enter a GitHub username in the input field and click the "Fetch Data" button to view user information and repositories.

3.Use the pagination buttons to navigate through the repositories.



Features:

1.Fetches user information and repositories from the GitHub API.

2.Supports pagination to navigate through the user's repositories.

3.Shows 10 repositories per page and user can select upto 100 repositories per page.

4.Provides a search functionality to find repositories by username.

5.Displays user information, including avatar, name, bio, location, and GitHub profile link.

6.Reset button to Reload the page

6.Shows a loader during API requests to indicate data fetching.

Error Handling:

1.If no user name provided in input field then application displays alert please Enter Github username

2.If username is not valid display alert please Enter valid username

3.If no repositories are created by user then display alert No repositories found

Code Structure:

1.index.html: The main HTML file with the structure of the web page.

2.styles.css: The CSS file for styling the application.

3.script.js: The JavaScript file containing the logic for fetching data, rendering UI, and handling user interactions.

Dependencies:

No external dependencies are required. The application uses vanilla HTML, CSS, and JavaScript.

Contributing:

Feel free to contribute to the project by opening issues or creating pull requests. Your feedback and contributions are highly appreciated.

