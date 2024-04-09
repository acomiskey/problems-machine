const db = require('better-sqlite3')('problems.db');

export function startup () {
    try {
        const result = db.prepare("CREATE TABLE IF NOT EXISTS problems (id INTEGER PRIMARY KEY, submitter STRING, problem STRING)").run();
        return "Successfully created the problems table, if it didn't already exist.";
    } catch (error) {
        console.error(error);
        return "Error: couldn't create or open the database.";
    }
}

export function addProblem(problemText, user) {
    try {
        const result = db.prepare('INSERT INTO problems(submitter, problem) VALUES(?,?)').run(user, problemText);
        return "Your Problem has been submitted! Thanks!";
    } catch (error) {
        console.error(error);
        return "Error: couldn't add that Problem.";
    }
}

export function getProblem() {
    try {
        const result = db.prepare('SELECT problem FROM problems ORDER BY RANDOM() LIMIT 1').get();
        return result.problem;
    } catch (error) {
        console.error(error);
        return "Error: couldn't select a Problem.";
    }
}

export function removeProblem(id) {
    try { 
        const result = db.prepare('DELETE FROM problems WHERE id = ?').run(id);
        return "Deleted problem with ID " + id + " from the database.";
    } catch (error) {
        console.error(error);
        return "Error: couldn't delete Problem with ID " + id + " from the database.";
    }
}

