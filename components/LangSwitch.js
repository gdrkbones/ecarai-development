import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  current: {},
}));

const LangSwitch = (props) => {
  const { root, show, hide } = useStyles();
  const [index, setIndex] = useState(0);
  return (
    <Grid>
      <Typography className={show ? index === 0 : hide}></Typography>
      <Typography className={show ? index === 1 : hide}></Typography>
    </Grid>
  );
};

export default LangSwitch;
