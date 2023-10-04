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