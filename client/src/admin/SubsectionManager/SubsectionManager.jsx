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
    const res = await adminApi.get(`/api/subsections/${sectionId}`);

    setSubsections(res.data.data);
  };

  useEffect(() => {
    fetchSubsections();
  }, []);

  return (
    <div>
      <h1>Lesson Manager</h1>

      <SubsectionForm
        sectionId={sectionId}
        editingSubsection={editingSubsection}
        fetchSubsections={fetchSubsections}
        setEditingSubsection={setEditingSubsection}
      />

      <SubsectionList
        subsections={subsections}
        setEditingSubsection={setEditingSubsection}
        fetchSubsections={fetchSubsections}
      />
    </div>
  );
}

export default SubsectionManager;
