import { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import SceneTitle from "components/SceneTitle/SceneTitle";
import { ResponsiveLine } from "@nivo/line";
import { useGetOverallStatsQuery } from "redux/api";

const Monthly = () => {
  const theme = useTheme();
  const { data } = useGetOverallStatsQuery();

  const monthlyChart = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;

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

    monthlyData.forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,
        { x: month, y: totalSales },
      ];

      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        { x: month, y: totalUnits },
      ];
    });

    return [totalSalesLine, totalUnitsLine];
  }, [data]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.25rem 2.5rem">
      <SceneTitle title="Mountly sales" />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine
            data={monthlyChart}
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
            // curve="catmullRom"
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
            pointSize={7}
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

export default Monthly;
