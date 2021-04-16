import { AppBar, Grid, makeStyles, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
}));

const Navbar = () => {
  const styles = useStyles();

  return (
    <AppBar className={styles.root}>
      <Toolbar></Toolbar>
    </AppBar>
  );
};

export default Navbar;
