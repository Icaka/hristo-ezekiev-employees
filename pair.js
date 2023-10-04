class Pair {
    constructor(name1, name2, projectId, duration) {
        this.name1 = name1;
        this.name2 = name2;
        this.projects = new Map([[projectId, duration]]);
    }

    isEqual(name1, name2) {
        if(this.name1 == name1 && this.name2 == name2)
            return true;
        if(this.name1 == name2 && this.name2 == name1)
            return true;
        return false;
    }

    addProject(projId, duration) {
        this.projects.set(projId, duration);
    }

    getFullDuration() {
        let sum = 0;
        this.projects.forEach(function(value, key) {
            sum += value;
        })
        return sum;
    }
}

function getOverlapDays(startDate1, endDate1, startDate2, endDate2) {
    startDate1 = new Date(startDate1);
    endDate1 = new Date(endDate1);
    startDate2 = new Date(startDate2);
    endDate2 = new Date(endDate2);
  
    const maxStartDate = new Date(Math.max(startDate1, startDate2));
    const minEndDate = new Date(Math.min(endDate1, endDate2));
  
    const overlapInMilliseconds = minEndDate - maxStartDate;
    const overlapInDays = overlapInMilliseconds / (1000 * 60 * 60 * 24); // overlap in days
  
    if (overlapInDays > 0) {
        return overlapInDays;
    } else {
        return 0; // No overlap
    }
  }