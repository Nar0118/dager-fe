import { Input } from "antd";

export const Search = ({ onChange }) => (
  <Input placeholder="Search..." onChange={(e) => onChange(e.target.value)} />
);
