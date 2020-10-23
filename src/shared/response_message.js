import React from 'react';
import PropTypes from 'prop-types';

import './css/modal.css';
import './css/response_message.css';

const ResponseMessage = ({ response, setResponse }) => {
  function handleClick(event) {
    if (event.target.className.split(' ')[1] === 'modal') {
      setResponse({
        message: '',
        isError: false,
      });
    }
  }
  return (
    <div className="response-message modal" onMouseDown={handleClick}>
      <div
        className="modal-content"
        style={
          response.isError ? { background: 'var(--danger)' } : { background: 'var(--success)' }
        }
      >
        {response.message}
      </div>
    </div>
  );
};

ResponseMessage.propTypes = {
  response: PropTypes.object,
  setResponse: PropTypes.func,
};

export default ResponseMessage;
