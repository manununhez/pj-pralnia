import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  NavItem,
  NavLink
} from 'reactstrap';

class NavbarCustom extends React.Component {

  state = {
    isOpen: false
  };

  toogle = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  };

  render() {
    return (<div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Pralnia Exp V2</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {getDropdownMenuItems(this.props.versions)}
            <NavItem>
              <NavLink href="/results">Results</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>v1.5</NavbarText>
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

function getDropdownMenuItems(items) {
  if (items === null || items === undefined) return <></>

  var children = items.map(function (item) {
    return <DropdownItem to={{
      pathname: '/version/' + item.name,
      state: {
        url: item.url
      }
    }} tag={Link} key={item.name}>
      {item.name}
    </DropdownItem>
  });

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        Versions
      </DropdownToggle>
      <DropdownMenu right>
        {children}
      </DropdownMenu>
    </UncontrolledDropdown>);
}

export default NavbarCustom;
