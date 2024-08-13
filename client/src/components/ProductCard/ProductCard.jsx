import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Collapse,
  Typography,
  Rating,
  useTheme,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const expandCardHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.25rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: "14px" }}
          color={theme.palette.secondary[500]}
          gutterBottom
        >
          {product.category}
        </Typography>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>

        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(product.price)}
        </Typography>

        <Rating value={product.rating} readOnly />
      </CardContent>
      <CardActions>
        <Button
          sx={{ fontSize: "12px", textTransform: "none" }}
          onClick={expandCardHandler}
          size="small"
          variant="primary"
        >
          {isExpanded ? "CLOSE DETAILS" : "SEE MORE"}
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography sx={{ fontSize: "10px", mb: "5px" }}>
            ID: {product._id.substr(-10)}
          </Typography>
          <Typography sx={{ fontSize: "10px", mb: "5px" }}>
            Supply Left: {product.supply}
          </Typography>
          <Typography sx={{ fontSize: "10px", mb: "5px" }}>
            Yearly sales this year: {product.stat[0].yearlySalesTotal}
          </Typography>
          <Typography sx={{ fontSize: "10px" }}>
            Yearly units sold this year: {product.stat[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductCard;
