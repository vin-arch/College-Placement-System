document.addEventListener('DOMContentLoaded', () => {
    const statusSpan = document.getElementById('status');
    const eligibilitySection = document.getElementById('eligibility-criteria');
    const applicationsSection = document.getElementById('student-applications');
    const acceptedSection = document.getElementById('accepted-students');
    const updateButton = document.getElementById('update-marks');
    let isUpdating = false;

    let applicationStatus = "Pending"; 
    let students = [
        { id: 1, name: "John Doe", cgpa: 8.5, resume: "resume1.pdf", marks: 0, action: "" },
        { id: 2, name: "Jane Smith", cgpa: 9.0, resume: "resume2.pdf", marks: 0, action: "" },
    ];
    let acceptedStudents = [];

    function updateStatus(newStatus) {
        applicationStatus = newStatus;
        statusSpan.textContent = newStatus;

        if (newStatus === "Accepted") {
            eligibilitySection.classList.remove('hidden');
            applicationsSection.classList.remove('hidden');
            acceptedSection.classList.remove('hidden');
        } else if (newStatus === "Rejected") {
            eligibilitySection.classList.add('hidden');
            applicationsSection.classList.add('hidden');
            acceptedSection.classList.add('hidden');
        }
    }

    function acceptApplication() {
        updateStatus("Accepted");
    }

    acceptApplication();

    document.getElementById('save-criteria').addEventListener('click', () => {
        alert("Eligibility criteria saved.");
    });

    document.getElementById('send-application').addEventListener('click', () => {
        alert("Applications sent to students.");
    });

    function populateApplications() {
        const table = document.getElementById('applications-table');
        table.innerHTML = ""; 
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.cgpa}</td>
                <td><a href="${student.resume}" target="_blank">View</a></td>
                <td>
                    <input 
                        type="number" 
                        value="${student.marks}" 
                        data-id="${student.id}" 
                        class="marks-input" 
                        disabled
                    />
                </td>
                <td>
                    <button class="accept-btn" data-id="${student.id}">Accept</button>
                    <button class="reject-btn" data-id="${student.id}">Reject</button>
                    <span class="action-status hidden"></span>
                </td>
            `;
            table.appendChild(row);
        });

        document.querySelectorAll('.accept-btn').forEach((btn) =>
            btn.addEventListener('click', (e) => handleAction(e, "Accepted"))
        );
        document.querySelectorAll('.reject-btn').forEach((btn) =>
            btn.addEventListener('click', (e) => handleAction(e, "Rejected"))
        );
    }

    function handleAction(event, action) {
        const id = parseInt(event.target.dataset.id);
        const student = students.find((s) => s.id === id);
        if (student) {
            student.action = action;
            const row = event.target.closest('tr');
            const actionStatus = row.querySelector('.action-status');
            const acceptButton = row.querySelector('.accept-btn');
            const rejectButton = row.querySelector('.reject-btn');

            actionStatus.textContent = action;
            actionStatus.classList.remove('hidden');
            acceptButton.style.display = 'none';
            rejectButton.style.display = 'none';

            if (action === "Accepted") {
                acceptedStudents.push(student);
                updateAcceptedList();
            }

            alert(`Student ${student.name} has been ${action}.`);
        }
    }

    updateButton.addEventListener('click', () => {
        isUpdating = true;
        document.querySelectorAll('.marks-input').forEach((input) => input.disabled = false);

        const saveButton = document.createElement('button');
        saveButton.id = 'save-marks';
        saveButton.textContent = 'Save';
        saveButton.style.marginLeft = '10px';
        updateButton.parentNode.appendChild(saveButton);

        saveButton.addEventListener('click', () => saveMarks(saveButton));
    });

    function saveMarks(saveButton) {
        document.querySelectorAll('.marks-input').forEach((input) => {
            const id = parseInt(input.dataset.id);
            const student = students.find((s) => s.id === id);
            if (student) {
                student.marks = parseFloat(input.value);
            }
        });
        isUpdating = false;
        document.querySelectorAll('.marks-input').forEach((input) => input.disabled = true);
        alert("Marks updated successfully.");
        saveButton.remove();
    }

    function updateAcceptedList() {
        const list = document.getElementById('accepted-list');
        list.innerHTML = "";
        acceptedStudents.forEach(student => {
            const item = document.createElement('li');
            item.textContent = `${student.name} (ID: ${student.id})`;
            list.appendChild(item);
        });
    }

    document.getElementById('print-list').addEventListener('click', () => {
        window.print();
    });

    populateApplications();
});
