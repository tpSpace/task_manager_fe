import PageBody from "./layout/PageBody";
import { PageHeader } from "./layout/PageHeader";

export default function App() {
  return (
    <div className="flex flex-col">
      <PageHeader />
      <div>
        <PageBody />
      </div>
    </div>
  );
}