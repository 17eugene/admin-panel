import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "redux/geoData";

const GeoMap = ({ locationData, theme }) => (
  <ResponsiveChoropleth
    data={locationData}
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
    features={geoData.features}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    domain={[0, 60]}
    unknownColor="#666666"
    label="properties.name"
    valueFormat=".2s"
    projectionScale={120}
    projectionTranslation={[0.5, 0.7]}
    projectionRotation={[-12, 0, 0]}
    enableGraticule={true}
    graticuleLineWidth={0}
    graticuleLineColor="#dddddd"
    borderWidth={0.5}
    borderColor="#a4aab2"
    legends={[
      {
        anchor: "bottom-left",
        direction: "column",
        justify: true,
        translateX: 27,
        translateY: -21,
        itemsSpacing: 2,
        itemWidth: 94,
        itemHeight: 16,
        itemDirection: "left-to-right",
        itemTextColor: theme.palette.secondary[200],
        itemOpacity: 0.75,
        symbolSize: 18,
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: theme.palette.secondary[500],
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default GeoMap;
