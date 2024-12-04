document.addEventListener('DOMContentLoaded', () => {
  const jobOpenings = [
      { id: 'C001', name: 'Tech Corp', title: 'Software Developer', eligibility: 'CS Graduate', status: '' },
      { id: 'C002', name: 'Design Studios', title: 'UI/UX Designer', eligibility: 'Design Background', status: '' },
      { id: 'C003', name: 'Data Systems', title: 'Data Scientist', eligibility: 'Statistics Graduate', status: '' },
  ];

  const pastApplications = [
      { id: 'C001', name: 'Tech Corp', title: 'Software Developer', status: 'Pending' },
      { id: 'C003', name: 'Data Systems', title: 'Data Scientist', status: 'Accepted' },
  ];

  function updatePastApplications() {
      const pastApplicationsBody = document.getElementById('past-applications-body');
      pastApplicationsBody.innerHTML = ''; 
      pastApplications.forEach(app => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${app.id}</td>
              <td>${app.name}</td>
              <td>${app.title}</td>
              <td>${app.status}</td>
          `;
          pastApplicationsBody.appendChild(row);
      });
  }

  function updateJobOpenings() {
      const jobOpeningsBody = document.getElementById('job-openings-body');
      jobOpeningsBody.innerHTML = ''; 
      jobOpenings.forEach(job => {
          const row = document.createElement('tr');
          const actionText = job.status ? job.status : 'Action';
          row.innerHTML = `
              <td>${job.id}</td>
              <td>${job.name}</td>
              <td>${job.title}</td>
              <td>${job.eligibility}</td>
              <td>
                  ${job.status ? job.status : `<button class="btn apply-btn">Apply</button>
                                               <button class="btn reject-btn">Reject</button>`}
              </td>
          `;
          jobOpeningsBody.appendChild(row);
      });
  }

  updateJobOpenings();

  updatePastApplications();

  document.getElementById('job-openings-body').addEventListener('click', function(event) {
      const button = event.target;
      const row = button.closest('tr');
      const companyId = row.cells[0].textContent;
      const actionCell = row.cells[4]; 

      if (button.classList.contains('apply-btn')) {
          
          jobOpenings.forEach(job => {
              if (job.id === companyId) {
                  job.status = 'Applied';
              }
          });

          pastApplications.push({
              id: companyId,
              name: row.cells[1].textContent,
              title: row.cells[2].textContent,
              status: 'Applied'
          });

          updateJobOpenings(); 
          updatePastApplications(); 
      } else if (button.classList.contains('reject-btn')) {
          
          jobOpenings.forEach(job => {
              if (job.id === companyId) {
                  job.status = 'Rejected';
              }
          });

          pastApplications.push({
              id: companyId,
              name: row.cells[1].textContent,
              title: row.cells[2].textContent,
              status: 'Rejected'
          });

          updateJobOpenings(); 
          updatePastApplications(); 
      }
  });

  const ctxIndustry = document.getElementById('industry-chart').getContext('2d');
  const industryChart = new Chart(ctxIndustry, {
      type: 'pie',
      data: {
          labels: ['Software', 'Design', 'Data Science'],
          datasets: [{
              data: [50, 30, 20],
              backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
              borderColor: '#fff',
              borderWidth: 2
          }]
      }
  });

  const ctxAnalysis = document.getElementById('analysis-chart').getContext('2d');
  const analysisChart = new Chart(ctxAnalysis, {
      type: 'bar',
      data: {
          labels: ['Total Eligible', 'Applied', 'Shortlisted', 'Selected for Interview', 'Job Offer'],
          datasets: [{
              label: 'Application Status',
              data: [10, 7, 5, 4, 3],
              backgroundColor: '#007bff',
              borderColor: '#0056b3',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  max: 10
              }
          }
      }
  });
});
