function generateDashboard(emailHistory) {

    const totalEmails = emailHistory.length;

    let totalScore = 0;

    const categories = {};

    const priorities = {
        High: 0,
        Medium: 0,
        Low: 0
    };

    for (const email of emailHistory) {

        totalScore += email.qualityScore;

        categories[email.category] =
            (categories[email.category] || 0) + 1;

        priorities[email.priority]++;
    }

    const averageScore =
        Math.round(totalScore / totalEmails);

    return {
        totalEmails,
        averageScore,
        categories,
        priorities
    };

}