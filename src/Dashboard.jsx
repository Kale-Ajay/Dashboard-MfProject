import React from "react";
import {
  Box, Grid, Paper, Typography, Stack, Chip, IconButton, Divider
} from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import "./dashboard.css";

const monthly = [
  { month: "Jan", sales: 1700, margin: 1850, profit: 2100 },
  { month: "Feb", sales: 3000, margin: 2300, profit: 2300 },
  { month: "Mar", sales: 2500, margin: 2600, profit: 2800 },
  { month: "Apr", sales: 2800, margin: 2700, profit: 2500 },
  { month: "May", sales: 2200, margin: 2400, profit: 2600 },
  { month: "Jun", sales: 2600, margin: 1900, profit: 2700 },
  { month: "Jul", sales: 2700, margin: 2200, profit: 2500 },
  { month: "Aug", sales: 1700, margin: 2000, profit: 2850 },
  { month: "Sep", sales: 2300, margin: 2100, profit: 1900 },
  { month: "Oct", sales: 2200, margin: 1750, profit: 2300 },
  { month: "Nov", sales: 2700, margin: 1400, profit: 2500 },
  { month: "Dec", sales: 2400, margin: 2700, profit: 2150 }
];
const categoryData = [
  { name: "Clothing", value: 40, amount: "$8.6M", products: "2,365 Products", color: "#319b82" },
  { name: "Footwear", value: 35, amount: "$5.9M", products: "1,980 Products", color: "#78c49c" },
  { name: "Bags", value: 15, amount: "$4.3M", products: "297 Products", color: "#c9e879" },
  { name: "Accessories", value: 10, amount: "$1.5M", products: "2,177 Products", color: "#e5f2bd" }
];
const orders = [
  { day: "Mon", tokopedia: 28000, shopee: 31000, bukalapak: 4000 },
  { day: "Tue", tokopedia: 33000, shopee: 8000, bukalapak: 24000 },
  { day: "Wed", tokopedia: 13000, shopee: 21000, bukalapak: 23000 },
  { day: "Thu", tokopedia: 13000, shopee: 13000, bukalapak: 19000 },
  { day: "Fri", tokopedia: 18000, shopee: 5000, bukalapak: 21000 },
  { day: "Sat", tokopedia: 7000, shopee: 28000, bukalapak: 8000 },
  { day: "Sun", tokopedia: 29000, shopee: 28000, bukalapak: 27000 }
];
const money = n => `$${(n / 1000).toFixed(1)}k`;

function Panel({ title, children, sx = {} }) {
  return <Paper elevation={0} className="dash-panel" sx={sx}>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
      <Typography fontWeight={700} fontSize={15}>{title}</Typography>
      <IconButton size="small"><MoreHorizRoundedIcon fontSize="small" /></IconButton>
    </Stack>
    {children}
  </Paper>;
}

