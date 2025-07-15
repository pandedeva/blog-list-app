const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#262626] text-[#F2F2F2] min-h-screen">
      <div className="container mx-auto p-6">{children}</div>
    </div>
  );
};

export default Layout;
