import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Nav } from "react-bootstrap";
import "../../styles/sidebar.css";
import Logo from "../../assets/images/Logo.png";
import { RiAccountPinCircleFill } from "react-icons/ri";

function Sidebar({ onLogout }) {
  const handleLogOutClick = () => {
    onLogout();
  };

  const [activeMenu, setActiveMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const storedScreens = {
      centerListingIndex: true,
      levelIndex: true,
      subjectIndex: true,
      courseIndex: true,
      classIndex: true,
      leadListingIndex: true,
      enrollmentIndex: true,
      staffIndex: true,
      teacherIndex: true,
      staffAttendanceIndex: false,
      leaveAdminIndex: true,
      leaveIndex: true,
      holidayIndex: true,
      deductionIndex: true,
      payrollIndex: false,
      payslipIndex: true,
      rolesMatrixIndex: true,
      studentListingIndex: true,
      attendanceIndex: true,
      scheduleTeacherIndex: true,
      documentListingIndex: true,
      documentFileIndex: true,
      invoiceIndex: true,
      paymentIndex: true,
      documentReportIndex: true,
      attendanceReportIndex: true,
      studentReportIndex: false,
      assessmentReportIndex: true,
      enrollmentReportIndex: true,
      feeCollectionReportIndex: true,
      packageBalanceReportIndex: true,
      salesRevenueReportindex: true,
      replaceClassLessonListindex: false,
    };

    const updatedMenuItems = [
      {
        title: "Centre Management",
        icon: "bx bx-building icon-large",
        isOpen: false,
        subMenus: [
          {
            title: "Centre Listing",
            path: "/center",
            access: storedScreens.centerListingIndex,
          },
        ],
      },
      {
        title: "Course Management",
        icon: "bx bx-book-alt icon-large",
        isOpen: false,
        subMenus: [
          { title: "Level", path: "/level", access: storedScreens.levelIndex },
          {
            title: "Subject",
            path: "/subject",
            access: storedScreens.subjectIndex,
          },
          {
            title: "Course",
            path: "/course",
            access: storedScreens.courseIndex,
          },
          { title: "Class", path: "/class", access: storedScreens.classIndex },
        ],
      },
      {
        title: "Lead Management",
        icon: "bx bx-pie-chart-alt-2 icon-large",
        isOpen: false,
        subMenus: [
          {
            title: "Lead Listing",
            path: "lead/lead",
            access: storedScreens.leadListingIndex,
          },
          {
            title: "Enrollment",
            path: "/lead/enrollment/add",
            access: storedScreens.enrollmentIndex,
          },
        ],
      },
      {
        title: "Staffing",
        icon: "bx bx-female icon-large",
        isOpen: false,
        subMenus: [
          {
            title: "Staff",
            path: "/staff",
            access: storedScreens.staffIndex,
          },
          {
            title: "Teacher",
            path: "/teacher",
            access: storedScreens.teacherIndex,
          },
          {
            title: "Attendance",
            path: "/staffing/attendance",
            access: storedScreens.staffAttendanceIndex,
          },
          {
            title: "Leave",
            path: "/leaveadmin",
            access: storedScreens.leaveAdminIndex,
          },
          {
            title: "Leave Request",
            path: "/leave",
            access: storedScreens.leaveIndex,
          },
          {
            title: "Holiday",
            path: "/holiday",
            access: storedScreens.holidayIndex,
          },
          {
            title: "Deduction",
            path: "/deduction",
            access: storedScreens.deductionIndex,
          },
          {
            title: "Payroll",
            path: "/payrolladmin",
            access: storedScreens.payrollIndex,
          },
          {
            title: "Payslip",
            path: "/employeepayslip",
            access: storedScreens.payslipIndex,
          },
          {
            title: "Role & Matrix",
            path: "/role/add",
            access: storedScreens.rolesMatrixIndex,
          },
        ],
      },
      {
        title: "Student Management",
        icon: "bx bx-book-reader icon-large",
        isOpen: false,
        subMenus: [
          {
            title: "Student Listing",
            path: "/studentlisting",
            access: storedScreens.studentListingIndex,
          },
          {
            title: "Attendance",
            path: "/attendance",
            access: storedScreens.attendanceIndex,
          },
        ],
      },
      {
        title: "Schedule",
        icon: "bx bx-alarm-add icon-large",
        isOpen: false,
        subMenus: [
          {
            title: "Time Schedule",
            path: "/scheduleteacher",
            access: storedScreens.scheduleTeacherIndex,
          },
        ],
      },
      {
        title: "Document Management",
        icon: "bx bx-folder-open icon-large",
        isOpen: false,
        subMenus: [
          {
            title: "Document Folder",
            path: "/document",
            access: storedScreens.documentListingIndex,
          },
          {
            title: "Document Files",
            path: "/documentfile",
            access: storedScreens.documentFileIndex,
          },
        ],
      },
      {
        title: "Invoice and Payment",
        icon: "bx bx-spreadsheet icon-large",
        isOpen: false,
        subMenus: [
          {
            title: "Invoice",
            path: "/invoice",
            access: storedScreens.invoiceIndex,
          },
          {
            title: "Payment",
            path: "/payment",
            access: storedScreens.paymentIndex,
          },
        ],
      },

      {
        title: "Report Management",
        icon: "bx bx-food-menu icon-large",
        isOpen: false,
        subMenus: [
          {
            title: "Document Report",
            path: "/report/document",
            access: storedScreens.documentReportIndex,
          },
          {
            title: "Attendance Report",
            path: "/report/attendance",
            access: storedScreens.attendanceReportIndex,
          },
          {
            title: "Student Report",
            path: "/report/studentreport",
            access: storedScreens.studentReportIndex,
          },
          {
            title: "Assessment Report",
            path: "/report/assessment",
            access: storedScreens.assessmentReportIndex,
          },
          {
            title: "Enrolment Report",
            path: "/report/enrolment",
            access: storedScreens.enrollmentReportIndex,
          },
          {
            title: "Fee Collection Report",
            path: "/report/fee",
            access: storedScreens.feeCollectionReportIndex,
          },
          {
            title: "Package Balance Report",
            path: "/report/package",
            access: storedScreens.packageBalanceReportIndex,
          },
          {
            title: "Sales Revenue Report",
            path: "/report/sales",
            access: storedScreens.salesRevenueReportindex,
          },
          {
            title: "Replace Class Lesson List",
            path: "/report/replace_class",
            access: storedScreens.replaceClassLessonListindex,
          },
        ],
      },
    ];

    setMenuItems(updatedMenuItems);
  }, []);

  const handleMenuClick = (index) => {
    if (index === null) {
      setMenuItems(menuItems.map((item) => ({ ...item, isOpen: false })));
      setActiveMenu(null);
    } else {
      const updatedMenuItems = menuItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            isOpen: !item.isOpen,
          };
        } else {
          return {
            ...item,
            isOpen: false,
          };
        }
      });
      setMenuItems(updatedMenuItems);
      setActiveMenu(
        updatedMenuItems[index].isOpen ? updatedMenuItems[index].title : null
      );
    }
  };

  return (
    <nav
      className="navbar show navbar-vertical h-lg-screen navbar-expand-lg p-0 navbar-light border-bottom border-bottom-lg-0 border-end-lg"
      style={{ backgroundColor: "#fff", minHeight: "3rem" }}
      id="navbarVertical"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler mx-2 p-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ position: "sticky", left: "0" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavLink
          style={{ background: "#fff", color: "" }}
          className="header-logo py-lg-2 px-lg-6 m-0 d-flex align-items-center "
          to="/"
        >
          <img
            src={Logo}
            alt="logo"
            className="img-fluid "
            style={{ height: "40px" }}
          />
          <p
            className="fs-3 fw-medium  mx-3 "
            style={{ color: "rgba(105, 108, 255)!importent" }}
          >
            Child Care
          </p>
        </NavLink>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          <ul className="nav-links" style={{ listStyle: "none"}}>
            <NavLink to="/" onClick={() => handleMenuClick(null)}>
              <li className="py-2 px-4 links_name_hover home">
                <i className="bx bx-grid-alt icon-large"></i>
                <span className="ms-3">Home</span>
              </li>
            </NavLink>

            {menuItems.map(
              (item, index) =>
                item.subMenus.some((subMenu) => subMenu.access) && (
                  <li key={index}>
                    <Nav.Link
                      to="#"
                      onClick={() => handleMenuClick(index)}
                      className={activeMenu === item.title ? "active" : ""}
                    >
                      <div
                        className="w-100 d-flex justify-content-between"
                        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                      >
                        <span>
                          <i className={item.icon}></i>
                          <span
                            className={`links_name ${
                              activeMenu === item.title ? "title-active" : ""
                            }`}
                          >
                            {item.title}
                          </span>
                        </span>
                        <span className="span-container">
                          <i
                            className={`bx bx-chevron-down arrow ${
                              item.isOpen ? "open" : "closed"
                            }`}
                            style={{
                              paddingRight: "5px",
                              minWidth: "0px",
                              fontWeight: "700",
                            }}
                          ></i>
                        </span>
                      </div>
                    </Nav.Link>

                    <Collapse in={item.isOpen}>
                      <ul className="nav-links" style={{ listStyle: "none",marginLeft:"3px" }}>
                        {item.subMenus.map(
                          (subMenu, subIndex) =>
                            subMenu.access && (
                              <NavLink
                                to={subMenu.path}
                                className="nav-link"
                                activeClassName="active-submenu"
                              >
                                <li key={subIndex} className="links_name_hover">
                                  <i className="bx bx-radio-circle-marked"></i>
                                  <span
                                    className={`links_name ${
                                      activeMenu === item.title
                                        ? "submenu-active"
                                        : ""
                                    }`}
                                  >
                                    {subMenu.title}
                                  </span>
                                </li>
                              </NavLink>
                            )
                        )}
                      </ul>
                    </Collapse>
                  </li>
                )
            )}
            <NavLink
              to="/sendNotification"
              onClick={() => handleMenuClick(null)}
            >
              <li className="py-2 px-4 links_name_hover home">
                <i className="bx bx-send icon-large"></i>
                <span className="ms-3">Send Notification</span>
              </li>
            </NavLink>
          </ul>

          <div
            className="my-5  logutBtn"
            style={{ border: "1px solid #87878761" }}
          />

          <NavLink to="/account">
            <li className="py-2 px-4 nav-link links_name_hover">
              <i className="icon-large">
                <RiAccountPinCircleFill />
              </i>
              <span className="links_name ms-3">Account</span>
            </li>
          </NavLink>
          <NavLink to="/logout">
            <li className="py-2 px-4 nav-link links_name_hover">
              <i className="bx bx-log-out icon-large"></i>
              <span className="ms-3 links_name" onClick={handleLogOutClick}>
                Logout
              </span>
            </li>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
