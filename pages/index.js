import { Grid, makeStyles, Typography } from "@material-ui/core";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { createClient } from "contentful";

export const getStaticProps = async (context) => {
  // const client = createClient({
  //   space: process.env.CONTENTFUL_SPACE_ID,
  //   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  // });

  // let plants = await client.getEntries({
  //   content_type: "plant",
  // });
  let plants;
  let plantsInfo;
  if (process.env.LOCAL_DEVELOPMENT) {
    plantsInfo = require("../mock/data/plants.json");
    plants = plantsInfo.items.map((item) => ({
      name: item.fields.name,
      iconUrl: item.fields.icon.fields.file.url,
    }));
  } else {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
    plantsInfo = await client.getEntries({
      content_type: "plant",
    });
    plants = plantsInfo.items.map((item) => ({
      name: item.fields.name,
      iconUrl: `https:${item.fields.icon.fields.file.url}`,
    }));
  }

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
        {plants.map((item) => (
          <Grid className={plant} key={item.name}>
            <Typography>{item.name}</Typography>
            <Image src={item.iconUrl} width={64} height={64} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Home;