export default function Dashboard() {
  return <Box className="dashboard-root">
    <Panel title="Sales Overview" sx={{ mb: 2.5 }}>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} md={2.7}>
          <Typography color="text.secondary" fontSize={12}>Total Sales</Typography>
          <Typography fontSize={23} fontWeight={800} mt={0.2}>$18,303.00</Typography>
          <Stack direction="row" alignItems="center" spacing={0.3} color="primary.main" mb={2}>
            <ArrowUpwardRoundedIcon sx={{ fontSize: 15 }} /><Typography fontSize={12} fontWeight={700}>5.3%</Typography>
          </Stack>
          {[["Sales","#319b82"],["Gross Margin","#78c49c"],["Net Profit","#c9e879"]].map(([label,color]) =>
            <Stack key={label} direction="row" alignItems="center" spacing={1} mb={1}>
              <Box width={9} height={9} borderRadius="2px" bgcolor={color}/><Typography fontSize={12}>{label}</Typography>
            </Stack>
          )}
        </Grid>
        <Grid item xs={12} md={9.3}>
          <Box height={{ xs: 230, md: 190 }} className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly} margin={{ top: 4, right: 0, left: -18, bottom: 0 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0ee" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#87908c" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#87908c" }} tickFormatter={money} axisLine={false} tickLine={false} />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
                <Bar dataKey="sales" fill="#319b82" radius={[3,3,0,0]} />
                <Bar dataKey="margin" fill="#78c49c" radius={[3,3,0,0]} />
                <Bar dataKey="profit" fill="#c9e879" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Panel>

    <Grid container spacing={2.5} mb={2.5}>
      <Grid item xs={12} lg={6}>
        <Panel title="Sales by Category" sx={{ height: "100%" }}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={6}>
              {categoryData.map(item => <Box key={item.name} mb={1.35}>
                <Stack direction="row" alignItems="center" spacing={0.8}>
                  <Box width={7} height={7} borderRadius="50%" bgcolor={item.color}/>
                  <Typography fontSize={11.5} fontWeight={650}>{item.name} ({item.value}%)</Typography>
                </Stack>
                <Typography fontSize={10.5} color="text.secondary" ml={1.8} mt={0.25}>{item.products}</Typography>
              </Box>)}
            </Grid>
            <Grid item xs={6}>
              <Box height={205} position="relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={categoryData} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="83%" paddingAngle={1} stroke="none">
                    {categoryData.map(entry => <Cell key={entry.name} fill={entry.color}/>)}
                  </Pie><Tooltip formatter={(v) => [`${v}%`, "Share"]}/></PieChart>
                </ResponsiveContainer>
                <Box className="donut-center"><Typography fontSize={10} color="text.secondary">Total Sales</Typography><Typography fontWeight={800} fontSize={17}>$20.3M</Typography></Box>
              </Box>
            </Grid>
          </Grid>
        </Panel>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Panel title="Total Orders by Platform" sx={{ height: "100%" }}>
          <Grid container spacing={1} mb={1}>
            {[["Tokopedia","8,983","#319b82","6.9%"],["Shopee","18,112","#78c49c","6.9%"],["Bukalapak","3,645","#c9e879","6.9%"]].map(([label,value,color,change]) =>
              <Grid item xs={4} key={label}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Box width={6} height={6} borderRadius="50%" bgcolor={color}/><Typography fontSize={10.5} color="text.secondary">{label}</Typography>
                </Stack>
                <Typography fontSize={16} fontWeight={750} mt={0.3}>{value}</Typography>
                <Typography fontSize={10.5} color={label === "Shopee" ? "#c96f76" : "primary.main"}>↑ {change}</Typography>
              </Grid>
            )}
          </Grid>
          <Box height={155}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orders} margin={{ top: 5, right: 4, left: -22, bottom: 0 }}>
                <CartesianGrid stroke="#edf0ee" vertical />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#87908c" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#87908c" }} tickFormatter={v => `${v/1000}k`} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="tokopedia" stroke="#319b82" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="shopee" stroke="#78c49c" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="bukalapak" stroke="#c9e879" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Panel>
      </Grid>
    </Grid>

    <Panel title="Visitors">
      <Grid container spacing={1.5} mb={2}>
        {[["Total Visitors","48,294","+8.4%"],["New Visitors","31,804","+12.6%"],["Returning Visitors","16,490","+3.2%"]].map(([label,value,change]) =>
          <Grid item xs={12} sm={4} key={label}>
            <Box className="visitor-stat">
              <Typography fontSize={12} color="text.secondary">{label}</Typography>
              <Typography fontSize={22} fontWeight={800} mt={0.5}>{value}</Typography>
              <Chip size="small" label={change} sx={{ mt: 0.7, bgcolor: "#e8f5f1", color: "#267b68", height: 22, fontSize: 10 }} />
            </Box>
          </Grid>
        )}
      </Grid>
      <Box height={100}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthly} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#87908c" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="sales" name="New visitors" stroke="#319b82" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Panel>
  </Box>;
}
