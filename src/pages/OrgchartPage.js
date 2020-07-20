import React from 'react';
import OrgChart from '@unicef/react-org-chart';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Label,
  Input,
  FormGroup,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import { tree } from 'assets/orgchart-data/Tree';
import avatarPersonnel from 'assets/img/users/avatar-personnel.svg';

const initData = {
  person: {
    name: '',
    title: '',
  },
  hasParent: false,
  hasChild: false,
  children: [],
};

class OrgchartPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      actionData: 'delete',
      modal: false,
      modal_parent: false,
      modal_nested: false,
      currentData: initData,
      temporaryData: initData,
      tree: tree,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    }
  }

  toggle = modalType => () => {
    if (!modalType) {
      return this.setState({
        modal: !this.state.modal,
      });
    }

    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    });
  }

  getChild = (id) => {
    return id;
  }

  getParent = d => {
    return d;
  }

  handleDownload = () => {
    this.setState({ downloadingChart: false })
  }

  handlePerson = (e, d) => {
    // e.person.name = 'iket';
    const { target } = d;
    const { nodeName } = target;
    
      if (nodeName !== 'text') {
        // e.person.title = 'asdasdasd loker';
        if (!e.children) {
          const children = e._children || [];
          e.children = children;
        } else {
          const children = e.children;
          e._children = children;
          e.children = null;
          // const children = e._children || [];
          // e.children = children;
        }
        this.setState((prevState) => {
          return {
            ...prevState,
            currentData: { person: { ...e.person } },
            temporaryData: e
          }
        });
        this.toggle('parent')();
        return true;
      }
      
      return true;
    
    
    
    // e.person.title = 'asdasdasd loker';
    // if (!e.children) {
    //   const children = e._children || [];
    //   e.children = children;
    // }
    // this.toggle()();
    
  }

  saveData = () => {
    this.setState(prevState => {
      const { name, title } = prevState.currentData.person;
      prevState.temporaryData.person.name = name;
      prevState.temporaryData.person.title = title;
      return {
        ...prevState,
      };
    });
    this.toggle('nested')();
    this.toggle('parent')();
  }

  deleteData = () => {
    this.setState(prevState => {
      // const { name, title } = prevState.currentData.person;
      prevState.temporaryData.parent.children.forEach((data, index) => {
        if (data.person.id === prevState.currentData.person.id) {
          prevState.temporaryData.parent.children.splice(index, 1);
          prevState.temporaryData.parent.person.totalReports--; 
        }
      });
      // prevState.temporaryData.person.title = title;
      return {
        ...prevState,
      };
    });
    this.toggle('nested')();
    this.toggle('parent')();
  }

  // changeDom = (data) => {
  //   const { id, name, title } = data.person;
  //   // const { name, title } = person;
  //   console.log('hayuk', data);
  //   const element = document.getElementById(`image-${id}`).parentNode;
  //   element.children[2].innerHTML = name;
  //   element.children[3].innerHTML = title;
  // }

  handleOnChangeConfig = config => {
    // console.log('jess', config);
    this.setState({ config: config })
  }

  onChange = (event, name) => {
    const newValue = event.target.value;
    if (newValue.length < 25) {
      this.setState(prevState => {
        prevState.currentData.person[name] = newValue;
        return {
          ...prevState,
        };
      });
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
        };
      });
    }
    
  }

  handleLoadConfig = () => {
    const { config } = this.state
    return config
  }

  confirmAction = (action) => () => {
    this.setState((preState) => {
      return {
        ...preState,
        modeData: action,
      }
    });
    this.toggle('nested')();
  }

  render() {
    const { tree, downloadingChart, modal_parent, modal_nested, modeData } = this.state
    // const yes = false;
    //For downloading org chart as image or pdf based on id
    const downloadImageId = 'download-image'
    const downloadPdfId = 'download-pdf'
    
    return (
      <>
        <div className="zoom-buttons">
          <button
            className="btn btn-outline-primary zoom-button"
            id="zoom-in"
          >
            +
          </button>
          <button
            className="btn btn-outline-primary zoom-button"
            id="zoom-out"
          >
            -
          </button>
        </div>
        { !modal_parent && <OrgChart
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
          onPersonClick={(d, check) => {
            let configuration = this.handlePerson(d, check)
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
        /> }
        
        <Modal
          isOpen={modal_parent}
          toggle={this.toggle('parent')}
          className={this.props.className}>
          <ModalHeader toggle={this.toggle('parent')}>Detail profile</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input
                  type="text"
                  name="email"
                  onChange={(e) => this.onChange(e, 'name')}
                  value={ this.state.currentData.person.name }
                  placeholder="Name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Jabatan</Label>
                <Input
                  type="text"
                  name="title"
                  onChange={(e) => this.onChange(e, 'title')}
                  value={ this.state.currentData.person.title }
                  placeholder="Jabatan"
                />
              </FormGroup>
            </Form>

            <Modal
              isOpen={modal_nested}
              toggle={this.toggle('nested')}>
              <ModalHeader>Are you sure to {modeData} profile data?</ModalHeader>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle('nested')}>
                  Cancel
                </Button>{' '}
                <Button
                  color="secondary"
                  onClick={modeData === 'Delete' ? this.deleteData : this.saveData}>
                  Yes
                </Button>
              </ModalFooter>
            </Modal>
            
          </ModalBody>
          <ModalFooter>
            
            { this.state.temporaryData.hasParent && <Button color="danger" onClick={this.confirmAction('Delete')}>
              Delete
            </Button> }
          
            <Button color="primary" onClick={this.confirmAction('Edit')}>
              Save
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle('parent')}>
              Cancel
            </Button>
              
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default OrgchartPage;
