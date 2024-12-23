
const upcomingDrivesData = [
    { id: 1, name: "Company A", profile: "Software Engineer", detail: "Details about Company A", date: "2024-12-01" },
    { id: 2, name: "Company B", profile: "Data Analyst", detail: "Details about Company B", date: "2024-12-05" },
    { id: 3, name: "Company C", profile: "DevOps Engineer", detail: "Details about Company C", date: "2024-12-10" }
];

const placementStatisticsData = [
    { id: 1, name: "Company A", profile: "Software Engineer", participated: 50, interviewed: 20, placed: 10 },
    { id: 2, name: "Company B", profile: "Data Analyst", participated: 30, interviewed: 15, placed: 8 },
    { id: 3, name: "Company C", profile: "DevOps Engineer", participated: 40, interviewed: 25, placed: 12 }
];

function populateUpcomingDrives() {
    const tableBody = document.querySelector("#upcoming-drives-table tbody");
    upcomingDrivesData.forEach(drive => {
        const row = `<tr>
            <td>${drive.id}</td>
            <td>${drive.name}</td>
            <td>${drive.profile}</td>
            <td>${drive.detail}</td>
            <td>${drive.date}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function populatePlacementStatistics() {
    const tableBody = document.querySelector("#placement-statistics-table tbody");
    placementStatisticsData.forEach(stat => {
        const row = `<tr>
            <td>${stat.id}</td>
            <td>${stat.name}</td>
            <td>${stat.profile}</td>
            <td>${stat.participated}</td>
            <td>${stat.interviewed}</td>
            <td>${stat.placed}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

document.getElementById("manage-companies-btn").addEventListener("click", () => {
    window.location.href = "manage-companies.html"; 
});

document.getElementById("send-notification-btn").addEventListener("click", () => {
    alert("Notification sent!");
});

document.addEventListener("DOMContentLoaded", () => {
    populateUpcomingDrives();
    populatePlacementStatistics();
});
