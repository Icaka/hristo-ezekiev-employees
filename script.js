
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

		const data = processData(csvData); 

        console.log(data);

		console.log('pairs ');
		const allPairs = createPairs(data);
		console.log(`Result is`);
		console.log(getLongestCollab(allPairs));

        resultContainer.textContent = 'CSV data loaded and processed.';
    };

    reader.readAsText(file);
});

function createPairs(data)
{
	pairs = [];
	for(let i = 0; i < data.length; i++) {
		let person1 = data[i];
		//console.log(person1);
		//console.log(person1.empID);
		for(let j = i + 1; j < data.length; j++) {
			let person2 = data[j];

			if(person1.projectID == person2.projectID) { // checking for common project
				const startDate1 = person1.dateFrom;
				const startDate2 = person2.dateFrom;
				const endDate1 = person1.dateTo;
				const endDate2 = person2.dateTo;
				//console.log(`${startDate1}, ${startDate2}, ${endDate1}, ${endDate2}`)
				const duration = getOverlapDays(startDate1, endDate1, startDate2, endDate2);
				//console.log(`DURATION: ${duration}`)
				if(duration > 0) {			
					//console.log('PAIR FOUND');	
					addToPairs(pairs, person1.empID, person2.empID, person1.projectID, duration);
				}
			}
		}
	}
	console.log(pairs);
	return pairs;
}

function addToPairs(pairs, emp1, emp2, projId, duration) {
	if(emp1 == emp2)
		return;
	for(const pair of pairs) {
		if(pair.isEqual(emp1, emp2)) {
			pair.addProject(projId, duration);
			return;
		}
	}
	const pair = new Pair(emp1, emp2, projId, duration);
	pairs.push(pair);
}

function getLongestCollab(pairs) {
	let longestDuration = 0;
	let result;
	for(const pair of pairs) {
		if(pair.getFullDuration() > longestDuration) {
			longestDuration = pair.getFullDuration();
			result = pair;
		}
	}
	return result;
}