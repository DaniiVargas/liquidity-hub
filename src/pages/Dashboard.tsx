
import Layout from "@/components/layout/Layout";
import InvoiceDashboard from "@/components/dashboard/InvoiceDashboard";

const Dashboard = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-6">
        <InvoiceDashboard />
      </div>
    </Layout>
  );
};

export default Dashboard;
