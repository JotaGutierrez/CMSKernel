import {React, Modal} from './../../bundle.dependencies';

const styles = {
  reactModalOverlay: {
    zIndex: 1000
  },
  reactModalContent: {
    alignItems: 'center',
    display: 'flex',
    height: '30%',
    justifyContent: 'center',
    left: '50%',
    padding: '0',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%'
  },
  root: {
    backgroundColor: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '400px',
    position: 'relative',
    textAlign: 'center',
    width: '100%'
  },
  content: {
    marginBottom: '15px',
    marginLeft: '10px',
    marginRight: '10px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '15px',
    marginLeft: '10px',
    marginRight: '10px'
  }
};

class ConfirmationModal extends React.Component {
  static propTypes = {
    args: React.PropTypes.array,
    callback: React.PropTypes.func,
    closeModal: React.PropTypes.func,
    content: React.PropTypes.object,
    isOpen: React.PropTypes.bool
  };

  componentWillMount() {
    Modal.setAppElement('body');
  }

  callback() {
    this.props.callback(this.props.args);
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        contentLabel={this.props.content.title}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        style={{overlay: styles.reactModalOverlay, content: styles.reactModalContent}}>
        <div style={styles.root}>
          <h2>{this.props.content.title}</h2>
          <div style={styles.content}>
            <p>{this.props.content.message}</p>
          </div>
          <div style={styles.actions}>
            <button className="button button--secondary"
                    onClick={this.callback.bind(this)}
                    type="button">✔
            </button>
            <button className="button"
                    onClick={this.props.closeModal.bind(this)}
                    type="button">✘
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ConfirmationModal;
