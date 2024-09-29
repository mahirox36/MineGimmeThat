async function makeRequest(url, method, body) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Server responded with ${response.status}: ${errorData.message}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    let servers = [];
    let serversList = document.getElementById('serversList');

    async function fetchServerInfo() {
        try {
            const data = await makeRequest('http://localhost:8001/servers', 'POST', {});
            servers = data.servers;

            // Add server buttons after fetching server info
            for (const server of servers) {
                let serverItem = document.createElement('button');
                serverItem.classList.add('sub-button');
                serverItem.onclick = function() {
                    window.location.href = `http://localhost:8001/servers/${server}`;
                };
                serverItem.textContent = `${server}`;
                serversList.appendChild(serverItem);
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    // Call the async function to fetch server info
    fetchServerInfo();
});