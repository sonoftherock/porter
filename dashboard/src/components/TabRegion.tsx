import React, { Component } from 'react';
import styled from 'styled-components';

import TabSelector from './TabSelector';
import Loading from './Loading';

type PropsType = {
  options: { label: string, value: string }[],
  currentTab: string,
  setCurrentTab: (x: string) => void,
  defaultTab?: string,
  addendum?: any,
  color?: string | null,
};

type StateType = {
};

// Manages a tab selector and renders the associated view
export default class TabRegion extends Component<PropsType, StateType> {
  setDefaultTab = () => {
    if (!this.props.defaultTab && this.props.options[0]) {
      this.props.setCurrentTab(this.props.options[0].value);
    }
  }

  componentDidMount() {
    this.setDefaultTab();
  }

  componentDidUpdate(prevProps: PropsType) {
    let { options, currentTab } = this.props;
    if (prevProps.options !== options) {
      if (options.filter(x => x.value === currentTab).length === 0) {
        this.setDefaultTab();
      }
    }
  }

  renderContents = () => {
    if (!this.props.currentTab) {
      return (
        <Loading />
      );
    }

    return (
      <Div>
        <TabSelector
          options={this.props.options}
          color={this.props.color}
          currentTab={this.props.currentTab}
          setCurrentTab={(x: string) => this.props.setCurrentTab(x)}
          addendum={this.props.addendum}
        />
        <Gap />
        <TabContents>
          {this.props.children}
        </TabContents>
      </Div>
    );
  }

  render() {
    return (
      <StyledTabRegion>
        {this.renderContents()}
      </StyledTabRegion>
    );
  }
}

const Div = styled.div`
  width: 100%;
  height: 100%;
  animation: fadeIn 0.25s 0s;
`;

const TabContents = styled.div`
  height: calc(100% - 60px);
`;

const Gap = styled.div`
  width: 100%;
  background: none;
  height: 30px;
`;

const StyledTabRegion = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
`;