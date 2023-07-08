document.getElementById('submit-btn').addEventListener('click', function() {
    var userQuery = document.getElementById('user-query').value;
    if (userQuery.trim() !== '') {
        handleUserQuery(userQuery);
    }
});

function handleUserQuery(userQuery) {
    var responseContainer = document.getElementById('response-container');
    responseContainer.innerHTML = '<p>Loading...</p>';

    // Make an API call to fetch the Python script from the same GitHub repository
    fetch('menugpt.py')
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            // Execute the fetched Python script using eval()
            var pythonScript = data;
            eval(pythonScript);

            // Call the appropriate function from the Python script
            var response = handle_user_query(userQuery);
            responseContainer.innerHTML = '<p>' + response + '</p>';
        })
        .catch(function(error) {
            responseContainer.innerHTML = '<p>An error occurred. Please try again.</p>';
            console.log(error);
        });
}
