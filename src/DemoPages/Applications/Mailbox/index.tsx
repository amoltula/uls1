import React, { Fragment, Component } from "react";
import { CSSTransition, TransitionGroup  } from '../../../utils/TransitionWrapper';

import {
  Col,
  Row,
  Button,
  Card,
  Nav,
  NavLink,
  NavItem,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  Input,
  Table,
  UncontrolledButtonDropdown,
  DropdownToggle,
} from "reactstrap";

import Hamburger from "hamburger-react";

import cx from "classnames";

import PageTitle from "../../../Layout/AppMain/PageTitle";

// Import data from external JSON
import mailboxData from "../../../data/mailbox-data.json";

import {
  faStar,
  faCalendarAlt,
  faAngleDown,
  faSearch,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Mailbox extends Component {
  constructor(props) {
    super(props);
    var exampleItems = [...Array(30).keys()].map((i) => ({
      id: i + 1,
      name: "Item " + (i + 1),
    }));
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      exampleItems,
      pageOfItems: [],
      active: false,
    };
    
    // Load data from JSON
    this.emails = mailboxData.emails;
    this.onlineFriends = mailboxData.onlineFriends;
    this.tags = mailboxData.tags;
    this.sidebar = mailboxData.sidebar;
    this.settings = mailboxData.settings;
  }
  
  // Helper to load avatar images dynamically
  getAvatar(avatarPath) {
    try {
      return require(`../../../assets/utils/images/${avatarPath}`);
    } catch (error) {
      console.error(`Error loading avatar: ${avatarPath}`, error);
      return require("../../../assets/utils/images/avatars/1.jpg");
    }
  }
  
  // Helper to load background images
  getBackgroundImage(imagePath) {
    try {
      return require(`../../../assets/utils/images/${imagePath}`);
    } catch (error) {
      console.error(`Error loading image: ${imagePath}`, error);
      return "";
    }
  }
  
  // Render email row
  renderEmailRow(email, index) {
    const avatar = this.getAvatar(email.avatar);
    
    return (
      <tr key={email.id}>
        <td className="text-center" style={{ width: "78px" }}>
          <Input 
            type="checkbox" 
            className="form-check-input-custom" 
            id={`eCheckbox${index}`} 
            label="&nbsp;"
          />
        </td>
        <td className="text-start ps-1">
          <FontAwesomeIcon icon={faStar} />
        </td>
        <td>
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left me-3">
                <img width={42} className="rounded-circle" src={avatar} alt={email.sender}/>
              </div>
              <div className="widget-content-left">
                <div className="widget-heading">{email.sender}</div>
                {email.lastSeen && (
                  <div className="widget-subheading">{email.lastSeen}</div>
                )}
              </div>
            </div>
          </div>
        </td>
        <td className="text-start">{email.preview}</td>
        <td>
          {email.hasTags && <FontAwesomeIcon className="opacity-4" icon={faTags}/>}
        </td>
        <td className="text-end">
          <FontAwesomeIcon className="opacity-4 me-2" icon={faCalendarAlt}/>
          {email.timestamp}
        </td>
      </tr>
    );
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }

  render() {
    const bg15 = this.getBackgroundImage(this.settings.backgroundImage);
    
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>
            <div>
              <div className={cx("app-inner-layout TabsAnimation", {
                  "open-mobile-menu": this.state.active,
                })}>
                <div className="app-inner-layout__header bg-heavy-rain">
                  <PageTitle heading="Mailbox Layout Example"
                    subheading="Create stunning UIs for your pages with these layout components."
                    icon="pe-7s-power icon-gradient bg-mixed-hopes"/>
                </div>
                <div className="app-inner-layout__wrapper">
                  <Card className="app-inner-layout__content">
                    <div>
                      <div className="app-inner-layout__top-pane">
                        <div className="pane-left">
                          <div className="mobile-app-menu-btn">
                            <Hamburger 
                              toggled={this.state.active}
                              toggle={() => this.setState({ active: !this.state.active })}
                              size={26}
                              color="#6c757d"
                            />
                          </div>
                          <h4 className="mb-0"> Inbox</h4>
                          <UncontrolledButtonDropdown>
                            <DropdownToggle color="link">
                              <FontAwesomeIcon icon={faAngleDown} />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-xl rm-pointers">
                              <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner bg-night-fade">
                                  <div className="menu-header-image opacity-1"
                                    style={{
                                      backgroundImage: "url(" + bg15 + ")",
                                    }}/>
                                  <div className="menu-header-content text-dark">
                                    <h5 className="menu-header-title">
                                      {this.settings.title}
                                    </h5>
                                    <h6 className="menu-header-subtitle">
                                      {this.settings.subtitle}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                              <div className="grid-menu grid-menu-xl grid-menu-2col">
                                <Row className="g-0">
                                  {this.settings.gridItems.map((item) => (
                                    <Col sm="6" key={item.id}>
                                      <Button className="btn-icon-vertical btn-square btn-transition" outline color="link">
                                        <i className={`${item.icon} btn-icon-wrapper btn-icon-lg mb-3`}> {" "} </i>
                                        {item.label}
                                      </Button>
                                    </Col>
                                  ))}
                                </Row>
                              </div>
                              <Nav vertical>
                                <NavItem className="nav-item-divider" />
                                <NavItem className="nav-item-btn text-center">
                                  <Button size="sm" className="btn-shadow" color="primary">
                                    Submit
                                  </Button>
                                </NavItem>
                              </Nav>
                            </DropdownMenu>
                          </UncontrolledButtonDropdown>
                        </div>
                        <div className="pane-right">
                          <InputGroup>
                            <div className="input-group-text">
                              <FontAwesomeIcon icon={faSearch} />
                            </div>
                            <Input placeholder="Search..." />
                          </InputGroup>
                        </div>
                      </div>
                      <div className="bg-white">
                        <Table responsive className="text-nowrap table-lg mb-0" hover>
                          <tbody>
                            {this.emails.map((email, index) => this.renderEmailRow(email, index))}
                          </tbody>
                        </Table>
                        <div className="app-inner-layout__bottom-pane d-block text-center">
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="app-inner-layout__sidebar">
                    <Nav vertical>
                      <NavItem className="pt-4 ps-3 pe-3 pb-3">
                        <Button block color="primary" className="btn-pill btn-shadow">
                          Write New Email
                        </Button>
                      </NavItem>
                      <NavItem className="nav-item-header">My Account</NavItem>
                      {this.sidebar.navigation.map((item) => (
                        <React.Fragment key={item.id}>
                          {item.id === 4 && <NavItem className="nav-item-divider" />}
                          <NavItem>
                            <NavLink href="#">
                              <i className={`nav-link-icon ${item.icon}`}> </i>
                              <span>{item.label}</span>
                              {item.badge && (
                                <div className={`ms-auto badge ${item.badge === 'New' ? 'bg-success' : `rounded-pill ${item.badgeColor}`}`}>
                                  {item.badge}
                                </div>
                              )}
                            </NavLink>
                          </NavItem>
                        </React.Fragment>
                      ))}
                      <NavItem className="nav-item-divider" />
                      <NavItem className="nav-item-header">
                        Online Friends
                      </NavItem>
                      <NavItem className="text-center p-2">
                        <div>
                          {this.onlineFriends.map((friend) => {
                            const friendAvatar = this.getAvatar(friend.avatar);
                            return (
                              <div className="avatar-icon-wrapper" key={friend.id}>
                                <div className={`badge ${friend.badgeColor} badge-dot badge-dot-lg`} />
                                <div className="avatar-icon">
                                  <img src={friendAvatar} alt={friend.name} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </NavItem>
                      <NavItem className="nav-item-btn text-center">
                        <Button size="sm" className="btn-wide btn-pill" color="success">
                          Start New Conversation
                        </Button>
                      </NavItem>
                      <NavItem className="nav-item-divider" />
                      <NavItem className="nav-item-header">
                        Tags
                        <small className="ms-1">Important</small>
                      </NavItem>
                      <NavItem>
                        {this.tags.map((tag, index) => (
                          <React.Fragment key={tag.id}>
                            {index === this.tags.length - 1 && <DropdownItem divider />}
                            <DropdownItem className="d-flex align-items-center">
                              <div className={`badge ms-0 me-3 badge-dot badge-dot-xl ${tag.color}`}>
                                Dark
                              </div>
                              {tag.name}
                            </DropdownItem>
                          </React.Fragment>
                        ))}
                      </NavItem>
                    </Nav>
                  </Card>
                </div>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
