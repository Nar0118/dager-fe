import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../utils/functions";
import { FormDisabledDemo } from "../components/AddCar";
import PaginatedTable from "../components/AdminList";
import AdminTabs from "../components/Tabs";

export default function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!decodeToken()) {
        navigate("/login");
      }
    } catch (e) {
      console.error(e);
    }
  }, [navigate]);

  return (
    <>
      <AdminTabs />
    </>
  );
}
