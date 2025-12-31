import React, { Fragment } from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { headerData } from "../../data";

import { CSSTransition, TransitionGroup } from '../../utils/TransitionWrapper';

import HeaderLogo from "../AppLogo";

import SearchBox from "./Components/SearchBox";
import UserBox from "./Components/UserBox";

const Header = ({
  headerBackgroundColor,
  enableMobileMenuSmall,
  enableHeaderShadow,
}) => {
  return (
    <Fragment>
      <div className="app-header-wrapper">
        <TransitionGroup>
          <CSSTransition component="div"
            className={cx("app-header", headerBackgroundColor, {
              "header-shadow": enableHeaderShadow,
            })}
            appear={true} timeout={1500} enter={false} exit={false}>
            <HeaderLogo />
            <div className={cx("app-header__content", {
                "header-mobile-open": enableMobileMenuSmall,
              })}>
              <div className="app-header-left">
                <div className="app-header-left__title">
                  <h5 className="mb-0">{headerData.applicationName}</h5>
                </div>
                <SearchBox />
              </div>
              <div className="app-header-right">
                <UserBox />
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
        <div className="app-header-menu">
          <div className="container-fluid px-0">
            <div className="app-header-menu__content">
              <ul className="nav">
                {headerData.topMenuItems.map((item) => (
                  <li key={item.id} className="nav-item">
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    >
                      <i className={item.icon}></i>
                      <span className="ms-2">{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
  closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
  headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
