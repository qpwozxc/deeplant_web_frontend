import SearchFilter from "../components/Stats/SearchFilter";
import StatsTabs from "../components/Stats/StatsTabs";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Stats() {
  return (
<Container maxWidth="xl">
  <Box sx={{width: '100%',}}>
    <Box sx={{ width: "100%", display:'flex', justifyContent:'center' }}>
      <SearchFilter />
    </Box>
    <Box sx={{ width: "100%", display:'flex', justifyContent:'center' }}>
    <StatsTabs/>
    </Box>  
  </Box>

</Container>
    
  );
}

export default Stats;
