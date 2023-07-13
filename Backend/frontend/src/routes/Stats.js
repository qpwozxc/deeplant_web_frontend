import SearchFilter from "../components/Stats/SearchFilter";
import StatsTabs from "../components/Stats/StatsTabs";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Stats() {
  return (
<Container maxWidth="xl">
  <Box sx={{
        width: '80%',}}>
  <div style={{ display: "flex", width: "100%" }}>
  
    <div style={{ width: "100%" }}>
      <SearchFilter />
      <StatsTabs/>
    </div>
  </div>
  </Box>

</Container>
    
  );
}

export default Stats;
