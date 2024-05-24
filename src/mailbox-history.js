document.addEventListener("DOMContentLoaded", function() {
    // Parse query parameter to get mailbox index
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const mailboxIndex = urlParams.get('mailbox');

    // Fetch mailbox history based on mailbox index
    function fetchMailboxHistory() {
        // Mock data for mailbox history (replace with actual API call)
        const mockData = [
            { date: "2024-05-30T08:00:00Z", action: "Opened" },
            { date: "2024-05-29T10:00:00Z", action: "Closed" },
            { date: "2024-05-28T15:00:00Z", action: "Opened" }
        ];

        // Display mailbox history using the mock data
        displayMailboxHistory(mockData);
    }

    // Function to display mailbox history on the page
    function displayMailboxHistory(data) {
        const historyContainer = document.getElementById('history');

        // Clear the contents of the container before adding new data
        historyContainer.innerHTML = '';

        // Iterate over the data and create blocks for each history entry
        data.forEach(entry => {
            const historyEntryElement = document.createElement('div');
            historyEntryElement.classList.add('history-entry');

            // Build the content of the history entry block
            historyEntryElement.innerHTML = `
                <div class="date">${new Date(entry.date).toLocaleString()}</div>
                <div class="action">${entry.action}</div>
            `;

            // Add the block with history entry to the container
            historyContainer.appendChild(historyEntryElement);
        });
    }

    // Call the function to fetch mailbox history when the page loads
    fetchMailboxHistory();
});
function goBack() {
    window.history.back();
    event.preventDefault(); // Prevent default behavior of button click
}
