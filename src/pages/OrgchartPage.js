import React from 'react';
import OrgChart from '@unicef/react-org-chart';
import { tree, tree1, tree2, tree3, tree4 } from 'assets/orgchart-data/Tree';
import avatarPersonnel from 'assets/img/users/avatar-personnel.svg';


class OrgchartPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tree: tree,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    }
  }

  getChild = id => {
    switch (id) {
      case 100:
        return tree1
      case 36:
        return tree2
      case 56:
        return tree3
      case 25:
        return tree4
      default:
        return console.log('no children')
    }
  }

  componentDidMount() {
    console.log('nope')
    // const element = document.getElementById('react-org-chart');
    // element.parentNode.removeChild(element);
  }

  componentWillUnmount() {
    // const element = document.getElementById('react-org-chart');
    // element.parentNode.removeChild(element);
  }

  getParent = d => {
    if (d.id === 100) {
      return {
        id: 500,
        person: {
          id: 500,
          avatar: avatarPersonnel,
          department: '',
          name: 'Pascal ruth',
          title: 'Member',
          totalReports: 1,
        },
        hasChild: false,
        hasParent: true,
        children: [d],
      }
    } else if (d.id === 500) {
      return {
        id: 1,
        person: {
          id: 1,
          avatar: avatarPersonnel,
          department: '',
          name: 'Bryce joe',
          title: 'Director',
          totalReports: 1,
        },
        hasChild: false,
        hasParent: false,
        children: [d],
      }
    } else {
      return d
    }
  }

  handleDownload = () => {
    this.setState({ downloadingChart: false })
  }

  handleOnChangeConfig = config => {
    this.setState({ config: config })
  }

  handleLoadConfig = () => {
    const { config } = this.state
    return config
  }

  render() {
    console.log('apae')
    const { tree, downloadingChart } = this.state

    //For downloading org chart as image or pdf based on id
    const downloadImageId = 'download-image'
    const downloadPdfId = 'download-pdf'
    
    return (
      <>
        <OrgChart
          tree={tree}
          downloadImageId={downloadImageId}
          downloadPdfId={downloadPdfId}
          onConfigChange={config => {
            this.handleOnChangeConfig(config)
          }}
          loadConfig={d => {
            let configuration = this.handleLoadConfig(d)
            if (configuration) {
              return configuration
            }
          }}
          downlowdedOrgChart={d => {
            this.handleDownload()
          }}
          loadImage={d => {
            return Promise.resolve(avatarPersonnel)
          }}
          loadParent={d => {
            const parentData = this.getParent(d)
            return parentData
          }}
          loadChildren={d => {
            const childrenData = this.getChild(d.id)
            return childrenData
          }}
        />
      </>
    );
  }
}

export default OrgchartPage;
