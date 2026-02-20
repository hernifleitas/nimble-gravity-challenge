import { useEffect, useState } from "react";
import { getJobs } from "../services/api";
import JobItem from "./JobItem";

function JobList({ candidate }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getJobs();
                setJobs(data);
            }
            catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
if (error) return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;

    return (
        <div style={{ maxWidth: "600px", margin: "20px auto" }}>
            {jobs.map((job) => (
                <JobItem key={job.id} job={job} candidate={candidate} />
            ))}
        </div>
    );
}

export default JobList;
