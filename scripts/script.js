document.getElementById('getImagesButton').addEventListener('click', fetchData);
function fetchData() {
    fetch('/api-combine')
        .then(response => response.json())
        .then(data => {
            document.getElementById('bearImage').src = data.bearImage;
            document.getElementById('dogImage').src = data.dogImage;
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
}