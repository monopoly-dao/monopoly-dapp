import WithFirebaseAuth from "../utils/initAuth";
import Marquee from "../components/Marquee";
import Header from "../components/Header/";
import Navbar from "../components/Navbar/";
import { Grid, Stack } from "@mui/material";
import Image from "next/image";

import styles from "../styles/Dashboard.module.scss";
import Carousel from "../components/Carousel";
import NotificationItem from "../components/NotificationItem";
import RoundIcon from "../components/RoundIcon";
import SalesItem from "../components/SalesItem";
import ArticleItem from "../components/ArticleItem";

import notifHeader from "../public/assets/notif header.svg";
import propertyImage from "../public/assets/Beachfront property.svg";
import duck from "../public/assets/duck vector.svg";
import articleOne from "../public/assets/Article Image 1.svg";
import articleTwo from "../public/assets/Article Image 2.svg";

function Dashboard(props: any) {
  const signInDetails = {
    name: props.displayName,
    photo: props.photoURL,
  };
  return (
    <div>
      {/* <Header signInDetails={signInDetails} /> */}
      {/* <Marquee /> */}
      <Navbar />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        className={styles.banner}
      >
        <p>Own property affordably from all over the world</p>

        <Stack direction="row" gap="40px">
          <button role="button" className="black-bg">
            Browse assets
          </button>
          <button role="button" className="transparent-bg">
            Browse assets
          </button>
        </Stack>
      </Stack>

      <Carousel />

      <h3 className={styles.activityHeading}>Activity</h3>
      <div className={styles.gridContainer}>
        <div>
          <NotificationItem>
            <RoundIcon src={notifHeader} alt={notifHeader} />
            <p>
              <b>monopolydao</b> listed new property —{" "}
              <b>beachfront property in Paris, France.</b>
            </p>
          </NotificationItem>
          <Image
            src={propertyImage}
            alt={propertyImage}
            data-style="activity header image"
          />

          <Stack direction="column" spacing="30px" my="60px">
            <NotificationItem>
              <RoundIcon src={duck} alt={duck} border />
              <p>
                sales for <b>two-storey building in Gwagwalada</b> just closed,
                with 3,000 shares sold to 45 shareholders!
              </p>
            </NotificationItem>
            <NotificationItem>
              <RoundIcon src={duck} alt={duck} border />
              <p>
                sales for <b>two-storey building in Gwagwalada</b> just closed,
                with 3,000 shares sold to 45 shareholders!
              </p>
            </NotificationItem>
            <NotificationItem>
              <RoundIcon src={duck} alt={duck} border />
              <p>
                sales for <b>two-storey building in Gwagwalada</b> just closed,
                with 3,000 shares sold to 45 shareholders!
              </p>
            </NotificationItem>
          </Stack>

          <NotificationItem>
            <RoundIcon src={notifHeader} alt={notifHeader} />
            <p>
              <b>monopolydao</b> listed new property —{" "}
              <b>beachfront property in Paris, France.</b>
            </p>
          </NotificationItem>
          <Image
            src={propertyImage}
            alt={propertyImage}
            data-style="activity header image"
          />
          <p className={styles.loadMore}>Load more...</p>
        </div>
        <div>
          <h4>CLOSING SALES</h4>
          <SalesItem />
          <SalesItem />
          <SalesItem />
        </div>
        <div>
          <h4>ARTICLES</h4>
          <ArticleItem
            src={articleOne}
            alt={articleOne}
            text="Buying your first property share — a beginner’s guide"
          />
          <ArticleItem
            src={articleTwo}
            alt={articleTwo}
            text="Buying your first property share — a beginner’s guide"
          />
        </div>
        <Stack direction="column" spacing="15px" alignItems="flex-start">
          <h4>NEWSLETTER</h4>
          <p>Get a summary of the Settley community action every week</p>
          <input type="text" placeholder="Enter your email address" />
          <button className="black-bg">Subscribe!</button>
        </Stack>
      </div>
    </div>
  );
}

export default WithFirebaseAuth(Dashboard);
