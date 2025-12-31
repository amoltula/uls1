/**
 * Example: Refactored Component Using Data Hooks
 * 
 * This is an example showing how to refactor components to use
 * external data, constants, and hooks.
 */

import React from 'react';
import { Card, Button, Row, Col } from 'reactstrap';
import { useProfiles, useUIConstants, buildClassName } from '../../../utils/dataHooks';
import { CLASS_NAMES, ICONS, ANIMATION_CONFIG } from '../../../config/ui-constants';
import { CSSTransition, TransitionGroup } from '../../../utils/TransitionWrapper';

/**
 * ProfileBlocks Component - Functional Version
 * 
 * Before: Hardcoded data, images, class names, icon names
 * After: Uses external data, constants, and hooks
 */
const ProfileBlocksExample: React.FC = () => {
  // Load data using hooks
  const profiles = useProfiles();
  const { buttons } = useUIConstants();

  return (
    <TransitionGroup>
      <CSSTransition
        component="div"
        classNames={CLASS_NAMES.TABS_ANIMATION}
        appear={true}
        timeout={ANIMATION_CONFIG.TRANSITION_TIMEOUT}
        enter={false}
        exit={false}
      >
        <div>
          <Row>
            {profiles.slice(0, 3).map((profile) => {
              // Dynamically load assets
              const avatarSrc = require(`../../../assets/utils/images/${profile.avatar}`);
              const bgSrc = require(`../../../assets/utils/images/${profile.background}`);

              return (
                <Col md="6" lg="4" key={profile.id}>
                  <Card className={buildClassName('mb-3', CLASS_NAMES.CARD_PROFILE_BLOCK)}>
                    <div className={CLASS_NAMES.DROPDOWN_MENU_HEADER}>
                      {/* Background Image */}
                      <img
                        src={bgSrc}
                        alt=""
                        className={buildClassName('profile-blur', CLASS_NAMES.OPACITY_10)}
                      />
                      
                      {/* Optional Background Overlay */}
                      {profile.backgroundClass && (
                        <div className={buildClassName('profile-inner', profile.backgroundClass)} />
                      )}

                      <div className={CLASS_NAMES.MENU_HEADER_CONTENT}>
                        {/* Avatar */}
                        <div
                          className={buildClassName(
                            CLASS_NAMES.AVATAR_ICON_WRAPPER,
                            CLASS_NAMES.AVATAR_ICON_LG
                          )}
                        >
                          <div
                            className={buildClassName(
                              CLASS_NAMES.AVATAR_ICON,
                              profile.avatarShape,
                              CLASS_NAMES.BTN_HOVER_SHINE,
                              'me-0'
                            )}
                          >
                            <img src={avatarSrc} alt={profile.name} />
                          </div>
                        </div>

                        {/* Profile Name */}
                        <h5 className={CLASS_NAMES.MENU_HEADER_TITLE}>
                          {profile.name}
                        </h5>

                        {/* Optional Subtitle */}
                        {profile.subtitle && (
                          <h6 className={CLASS_NAMES.MENU_HEADER_SUBTITLE}>
                            {profile.subtitle}
                          </h6>
                        )}

                        {/* Action Buttons */}
                        <div className="menu-header-btn-pane">
                          <Button
                            className={buildClassName(
                              CLASS_NAMES.BTN_ICON,
                              CLASS_NAMES.BTN_PILL,
                              'me-2',
                              CLASS_NAMES.BTN_ICON_ONLY
                            )}
                            color="link"
                            title="Inbox"
                          >
                            <i className={buildClassName(ICONS.INBOX, 'btn-icon-wrapper')} />
                          </Button>
                          <Button
                            className={buildClassName(
                              CLASS_NAMES.BTN_ICON,
                              CLASS_NAMES.BTN_PILL,
                              CLASS_NAMES.BTN_ICON_ONLY
                            )}
                            color="link"
                            title="Camera"
                          >
                            <i className={buildClassName(ICONS.CAMERA, 'btn-icon-wrapper')} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default ProfileBlocksExample;

/**
 * COMPARISON
 * 
 * Old Way (Hardcoded):
 * ---------------------
 * import avatar5 from "../../../../assets/utils/images/avatars/5.jpg";
 * import bg1 from "../../../../assets/utils/images/dropdown-header/abstract1.jpg";
 * 
 * <Card className="mb-3 profile-block">
 *   <img src={bg1} alt="" className="profile-blur opacity-10" />
 *   <h5 className="menu-header-title">Jessica Walberg</h5>
 *   <Button className="btn-icon btn-pill me-2 btn-icon-only" color="link">
 *     <i className="lnr-inbox btn-icon-wrapper"> </i>
 *   </Button>
 * </Card>
 * 
 * 
 * New Way (Externalized):
 * -----------------------
 * const profiles = useProfiles();
 * const avatarSrc = require(`../../../assets/utils/images/${profile.avatar}`);
 * 
 * <Card className={buildClassName('mb-3', CLASS_NAMES.CARD_PROFILE_BLOCK)}>
 *   <img 
 *     src={bgSrc} 
 *     alt="" 
 *     className={buildClassName('profile-blur', CLASS_NAMES.OPACITY_10)} 
 *   />
 *   <h5 className={CLASS_NAMES.MENU_HEADER_TITLE}>{profile.name}</h5>
 *   <Button 
 *     className={buildClassName(
 *       CLASS_NAMES.BTN_ICON, 
 *       CLASS_NAMES.BTN_PILL, 
 *       'me-2', 
 *       CLASS_NAMES.BTN_ICON_ONLY
 *     )} 
 *     color="link"
 *   >
 *     <i className={buildClassName(ICONS.INBOX, 'btn-icon-wrapper')} />
 *   </Button>
 * </Card>
 * 
 * 
 * Benefits:
 * ---------
 * 1. No hardcoded data - all from JSON
 * 2. No hardcoded class names - all from constants
 * 3. No hardcoded icon names - all from constants
 * 4. Easy to update data without code changes
 * 5. Consistent styling across components
 * 6. Type-safe with TypeScript
 * 7. Reusable across application
 * 8. Testable with mock data
 */
