
document.getElementById('processButton').addEventListener('click', () => {
    const fileInput = document.getElementById('csvFileInput');
    const resultContainer = document.getElementById('result');

    if (fileInput.files.length === 0) {
        resultContainer.textContent = 'Please select a CSV file.';
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const csvData = e.target.result;

        console.log('csvData: ');
        console.log(csvData);
        console.log('Processed data: ');
        console.log(processData(csvData));

        resultContainer.textContent = 'CSV data loaded and processed.';
    };

    reader.readAsText(file);
});