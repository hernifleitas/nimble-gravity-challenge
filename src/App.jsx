import { useState, useEffect } from "react";
import { getCandidateByEmail } from "./services/api";
import JobList from "./components/JobList";
function App(){
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = import.meta.env.VITE_CANDIDATE_EMAIL;

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const data = await getCandidateByEmail(email);
        setCandidate(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };  

    fetchCandidate();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color: "red"}}>Error: {error}</p>;

  return(
    <div>
      <h1>Job Applications</h1>
     {candidate && <p style={{ textAlign:"center", fontWeight: "bold", marginBottom: "10px", fontSize: "38px" }}>Bienvenido, {candidate.firstName} {candidate.lastName}</p>}
      {candidate && <JobList candidate={candidate} />}
    </div>
  );

}


export default App;


