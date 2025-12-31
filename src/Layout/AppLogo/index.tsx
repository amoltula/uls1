import React, { Fragment } from "react";
import { connect } from "react-redux";

import Hamburger from "hamburger-react";

import AppMobileMenu from "../AppMobileMenu";
import { logoData } from "../../data";
import logoImage from "../../assets/utils/images/logo-inverse.png";

import {
  setEnableClosedSidebar,
  setEnableMobileMenu,
  setEnableMobileMenuSmall,
} from "../../reducers/ThemeOptions";

class HeaderLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      mobile: false,
      activeSecondaryMenuMobile: false,
    };
  }

  toggleEnableClosedSidebar = () => {
    let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
    setEnableClosedSidebar(!enableClosedSidebar);
  };

  state = {
    openLeft: false,
    openRight: false,
    relativeWidth: false,
    width: 280,
    noTouchOpen: false,
    noTouchClose: false,
  };

  render() {
    return (
      <Fragment>
        <div className="app-header__logo" onClick={this.toggleEnableClosedSidebar} style={{ cursor: 'pointer' }}>
          <div className="logo-container">
            <img 
              src={logoData.logoUrl || logoImage} 
              alt={logoData.logoAlt}
              className="logo-img"
              onError={(e) => {
                // Fallback to text logo if image fails to load
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextSibling) {
                  (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
                }
              }}
            />
            <span className="logo-text" style={{ display: 'none', fontSize: '1.5rem', fontWeight: '700', color: '#ffffff' }}>
              {logoData.companyName}
            </span>
          </div>
        </div>
        <AppMobileMenu />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableClosedSidebar: (enable) => dispatch(setEnableClosedSidebar(enable)),
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
  setEnableMobileMenuSmall: (enable) =>
    dispatch(setEnableMobileMenuSmall(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogo);
