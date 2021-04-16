import { Grid, makeStyles, Typography } from "@material-ui/core";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { createClient } from "contentful";

export const getStaticProps = async (context) => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
  });

  let plants = await client.getEntries({
    content_type: "plant",
  });
  return {
    props: {
      plants: plants,
    },
    revalidate: 100,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  plantsContainer: {
    marginTop: "64px",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  plant: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "64px",
  },
}));

const Home = ({ plants }) => {
  const { root, plantsContainer, plant } = useStyles();
  // console.log(plants);
  return (
    <Grid className={root}>
      <Navbar />
      <Grid className={plantsContainer}>
        {plants.items.map((item) => (
          <Grid className={plant} key={item.fields.name}>
            <Typography>{item.fields.name}</Typography>
            <Image
              src={"https:" + item.fields.icon.fields.file.url}
              width={64}
              height={64}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Home;
