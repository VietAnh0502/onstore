import AdminContent from "@/app/components/admin/layout/admin.content";
import AdminFooter from "@/app/components/admin/layout/admin.footer";
import AdminHeader from "@/app/components/admin/layout/admin.header";
import AdminSideBar from "@/app/components/admin/layout/admin.sidebar";


const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
      <div style={{ display: "flex" }}>
        <div className="left-side" style={{ minWidth: 80 }}>
          <AdminSideBar />
        </div>
        <div className="right-side" style={{ flex: 1 }}>
          <AdminHeader  />
          <AdminContent>{children}</AdminContent>
          <AdminFooter />
        </div>
      </div>
  );
};

export default AdminLayout;
