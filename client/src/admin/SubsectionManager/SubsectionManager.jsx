import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import adminApi from "../../services/adminApi";

import SubsectionForm from "../components/SubsectionForm";
import SubsectionList from "../components/SubsectionList";

function SubsectionManager() {
  const { sectionId } = useParams();

  const [subsections, setSubsections] = useState([]);
  const [editingSubsection, setEditingSubsection] = useState(null);

  const fetchSubsections = async () => {
    try {
      const res = await adminApi.get(`/subsections/${sectionId}`); // ✅ FIXED

      // ✅ SAFE
      setSubsections(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      console.log("FETCH SUBSECTIONS ERROR:", error);
      setSubsections([]); // ✅ prevent crash
    }
  };

  useEffect(() => {
    fetchSubsections();
  }, [sectionId]);

  return (
    <>
      <div className="adminHeader">
        <h1>Lesson Manager</h1>
        <p>Manage lessons within this section</p>
      </div>

      <div className="adminSection">
        <SubsectionForm
          sectionId={sectionId}
          editingSubsection={editingSubsection}
          fetchSubsections={fetchSubsections}
          setEditingSubsection={setEditingSubsection}
        />
      </div>

      <div className="adminSection">
        <h2>All Lessons</h2>

        {!Array.isArray(subsections) ? (
          <p>Loading lessons...</p>
        ) : subsections.length === 0 ? (
          <p>No lessons created yet.</p>
        ) : (
          <SubsectionList
            subsections={subsections}
            setEditingSubsection={setEditingSubsection}
            fetchSubsections={fetchSubsections}
          />
        )}
      </div>
    </>
  );
}

export default SubsectionManager;
