import { useState } from "react";
import { applyToJob } from "../services/api";

function JobItem({ job, candidate }) {
    const [repoUrl, setRepoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await applyToJob({
                uuid: candidate.uuid,
                jobId: job.id,
                applicationId: candidate.applicationId,
                candidateId: candidate.candidateId,
                repoUrl,
            });
            setSuccess(true);
            setRepoUrl("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
            <h3>{job.title}</h3>
            <input
                type="text"
                placeholder="GitHub repo URL"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                style={{ width: "60%", marginRight: "10px", padding: "5px", borderRadius: "3px", border: "1px solid #aaa" }}
            />
            <button
                type="button"
                style={{ padding: "5px 10px", borderRadius: "3px", cursor: "pointer" }}
                onClick={handleSubmit}
                disabled={!repoUrl || loading}>
                {loading ? "Submitting..." : "Submit"}

            </button>
            {success && <p style={{ color: "green", marginTop: "7px" }}>Application sent successfully!</p>}
            {error && <p style={{ padding: "5px 10px", borderRadius: "3px", cursor: "pointer", color: "red", marginTop: "7px" }}>{error}</p>}
        </div>
    );
}

export default JobItem;
