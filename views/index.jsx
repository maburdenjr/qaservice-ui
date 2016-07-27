const React = require('react');

var Index = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    headerHtml: React.PropTypes.string
  },

  render: function() {
      let topResources = this.props.topResources;
      let bottomResources = this.props.bottomResources;
      let sampleId = this.props.sampleId;
      let authToken = this.props.authToken;
      let gatewayUrl = this.props.gatewayUrl;
      return (
          <html>
              <head>
                  <meta charSet="utf-8" />
                  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <base href={this.props.baseUrl} />
                  <title>{this.props.title}</title>
                  </head>

                  <body id="appWrapper" data-gatewayUrl={gatewayUrl} data-authToken={authToken} data-sampleid={sampleId}>
                      <div id="root"></div>
                  </body>
            </html>
     );
  }
});

module.exports = Index;
