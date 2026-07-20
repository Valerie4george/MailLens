function getPriorityBadge(priority) {
    switch (priority) {
        case "High":
            return "🔴 High";
        case "Medium":
            return "🟡 Medium";
        case "Low":
            return "🟢 Low";
        default:
            return priority;
    }
}
function getScoreColor(score) {

    if (score >= 90) {
        return "excellent";
    }

    if (score >= 70) {
        return "good";
    }

    return "poor";
}