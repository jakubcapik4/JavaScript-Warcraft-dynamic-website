const reviewLoadButton = document.getElementById("reviewLoadButton");
const reviewSection = document.getElementById("reviewSection");

const createJobList = (jobs) => {
  if (jobs.length === 0) {
    const div = document.createElement("div");
    div.textContent = "No jobs found.";
    return div;
  }
  const ol = document.createElement("ol");
  for (const job of jobs) {
    const li = document.createElement("li");
    li.innerHTML = `
      <h4>${job.name}</h4>
      <p>${job.description}</p>
      <p>Salary: ${job.salary}</p>
      <p><a href="${job.website}" target="_blank">Visit Website</a></p>
    `;
    ol.appendChild(li);
  }
  return ol;
};

const reviewButtonClickHandler = async () => {
  const jobId = reviewLoadButton.dataset.job_id;
  try {
    const response = await fetch(`/visitUs/${jobId}/reviews`);
    if (!response.ok) throw new Error("Fetch failed");
    const jobs = await response.json();
    reviewSection.innerHTML = "";
    reviewSection.appendChild(createJobList(jobs));
  } catch (err) {
    alert("Error loading jobs");
    console.error(err);
  }
};

reviewLoadButton.addEventListener("click", reviewButtonClickHandler);
