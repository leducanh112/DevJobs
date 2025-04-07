import { useEffect, useState } from "react";
import { getListTag } from "../../services/tagService";
import { Link } from "react-router-dom";
import { Tag } from "antd";

function SkillList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTag();
      if (response) {
        setTags(response);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <div className="mb-20">
        {tags.map((item) => (
          <Link to={`/search?keyword=${item.value || ""}`} key={item.key}>
            <Tag color="blue" className="mb-5">
              {item.value}
            </Tag>
          </Link>
        ))}
      </div>
    </>
  );
}

export default SkillList;
