/* eslint-disable jsx-a11y/anchor-is-valid */
function WorkpaceItem() {
  return (
    <li className="nav-item">
      <a
        className="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseUtilities"
        aria-expanded="true"
        aria-controls="collapseUtilities"
      >
        <i className="fas fa-fw fa-wrench"></i>
        <span>Workpace</span>
      </a>
      <div
        id="collapseUtilities"
        className="collapse"
        aria-labelledby="headingUtilities"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Work:</h6>
          <a className="collapse-item" href="utilities-color.html">
            Daily report
          </a>
          <a className="collapse-item" href="utilities-border.html">
            Send Message
          </a>
          <a className="collapse-item" href="utilities-animation.html">
            Send Notification
          </a>
          <a className="collapse-item" href="utilities-other.html">
            Other
          </a>
        </div>
      </div>
    </li>
  );
}

export default WorkpaceItem;
