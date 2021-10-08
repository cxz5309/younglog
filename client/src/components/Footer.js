import { Component } from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { fab, faGithub } from '@fortawesome/free-brands-svg-icons'


class Footer extends Component {
  constructor() {
    super();
    library.add(fas, fab, faGithub, faEnvelope);
  }

  render() {
    return (
      <footer>
        <div className="footer">
          <div className="link">
            <a href="cxz5309@gmail.com"><FontAwesomeIcon icon={fas, faEnvelope} size='3x' /></a>
            <a href="https://github.com/cxz5309"><FontAwesomeIcon icon={fab, faGithub} size='3x' /></a>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
