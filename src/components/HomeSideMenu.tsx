import { ReactNode } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

import List from "@material-ui/core/List";
import Person from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NotificationsIcon from "@material-ui/icons/Notifications";

import useStyles from "./styles/HomeSideMenu";

interface ListItemLink {
  to: string;
  icon: ReactNode;
  children: ReactNode;
}

function HomeSideMenu() {
  const classes = useStyles();

  const ListItemLink = ({ to, icon, children }: ListItemLink) => (
    <ListItem
      button
      to={to}
      component={RouterNavLink}
      activeClassName="Mui-selected"
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={children} />
    </ListItem>
  );

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItemLink to="/" icon={<HomeIcon />}>
          Home
        </ListItemLink>
        <ListItemLink to="/notifications" icon={<NotificationsIcon />}>
          Notifications
        </ListItemLink>
        <ListItemLink to="/profile" icon={<Person />}>
          Profile
        </ListItemLink>
      </List>
    </div>
  );
}

export default HomeSideMenu;
