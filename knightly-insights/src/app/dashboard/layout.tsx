import SideBar from "../sidebar"

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <SideBar />
            <nav></nav>

            {children}
        </section>
    )
}