import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useLocation,
} from "@tanstack/react-router";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  Map as MapIcon,
  Search,
  TrendingUp,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CareerPath } from "./pages/CareerPath";
import { Dashboard } from "./pages/Dashboard";
import { Discover } from "./pages/Discover";
import { Learning } from "./pages/Learning";
import { Radar } from "./pages/Radar";
import { ResumeLab } from "./pages/ResumeLab";

const NAV_ITEMS = [
  { to: "/", icon: Home, label: "Dashboard", ocid: "nav.dashboard.link" },
  {
    to: "/discover",
    icon: Search,
    label: "Discover",
    ocid: "nav.discover.link",
  },
  {
    to: "/career-path",
    icon: MapIcon,
    label: "Career Path",
    ocid: "nav.career_path.link",
  },
  {
    to: "/learning",
    icon: BookOpen,
    label: "Learning",
    ocid: "nav.learning.link",
  },
  {
    to: "/resume-lab",
    icon: FileText,
    label: "Resume Lab",
    ocid: "nav.resume_lab.link",
  },
  { to: "/radar", icon: TrendingUp, label: "Radar", ocid: "nav.radar.link" },
];

const MOBILE_NAV = [
  { to: "/", icon: Home, label: "Home", ocid: "mobile_nav.dashboard.link" },
  {
    to: "/discover",
    icon: Search,
    label: "Discover",
    ocid: "mobile_nav.discover.link",
  },
  {
    to: "/career-path",
    icon: MapIcon,
    label: "Path",
    ocid: "mobile_nav.career_path.link",
  },
  {
    to: "/learning",
    icon: BookOpen,
    label: "Learn",
    ocid: "mobile_nav.learning.link",
  },
  {
    to: "/resume-lab",
    icon: FileText,
    label: "Resume",
    ocid: "mobile_nav.resume_lab.link",
  },
  {
    to: "/radar",
    icon: TrendingUp,
    label: "Radar",
    ocid: "mobile_nav.radar.link",
  },
];

function Sidebar({
  collapsed,
  onToggle,
}: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="hidden md:flex flex-col shrink-0 h-screen sticky top-0 overflow-hidden z-30"
      style={{
        background: "oklch(var(--sidebar))",
        borderRight: "1px solid oklch(var(--sidebar-border))",
      }}
    >
      <div className="flex items-center px-3 py-4 gap-3 overflow-hidden">
        <div className="shrink-0 w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-cyan/10 border border-cyan/20">
          <span className="font-bold text-cyan text-sm">C</span>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="font-bold text-[15px] text-gradient-cyan tracking-tight">
                Career OS
              </span>
              <span className="block text-[9px] font-mono text-muted-foreground tracking-widest uppercase">
                v1.0 · India
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mx-3 h-px bg-border/50 mb-2" />
      <nav className="flex-1 flex flex-col gap-0.5 px-2 py-1 overflow-y-auto scrollbar-thin">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              data-ocid={item.ocid}
              className={cn(
                "flex items-center gap-3 px-2.5 py-2.5 rounded-lg transition-all duration-150 group relative overflow-hidden",
                isActive
                  ? "bg-cyan/10 text-cyan"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-lg bg-cyan/10 border border-cyan/20"
                  transition={{ duration: 0.2, type: "spring", bounce: 0.2 }}
                />
              )}
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 relative z-10 transition-colors",
                  isActive ? "text-cyan" : "group-hover:text-foreground",
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.12 }}
                    className={cn(
                      "text-[13px] font-medium whitespace-nowrap relative z-10 overflow-hidden",
                      isActive ? "text-cyan" : "",
                    )}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>
      <div className="mx-3 h-px bg-border/50 mt-1 mb-2" />
      <div className="px-2 pb-3">
        <Link
          to="/"
          data-ocid="nav.profile.link"
          className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150"
        >
          <div className="shrink-0 h-4 w-4 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
            <User className="h-2.5 w-2.5 text-background" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.12 }}
                className="text-[13px] font-medium whitespace-nowrap overflow-hidden"
              >
                Profile
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
      <div className="px-2 pb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          data-ocid="nav.sidebar.toggle"
          className="w-full h-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center justify-center"
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </motion.aside>
  );
}

function MobileNav() {
  const location = useLocation();
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2"
      style={{
        background: "oklch(var(--sidebar))",
        borderTop: "1px solid oklch(var(--sidebar-border))",
        paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
        paddingTop: "0.5rem",
      }}
    >
      {MOBILE_NAV.map((item) => {
        const isActive =
          item.to === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            data-ocid={item.ocid}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all duration-150 min-w-[44px]",
              isActive ? "text-cyan" : "text-muted-foreground",
            )}
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              {isActive && (
                <span className="absolute inset-0 rounded-md bg-cyan/15 border border-cyan/20" />
              )}
              <Icon className="h-4 w-4 relative z-10" />
            </div>
            <span className="text-[9px] font-medium tracking-wide">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function RootLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
      />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Outlet />
      </main>
      <MobileNav />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(var(--card))",
            border: "1px solid oklch(var(--border))",
            color: "oklch(var(--foreground))",
          },
        }}
      />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});
const discoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discover",
  component: Discover,
});
const careerPathRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career-path",
  component: CareerPath,
});
const learningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learning",
  component: Learning,
});
const resumeLabRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resume-lab",
  component: ResumeLab,
});
const radarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/radar",
  component: Radar,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  discoverRoute,
  careerPathRoute,
  learningRoute,
  resumeLabRoute,
  radarRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
