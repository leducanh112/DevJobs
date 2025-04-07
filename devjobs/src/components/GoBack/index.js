import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function GoBack() {
  const navigate = useNavigate();

  return (
    <Button className="mb-10" onClick={() => navigate(-1)}>
      Quay lại
    </Button>
  );
}

export default GoBack;
