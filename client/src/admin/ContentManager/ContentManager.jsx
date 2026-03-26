import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";

import ContentForm from "../components/ContentForm";
import ContentList from "../components/ContentList";

function ContentManager() {
  const [contents, setContents] = useState([]);
  const [editingContent, setEditingContent] = useState(null);

  const fetchContents = async () => {
    const res = await adminApi.get("/api/content");

    setContents(res.data.data);
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return (
    <div>
      <h1>Content Manager</h1>

      <ContentForm
        editingContent={editingContent}
        fetchContents={fetchContents}
        setEditingContent={setEditingContent}
      />

      <ContentList
        contents={contents}
        setEditingContent={setEditingContent}
        fetchContents={fetchContents}
      />
    </div>
  );
}

export default ContentManager;
