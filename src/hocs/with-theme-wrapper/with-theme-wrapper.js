import React, { Component } from 'react';
import { Header } from 'components';

const withThemeWrapper = ViewComponent => {
  class ThemeWrapper extends Component {
    render() {
      return (
        <>
          <Header/>
          <main className="main">
            <div className="container">
              <ViewComponent {...this.props}/>
            </div>
          </main>
        </>
      );
    }
  }

  return ThemeWrapper;
};

export default withThemeWrapper;
