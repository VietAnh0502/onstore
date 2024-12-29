import { Typography, Grid } from "@mui/material";
import Layout from "../components/Layout"; 
import MainPay from "../components/main/main.pay";

export default async function Pay() {
  return (
    <Layout>

    <Grid sx={{ margin: "50px 50px" }}>
      <Grid>
        <Typography sx={{ fontSize: "30px", fontWeight: "bold", margin: "50px 0" }}>
          Thanh Toán
        </Typography>
      </Grid>
      <Grid>
        <MainPay></MainPay>
      </Grid>
    </Grid>
    </Layout>

  );
}
