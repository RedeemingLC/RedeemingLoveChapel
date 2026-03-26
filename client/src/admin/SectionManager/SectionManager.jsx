import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import adminApi from "../../services/adminApi";

import SectionForm from "../components/SectionForm";
import SectionList from "../components/SectionList";

function SectionManager() {
  const { manualId } = useParams();

  const [sections, setSections] = useState([]);
  const [editingSection, setEditingSection] = useState(null);

  const fetchSections = async () => {
    const res = await adminApi.get(`/api/sections/manual/${manualId}`);

    setSections(res.data.data);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <div>
      <h1>Section Manager</h1>

      <SectionForm
        manualId={manualId}
        editingSection={editingSection}
        fetchSections={fetchSections}
        setEditingSection={setEditingSection}
      />

      <SectionList
        sections={sections}
        setEditingSection={setEditingSection}
        fetchSections={fetchSections}
      />
    </div>
  );
}

export default SectionManager;
