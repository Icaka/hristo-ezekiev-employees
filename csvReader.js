function getToday() {
	const date = new Date();
	let currentDay= String(date.getDate()).padStart(2, '0');
	let currentMonth = String(date.getMonth()+1).padStart(2,"0");
	let currentYear = date.getFullYear();
	let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
	return currentDate;
}

function processData(csvData) {
    const data = [];
    const lines = csvData.split('\n'); // Split the csvData into lines
    //console.log(lines);
    for (const line of lines) {
        const fields = line.split(','); // Split each line into fields
        //console.log(fields);
        //console.log(line);
        let empID = fields[0];
        let projectID = fields[1];
        let dateFrom = fields[2];
		if(fields[3] != null) 
			fields[3] = fields[3].slice(0, -1); // removing /r at the end of each csv row
        let dateTo = fields[3] || null;
		
		if(dateTo == 'NULL')
			dateTo = getToday();
        
        dateFrom = new Date(dateFrom);
        dateTo = new Date(dateTo);

        if (empID && projectID && dateFrom) {
            data.push({ empID, projectID, dateFrom, dateTo });
        }
      
    }
    return data;
}