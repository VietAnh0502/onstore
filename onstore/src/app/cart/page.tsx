
import { Typography, Grid } from "@mui/material";
import MainTableCart from "../components/main/main.tablecart";
import Layout from "../components/Layout"; 
export default async function Cart() {
  return (
    <Layout>
    <Grid sx={{ margin: "50px 30px" }}>
      <Grid>
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          Giỏ Hàng
        </Typography>
      </Grid>
      <Grid>
        <MainTableCart></MainTableCart>
      </Grid>
    </Grid>
    </Layout>
  );
}
