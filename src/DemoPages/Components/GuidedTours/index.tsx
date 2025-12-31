import React, { Component, Fragment } from "react";
import { TourProvider, useTour } from "@reactour/tour";

import Demo from "./Examples/Demo";
import Text from "./Examples/Text";
import Glitch from "./Examples/Glitch";
import Tooltip from "./Examples/Tooltip";
import { Link } from "./Examples/Button";
import PropTypes from "prop-types";

import { CSSTransition, TransitionGroup  } from '../../../utils/TransitionWrapper';
import { Row, Col, Card, CardBody } from "reactstrap";

import PageTitle from "../../../Layout/AppMain/PageTitle";

class GuidedToursExample extends Component {
  constructor() {
    super();
    this.state = {
      isTourOpen: false,
      isShowingMore: false,
    };
  }

  UNSAFE_componentWillMount() {
    window.addEventListener("keyup", this.keyHandling);
  }

  componentDidMount() {
    window.removeEventListener("keyup", this.keyHandling);
  }

  keyHandling = (e) => {
    if (e.keyCode === 75) {
      e.preventDefault();
      this.openTour();
    }
  };

  toggleShowMore = () => {
    this.setState((prevState) => ({
      isShowingMore: !prevState.isShowingMore,
    }));
  };

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };
  render() {
    const { isTourOpen, isShowingMore } = this.state;
    const accentColor = "#3f6ad8";
    return (
      <Fragment>
        <PageTitle heading="Guided Tours"
          subheading="These can be used with other components and elements to create stunning and unique new elements for your UIs."
          icon="pe-7s-paint icon-gradient bg-sunny-morning"/>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody>
                    <TourProvider 
                      steps={tourConfig} 
                      styles={{
                        maskArea: (base) => ({ ...base, rx: 5 }),
                        badge: (base) => ({ ...base, backgroundColor: accentColor }),
                        dot: (base) => ({ ...base, backgroundColor: accentColor }),
                      }}
                      onClickMask={({ setIsOpen }) => setIsOpen(false)}
                    >
                      <TourContent 
                        openTour={this.openTour} 
                        toggleShowMore={this.toggleShowMore} 
                        isShowingMore={isShowingMore}
                        isTourOpen={isTourOpen}
                        closeTour={this.closeTour}
                      />
                    </TourProvider>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}

// Wrapper component to use the useTour hook
const TourContent = ({ openTour, toggleShowMore, isShowingMore, isTourOpen, closeTour }) => {
  const { setIsOpen } = useTour();
  
  React.useEffect(() => {
    setIsOpen(isTourOpen);
  }, [isTourOpen, setIsOpen]);

  React.useEffect(() => {
    if (!isTourOpen) {
      closeTour();
    }
  }, [isTourOpen, closeTour]);

  return <Demo openTour={openTour} toggleShowMore={toggleShowMore} isShowingMore={isShowingMore}/>;
};

const tourConfig = [
  {
    selector: '[data-tut="reactour__iso"]',
    content:
      "Ok, let's start with the name of the Tour that is about to begin.",
  },
  {
    selector: '[data-tut="reactour__logo"]',
    content: "And this is our cool bus...",
  },
  {
    selector: '[data-tut="reactour__copy"]',
    content: `Keep in mind that you could try and test everything during the Tour.
      For example, try selecting the highlighted text…`,
  },
  {
    selector: '[data-tut="reactour__style"]',
    content: function DemoHelperComponent() {
      return (
        <div>
          <Glitch data-glitch="Styled">Styled</Glitch>
          <Text color="#e5e5e5">
            The <Tooltip data-tooltip="this helper ⬇">tourist guide</Tooltip>{" "}
            could be dressed in any way, using custom components, styles and so
            on…
          </Text>
          <Text color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
            <Link href="http://codepen.io/lbebber/full/ypgql/" color="dark" nospaces>
              Text effect
            </Link>{" "} by{" "}
            <Link href="https://twitter.com/lucasbebber" color="dark" nospaces>
              Lucas Bebber
            </Link>
          </Text>
        </div>
      );
    },
    style: {
      backgroundColor: "black",
      color: "white",
    },
  },
  {
    selector: '[data-tut="reactour__goTo"]',
    content: function DemoHelperComponent({ goTo }) {
      DemoHelperComponent.propTypes = {
        goTo: PropTypes.func.isRequired,
      };

      return (
        <div>
          If you wanna go anywhere, skipping places, it is absolutely possible.
          <br />
          &quot;Oh, I forgot something inside the bus&hellip;&quot;{" "}
          <button
            style={{
              border: "1px solid #f7f7f7",
              background: "none",
              padding: ".3em .7em",
              fontSize: "inherit",
              display: "block",
              cursor: "pointer",
              margin: "1em auto",
            }}
            onClick={() => goTo(1)}>
            Please go back to{" "}
            <span role="img" aria-label="sheep">
              🚌
            </span>
          </button>
        </div>
      );
    },
  },
  {
    selector: '[data-tut="reactour__position"]',
    content: function DemoHelperComponent() {
      return (
        <Text>
          The <Tooltip data-tooltip="this helper ⬇">tourist guide</Tooltip>{" "}
          could be positioned where you want.
          <br />
          In this case will try to stay in the <strong>left side</strong> if
          there is available space, otherwise will{" "}
          <strong>auto position</strong>.
        </Text>
      );
    },
    position: "left",
  },
  {
    selector: '[data-tut="reactour__scroll"]',
    content:
      "Probably you noted that the Tour scrolled directly to the desired place, and you could control the time also…",
  },
  {
    selector: '[data-tut="reactour__scroll--hidden"]',
    content: "Also when places are pretty hidden…",
  },
  {
    selector: '[data-tut="reactour__action"]',
    content:
      "When arrived on each place you could fire an action, like… (look at the console)",
  },
  {
    selector: '[data-tut="reactour__state"]',
    content:
      "And the Tour could be observing changes to update the view, try clicking the button…",
    observe: '[data-tut="reactour__state--observe"]',
  },
];

export default GuidedToursExample;
