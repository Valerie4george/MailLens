let categoryChart = null;
let priorityChart = null;

// CATEGORY PIE CHART
function updateCategoryChart(dashboard) {

    const ctx = document.getElementById("categoryChart").getContext("2d");

    if (categoryChart) {
        categoryChart.destroy();
    }

    categoryChart = new Chart(ctx, {
        type: "pie",

        data: {
            labels: Object.keys(dashboard.categories),
            datasets: [{
                data: Object.values(dashboard.categories)
            }]
        },

        options: {
            responsive: true
        }
    });
}


// PRIORITY BAR CHART
function updatePriorityChart(dashboard) {

    const ctx = document.getElementById("priorityChart").getContext("2d");

    if (priorityChart) {
        priorityChart.destroy();
    }

    priorityChart = new Chart(ctx, {

        type: "bar",

        data: {
            labels: ["High", "Medium", "Low"],

            datasets: [{
                label: "Email Count",
                data: [
                    dashboard.priorities.High || 0,
                    dashboard.priorities.Medium || 0,
                    dashboard.priorities.Low || 0
                ]
            }]
        },

        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}