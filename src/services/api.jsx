const BASE_URL = import.meta.env.VITE_BASE_URL;
export const getCandidateByEmail = async (email) => {
    const res = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error fetching candidate");
    return data;
 }


 export const getJobs = async () => {
    const res = await fetch(`${BASE_URL}/api/jobs/get-list`);
    const data = await res.json();

    if(!res.ok) throw new Error(data.message || "Error fetching jobs");
    return data;

    }



export const applyToJob = async ({ uuid, jobId, candidateId, applicationId, repoUrl }) => {
  const res = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uuid, jobId, candidateId, applicationId, repoUrl }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Error applying to job");

  return data; 
};