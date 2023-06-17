import React, { useCallback, useEffect, useState, useContext } from "react";
import Header from "./Header";
import axios from "axios";
import { useSnackbar } from "notistack";
import {
  TextField,
  IconButton,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  Search as SearchIcon,
  SentimentDissatisfied,
} from "@mui/icons-material";
import styles from "./styles/product.module.css";
import ProductCard from "./ProductCard";
import FilterPanel from "./FilterPanel";
import { ProductsContext } from "./store/ProductsContext";

const Products = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [text, setText] = useState("");
  const { dispatchProduct } = useContext(ProductsContext);
  const [searchText, setSearch] = useState();
  const [prodData, setProd] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [filters, setFilters] = useState({});
  const handleSearch = () => {
    setSearch(text);
    const query = text.toLowerCase();

    const items = filteredData.filter(function (item) {
      // Convert item attributes to lowercase for case-insensitive search
      var name = item.name.toLowerCase();
      var color = item.color.toLowerCase();
      var type = item.type.toLowerCase();

      // Check if any attribute matches the query
      return (
        name.includes(query) || color.includes(query) || type.includes(query)
      );
    });

    setFilteredData(items);
  };
  const applyFilters = useCallback(
    (items) => {
      const colorFilters = filters.color || [];
      const genderFilters = filters.gender || [];
      const typeFilters = filters.type || [];
      const priceFilters = filters.price || [];

      let filteredItems = items.filter(function (item) {
        const matchColor =
          colorFilters.includes(item.color) || colorFilters.length === 0;
        const matchGender =
          genderFilters.includes(item.gender) || genderFilters.length === 0;
        const matchType =
          typeFilters.includes(item.type) || typeFilters.length === 0;
        const matchPrice =
          checkPriceFilter(item.price, priceFilters) ||
          priceFilters.length === 0;

        return matchColor && matchGender && matchType && matchPrice;
      });
      if (searchText) {
        const query = searchText.toLowerCase();

        filteredItems = filteredItems.filter(function (item) {
          // Convert item attributes to lowercase for case-insensitive search
          var name = item.name.toLowerCase();
          var color = item.color.toLowerCase();
          var type = item.type.toLowerCase();

          // Check if any attribute matches the query
          return (
            name.includes(query) ||
            color.includes(query) ||
            type.includes(query)
          );
        });
      }

      return filteredItems;
    },
    [filters, searchText]
  );
  const checkPriceFilter = (itemPrice, priceFilters) => {
    for (const filter of priceFilters) {
      const [minPrice, maxPrice] = filter.split("-").map(Number);

      if (maxPrice) {
        if (itemPrice >= minPrice && itemPrice <= maxPrice) {
          return true;
        }
      } else {
        if (itemPrice >= minPrice) {
          return true;
        }
      }
    }

    return false;
  };
  const getProducts = useCallback(async () => {
    setNotFound(false);
    setLoading(true);
    try {
      const result = await axios.get(
        " https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      );
      setProd(result.data);
      setFilteredData(result.data);
      dispatchProduct({ type: "SET_PRODUCT_DATA", payload: result.data });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setNotFound(true);
      console.log(e);
      enqueueSnackbar(e, { variant: "error" });
    }
  }, [enqueueSnackbar, dispatchProduct]);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  useEffect(() => {
    const filtered = applyFilters(prodData);
    setFilteredData(filtered);
  }, [applyFilters, prodData]);
  return (
    <div className={styles.body}>
      <Header>
        <TextField
          className={styles.searchDesktop}
          variant="outlined"
          placeholder="Search"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value === "") {
              setSearch("");
              const filtered = applyFilters(prodData);
              setFilteredData(filtered);
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Header>
      <TextField
        className={styles.searchMobile}
        fullWidth
        variant="outlined"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setText(e.target.value);
          if (e.target.value === "") {
            setSearch("");
            const filtered = applyFilters(prodData);
            setFilteredData(filtered);
          }
        }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />

      {loading ? (
        <Box className={styles.loading}>
          <CircularProgress />
          Loading Products...
        </Box>
      ) : notFound ? (
        <Box className={styles.loading}>
          <SentimentDissatisfied />
          No products found
        </Box>
      ) : (
        <Box className={styles.mainGrid}>
          {/* <Grid className={styles["main-grid"]} container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={3}> */}
          <Box className={styles.filterPanel}>
            <FilterPanel setFilters={setFilters} />
          </Box>
          {/* </Grid> */}
          {/* <Grid item xs={12} sm={12} md={12} lg={9}> */}
          <Box className={styles["product-grid"]}>
            <Grid container spacing={1}>
              {filteredData.map((item) => {
                return (
                  <Grid item xs={12} md={6} sm={6} lg={4} key={item["id"]}>
                    <ProductCard product={item} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          {/* </Grid> */}
          {/* // </Grid> */}
        </Box>
      )}
    </div>
  );
};

export default Products;
