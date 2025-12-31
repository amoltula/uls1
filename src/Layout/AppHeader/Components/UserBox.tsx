import React, { Fragment } from "react";


import { IoIosCalendar } from "react-icons/io";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import 'react-toastify/dist/ReactToastify.css';

import mockData from "../../../config/mockData.json";

// Static image imports
import avatar1 from "../../../assets/utils/images/avatars/1.jpg";
import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";

class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    
    // Load user data from config
    this.userData = mockData.userProfile;
    this.menuData = mockData.menuItems;
    this.gridMenu = mockData.gridMenu;
    
    // Use static imports
    this.avatar1 = avatar1;
    this.city3 = city3;
  }

  notify2 = () =>
    (this.toastId = toast(
      "You don't have any new items in your calendar for today! Go out and play!",
      {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: "bottom-center",
        type: "success",
      }
    ));

  render() {
    return (
      <Fragment>
        <div className="header-btn-lg pe-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="link" className="p-0">
                    <img width={42} className="rounded-circle" src={this.avatar1} alt=""/>
                    <FontAwesomeIcon
                      className="ms-2 opacity-8"
                      icon={faAngleDown}
                    />
                  </DropdownToggle>
                  <DropdownMenu className="rm-pointers dropdown-menu-lg">
                    <div className="dropdown-menu-header">
                      <div className="dropdown-menu-header-inner bg-info">
                        <div className="menu-header-image opacity-2"
                          style={{
                            backgroundImage: "url(" + this.city3 + ")",
                          }}/>
                        <div className="menu-header-content text-start">
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left me-3">
                                <img width={42} className="rounded-circle" src={this.avatar1} alt=""/>
                              </div>
                              <div className="widget-content-left">
                                <div className="widget-heading">
                                  {this.userData.name}
                                </div>
                                <div className="widget-subheading opacity-8">
                                  {this.userData.description}
                                </div>
                              </div>
                              <div className="widget-content-right me-2">
                                <Button className="btn-pill btn-shadow btn-shine" color="focus">
                                  Logout
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="scroll-area-xs"
                      style={{
                        height: "150px",
                      }}>
                      <PerfectScrollbar>
                        <Nav vertical>
                          <NavItem className="nav-item-header">
                            Activity
                          </NavItem>
                          {this.menuData.activity.map((item) => (
                            <NavItem key={item.id}>
                              <NavLink href={item.link}>
                                {item.label}
                                {item.badge && (
                                  <div className={`ms-auto badge ${item.badge.className}`}>
                                    {item.badge.text}
                                  </div>
                                )}
                              </NavLink>
                            </NavItem>
                          ))}
                          <NavItem className="nav-item-header">
                            My Account
                          </NavItem>
                          {this.menuData.account.map((item) => (
                            <NavItem key={item.id}>
                              <NavLink href={item.link}>
                                {item.label}
                                {item.badge && (
                                  <div className={`ms-auto badge ${item.badge.className}`}>
                                    {item.badge.text}
                                  </div>
                                )}
                              </NavLink>
                            </NavItem>
                          ))}
                        </Nav>
                      </PerfectScrollbar>
                    </div>
                    <Nav vertical>
                      <NavItem className="nav-item-divider mb-0" />
                    </Nav>
                    <div className="grid-menu grid-menu-2col">
                      <Row className="g-0">
                        {this.gridMenu.map((item) => (
                          <Col sm="6" key={item.id}>
                            <Button 
                              className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2"
                              outline 
                              color={item.color}
                            >
                              <i className={`${item.icon} ${item.iconGradient} btn-icon-wrapper mb-2`}> {" "} </i>
                              {item.bold ? <b>{item.label}</b> : item.label}
                            </Button>
                          </Col>
                        ))}
                      </Row>
                    </div>
                    <Nav vertical>
                      <NavItem className="nav-item-divider" />
                      <NavItem className="nav-item-btn text-center">
                        <Button size="sm" className="btn-wide" color="primary">
                          Open Messages
                        </Button>
                      </NavItem>
                    </Nav>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              <div className="widget-content-left  ms-3 header-user-info">
                <div className="widget-heading">{this.userData.name}</div>
                <div className="widget-subheading">{this.userData.role}</div>
              </div>
              <div className="widget-content-right header-user-info ms-3">
                <Button className="btn-shadow p-1" size="sm" onClick={this.notify2} color="info" id="Tooltip-1">
                  <IoIosCalendar color="#ffffff" fontSize="20px" />
                </Button>
                <UncontrolledTooltip placement="bottom" target={"Tooltip-1"}>
                  Click for Toastify Notifications!
                </UncontrolledTooltip>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserBox;
