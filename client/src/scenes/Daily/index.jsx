import { useState, useMemo, forwardRef } from "react";
import { useTheme, Box } from "@mui/material";
import { useGetOverallStatsQuery } from "redux/api";
import DatePicker from "react-datepicker";
import { ResponsiveLine } from "@nivo/line";
import SceneTitle from "components/SceneTitle/SceneTitle";
import "react-datepicker/dist/react-datepicker.css";

const Daily = () => {
  const [startDate, setStartDate] = useState(new Date("2021-12-01"));
  const [endDate, setEndDate] = useState(new Date("2021-12-31"));
  const { data } = useGetOverallStatsQuery();
  const theme = useTheme();

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      style={{
        outline: "none",
        height: "30px",
        border: `1px solid ${theme.palette.secondary[200]}`,
        borderRadius: "2px",
        padding: "3px 6px",
        color: theme.palette.neutral.main,
        width: "8rem",
        textAlign: "left"
      }}
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  const dailyChart = useMemo(() => {
    if (!data) return [];

    const { dailyData } = data;

    const totalSalesLine = {
      id: "Total sales",
      color: theme.palette.secondary.main,
      data: [],
    };

    const totalUnitsLine = {
      id: "Total units",
      color: theme.palette.secondary[600],
      data: [],
    };

    dailyData.forEach(({ date, totalSales, totalUnits }) => {
      const formattedDate = new Date(date);

      if (formattedDate >= startDate && formattedDate <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: splitDate, y: totalSales },
        ];

        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits },
        ];
      }
    });

    const formattedData = [totalSalesLine, totalUnitsLine];

    return formattedData;
  }, [data, startDate, endDate]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.25rem 2.5rem">
      <SceneTitle title="Daily" />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end" gap="5px">
          <Box>
            <DatePicker
              customInput={<CustomInput />}
              dateFormat="dd.MM.yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              maxDate={new Date("2021-12-31")}
            />
          </Box>
          <Box>
            <DatePicker
              customInput={<CustomInput />}
              dateFormat="dd.MM.yyyy"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={new Date("2021-12-31")}
            />
          </Box>
        </Box>

        {data ? (
          <ResponsiveLine
            data={dailyChart}
            margin={{ top: 30, right: 100, bottom: 60, left: 40 }}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[700],
                  },
                },
                legend: {
                  text: {
                    field: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 4,
              tickRotation: 90,
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 4,
              tickRotation: 0,
              legend: null,
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={5}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 85,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "triangle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <Box>Loading...</Box>
        )}
      </Box>
    </Box>
  );
};

export default Daily;
