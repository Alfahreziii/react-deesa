import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext"; // Ambil role dari context

import {
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  PageIcon,
  TableIcon,
  DocsIcon,
  PaperPlaneIcon,
  UserCircleIcon,
  UserIcon,
  EnvelopeIcon,
  ShootingStarIcon,
  DollarLineIcon
} from "../icons";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  roles?: string[];
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean; roles?: string[] }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "RT.005", path: "/", roles: ["admin"] }],
  },
  {
    name: "Informasi",
    icon: <TableIcon />,
    subItems: [
      { name: "Berita", path: "/berita-tables", roles: ["admin"] },
      { name: "Rapat", path: "/rapat-tables", roles: ["admin"] },
      { name: "Kerja Bakti", path: "/kerjabakti-tables", roles: ["admin"] },
      { name: "Pengajian", path: "/pengajian-tables", roles: ["admin"] },
      { name: "Tahlil", path: "/tahlil-tables", roles: ["admin"] },
    ],
  },
  {
    name: "Market Place",
    icon: <DollarLineIcon />,
    subItems: [
      { name: "Market Place (Personal)", path: "/mpersonal-tables", roles: ["admin", "user"] },
      { name: "Market Place", path: "/m-tables", roles: ["admin"] },
    ],
  },
  {
    icon: <PageIcon />,
    name: "Laporan",
    path: "/laporan-tables",
    roles: ["admin"],
  },
  {
    icon: <UserCircleIcon />,
    name: "Penduduk",
    path: "/penduduk-tables",
    roles: ["admin"],
  },
  {
    name: "Profil Desa",
    icon: <ShootingStarIcon />,
    subItems: [
      { name: "Pengurus", path: "/pengurus-tables", roles: ["admin"] },
      { name: "Geografis", path: "/geografis-tables", roles: ["admin"] },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    name: "Iuran",
    icon: <EnvelopeIcon />,
    subItems: [
      { name: "Iuran", path: "/iuran-tables", roles: ["admin"] },
      { name: "Pembayaran", path: "/pembayaran-tables", roles: ["admin"] },
    ],
  },
  {
    icon: <DocsIcon />,
    name: "Aduan",
    path: "/aduan-tables",
    roles: ["admin"],
  },
  {
    icon: <PaperPlaneIcon />,
    name: "Surat",
    path: "/surat-tables",
    roles: ["admin"],
  },
  {
    icon: <UserIcon />,
    name: "User Profile",
    path: "/profile",
    roles: ["admin", "user"],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { user } = useAuth();
  const role = user?.role ?? "guest"; // fallback ke guest jika belum login

  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{ type: "main" | "others"; index: number } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType as "main" | "others", index });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const filterByRole = (items: NavItem[]) =>
    items
      .map((item) => {
        const hasAccess = !item.roles || item.roles.includes(role);
        const filteredSubItems = item.subItems?.filter((sub) => !sub.roles || sub.roles.includes(role)) || [];
        return {
          ...item,
          subItems: filteredSubItems,
          hasAccess: hasAccess || filteredSubItems.length > 0,
        };
      })
      .filter((item) => item.hasAccess);

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems?.length ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
            >
              <span className={`menu-item-icon-size ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {Array.isArray(nav.subItems) && nav.subItems.length > 0 && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-center"}`}>
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="rounded-xl bg-[#F7F7F7] px-10">
              <img className="dark:hidden mx-auto" src="/images/logo/logo.svg" alt="Logo" width={200} />
              <img className="hidden dark:block mx-auto" src="/images/logo/logo-dark.svg" alt="Logo" width={200} />
            </div>
          ) : (
            <img src="/images/logo/logo-icon.svg" alt="Logo" width={100}/>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {filterByRole(navItems).some(item => item.path || (item.subItems && item.subItems.length > 0)) && (

              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots className="size-6" />}
                </h2>
                {renderMenuItems(filterByRole(navItems), "main")}
              </div>
            )}

            {filterByRole(othersItems).some(item => item.path || (item.subItems && item.subItems.length > 0)) && (
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? "Others" : <HorizontaLDots />}
                </h2>
                {renderMenuItems(filterByRole(othersItems), "others")}
              </div>
            )}

          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
