import React, { Fragment } from "react";
import { connect } from "react-redux";
import { footerData } from "../../data";

const AppFooter = ({ enableFixedFooter }) => {
  return (
    <Fragment>
      <div className="app-wrapper-footer" style={{ background: '#000000' }}>
        <div className="app-footer" style={{ background: '#000000' }}>
          <div className="app-footer__inner" style={{ background: '#000000', justifyContent: 'center', position: 'relative' }}>
            <div style={{ textAlign: 'center', color: '#ffffff' }}>
              {footerData.leftLinks[0]?.label}
            </div>
            <div style={{ position: 'absolute', right: '1.5rem', color: '#ffffff' }}>
              {footerData.rightLinks[0]?.badge && (
                <span className={`badge text-bg-${footerData.rightLinks[0].badge.variant} me-2`} style={{ color: 'white' }}>
                  <small>{footerData.rightLinks[0].badge.text}</small>
                </span>
              )}
              {footerData.rightLinks[0]?.label}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  enableFixedFooter: state.ThemeOptions.enableFixedFooter,
});

export default connect(mapStateToProps)(AppFooter);
