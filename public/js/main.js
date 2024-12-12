async function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData();
    const fileInput = document.getElementById('domainFile');
    const textInput = document.getElementById('domainList');
    const resultsSection = document.getElementById('results');
    const resultsBody = document.getElementById('resultsBody');

    try {
        if (fileInput.files.length > 0) {
            formData.append('domainList', fileInput.files[0]);
        } else if (textInput.value.trim()) {
            formData.append('domains', textInput.value.trim());
        } else {
            throw new Error('Please provide domains either through file upload or text input');
        }

        const response = await fetch('/api/appraisal/bulk', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to process domains');
        }

        displayResults(data.results);
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}

function displayResults(results) {
    const resultsSection = document.getElementById('results');
    const resultsBody = document.getElementById('resultsBody');
    
    resultsBody.innerHTML = '';
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border px-4 py-2">${escapeHtml(result.domain)}</td>
            <td class="border px-4 py-2">${escapeHtml(result.appraisalValue)}</td>
            <td class="border px-4 py-2">${escapeHtml(result.searchVolume)}</td>
            <td class="border px-4 py-2">${escapeHtml(result.cpaValue)}</td>
        `;
        resultsBody.appendChild(row);
    });
    
    resultsSection.classList.remove('hidden');
}

function escapeHtml(unsafe) {
    return unsafe
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.getElementById('uploadForm').addEventListener('submit', handleFormSubmission);