/* eslint-disable jsx-a11y/anchor-is-valid */
function Analysis () {
    return (
        <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-fw fa-cog"></i>
          <span>Analysis</span>
        </a>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Time:</h6>
            <a className="collapse-item" href="buttons.html">
              Daily
            </a>
            <a className="collapse-item" href="buttons.html">
              Weekly
            </a>
            <a className="collapse-item" href="cards.html">
              Monthly
            </a>
          </div>
        </div>
      </li>
    )
}

export default Analysis