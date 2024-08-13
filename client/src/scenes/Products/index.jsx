import { useGetProductsQuery } from "redux/api";
import { Box, useMediaQuery } from "@mui/material";
import SceneTitle from "components/SceneTitle/SceneTitle";
import ProductCard from "components/ProductCard/ProductCard";

const Products = () => {
  const isNonMobile = useMediaQuery("(min-width: 950px)");
  const { data, isLoading } = useGetProductsQuery();

  return (
    <Box m="1.25rem 2.5rem">
      <SceneTitle title="Products" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.333%"
          sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
        >
          {data?.productsWithStats.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default Products;
