//DOM MANUPLATION

document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const userInfoElement = document.getElementById("user-info");
  const repoListElement = document.getElementById("repo-list");
  const paginationElement = document.getElementById("pagination");

  // API URL

  const API_URL = "https://api.github.com";
  let USERNAME = "";
  const PER_PAGE_OPTIONS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  //intial values of currentPage and perPage

  let currentPage = 1;
  let perPage = 10;

  //function to fetch the data of the user

  window.fetchData = function () {
    USERNAME = usernameInput.value.trim();
    // If no user is there it will show popUp message

    if (USERNAME === "") {
      alert("Please enter a GitHub username.");
      return;
    }

    showLoader();

    getUserInfo();

    getRepositories();
  };

  //function Getting the user Info using Github Api with endpoint as Username along with error Handling

  function getUserInfo() {
    fetch(`${API_URL}/users/${USERNAME}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              "User not found. Please enter a valid GitHub username."
            );
          } else {
            throw new Error(
              `Failed to fetch user info: ${response.statusText}`
            );
          }
        }
        return response.json();
      })
      .then((user) => {
        renderUserInfo(user);
      })
      .catch((error) => {
        hideLoader();
        alert(error.message); // Display an alert with the error message
        console.error("Error fetching user info:", error);
      });
  }

  //function for Getting the Repositories of the user along with error handling

  async function getRepositories() {
    try {
      console.log("Fetching repositories...");

      const response = await fetch(
        `${API_URL}/users/${USERNAME}/repos?per_page=${perPage}&page=${currentPage}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.statusText}`);
      }

      const repositories = await response.json();

      if (repositories.length === 0) {
        hideLoader();
        alert("No Repositories found");
        return;
      }

      // Sorting repositories based on creation date (latest first)
      repositories.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      const allRepositoriesResponse = await fetch(
        `${API_URL}/users/${USERNAME}/repos`
      );
      const allRepositories = await allRepositoriesResponse.json();
      console.log(allRepositories.length);

      console.log("Repositories fetched successfully:", repositories);
      renderRepositories(repositories);
      console.log(repositories.length);

      renderPagination(allRepositories, repositories);
      hideLoader();
    } catch (error) {
      hideLoader();
      console.error("Error fetching repositories:", error.message);
    }
  }

  // Function to render the information of the user as required

  function renderUserInfo(user) {
    userInfoElement.innerHTML = `
      <img src="${user.avatar_url}" alt="User Avatar">
      <h2>${user.name}</h2>
      ${user.bio ? `<p>Bio: ${user.bio}</p>` : ""}
      ${user.location ? `<p>Location: ${user.location}</p>` : ""}
      ${
        user.twitter_username
          ? `<p>Twitter: <a href="https://twitter.com/${user.twitter_username}" target="_blank">${user.twitter_username}</a></p>`
          : ""
      }
      <p>GitHub: <a href="${user.html_url}" target="_blank">${
      user.html_url
    }</a></p>
    `;
  }

  // Function to render the repositories of the user

  function renderRepositories(repositories) {
    repoListElement.innerHTML = repositories

      .map(
        (repo) => `
      <div class="repo-item">
      <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
        ${repo.description ? `<p>${repo.description}</p> ` : ""}
        
       
        ${
          repo.created_at
            ? `<p>Created on: ${new Date(
                repo.created_at
              ).toLocaleDateString()}</p>`
            : ""
        }
        
        ${
          repo.topics && repo.topics.length > 0
            ? `<p>Topics: ${repo.topics.join(", ")}</p>`
            : ""
        }
      </div>
    `
      )
      .join("");
  }

  // This function handles the pagination

  function renderPagination(allRepositories) {
    const totalPages = Math.ceil(allRepositories.length / perPage);
    currentPage = Math.max(1, Math.min(currentPage, totalPages));

    console.log(totalPages);
    paginationElement.innerHTML = `
      <button onclick="prevPage()" ${
        currentPage === 1 ? "disabled" : ""
      }>Previous</button>
      <span>Page ${currentPage} of ${totalPages}</span>
      <button  onclick="nextPage()" ${
        currentPage === totalPages ? "disabled" : ""
      }>Next</button>
      <label for="perPage">Repositories per page:</label>
      <select id="perPage" onchange="changePerPage()">
        ${PER_PAGE_OPTIONS.map(
          (option) =>
            `<option ${option === perPage ? "selected" : ""}>${option}</option>`
        ).join("")}
      </select>
    `;
  }

  // function to show loader indicator when the api call request is in process

  function showLoader() {
    repoListElement.innerHTML = '<div class="loader"></div>';
  }

  //function to hide the loader when the process is executed
  function hideLoader() {
    document.querySelector(".loader").style.display = "none";
  }

  // function helps us to navigate to the next page

  window.nextPage = function () {
    currentPage++;
    fetchData();
  };

  // function help us to navigate to the previous page

  window.prevPage = function () {
    currentPage--;
    fetchData();
  };

  // function to to display the repositories when user changes the value from dropdown then it lists repositories accordingly

  window.changePerPage = function () {
    perPage = parseInt(document.getElementById("perPage").value);
    currentPage = 1;
    fetchData();
  };
});
